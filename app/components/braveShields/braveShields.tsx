/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { ShieldsPanel } from 'brave-ui/features/shields'
import ShieldsHeader from './header'
import ShieldsInterfaceControls from './interfaceControls'
import ShieldsPrivacyControls from './privacyControls'
import ShieldsSecurityControls from './securityControls'
import ShieldsFooter from './footer'

import * as shieldActions from '../../types/actions/shieldsPanelActions'
import { Tab } from '../../types/state/shieldsPannelState'

interface Props {
  actions: {
    shieldsToggled: shieldActions.ShieldsToggled
    blockAdsTrackers: shieldActions.BlockAdsTrackers
    blockJavaScript: shieldActions.BlockJavaScript
    blockFingerprinting: shieldActions.BlockFingerprinting
    blockCookies: shieldActions.BlockCookies
  }
  shieldsPanelTabData: Tab
}

export default class BraveShields extends React.Component<Props, {}> {
  render () {
    const { shieldsPanelTabData, actions } = this.props
    if (!shieldsPanelTabData) {
      return null
    }

    return (
      <ShieldsPanel data-test-id='brave-shields-panel'>
        <ShieldsHeader
          tabData={shieldsPanelTabData}
          shieldsToggled={actions.shieldsToggled}
        />
        <ShieldsInterfaceControls
          braveShields={shieldsPanelTabData.braveShields}
          blockAdsTrackers={actions.blockAdsTrackers}
          adsBlocked={shieldsPanelTabData.adsBlocked}
          trackersBlocked={shieldsPanelTabData.trackersBlocked}
          ads={shieldsPanelTabData.ads}
          trackers={shieldsPanelTabData.trackers}
        />
        <ShieldsPrivacyControls
          braveShields={shieldsPanelTabData.braveShields}
          fingerprinting={shieldsPanelTabData.fingerprinting}
          fingerprintingBlocked={shieldsPanelTabData.fingerprintingBlocked}
          blockFingerprinting={actions.blockFingerprinting}
          javascript={shieldsPanelTabData.javascript}
          javascriptBlocked={shieldsPanelTabData.javascriptBlocked}
          blockJavaScript={actions.blockJavaScript}
          blockCookies={actions.blockCookies}
          cookies={shieldsPanelTabData.cookies}
        />
        <ShieldsSecurityControls
          braveShields={shieldsPanelTabData.braveShields}
          httpsRedirected={shieldsPanelTabData.httpsRedirected}
        />
        <ShieldsFooter />
      </ShieldsPanel>
    )
  }
}
