import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../styles.css'
import './demo.css'

import Example from '../../src'

let date = new Date()

class Demo extends Component {
  render () {
    return (
      <div>
        <Example value={this.props.value} onChange={start} />
      </div>
    )
  }
}

function start (val) {
  render(<Demo value={val} />, document.querySelector('#demo'))
}

start(date)
