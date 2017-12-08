import React from 'react'
import PropTypes from 'prop-types'
import { Subscriber } from 'react-broadcast'

import { Row as ReactFlexboxGridRow } from 'react-flexbox-grid'

import safeRest from '../../utils/safeRest'

const Row = ({ children, ...rest }) => (
  <Subscriber channel="gutterless">
    {gutterless => {
      return (
        <ReactFlexboxGridRow {...safeRest(rest)} style={gutterless}>
          {children}
        </ReactFlexboxGridRow>
      )
    }}
  </Subscriber>
)

Row.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Row