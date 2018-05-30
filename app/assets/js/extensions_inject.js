/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var extMgr = document.getElementsByTagName('extensions-manager')[0]
var observer = new MutationObserver((mutations) => {
  var moreExtensions = extMgr.shadowRoot.querySelector('* /deep/ #more-extensions')
  if (moreExtensions) {
    moreExtensions.style.display = "none"
  }
})

observer.observe(extMgr.shadowRoot, { childList: true })
