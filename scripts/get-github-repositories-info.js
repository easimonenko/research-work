'use strict'

/**
 * scripts/get-github-repositories-info.js
 * Get GitHub repositories info. Outputs info in JSON format.
 * License: MIT
 * (c) 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

const https = require('https')

let github_names = []

let github_names_chunks = []
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) != null) {
	github_names_chunks.push(chunk)
    }
})
process.stdin.on('end', () => {
    github_names = github_names_chunks.join('').trimRight().split('\n')

    const repositoriesInfo = []

    let syncCounter = github_names.length

    for (let repo of github_names) {
	const chunks = []

	const req = https.request({
	    hostname: 'api.github.com',
	    path: '/repos/' + repo,
            method: 'GET',
	    headers: {
		'User-Agent': 'Get-GitHub-Repositories-Info'
            }
	}, (res) => {
            res.on('data', (data) => {
		chunks.push(data)
            })

            res.on('end', () => {
		const data = JSON.parse(chunks.join(''))

		const commitsChunks = []
		const commitsReq = https.request({
                    hostname: 'api.github.com',
                    path: '/repos/' + repo + '/commits',
                    method: 'GET',
                    headers: {
			'User-Agent': 'Get-GitHub-Repositories-Info'
                    }
		}, (commitsRes) => {
		    commitsRes.on('data', (commitsData) => {
			commitsChunks.push(commitsData)
		    })

		    commitsRes.on('end', () => {
			data['commits'] = JSON.parse(commitsChunks.join(''))
			
			repositoriesInfo.push(data)
			syncCounter--
		    })
		})

		commitsReq.on('error', (e) => {
		    console.error(e.message)
                })

		commitsReq.end()
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
	process.stdout.write(JSON.stringify(repositoriesInfo))
    })

})
