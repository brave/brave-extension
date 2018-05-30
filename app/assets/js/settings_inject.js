/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

function hide_sidebar_rows() {
  var drawerContent = settings_ui.querySelector(".drawer-content")
  var settings_menu = drawerContent.querySelector("settings-menu")

  if (settings_menu) {
    settings_menu.shadowRoot.querySelector("#people").style.display = "none"
    settings_menu.shadowRoot.querySelector("a[href='/accessibility']").style.display = "none"
    return
  }

  // wait for settings-menu
  var observer = new MutationObserver((mutations) => {
    mutations.map((mutation) => {
      if (Array.from(mutation.addedNodes).find((node) => node.localName === "settings-menu")) {
        var settings_menu = drawerContent.querySelector("settings-menu").shadowRoot
        settings_menu.querySelector("#people").style.display = "none"
        settings_menu.querySelector("a[href='/accessibility']").style.display = "none"
      }
    })
  })
  observer.observe(drawerContent, option)
}

function hide_advanced_fonts(appearance_page) {
  var animated_pages = appearance_page.shadowRoot.getElementById("pages")
  var fonts_page = animated_pages.querySelector('settings-appearance-fonts-page')
  if (fonts_page) {
    fonts_page.shadowRoot.querySelector('#advancedButton').style.display = "none"
    return
  }

  // otherwise, wait for fonts-page to be added
  var observer = new MutationObserver((mutations) => {
    var fonts_page = animated_pages.querySelector('settings-appearance-fonts-page')
    fonts_page.shadowRoot.querySelector('#advancedButton').style.display = "none"
  })
  observer.observe(animated_pages, option)
}

function observe_basic_page() {
  var basic_page = settings_main.querySelector("settings-basic-page").shadowRoot
  var people = basic_page.querySelector("settings-section[section='people']")
  var appearance_page = basic_page.querySelector("settings-appearance-page")

  // hide people section in basic page if it's loaded
  if (people) {
    people.style.display = "none"
  }

  // hide theme row and advanced fonts in appearance page if it's loaded
  if (appearance_page) {
    appearance_page.shadowRoot.getElementById("themeRow").style.display = "none"
    hide_advanced_fonts(appearance_page)
  }

  // wait for advancedPage to be added so needed elements can be accessed
  var observer = new MutationObserver((mutations) => {
    mutations.filter((mutation) => mutation.addedNodes.length).map((mutation) => {
      if (Array.from(mutation.addedNodes).find((node) => node.id === "advancedPage")) {
        if (!people) {
          basic_page.querySelector("settings-section[section='people']").style.display = "none"
        }

        if (!appearance_page) {
          appearance_page = basic_page.querySelector("settings-appearance-page")
          appearance_page.shadowRoot.getElementById("themeRow").style.display = "none"
          hide_advanced_fonts(appearance_page)
        }

        // hide a11y section and printer page's cloud printer option
        basic_page.querySelector("settings-section[section='a11y']").style.display = "none"
        var printing_page = basic_page.querySelector("settings-printing-page")
        printing_page.shadowRoot.getElementById("cloudPrinters").style.display = "none"
      }
    })
  })

  observer.observe(basic_page, option)
}

function observe_settings_main() {
  var observer = new MutationObserver((mutations) => {
    mutations.filter((mutation) => mutation.addedNodes.length).map((mutation) => {
      if (Array.from(mutation.addedNodes).find((node) => node.localName === "settings-basic-page")) {
        observe_basic_page()
      }
    })
  })
  observer.observe(settings_main, option)
}

const option = { childList: true }
var settings_ui = document.getElementsByTagName("settings-ui")[0].shadowRoot
var settings_main = settings_ui.getElementById("main").shadowRoot

hide_sidebar_rows()

if (settings_main.querySelector("settings-basic-page")) {
  observe_basic_page()
} else { // wait for basic_page to be added
  observe_settings_main()
}
