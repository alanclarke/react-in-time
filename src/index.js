import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Period from './Period'
import Hours from './Hours'
import Minutes from './Minutes'
import noop from './lib/noop'

class Time extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    let self = this
    let className = 'ReactInTime'
    let {hours, minutes, period} = this.state
    let {onChange, value, empty} = this.props
    value = value || new Date()
    if (hours || minutes || period) className += ' ReactInTime--selected'
    return (
      <span className={className}>
        <Hours selected={hours} onChangeSelect={select('hours')} onChange={val => onChange(val)} value={value} empty={empty} />
        <span className='ReactInTime-divider'>:</span>
        <Minutes selected={minutes} onChangeSelect={select('minutes')} onChange={val => onChange(val)} value={value} empty={empty} />
        <Period selected={period} onChangeSelect={select('period')} onChange={val => onChange(val)} value={value} empty={empty} />
      </span>
    )

    function select (thing) {
      return val => self.setState({ [thing]: val })
    }
  }
}

Time.defaultProps = {
  onChange: noop,
  empty: false
}

Time.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  empty: PropTypes.bool
}

export default Time
