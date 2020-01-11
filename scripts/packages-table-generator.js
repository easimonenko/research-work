'use strict'

/**
 * scripts/packages-table-generator.js
 * Generates of packages table from data from GitHub and NPM.
 * License: MIT
 * (c) 2016, 2019, 2020 Evgeny Simonenko <easimonenko@gmail.com>
 */

const commander = require('commander')
const fs = require('fs')
const handlebars = require('handlebars')
const http = require('http')
const https = require('https')

commander.option('--no-github', 'Do not usage of GitHub.', false)
  .option('--no-npm', 'Do not usage of NPM.', false)
  .option('--markdown', 'Generating of markdown table.', false)
  .alias('-m')
  .option('--package-list <path>', 'Path to package list in JSON.')
  .option('--embed-into <path>', 'Path to document source for embedding of table.')
  .parse(process.argv)

const USE_GITHUB = commander['github']
const USE_NPM = commander['npm']
const GENERATING_MARKDOWN = commander['markdown']
const PACKAGE_LIST_PATH = commander['packageList']
const EMBED_INTO_PATH = commander['embedInto']

if (!PACKAGE_LIST_PATH) {
  process.exit(1)
}

const packageNames = require(process.cwd() + "/" + PACKAGE_LIST_PATH)

const packages = []

let syncCounter = ((USE_GITHUB ? 1 : 0) + (USE_NPM ? 1 : 0)) * packageNames.length

function makeDate(date) {
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  return date.getFullYear() + '-' + month + '-' + day
}

packageNames.forEach(
  (m) => {
    let packageInfo = {
      'npmName': m['npm-name'],
      'githubName': m['github-name'],
      'deprecated': m['deprecated']
    }

    if (USE_NPM) {
      if (packageInfo['npmName']) {
        const chunks = []
        const req = http.request({
          hostname: 'registry.npmjs.org',
          port: 80,
          path: '/' + m['npm-name'],
          method: 'GET'
        },
          (res) => {
            res.on(
              'data',
              (data) => {
                chunks.push(data)
              }
            )

            res.on(
              'end',
              () => {
                const data = JSON.parse(chunks.join(''))
                console.error(m['npm-name'] + ': NPM Ok')
                let stars = 0
                for (let key in data['users']) {
                  if (data['users'][key]) {
                    stars += 1
                  }
                }
                packageInfo['npmStars'] = stars
                packageInfo['lastUpdate'] = makeDate(new Date(data['time']['modified']))
                packageInfo['created'] = makeDate(new Date(data['time']['created']))
                const lastVersion = data['dist-tags']['latest']
                packageInfo['lastVersion'] = lastVersion
                let dependencies = 0
                for (let key in data['versions'][lastVersion]['dependencies']) {
                  dependencies += 1
                }
                packageInfo['dependencies'] = dependencies

                syncCounter--
              }
            )
          }
        )

        req.on(
          'error',
          (e) => {
            console.error(e.message())
          }
        )

        req.end()
      } else {
        syncCounter--
      }
    }

    if (USE_GITHUB) {
      const chunks = []
      const req = https.request({
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/' + m['github-name'],
        method: 'GET',
        headers: {
          'User-Agent': 'Node-CLI-Options-Parsing-Review'
        }
      },
        (res) => {
          res.on(
            'data',
            (data) => {
              chunks.push(data)
            }
          )

          res.on(
            'end',
            () => {
              const data = JSON.parse(chunks.join(''))
              packageInfo['githubStars'] = data['stargazers_count']

              const commitsChunks = []
              const commitsReq = https.request({
                hostname: 'api.github.com',
                port: 443,
                path: '/repos/' + m['github-name'] + '/commits',
                method: 'GET',
                headers: {
                  'User-Agent': 'Node-CLI-Options-Parsing-Review'
                }
              },
                (commitsRes) => {
                  commitsRes.on(
                    'data',
                    (commitsData) => {
                      commitsChunks.push(commitsData)
                    }
                  )

                  commitsRes.on(
                    'end',
                    () => {
                      const commitsData = JSON.parse(commitsChunks.join(''))
                      console.error(m['github-name'] + ': GitHub Ok')
                      packageInfo['lastCommit'] = makeDate(new Date(commitsData[0]['commit']['author']['date']))

                      syncCounter -= 1
                    }
                  )
                }
              )

              commitsReq.on(
                'error',
                (e) => {
                  console.error(e.message)
                }
              )

              commitsReq.end()
            }
          )
        }
      )

      req.on(
        'error',
        (e) => {
          console.error(e.message())
        }
      )

      req.end()
    }

    packages.push(packageInfo)
  }
)

function makeHtml() {
  if (syncCounter == 0) {
    const [npmStarsSum, githubStarsSum] = packages.reduce(
      (previousValue, currentValue, currentIndex, array) => {
        return [previousValue[0] + currentValue['npmStars'], previousValue[1] + currentValue['githubStars']]
      },
      [0, 0])
    const ratingK = Math.floor(githubStarsSum / npmStarsSum)
    for (let i = 0; i < packages.length; i++) {
      packages[i]['rating'] = packages[i]['npmStars'] * ratingK + packages[i]['githubStars']
    }
    packages.sort((a, b) => {
      return b['rating'] - a['rating']
    })
    packages.forEach((p, i) => {
      p['number'] = i + 1
    })

    if (GENERATING_MARKDOWN) {
      const tTable = fs.readFileSync(__dirname + '/packages-table-generator/table.md')
      const ctTable = handlebars.compile(tTable.toString())
      if (EMBED_INTO_PATH) {
        const tMD = fs.readFileSync(process.cwd() + "/" + EMBED_INTO_PATH)
        const ctMD = handlebars.compile(tMD.toString())
        process.stdout.write(ctMD({
          table: ctTable({
            packages: packages
          })
        }))
      } else {
        process.stdout.write(ctTable({
          packages: packages
        }))
      }
    } else {
      const tTable = fs.readFileSync(__dirname + './packages-table-generator/table.handlebars')
      const ctTable = handlebars.compile(tTable.toString())
      if (EMBED_INTO_PATH) {
        const tHtml = fs.readFileSync(process.cwd() + "/" + EMBED_INTO_PATH)
        const ctHtml = handlebars.compile(tHtml.toString())
        process.stdout.write(ctHtml({
          table: ctTable({
            packages: packages
          })
        }))
      } else {
        process.stdout.write(ctTable({
          packages: packages
        }))
      }
    }
  } else {
    setTimeout(makeHtml, 500)
  }
}

makeHtml()
