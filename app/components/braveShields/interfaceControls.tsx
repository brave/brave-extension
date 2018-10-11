/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Toggle, Stat, GridLabel } from 'brave-ui/features/shields'
import { getMessage } from '../../background/api/localeAPI'
import * as shieldActions from '../../types/actions/shieldsPanelActions'
import { BlockOptions } from '../../types/other/blockTypes'
import { totalAdsTrackersBlocked } from '../../helpers/shieldsUtils'

export interface Props {
  braveShields: BlockOptions
  blockAdsTrackers: shieldActions.BlockAdsTrackers
  adsBlocked: number
  ads: BlockOptions
  trackers: BlockOptions
  trackersBlocked: number
}

export default class ShieldsInterfaceControls extends React.PureComponent<Props, {}> {
  get totalAdsTrackersBlocked (): number {
    const { adsBlocked, trackersBlocked } = this.props
    return totalAdsTrackersBlocked(adsBlocked, trackersBlocked)
  }

  onChangeBlockAds = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) {
      return
    }
    const shoudEnableAdsTracks = event.target.checked ? 'allow' : 'block'
    this.props.blockAdsTrackers(shoudEnableAdsTracks)
  }

  onChangeBlockPopups = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    // TODO
  }

  onChangeBlockImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    // TODO
  }

  render () {
    const { braveShields, ads, trackers } = this.props
    const enabled = braveShields !== 'block'
    const blockAdsOption = ads !== 'allow' && trackers !== 'allow'
    if (!enabled) {
      return null
    }

    return (
      <div id='braveShieldsInterfaceControls'>
        {/* ads toggle */}
        <GridLabel>
          <Stat id='blockAdsStat'>{this.totalAdsTrackersBlocked}</Stat>
          <span>{getMessage('blockAds')}</span>
        <Toggle id='blockAds' checked={blockAdsOption} onChange={this.onChangeBlockAds} />
        </GridLabel>
        {/* popups toggle
        <GridLabel>
          <Stat>TBD</Stat>
          <span>{getMessage('blockPopups')}</span>
          <Toggle id='blockPopups' checked={false} onChange={this.onChangeBlockPopups} />
        </GridLabel> */}
        {/* image toggle
        <GridLabel>
        <Stat>TBD</Stat>
          <span>{getMessage('blockImages')}</span>
          <Toggle id='blockImages' checked={false} onChange={this.onChangeBlockImages} />
        </GridLabel> */}
      </div>
    )
  }
}
