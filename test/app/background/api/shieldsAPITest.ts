/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import actions from '../../../../app/background/actions/shieldsPanelActions'
import * as shieldsAPI from '../../../../app/background/api/shieldsAPI'
import { activeTabData } from '../../../testData'
// import { Tab as TabType } from '../../../../app/types/state/shieldsPannelState'
import * as resourceIdentifiers from '../../../../app/constants/resourceIdentifiers'

describe('Shields API', () => {
  describe('getShieldSettingsForTabData', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it.skip('returns a rejected promise when no tab data is specified', (cb) => {
      shieldsAPI.getShieldSettingsForTabData(undefined)
        .catch(() => {
          cb()
        })
    })

    it.skip('resolves the returned promise with shield settings for the tab data', (cb) => {
      const tab: chrome.tabs.Tab = {
        url: 'https://www.brave.com/serg/dont/know/pokemon',
        id: 5,
        index: 1,
        pinned: false,
        highlighted: false,
        windowId: 1,
        active: true,
        incognito: false,
        selected: false
      }

      expect.assertions(1)
      shieldsAPI.getShieldSettingsForTabData(tab).then((data) => {
        expect(data).toEqual({
          url: 'https://www.brave.com/serg/dont/know/pokemon',
          origin: 'https://www.brave.com',
          hostname: 'www.brave.com',
          braveShields: 'block',
          ads: 0,
          trackers: 0,
          httpUpgradableResources: 0,
          javascript: 0,
          fingerprinting: 0,
          id: 5
        })
        cb()
      })
      .catch((e: Error) => {
        console.error(e.toString())
      })
    })

    it('returns `block` by default for braveShields', (cb) => {
      const tab: chrome.tabs.Tab = {
        url: 'https://www.brave.com/charizard/knows/serg',
        index: 1,
        pinned: false,
        highlighted: false,
        windowId: 1,
        active: true,
        incognito: false,
        selected: false,
        id: 1337
      }

      expect.assertions(1)
      shieldsAPI.getShieldSettingsForTabData(tab).then((data) => {
        expect(data.braveShields).toBe('block')
        cb()
      })
      .catch((e: Error) => {
        console.error(e.toString())
      })
    })

    it('returns `block` by default for braveShields when origin is not http or https', (cb) => {
      const tab: chrome.tabs.Tab = {
        url: 'ftp://www.brave.com/serg/dont/know/pikachu',
        index: 1,
        pinned: false,
        highlighted: false,
        windowId: 1,
        active: true,
        incognito: false,
        selected: false,
        id: 1337
      }

      expect.assertions(1)
      shieldsAPI.getShieldSettingsForTabData(tab).then((data) => {
        expect(data.braveShields).toBe('block')
        cb()
      })
      .catch((e: Error) => {
        console.error(e.toString())
      })
    })

    it('returns `block` by default for braveShields when origin is an about page', (cb) => {
      const tab: chrome.tabs.Tab = {
        url: 'chrome://welcome',
        index: 1,
        pinned: false,
        highlighted: false,
        windowId: 1,
        active: true,
        incognito: false,
        selected: false,
        id: 1337
      }

      expect.assertions(1)
      shieldsAPI.getShieldSettingsForTabData(tab).then((data) => {
        expect(data.braveShields).toBe('block')
        cb()
      })
      .catch((e: Error) => {
        console.error(e.toString())
      })
    })
  })

  describe('getTabData', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    const tabId = 2
    beforeAll(() => {
      spy = jest.spyOn(chrome.tabs, 'getAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('calls chrome.tabs.getAsync for the active tab', () => {
      expect.assertions(1)
      shieldsAPI.getTabData(tabId)
      expect(spy).toBeCalledWith(tabId)
    })

    it('resolves the promise with an array', (cb) => {
      expect.assertions(1)
      shieldsAPI.getTabData(tabId)
      .then((tab: chrome.tabs.Tab) => {
          expect(tab).toEqual(activeTabData)
          cb()
        })
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('requestShieldPanelData', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    const tabId = 2
    beforeAll(() => {
      spy = jest.spyOn(actions, 'shieldsPanelDataUpdated')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('resolves and calls requestShieldPanelData', (cb) => {
      // TODO: @cezaraugusto fix any
      const tab: any = {
        url: 'https://www.brave.com/test',
        origin: 'https://www.brave.com',
        hostname: 'www.brave.com',
        id: 2,
        braveShields: 'block',
        ads: 0,
        trackers: 0,
        httpUpgradableResources: 0,
        javascript: 0,
        fingerprinting: 0
      }

      expect.assertions(2)
      shieldsAPI.requestShieldPanelData(tabId)
        .then(() => {
          expect(spy).toBeCalledTimes(1)
          expect(spy.mock.calls[0][0]).toEqual(tab)
          cb()
        })
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowAds', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn(chrome.braveShields.plugins, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowAds('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_ADS },
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })
    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowAds('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
    })
    it.skip('resolves the returned promise', (cb) => {
      // expect(shieldsAPI.setAllowAds('https://www.brave.com', 'block'))
      shieldsAPI.setAllowAds('https://www.brave.com', 'block')
        .then(cb)
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowTrackers', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn(chrome.braveShields.plugins, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowTrackers('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_TRACKERS },
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })
    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowTrackers('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
    })
    it.skip('resolves the returned promise', (cb) => {
      expect.assertions(1)
      shieldsAPI.setAllowTrackers('https://www.brave.com', 'block')
        .then(cb)
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowHTTPUpgradableResource', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn(chrome.braveShields.plugins, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowHTTPUpgradableResources('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: '*://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_HTTP_UPGRADABLE_RESOURCES },
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })
    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowHTTPUpgradableResources('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
    })
    it.skip('resolves the returned promise', (cb) => {
      shieldsAPI.setAllowHTTPUpgradableResources('https://www.brave.com', 'block')
        .then(cb)
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowJavaScript', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn(chrome.braveShields.javascript, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowJavaScript('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })

    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowJavaScript('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
    })

    it.skip('resolves the returned promise', (cb) => {
      shieldsAPI.setAllowJavaScript('https://www.brave.com', 'block')
        .then(cb)
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowFingerprinting', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn (chrome.braveShields.plugins, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowFingerprinting('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_FINGERPRINTING },
        setting: 'block',
        scope: 'incognito_session_only'
      })
      const arg1 = spy.mock.calls[1][0]
      expect(arg1).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        secondaryPattern: 'https://firstParty/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_FINGERPRINTING },
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })
    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowFingerprinting('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
      expect(spy.mock.calls[1].length).toBe(1)
    })
    it.skip('resolves the returned promise', (cb) => {
      shieldsAPI.setAllowFingerprinting('https://www.brave.com', 'block')
        .then(function() {
          cb()
        })
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('setAllowCookies', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn (chrome.braveShields.plugins, 'setAsync')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.plugins with the correct args', () => {
      shieldsAPI.setAllowCookies('https://www.brave.com', 'block')
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_REFERRERS },
        setting: 'block',
        scope: 'incognito_session_only'
      })
      const arg1 = spy.mock.calls[1][0]
      expect(arg1).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_COOKIES },
        setting: 'block',
        scope: 'incognito_session_only'
      })
      const arg2 = spy.mock.calls[2][0]
      expect(arg2).toEqual({
        primaryPattern: 'https://www.brave.com/*',
        secondaryPattern: 'https://firstParty/*',
        resourceIdentifier: { id: resourceIdentifiers.RESOURCE_IDENTIFIER_COOKIES },
        setting: 'block',
        scope: 'incognito_session_only'
      })
    })
    it('passes only 1 arg to chrome.braveShields.plugins', () => {
      shieldsAPI.setAllowCookies('https://www.brave.com', 'block')
      expect(spy.mock.calls[0].length).toBe(1)
      expect(spy.mock.calls[1].length).toBe(1)
    })
    it.skip('resolves the returned promise', (cb) => {
      shieldsAPI.setAllowCookies('https://www.brave.com', 'block')
      .then(() => {
        cb()
      })
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })

  describe('toggleShieldsValue', () => {
    it('toggles \'allow\' to \'block\'', () => {
      expect(shieldsAPI.toggleShieldsValue('allow')).toBe('block')
    })
    it('toggles \'block\' to \'allow\'', () => {
      expect(shieldsAPI.toggleShieldsValue('block')).toBe('allow')
    })
  })

  describe('setAllowScriptOriginsOnce', () => {
    // TODO: @cezaraugusto fix any
    let spy: any
    beforeAll(() => {
      spy = jest.spyOn(chrome.braveShields, 'allowScriptsOnce')
    })
    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('calls chrome.braveShields.allowScriptsOnce with the correct args', () => {
      shieldsAPI.setAllowScriptOriginsOnce(['https://a.com/', 'https://b.com/'], 2)
      const arg0 = spy.mock.calls[0][0]
      expect(arg0).toEqual(['https://a.com/', 'https://b.com/'])
      const arg1 = spy.mock.calls[0][1]
      expect(arg1).toBe(2)
    })
    it('passes 3 args to chrome.braveShields.allowScriptsOnce', () => {
      shieldsAPI.setAllowScriptOriginsOnce(['https://a.com/', 'https://b.com/'], 2)
      expect(spy.mock.calls[0].length).toBe(3) // include callback
    })
    it.skip('resolves the returned promise', (cb) => {
      shieldsAPI.setAllowScriptOriginsOnce(['https://a.com/', 'https://b.com/'], 2)
        .then(() => {
          cb()
        })
        .catch((e: Error) => {
          console.error(e.toString())
        })
    })
  })
})
