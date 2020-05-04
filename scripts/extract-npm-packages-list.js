'use strict'

/**
 * scripts/extract-npm-packages-list.js
 * Extracts of NPM packages names. Outputs info in JSON format.
 * Not necessary. Use the jq utility for this purpose.
 * License: MIT
 * (c) 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

if (process.argv[2] == "--help") {
    console.log('Usage:')
    console.log('node extract-npm-packages-list.js <path>')
    console.log('Where <path> is path to list of products in JSON.')
    exit(0)
}

const PRODUCTS_LIST_PATH = process.argv[2]

if (!PRODUCTS_LIST_PATH) {
    console.log('Error: empty path to list of products in JSON.')
    console.log('Try with option --help.')
    process.exit(1)
}

const productList = require(PRODUCTS_LIST_PATH)

const packagesList = []

for (let product of productList) {
    packagesList.push({'name': product['npm-name']})
}

process.stdout.write(JSON.stringify(packagesList))
