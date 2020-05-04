'use strict'

/**
 * scripts/get-npm-packages-info.js
 * Get NPM packages info. Outputs info in JSON format.
 * License: MIT
 * (c) 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

const https = require('https')

let npm_names = []

let npm_names_chunks = []
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) != null) {
	npm_names_chunks.push(chunk)
    }
})
process.stdin.on('end', () => {
    npm_names = npm_names_chunks.join('').trimRight().split('\n')

    const packagesInfo = []

    let syncCounter = npm_names.length

    for (let pkg of npm_names) {
	const chunks = []
	const req = https.request({
            hostname: 'registry.npmjs.org',
            path: '/' + pkg,
            method: 'GET'
	}, (res) => {
            res.on('data', (data) => {
		chunks.push(data)
            })

            res.on('end', () => {
		const data = JSON.parse(chunks.join(''))
		packagesInfo.push(data)
		syncCounter--
            })
	})

	req.on('error', (e) => {
            console.error(e.message)
	})

	req.end()
    }

    function waitFor(cb) {
	if (syncCounter == 0) {
	    cb()
	} else {
	    setTimeout(waitFor, 250, cb)
	}
    }

    waitFor(() => {
	process.stdout.write(JSON.stringify(packagesInfo))
    })
})
