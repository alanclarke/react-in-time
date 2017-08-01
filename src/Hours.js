import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Digit from './Digit'
import ensureDate from './lib/ensureDate'
import noop from './lib/noop'

class Hours extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: false }
  }
  render () {
    let {value, onChangeSelect, selected, empty} = this.props
    return (
      <Digit
        onKeyDown={e => this.onKeyDown(e)}
        value={empty ? '--' : String(to12Hour(value.getHours()))}
        selected={selected}
        onChangeSelect={val => onChangeSelect(val)}
      />
    )
  }
  onKeyDown (event) {
    if (event.which === 38 || event.which === 40) return this.handleArrows(event)
    let number = Number(event.key)
    if (!isNaN(number)) {
      let newDate = new Date(this.props.value.valueOf())
      let both = Number(String(to12Hour(this.props.value.getHours())) + event.key)
      if (this.props.value.getHours() >= 12) {
        number += 12
      }
      newDate.setHours(
        (isNaN(both) || both > 12)
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
    let hours = newDate.getHours()
    newDate.setHours(event.which === 38 ? hours + 1 : hours - 1)
    ensureDate(newDate, this.props.value)
    onChange(newDate)
  }
}

function to12Hour (hours) {
  return (hours % 12) || 12
}

Hours.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onChangeSelect: PropTypes.func,
  selected: PropTypes.bool,
  empty: PropTypes.bool
}

Hours.defaultProps = {
  value: null,
  onChange: noop,
  onChangeSelect: noop,
  selected: false,
  empty: false
}

export default Hours
