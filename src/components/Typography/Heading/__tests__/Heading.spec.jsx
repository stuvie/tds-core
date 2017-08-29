import React from 'react'
import { shallow } from 'enzyme'

import Heading from '../Heading'

describe('Heading', () => {
  const doShallow = (overrides = {}) => shallow(
    <Heading {...overrides}>Go home</Heading>
  )

  it('renders text', () => {
    const heading = doShallow()

    expect(heading).toHaveText('Go home')
  })

  it('renders a heading in four sizes', () => {
    let heading = doShallow({ size: 'h1' })
    expect(heading).toHaveTagName('h1')

    heading = doShallow({ size: 'h2' })
    expect(heading).toHaveTagName('h2')

    heading = doShallow({ size: 'h3' })
    expect(heading).toHaveTagName('h3')

    heading = doShallow({ size: 'h4' })
    expect(heading).toHaveTagName('h4')
  })

  it('can invert', () => {
    const heading = doShallow({ invert: true })

    expect(heading).toHaveClassName('inverted')
  })
})