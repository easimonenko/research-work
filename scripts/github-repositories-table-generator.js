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

commander.option('-t, --template <path>', 'Path to template file.')
    .option('-i, --info <path>', 'Path to GitHub repositories info in JSON.')
    .parse(process.argv)

const TEMPLATE = commander['template']
const REPOSITORIES_INFO = commander['info']

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

const tTable = fs.readFileSync(TEMPLATE)
const ctTable = handlebars.compile(tTable.toString())
process.stdout.write(ctTable({
    repositories_info: repositories_info
}))
