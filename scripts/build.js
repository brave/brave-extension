/* global exec */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

require('shelljs/global')

console.log('[Webpack Build]')
console.log('-'.repeat(80))

const outputPath = process.argv[2]
const webpackPublicPath = process.argv[3]
const env = process.argv[4]

if (exec(`pug -O "{ webpackPublicPath: ${webpackPublicPath} }" -o "${outputPath}" app/views/`).code !== 0) {
  echo('Erorr: pug failed')
  exit(1)
}
if (exec(`webpack --config webpack/prod.config.js --output-path "${outputPath}/js" --progress --profile --colors`).code !== 0) {
  echo('Erorr: webpack failed')
  exit(1)
}
