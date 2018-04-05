import React from 'react'
import { mount } from 'enzyme'
import { Col as ReactFlexboxGridCol } from 'react-flexbox-grid'

import FlexGrid from '../../FlexGrid'
import Col from '../Col'

describe('Col', () => {
  const doMount = (props = {}) => {
    const wrapper = mount(
      <FlexGrid>
        <Col {...props}>Some content</Col>)
      </FlexGrid>
    )

    return wrapper.find(ReactFlexboxGridCol)
  }

  it('renders', () => {
    const col = doMount()

    expect(col).toMatchSnapshot()
  })

  it('renders a react-flexbox-grid Col component', () => {
    const col = doMount()

    expect(col).toMatchSelector(ReactFlexboxGridCol)
  })

  it('has auto width by default', () => {
    const col = doMount()

    expect(col).toHaveProp('xs', true)
  })

  it('can span a specified number of columns', () => {
    const col = doMount({ span: 10 })

    expect(col).toHaveProp('xs', 10)
  })

  it('can offset a number of columns', () => {
    const col = doMount({ offset: 2 })

    expect(col).toHaveProp('xsOffset', 2)
  })

  it('does not support responsive offsets', () => {
    const col = doMount({
      xsOffset: 1,
      smOffset: 2,
      mdOffset: 3,
      lgOffset: 4,
      xlOffset: 5,
    })

    expect(col).toHaveProp('xsOffset', 1)
    expect(col).toHaveProp('smOffset', 2)
    expect(col).toHaveProp('mdOffset', 3)
    expect(col).toHaveProp('lgOffset', 4)
    expect(col).toHaveProp('xlOffset', 5)
  })

  it('passes additional attributes to the react-flexbox-grid Col', () => {
    const col = doMount({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(col).toHaveProp('id', 'the-id')
    expect(col).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const col = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(col).not.toHaveProp('className', 'my-custom-class')
    expect(col).not.toHaveProp('style', { color: 'hotpink' })
  })
})
