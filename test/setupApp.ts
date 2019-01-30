/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// import * as jsdom from 'jsdom'
// import { getMockChrome } from './testData'

// const { JSDOM } = jsdom
// const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window

import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { tabs, ChromeEvent } from './testData'

// global.document = document
// global.window = document.defaultView
// global.navigator = global.window.navigator
// global.HTMLElement = global.window.HTMLElement
// if (global.chrome === undefined) {
//   global.chrome = getMockChrome()
// }
// // mocks rAF to suppress React warning while testing
// global.requestAnimationFrame = function (cb: () => void) {
//   return setTimeout(cb, 0)
// }
(global as any).chrome = {
  browserAction: {
    setBadgeText: jest.fn(),
    setIcon: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn()
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn()
    }
  },
  i18n: {
    getMessage: jest.fn()
  },
  braveShields: {
    plugins: {
      setAsync: jest.fn(), //.mockReturnValueOnce(Promise.resolve()), // jest.fn().mockResolvedValue('aa'), // Promise.resolve(jest.fn()),
      getAsync: jest.fn().mockReturnValueOnce(Promise.resolve({ setting: 'block' })) // Promise.resolve({ setting: 'block' })
    },
    javascript: {
      setAsync: jest.fn(),
      getAsync: jest.fn()
    },
    allowScriptsOnce: jest.fn()
  },
  runtime: {
    onMessage: new ChromeEvent(),
    onConnect: new ChromeEvent(),
    onStartup: new ChromeEvent()
  },
  tabs: {
    getAsync: (tabId: number) => {
      return Promise.resolve(tabs[tabId])
    }
  },
  extension: {
    inIncognitoContext: jest.fn()
  }
}

configure({ adapter: new Adapter() })
