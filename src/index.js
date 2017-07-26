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
    let {onChange, value} = this.props
    if (hours || minutes || period) className += ' ReactInTime--selected'
    return (
      <span className={className}>
        <Hours selected={hours} onChangeSelect={select('hours')} onChange={val => onChange(val)} value={value} />
        <span className='Divider'>:</span>
        <Minutes selected={minutes} onChangeSelect={select('minutes')} onChange={val => onChange(val)} value={value} />
        <Period selected={period} onChangeSelect={select('period')} onChange={val => onChange(val)} value={value} />
      </span>
    )

    function select (thing) {
      return val => self.setState({ [thing]: val })
    }
  }
}

Time.defaultProps = {
  value: new Date(),
  onChange: noop
}

Time.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
}

export default Time
