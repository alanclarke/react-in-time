import React from 'react'
import {render} from 'react-dom'
import '../../styles.css'
import './demo.css'
import Time from '../../src'

function start (val) {
  render(<Time value={val} empty={!val} onChange={start} />, document.querySelector('#demo'))
}

start()
