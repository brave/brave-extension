/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const tasks = require('./tasks')
const createWebpackServer = require('webpack-httpolyglot-server')
const devConfig = require('../webpack/dev.config')

console.log('[Webpack Dev]')
console.log('-'.repeat(80))
createWebpackServer(devConfig, {
  host: 'localhost',
  port: 3000
})
