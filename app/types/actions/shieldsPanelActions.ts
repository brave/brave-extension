/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as types from '../constants/shieldsPanelTypes'
import { BlockTypes, BlockOptions } from '../other/blockTypes'

export interface ShieldDetails {
  id: number
  adBlock: BlockOptions
  trackingProtection: BlockOptions
  httpsEverywhere: BlockOptions
  origin: string
  hostname: string
}

export interface BlockDetails {
  blockType: BlockTypes
  tabId: number
}

interface ShieldsPanelDataUpdatedReturn {
  type: types.SHIELDS_PANEL_DATA_UPDATED
  details: ShieldDetails
}

export interface ShieldsPanelDataUpdated {
  (details: ShieldDetails): ShieldsPanelDataUpdatedReturn
}

interface ShieldsToggledReturn {
  type: types.SHIELDS_TOGGLED
  setting: BlockOptions
}

export interface ShieldsToggled {
  (setting: BlockOptions): ShieldsToggledReturn
}

interface AdBlockToggledReturn {
  type: types.AD_BLOCK_TOGGLED
}

export interface AdBlockToggled {
  (): AdBlockToggledReturn
}

interface TrackingProtectionToggledReturn {
  type: types.TRACKING_PROTECTION_TOGGLED
}

export interface TrackingProtectionToggled {
  (): TrackingProtectionToggledReturn
}

interface ResourceBlockedReturn {
  type: types.RESOURCE_BLOCKED
  details: BlockDetails
}

export interface ResourceBlocked {
  (details: BlockDetails): ResourceBlockedReturn
}

interface BlockAdsTrackersReturn {
  type: types.BLOCK_ADS_TRACKERS
  setting: BlockOptions
}

export interface BlockAdsTrackers {
  (setting: BlockOptions): BlockAdsTrackersReturn
}

interface ControlsToggledReturn {
  type: types.CONTROLS_TOGGLED
  setting: boolean
}

export interface ControlsToggled {
  (setting: boolean): ControlsToggledReturn
}

interface HttpsEverywhereToggledReturn {
  type: types.HTTPS_EVERYWHERE_TOGGLED
}

export interface HttpsEverywhereToggled {
  (): HttpsEverywhereToggledReturn
}

interface JavascriptToggledReturn {
  type: types.JAVASCRIPT_TOGGLED
}

export interface JavascriptToggled {
  (): JavascriptToggledReturn
}

// TODO check if we need it
export type shieldPanelActions =
  ShieldsPanelDataUpdatedReturn |
  ShieldsToggledReturn |
  AdBlockToggledReturn |
  TrackingProtectionToggledReturn |
  ResourceBlockedReturn |
  BlockAdsTrackersReturn |
  ControlsToggledReturn |
  HttpsEverywhereToggledReturn |
  JavascriptToggledReturn