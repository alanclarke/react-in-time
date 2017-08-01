import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Digit from './Digit'
import noop from './lib/noop'
import ensureDate from './lib/ensureDate'

class Period extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: false }
  }
  render () {
    let {value, onChangeSelect, selected, empty} = this.props
    return (
      <Digit
        onKeyDown={e => this.onKeyDown(e)}
        value={empty ? '--' : parseValue(value)}
        selected={selected}
        onChangeSelect={val => onChangeSelect(val)}
      />
    )
  }
  onKeyDown (event) {
    let value = parseValue(this.props.value)
    if (event.which === 38 || event.which === 40) return this.toggle()
    if (/^a$/i.test(event.key) && value !== 'AM') return this.toggle()
    if (/^p$/i.test(event.key) && value !== 'PM') return this.toggle()
  }
  toggle () {
    let {value, onChange} = this.props
    let newDate = new Date(value.valueOf())
    newDate.setHours(
      parseValue(value) === 'PM'
        ? newDate.getHours() - 12
        : newDate.getHours() + 12
    )
    ensureDate(newDate, this.props.value)
    onChange(newDate)
  }
}

Period.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onChangeSelect: PropTypes.func,
  selected: PropTypes.bool,
  empty: PropTypes.bool
}

Period.defaultProps = {
  value: 'PM',
  onChange: noop,
  onChangeSelect: noop,
  selected: false,
  empty: false
}

export default Period

function parseValue (date) {
  return date.getHours() < 12 ? 'AM' : 'PM'
}
