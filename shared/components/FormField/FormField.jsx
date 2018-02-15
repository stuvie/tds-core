import React from 'react'
import PropTypes from 'prop-types'
import { childrenOfType } from 'airbnb-prop-types'

import safeRest from '../../../src/utils/safeRest'
import generateId from '../../../src/utils/generateId'

import Box from '../../../packages/Box/Box'
import Flexbox from '../Flexbox/Flexbox'
import Text from '../../../src/components/Typography/Text/Text'
import Paragraph from '../../../src/components/Typography/Paragraph/Paragraph'
import InputFeedback from '../../../packages/InputFeedback/InputFeedback'
import Tooltip from '../../../packages/Tooltip/Tooltip'

import styles from './FormField.modules.scss'
import positionStyles from '../../../src/components/Position.modules.scss'

const getClassName = (feedback, focus, disabled) => {
  if (disabled) {
    return styles.disabled
  }

  if (focus) {
    return styles.focus
  }

  if (feedback) {
    return styles[feedback]
  }

  return styles.default
}

const showFeedbackIcon = (feedback, focus) =>
  (feedback === 'success' || feedback === 'error') && !focus

const renderLabel = (label, hint, fieldId) => {
  return (
    <label htmlFor={fieldId.identity()}>
      <Box inline tag="span" between={2} dangerouslyAddClassName={styles.alignCenter}>
        <Text size="medium" bold>
          {label}
        </Text>
        {hint && <Text size="small">{hint}</Text>}
      </Box>
    </label>
  )
}
const renderError = (error, errorId) => (
  <InputFeedback id={errorId} feedback="error">
    <Paragraph size="small">{error}</Paragraph>
  </InputFeedback>
)

const renderHelper = (helper, helperId, feedback, value) => {
  if (typeof helper === 'function') {
    return (
      <div id={helperId}>
        <Text size="small">{helper(feedback, value)}</Text>
      </div>
    )
  }

  return (
    <InputFeedback id={helperId} feedback={feedback}>
      <Text size="small">{helper}</Text>
    </InputFeedback>
  )
}

class FormField extends React.Component {
  state = {
    value: this.props.value,
    focus: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onChange = event => {
    const { onChange } = this.props

    this.setState({
      value: event.target.value,
    })

    if (onChange) {
      onChange(event)
    }
  }

  onFocus = event => {
    const { onFocus } = this.props

    this.setState({ focus: true })

    if (onFocus) {
      onFocus(event)
    }
  }

  onBlur = event => {
    const { onBlur } = this.props

    this.setState({ focus: false })

    if (onBlur) {
      onBlur(event)
    }
  }

  render() {
    const { label, hint, feedback, error, helper, tooltip, children, ...rest } = this.props

    const fieldId = generateId(rest.id, rest.name, label)
    const helperId = helper && fieldId.postfix('helper')
    const errorId = error && fieldId.postfix('error-message')

    const showIcon = showFeedbackIcon(feedback, this.state.focus)

    return (
      <Box between={2}>
        <Flexbox
          direction="row"
          justifyContent="spaceBetween"
          dangerouslyAddClassName={positionStyles.relative}
        >
          {renderLabel(label, hint, fieldId)}

          {tooltip && React.cloneElement(tooltip, { connectedFieldLabel: label })}
        </Flexbox>

        {helper && renderHelper(helper, helperId, feedback, this.state.value)}

        {error && renderError(error, errorId)}

        {children(
          {
            ...safeRest(rest),
            id: fieldId.identity(),
            className: getClassName(feedback, this.state.focus, rest.disabled),
            value: this.state.value,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            'aria-invalid': feedback === 'error',
            'aria-describedby': errorId || helperId || undefined,
          },
          showIcon,
          feedback
        )}
      </Box>
    )
  }
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  feedback: PropTypes.oneOf(['success', 'error']),
  error: PropTypes.string,
  helper: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tooltip: childrenOfType(Tooltip),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.func.isRequired,
}

FormField.defaultProps = {
  hint: undefined,
  feedback: undefined,
  error: undefined,
  helper: undefined,
  tooltip: undefined,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
}

export default FormField