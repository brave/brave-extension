// /* This Source Code Form is subject to the terms of the Mozilla Public
//  * License, v. 2.0. If a copy of the MPL was not distributed with this file,
//  * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Link, LinkIcon } from 'brave-ui/features/shields'
import { getMessage } from '../../background/api/localeAPI'
import * as tabsAPI from '../../background/api/tabsAPI'

export default class ShieldsFooter extends React.PureComponent<{}, {}> {
  openSettings = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    tabsAPI.createTab({ url: 'chrome://settings' })
      .catch((err) => console.log(err))
  }

  render () {
    return (
      <Link id='braveShieldsFooter' href='#' onClick={this.openSettings}>
        <span>{getMessage('editDefaults')}</span>
        <LinkIcon />
      </Link>
    )
  }
}
