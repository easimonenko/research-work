'use strict'

/**
 * scripts/github-repositories-table-generator.js
 * Generates of GitHub repositories table.
 * License: MIT
 * (c) 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

const commander = require('commander')
const fs = require('fs')
const handlebars = require('handlebars')

commander.requiredOption('-t, --template <path>', 'Path to template file.')
    .requiredOption('-i, --info <path>', 'Path to GitHub repositories info in JSON.')
    .option('-n, --name <path>', 'Path to file in JSON format with names of software.')
    .parse(process.argv)

const options = commander.opts()
const TEMPLATE = options['template']
const REPOSITORIES_INFO = options['info']
const SOFTWARE_INFO = options['name']

const repositories_info = require(`${process.cwd()}/${REPOSITORIES_INFO}`)

function makeDate(date) {
    const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}

for (let i = 0; i < repositories_info.length; i++) {
    repositories_info[i]['lastCommit'] =
	makeDate(
	    new Date(
		repositories_info[i]['commits'][0]['commit']['author']['date']))

    repositories_info[i]['createdAt'] =
	makeDate(new Date(repositories_info[i]['created_at']))
}

repositories_info.sort((a, b) => {
      return b['stargazers_count'] - a['stargazers_count']
})

repositories_info.forEach((p, i) => {
    p['number'] = i + 1
})

if (SOFTWARE_INFO) {
    const software_info = require(`${process.cwd()}/${SOFTWARE_INFO}`)
    for (let i = 0; i < repositories_info.length; i++) {
	for (let sw of software_info) {
	    if (sw['github'] == repositories_info[i]['full_name']) {
		repositories_info[i]['name'] = sw['name']
                repositories_info[i]['query_language'] = sw['query_language']
                if ((!!repositories_info[i]['license']
                     && repositories_info[i]['license']['name'] == "Other")
                    || !repositories_info[i]['license']) {
                    repositories_info[i]['license'] = { 'name': sw['license']}
                }
		break
	    }
	}
    }
}

const tTable = fs.readFileSync(TEMPLATE)
const ctTable = handlebars.compile(tTable.toString())
process.stdout.write(ctTable({
    repositories_info: repositories_info
}))
