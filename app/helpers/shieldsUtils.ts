/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Tab, State } from '../types/state/shieldsPannelState'

export const getTotalResourcesBlocked = (tabData: Partial<Tab>) => {
  if (!tabData) {
    return 0
  }
  return (
    tabData.adsBlocked! +
    tabData.trackersBlocked! +
    tabData.javascriptBlocked! +
    tabData.fingerprintingBlocked! +
    tabData.httpsRedirected!
  )
}

export const totalAdsTrackersBlocked = (adsBlocked: number, trackersBlocked: number) => {
  return adsBlocked + trackersBlocked
}

export const getFavicon = (url: string) => {
  return `chrome://favicon/size/16@1x/${ url }`
}

export const blockedResourcesSize = (blockedResources: number) => {
  if (blockedResources > 99) {
    return '99+'
  }
  return blockedResources.toString()
}

export const isShieldsActive = (state: State, tabId: number): boolean => {
  if (!state.tabs[tabId]) {
    return false
  }
  return state.tabs[tabId].braveShields !== 'block'
}
