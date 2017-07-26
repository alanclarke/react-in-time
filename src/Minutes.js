import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Digit from './Digit'
import ensureDate from './lib/ensureDate'
import noop from './lib/noop'

class Minutes extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: false }
  }
  render () {
    return (
      <Digit
        value={format(this.props.value)}
        onKeyDown={e => this.onKeyDown(e)}
        selected={this.props.selected}
        onChangeSelect={val => this.props.onChangeSelect(val)}
      />
    )
  }
  onKeyDown (event) {
    if (event.which === 38 || event.which === 40) return this.handleArrows(event)
    let number = Number(event.key)
    if (!isNaN(number)) {
      let newDate = new Date(this.props.value.valueOf())
      let both = Number(String(this.props.value.getMinutes()) + event.key)
      newDate.setMinutes(
        (isNaN(both) || both > 59)
          ? number
          : both
      )
      ensureDate(newDate, this.props.value)
      this.props.onChange(newDate)
    }
  }
  handleArrows (event) {
    event.preventDefault()
    let {onChange, value} = this.props
    let newDate = new Date(value.valueOf())
    let minutes = newDate.getMinutes()
    newDate.setMinutes(event.which === 38 ? minutes + 1 : minutes - 1)
    ensureDate(newDate, this.props.value)
    onChange(newDate)
  }
}

Minutes.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onChangeSelect: PropTypes.func,
  selected: PropTypes.bool
}

Minutes.defaultProps = {
  value: null,
  onChange: noop,
  onChangeSelect: noop,
  selected: false
}

function format (date) {
  let minutes = date.getMinutes() % 60
  return leftPad(String(minutes), '0', 2)
}

function leftPad (thing, value, length) {
  while (thing.length < length) thing = value + thing
  return thing
}

export default Minutes
