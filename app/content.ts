const unique = require('unique-selector').default
let target: EventTarget | null

document.addEventListener('contextmenu', (event) => {
  target = event.target
}, true)

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const action = typeof msg === 'string' ? msg : msg.type
  switch (action) {
    case 'addBlockElement': {
      sendResponse({
        selector: unique(target),
        baseURI: window.location.hostname
      })
      break
    }
  }
})
