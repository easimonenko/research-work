'use strict'

/**
 * scripts/npm-packages-table-generator.js
 * Generates of NPM packages table.
 * License: MIT
 * (c) 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

const commander = require('commander')
const fs = require('fs')
const handlebars = require('handlebars')

commander.option('-t, --template <path>', 'Path to template file.')
    .option('-i, --info <path>', 'Path to NPM packages info in JSON.')
    .parse(process.argv)


const TEMPLATE = commander['template']
const PACKAGES_INFO = commander['info']

const packages_info = require(`${process.cwd()}/${PACKAGES_INFO}`)

function makeDate(date) {
    const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}


for (let i = 0; i < packages_info.length; i++) {
    let stars = 0
    for (let key in packages_info[i]['users']) {
        if (packages_info[i]['users'][key]) {
            stars += 1
        }
    }
    packages_info[i]['stargazers_count'] = stars

    const lastVersion = packages_info[i]['dist-tags']['latest']
    packages_info[i]['lastVersion'] = lastVersion
    
    packages_info[i]['lastUpdate'] = makeDate(
	new Date(packages_info[i]['time']['modified']))

    packages_info[i]['createdAt'] = makeDate(
	new Date(packages_info[i]['time']['created']))

    const dependencies = packages_info[i]['versions'][lastVersion]['dependencies']
    packages_info[i]['dependencies'] =
	dependencies ? Object.keys(dependencies).length : 0
}

packages_info.sort((a, b) => {
      return b['stargazers_count'] - a['stargazers_count']
})

packages_info.forEach((p, i) => {
    p['number'] = i + 1
})

const tTable = fs.readFileSync(TEMPLATE)
const ctTable = handlebars.compile(tTable.toString())
process.stdout.write(ctTable({
    packages_info: packages_info
}))
