import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Time from 'src/'

describe('Render', () => {
  let node, date, inputs, hours, minutes, period

  beforeEach((done) => {
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    node = document.createElement('div')
    render(<Time value={date} />, node, () => {
      inputs = [].slice.call(node.querySelectorAll('input'))
      ;[hours, minutes, period] = (inputs.map(input => input.value))
      done()
    })
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('should render three inputs', () => {
    expect(inputs.length).toEqual(3)
  })

  it('should render the correct hour', () => {
    expect(hours).toEqual('6')
  })

  it('should render the correct minutes', () => {
    expect(minutes).toEqual('15')
  })

  it('should render the correct period', () => {
    expect(period).toEqual('PM')
  })
})
