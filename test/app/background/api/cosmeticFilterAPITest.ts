/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as cosmeticFilterAPI from '../../../../app/background/api/cosmeticFilterAPI'

describe('cosmeticFilterTestSuite', () => {
  describe('addSiteCosmeticFilter', () => {
    const url = 'https://www.brave.com'
    const filter = '#cssFilter'
    let getStorageStub: any
    let setStorageStub: any

    beforeAll(() => {
      getStorageStub = jest.spyOn(chrome.storage.local, 'get')
      setStorageStub = jest.spyOn(chrome.storage.local, 'set')
    })
    afterEach(() => {
      getStorageStub.mockRestore()
      setStorageStub.mockRestore()
    })
    beforeEach(() => {
      getStorageStub.mockReset()
      setStorageStub.mockReset()
    })

    it.skip('passes only 1 arg to chrome.storage.local.set', () => {
      getStorageStub.yields({
        'list': {
          'hostname': ['samplefilter']
        }
      })
      cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
      expect(setStorageStub.mock.calls[0].length).toBe(1)
    })
    it.skip('passes the correct arguments to chrome.storage.local.set when storage is empty', () => {
      getStorageStub.yields({})
      cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {
          'https://www.brave.com': ['#cssFilter']
        }
      })
    })
    it.skip('passes the correct arguments to chrome.storage.local.set when storage is undefined', () => {
      getStorageStub.yields(undefined)
      cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {
          'https://www.brave.com': ['#cssFilter']
        }
      })
    })
    it.skip('can add more than 1 filter', () => {
      getStorageStub.yields({
        'cosmeticFilterList': {
          'hostname': ['samplefilter']
        }
      })
      cosmeticFilterAPI.addSiteCosmeticFilter('hostname', 'samplefilter2')
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        'cosmeticFilterList': {
          'hostname': ['samplefilter', 'samplefilter2']
        }
      })
    })
  })
  describe('removeSiteFilter', () => {
    const url = 'https://www.brave.com'
    const filter = '#cssFilter'
    let getStorageStub: any
    let setStorageStub: any

    beforeAll(() => {
      getStorageStub = jest.spyOn(chrome.storage.local, 'get')
      setStorageStub = jest.spyOn(chrome.storage.local, 'set')
    })
    afterEach(() => {
      getStorageStub.mockRestore()
      setStorageStub.mockRestore()
    })
    beforeEach(() => {
      getStorageStub.mockReset()
      setStorageStub.mockReset()
    })
    it.skip('passes only 1 arg to chrome.storage.local.set', () => {
      getStorageStub.yields({
        'cosmeticFilterList': {
          url: filter
        }
      })
      cosmeticFilterAPI.removeSiteFilter(url)
      expect(setStorageStub.mock.calls[0].length).toBe(1)
    })
    it.skip('removes the correct filter', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          'https://www.brave.com': ['#cssFilter'],
          'https://notbrave.com': ['notACSSFilter']
        }
      })
      cosmeticFilterAPI.removeSiteFilter(url)
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {
          'https://notbrave.com': ['notACSSFilter']
        }
      })
    })
    it.skip('handles empty storage', () => {
      getStorageStub.yields({})
      cosmeticFilterAPI.removeSiteFilter(url)
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {}
      })
    })
    it.skip('handles undefined storage', () => {
      getStorageStub.yields(undefined)
      cosmeticFilterAPI.removeSiteFilter(url)
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {}
      })
    })
    it.skip('handles url not in storage', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          url: filter
        }
      })
      cosmeticFilterAPI.removeSiteFilter('urlNotInStorage')
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {
          url: filter
        }
      })
    })
  })
  describe('removeAllFilters', () => {
    let getStorageStub: any
    let setStorageStub: any
    beforeAll(() => {
      getStorageStub = jest.spyOn(chrome.storage.local, 'get')
      setStorageStub = jest.spyOn(chrome.storage.local, 'set')
    })
    afterEach(() => {
      getStorageStub.mockRestore()
      setStorageStub.mockRestore()
    })
    beforeEach(() => {
      getStorageStub.mockReset()
      setStorageStub.mockReset()
    })

    it.skip('sets empty list object', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          'hostname': 'isNotEmpty'
        }
      })
      cosmeticFilterAPI.removeAllFilters()
      expect(setStorageStub.mock.calls[0][0]).toEqual({
        cosmeticFilterList: {}
      })
    })
  })
  describe('applySiteFilters', () => {
    const filter = '#cssFilter'
    const filter2 = '#cssFilter2'
    let getStorageStub: any
    let setStorageStub: any
    let insertCSSStub: any

    beforeAll(() => {
      getStorageStub = jest.spyOn(chrome.storage.local, 'get')
      setStorageStub = jest.spyOn(chrome.storage.local, 'set')
      insertCSSStub = jest.spyOn(chrome.tabs, 'insertCSS')
    })
    afterEach(() => {
      getStorageStub.mockRestore()
      setStorageStub.mockRestore()
      insertCSSStub.mockRestore()
    })
    beforeEach(() => {
      getStorageStub.mockReset()
      setStorageStub.mockReset()
      insertCSSStub.mockReset()
    })
    it.skip('applies the correct filter', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          'brave.com': [filter]
        }
      })
      cosmeticFilterAPI.applySiteFilters('brave.com')
      expect(insertCSSStub.mock.calls[0][0]).toEqual({
        code: `${ filter } {display: none;}`,
        runAt: 'document_start'
      })
    })
    it.skip('applies multiple filters correctly', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          'brave.com': [filter, filter2]
        }
      })
      cosmeticFilterAPI.applySiteFilters('brave.com')
      expect(insertCSSStub.mock.calls[0][0]).toEqual({
        code: `${ filter } {display: none;}`,
        runAt: 'document_start'
      })
      expect(insertCSSStub.mock.calls[1][0]).toEqual({
        code: `${ filter2 } {display: none;}`,
        runAt: 'document_start'
      })

    })
    // chrome.local.storage.get() always returns an empty object if nothing exists
    it.skip('doesn\'t apply filters if storage for host is implicitly undefined', () => {
      getStorageStub.yields({
        cosmeticFilterList: {}
      })
      cosmeticFilterAPI.applySiteFilters('brave.com')
      expect(insertCSSStub).not.toBeCalled()
    })
    it.skip('doesn\'t apply filters if storage is explicitly undefined', () => {
      getStorageStub.yields({
        cosmeticFilterList: {
          'brave.com': undefined
        }
      })
      cosmeticFilterAPI.applySiteFilters('brave.com')
      expect(insertCSSStub).not.toBeCalled()
    })
  })
})