/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
import * as React from 'react'
import { Stat, GridLabel } from 'brave-ui/features/shields'
import { BlockOptions } from '../../types/other/blockTypes'
import { getMessage } from '../../background/api/localeAPI'

export interface Props {
  braveShields: BlockOptions
  httpsRedirected: number
}

export default class ShieldsSecurityControls extends React.PureComponent<Props, {}> {
  render () {
    const { braveShields, httpsRedirected } = this.props
    const enabled = braveShields !== 'block'
    if (!enabled) {
      return null
    }
    return (
      <div id='braveShieldsSecurityControls'>
        {/* pishing toggle
        <GridLabel>
          <Stat />
          {getMessage('blockPishing')}
        </GridLabel> */}
        {/* connections encrypted toggle */}
        <GridLabel>
          <Stat id='httpsRedirectedStat'>{httpsRedirected}</Stat>
          {getMessage('connectionsEncrypted')}
        </GridLabel>
      </div>
    )
  }
}
