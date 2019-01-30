
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// import * as cosmeticFilterAPI from '../../../../app/background/api/cosmeticFilterAPI'

// get get(callback: (items: { [key: string]: any }) => void): void;
// set set(items: Object, callback?: () => void): void;

// jest.SpyInstance < {
//     (callback: (): void;
// (keys: string | ... 1 more ... | string[], callback: (items: {
//         ...;
//     }) => void): void

describe('cosmeticFilterTestSuite', () => {
  describe('addSiteCosmeticFilter', () => {
    // const url = 'https://www.brave.com'
    // const filter = '#cssFilter'
    // let getStorageStub: any
    // let setStorageStub: any

    // var x: jest.SpyInstance
    // TODO: @cezaraugusto fix me
    beforeAll(() => {
      // getStorageStub = jest.spyOn(chrome.storage.local, 'get')
      // // jest.SpyInstance<(items: Object, callback?: () => void) => void>
      // setStorageStub = jest.spyOn(chrome.storage.local, 'set')
    })

    afterEach(() => {
      // jest.restoreAllMocks()
    })
    beforeEach(() => {
      // jest.resetAllMocks()
    })

    it('passes only 1 arg to chrome.storage.local.set', () => {

//       describe('helper', () => {
//         test('testFuncB', () => {

//         }
//    test('testFuncA', () => {
//           const mockTestFuncB = jest.mock();
//           // spy on calls to testFuncB and respond with a mock function
//           jest.spyOn(helper, 'testFuncB').mockImplementationOnce(mockTestFuncB);

//           // Do the testing ...

//           // Restore helper.testFuncB to it's original function
//           helper.testFuncB.mockRestore();
//         }
// }


      // getStorageStub('cosmeticFilterList', {
      //   'list': {
      //     'hostname': ['samplefilter']
      //   }
      // })
      // jest.spyOn(chrome.storage.local, 'get').mockImplementationOnce(setStorageStub)
      // jest.spyOn(cosmeticFilterAPI, 'addSiteCosmeticFilter').mockImplementationOnce(getMock)
      // .next({
      // })
      // cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
      // console.log(cosmeticFilterAPI.addSiteCosmeticFilter(url, filter))
      // console.log(setStorageStub.mock.to)
      // expect(setStorageStub.mock.calls[0].length).toHaveBeenCalled()
      // console.log(setStorageStub.mock.calls[0])
      // expect(setStorageStub.mock.calls[0].length).toBe(1)
    })

    // it('should call generator function', function () {
    //   const user = { email: "test@test.com", password: "1234" };
    //   const generator = login(user, {});

    //   expect(generator.next().value).toBe(SOME_VALUE_HERE));
  // });



    it('passes the correct arguments to chrome.storage.local.set when storage is empty', () => {
      // getStorageStub({})
      // cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
      // console.log(JSON.stringify(setStorageStub.mock))
      // expect(setStorageStub.mock.calls[0]).toBe({
      //   cosmeticFilterList: {
      //     'https://www.brave.com': ['#cssFilter']
      //   }
      // })
    })
    it('passes the correct arguments to chrome.storage.local.set when storage is undefined', () => {
    //   this.getStorageStub.yields(undefined)
    //   cosmeticFilterAPI.addSiteCosmeticFilter(url, filter)
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {
    //       'https://www.brave.com': ['#cssFilter']
    //     }
    //   })
    // })
    // it('can add more than 1 filter', () => {
    //   this.getStorageStub.yields({
    //     'cosmeticFilterList': {
    //       'hostname': ['samplefilter']
    //     }
    //   })
    //   cosmeticFilterAPI.addSiteCosmeticFilter('hostname', 'samplefilter2')
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     'cosmeticFilterList': {
    //       'hostname': ['samplefilter', 'samplefilter2']
    //     }
    //   })
    })
  })
  describe('removeSiteFilter', () => {
    // const url = 'https://www.brave.com'
    // const filter = '#cssFilter'

    // beforeAll(() => {
    //   this.getStorageStub = sinon.stub(chrome.storage.local, 'get')
    //   this.setStorageStub = sinon.stub(chrome.storage.local, 'set')
    // })
    // afterEach(() => {
    //   this.getStorageStub.restore()
    //   this.setStorageStub.restore()
    // })
    // beforeEach(() => {
    //   this.getStorageStub.reset()
    //   this.setStorageStub.reset()
    // })
    // it('passes only 1 arg to chrome.storage.local.set', () => {
    //   this.getStorageStub.yields({
    //     'cosmeticFilterList': {
    //       url: filter
    //     }
    //   })
    //   cosmeticFilterAPI.removeSiteFilter(url)
    //   assert.equal(this.setStorageStub.getCall(0).args.length, 1)
    // })
    // it('removes the correct filter', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {
    //       'https://www.brave.com': ['#cssFilter'],
    //       'https://notbrave.com': ['notACSSFilter']
    //     }
    //   })
    //   cosmeticFilterAPI.removeSiteFilter(url)
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {
    //       'https://notbrave.com': ['notACSSFilter']
    //     }
    //   })
    // })
    // it('handles empty storage', () => {
    //   this.getStorageStub.yields({})
    //   cosmeticFilterAPI.removeSiteFilter(url)
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {}
    //   })
    // })
    // it('handles undefined storage', () => {
    //   this.getStorageStub.yields(undefined)
    //   cosmeticFilterAPI.removeSiteFilter(url)
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {}
    //   })
    // })
    // it('handles url not in storage', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {
    //       url: filter
    //     }
    //   })
    //   cosmeticFilterAPI.removeSiteFilter('urlNotInStorage')
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {
    //       url: filter
    //     }
    //   })
    // })
  })
  describe('removeAllFilters', () => {
    // beforeAll(() => {
    //   this.getStorageStub = sinon.stub(chrome.storage.local, 'get')
    //   this.setStorageStub = sinon.stub(chrome.storage.local, 'set')
    // })
    // afterEach(() => {
    //   this.getStorageStub.restore()
    //   this.setStorageStub.restore()
    // })
    // beforeEach(() => {
    //   this.getStorageStub.reset()
    //   this.setStorageStub.reset()
    // })

    // it('sets empty list object', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {
    //       'hostname': 'isNotEmpty'
    //     }
    //   })
    //   cosmeticFilterAPI.removeAllFilters()
    //   assert.deepEqual(this.setStorageStub.getCall(0).args[0], {
    //     cosmeticFilterList: {}
    //   })
    // })
  })
  describe('applySiteFilters', () => {
    // const filter = '#cssFilter'
    // const filter2 = '#cssFilter2'

    // beforeAll(() => {
    //   this.getStorageStub = sinon.stub(chrome.storage.local, 'get')
    //   this.setStorageStub = sinon.stub(chrome.storage.local, 'set')
    //   this.insertCSSStub = sinon.stub(chrome.tabs, 'insertCSS')
    // })
    // afterEach(() => {
    //   this.getStorageStub.restore()
    //   this.setStorageStub.restore()
    //   this.insertCSSStub.restore()
    // })
    // beforeEach(() => {
    //   this.getStorageStub.reset()
    //   this.setStorageStub.reset()
    //   this.insertCSSStub.reset()
    // })
    // it('applies the correct filter', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {
    //       'brave.com': [filter]
    //     }
    //   })
    //   cosmeticFilterAPI.applySiteFilters('brave.com')
    //   assert.deepEqual(this.insertCSSStub.getCall(0).args[0], {
    //     code: `${filter} {display: none;}`,
    //     runAt: 'document_start'
    //   })
    // })
    // it('applies multiple filters correctly', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {
    //       'brave.com': [filter, filter2]
    //     }
    //   })
    //   cosmeticFilterAPI.applySiteFilters('brave.com')
    //   assert.deepEqual(this.insertCSSStub.getCall(0).args[0], {
    //     code: `${filter} {display: none;}`,
    //     runAt: 'document_start'
    //   })
    //   assert.deepEqual(this.insertCSSStub.getCall(1).args[0], {
    //     code: `${filter2} {display: none;}`,
    //     runAt: 'document_start'
    //   })

    // })
    // chrome.local.storage.get() always returns an empty object if nothing exists
    // it('doesn\'t apply filters if storage for host is implicitly undefined', () => {
    //   this.getStorageStub.yields({
    //     cosmeticFilterList: {}
    //   })
    //   cosmeticFilterAPI.applySiteFilters('brave.com')
    //   assert.equal(this.insertCSSStub.called, false)
    // })
    it('doesn\'t apply filters if storage is explicitly undefined', () => {
      // this.getStorageStub.yields({
      //   cosmeticFilterList: {
      //     'brave.com': undefined
      //   }
      // })
      // cosmeticFilterAPI.applySiteFilters('brave.com')
      // assert.equal(this.insertCSSStub.called, false)
    })
  })
})
