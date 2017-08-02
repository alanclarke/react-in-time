import React, {Component} from 'react'
import PropTypes from 'prop-types'
import noop from './lib/noop'

class Digit extends Component {
  render () {
    let className = 'ReactInTime-digit'
    if (this.props.selected) className += ' ReactInTime-digit--selected'
    return (
      <span className={className} onClick={e => this.onClick(e)}>
        <label className='ReactInTime-digitLabel'>{this.props.value}</label>
        <input
          ref={(input) => { this.input = input }}
          style={{opactiy: 0, width: 0, margin: 0, height: 0, padding: 0, border: 'none'}}
          onKeyDown={e => this.onKeyDown(e)}
          onChange={noop}
          onFocus={() => this.onSelect()}
          onBlur={() => this.onDeselect()}
          value={this.props.value} />
      </span>
    )
  }
  onClick (event) {
    this.input.focus()
  }
  onKeyDown (event) {
    if (event.which === 37 || event.which === 39) {
      let tabbables = this.input.parentElement.parentElement.querySelectorAll('input')
      let currentIndex = indexOf(tabbables, this.input)
      if (event.which === 37 && currentIndex > 0) return tabbables[currentIndex - 1].focus()
      if (event.which === 39 && currentIndex < (tabbables.length - 1)) return tabbables[currentIndex + 1].focus()
    }
    if (event.which === 27) return this.input.blur()
    this.props.onKeyDown(event)
  }
  onSelect () {
    this.props.onChangeSelect(true)
  }
  onDeselect () {
    this.props.onChangeSelect(false)
  }
}

Digit.propTypes = {
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChangeSelect: PropTypes.func,
  selected: PropTypes.bool
}

Digit.defaultProps = {
  value: null,
  onKeyDown: noop,
  onChangeSelect: noop,
  selected: false
}

export default Digit

function indexOf (arr, thing) {
  for (let i = 0; i < arr.length; i++) if (thing === arr[i]) return i
}
