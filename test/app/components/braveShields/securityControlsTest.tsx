/* global describe, it */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'mocha'
import * as React from 'react'
import * as assert from 'assert'
import ShieldsSecurityControls, { Props } from '../../../../app/components/braveShields/securityControls'
import { shallow } from 'enzyme'

const fakeProps: Props = {
  braveShields: 'allow',
  httpsRedirected: 0
}

describe('SecurityControls component', () => {
  const baseComponent = (props: Props) =>
    <ShieldsSecurityControls {...props} />

  it('renders the component', () => {
    const wrapper = shallow(baseComponent(fakeProps))
    const assertion = wrapper.find('#braveShieldsSecurityControls').length === 1
    assert.equal(assertion, true)
  })

  describe('https everywhere', () => {
    it('shows number of https redirected', () => {
      const newProps = Object.assign(fakeProps, { httpsRedirected: 1337 })
      const wrapper = shallow(baseComponent(newProps))
      const assertion = wrapper.find('#httpsRedirectedStat').props().children
      assert.equal(assertion, 1337)
    })
  })
})
