import React from 'react'
import PropTypes from 'prop-types'

import joinClasses from '../../src/utils/joinClassNames'
import { warn } from '../../src/utils/warn'
import safeRest from '../../src/utils/safeRest'

import styles from './Image.modules.scss'
import borderStyles from '../../shared/styles/Borders.modules.scss'

/**
 *
 * <span class="docs--badge__new">new</span> <span class="docs--badge__version">v0.32.0</span>
 */
const Image = ({ src, width, height, alt, rounded, ...rest }) => {
  const isCircle = rounded === 'circle'
  const isSquare = width === height

  const classes = joinClasses(
    styles.fluid,
    rounded === 'corners' && borderStyles.rounded,
    isCircle && borderStyles.circular
  )

  if (isCircle && !isSquare) {
    warn(
      'Image',
      'rounded="circle" is not supported for non-square images. Please provide a square image, otherwise the resulting shape will not be a circle.'
    )
  }

  return (
    <img
      {...safeRest(rest)}
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={classes}
    />
  )
}

Image.propTypes = {
  /**
   * The src attribute for the HTML img element.
   */
  src: PropTypes.string.isRequired,
  /**
   * The alt attribute for the HTML img element. Setting this attribute to an empty string (alt="") indicates that this image is not a key part of the content, and that non-visual browsers may omit it from rendering.
   */
  alt: PropTypes.string.isRequired,
  /**
   * The image's width.
   */
  width: PropTypes.number.isRequired,
  /**
   * The image's height.
   */
  height: PropTypes.number.isRequired,
  /**
   * Apply rounding.
   */
  rounded: PropTypes.oneOf(['circle', 'corners']),
}

Image.defaultProps = {
  rounded: undefined,
}

export default Image
