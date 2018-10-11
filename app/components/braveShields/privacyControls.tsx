/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { SelectBox, Stat, Grid } from 'brave-ui/features/shields'

import { BlockOptions, BlockCookiesOptions/*, BlockJSOptions */, BlockFPOptions } from '../../types/other/blockTypes'
import { getMessage } from '../../background/api/localeAPI'
import * as shieldActions from '../../types/actions/shieldsPanelActions'

export interface Props {
  braveShields: BlockOptions
  javascript: BlockOptions // BlockJSOptions
  javascriptBlocked: number
  blockJavaScript: shieldActions.BlockJavaScript
  fingerprinting: BlockFPOptions
  fingerprintingBlocked: number
  blockFingerprinting: shieldActions.BlockFingerprinting
  cookies: BlockCookiesOptions
  blockCookies: shieldActions.BlockCookies
}

export default class ShieldsPrivacyControls extends React.PureComponent<Props, {}> {
  onChangeCookiesProtection = (event: React.ChangeEvent<any>) => {
    if (!event.target) {
      return
    }
    this.props.blockCookies(event.target.value)
  }

  onChangeFingerprintingProtection = (event: React.ChangeEvent<any>) => {
    if (!event.target) {
      return
    }
    this.props.blockFingerprinting(event.target.value)
  }

  onChangeJavaScriptProtection = (event: React.ChangeEvent<any>) => {
    if (!event.target) {
      return
    }
    this.props.blockJavaScript(event.target.value)
  }

  render () {
    const {
      braveShields,
      fingerprinting,
      fingerprintingBlocked,
      javascript,
      javascriptBlocked,
      cookies
    } = this.props
    const enabled = braveShields !== 'block'
    if (!enabled) {
      return null
    }

    return (
      <div id='braveShieldsPrivacyControls'>
        {/* cookies select */}
        <Grid>
          <Stat />{/* TODO: implmenent cookies blocked stat */}
          <SelectBox id='blockCookies' value={cookies} onChange={this.onChangeCookiesProtection}>
            <option value='block_third_party'>{getMessage('block3partyCookies')}</option>
            <option value='block'>{getMessage('blockAllCookies')}</option>
            <option value='allow'>{getMessage('allowAllCookies')}</option>
          </SelectBox>
        </Grid>
        {/* scripts select */}
        <Grid>
          <Stat id='blockScriptsStat'>{javascriptBlocked}</Stat>
          <SelectBox id='blockScripts' value={javascript} onChange={this.onChangeJavaScriptProtection}>
            <option value='block_third_party'>{getMessage('block3partyScripts')}</option>
            <option value='block'>{getMessage('blockAllScripts')}</option>
            <option value='allow'>{getMessage('allowAllScripts')}</option>
          </SelectBox>
        </Grid>
        {/* fingerprinting select */}
        <Grid>
          <Stat id='blockFingerprintingStat'>{fingerprintingBlocked}</Stat>
          <SelectBox id='blockFingerprinting' value={fingerprinting} onChange={this.onChangeFingerprintingProtection}>
            <option value='block_third_party'>{getMessage('block3partyFingerprinting')}</option>
            <option value='block'>{getMessage('blockAllFingerprinting')}</option>
            <option value='allow'>{getMessage('allowAllFingerprinting')}</option>
          </SelectBox>
        </Grid>
      </div>
    )
  }
}
