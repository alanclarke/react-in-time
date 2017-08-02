import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import events from 'simulant'
import keycode from 'keycode'

import Time from 'src/'

describe('Selection', () => {
  let node, date, digits, hours, minutes, period, inputs, hourInput, minuteInput, periodInput

  beforeEach(() => {
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    node = document.createElement('div')
    document.body.appendChild(node)
    render(<Time value={date} />, node, () => {
      digits = [].slice.call(node.querySelectorAll('.ReactInTime-digit'))
      ;[hours, minutes, period] = digits
      inputs = digits.map(digit => digit.querySelectorAll('input')[0])
      ;[hourInput, minuteInput, periodInput] = inputs
    })
  })

  afterEach(() => {
    document.body.removeChild(node)
    unmountComponentAtNode(node)
  })

  it('should select digit when input is focused', () => {
    events.fire(hours, 'click')
    expect(hours.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
    expect(minutes.className).toEqual('ReactInTime-digit')
    expect(period.className).toEqual('ReactInTime-digit')
  })

  it('should select digit when minute input is focused', () => {
    events.fire(minutes, 'click')
    expect(hours.className).toEqual('ReactInTime-digit')
    expect(minutes.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
    expect(period.className).toEqual('ReactInTime-digit')
  })

  it('should select digit when period input is focused', () => {
    events.fire(period, 'click')
    expect(hours.className).toEqual('ReactInTime-digit')
    expect(minutes.className).toEqual('ReactInTime-digit')
    expect(period.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
  })

  it('should unselect other digits on select', () => {
    events.fire(hours, 'click')
    events.fire(minutes, 'click')
    expect(hours.className).toEqual('ReactInTime-digit')
    events.fire(period, 'click')
    expect(minutes.className).toEqual('ReactInTime-digit')
    events.fire(hours, 'click')
    expect(period.className).toEqual('ReactInTime-digit')
  })

  it('should select next input when right arrow is pressed', () => {
    events.fire(hours, 'click')
    events.fire(hourInput, 'keydown', { keyCode: keycode('right') })
    expect(minutes.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
    events.fire(minuteInput, 'keydown', { keyCode: keycode('right') })
    expect(period.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
  })

  it('should select previous input when right arrow is pressed', () => {
    events.fire(period, 'click')
    events.fire(periodInput, 'keydown', { keyCode: keycode('left') })
    expect(minutes.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
    events.fire(minuteInput, 'keydown', { keyCode: keycode('left') })
    expect(hours.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
  })

  it('should do nothing when left arrow is pressed on first input', () => {
    events.fire(hours, 'click')
    events.fire(hourInput, 'keydown', { keyCode: keycode('left') })
    expect(hours.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
  })

  it('should do nothing when right arrow is pressed on last input', () => {
    events.fire(period, 'click')
    events.fire(periodInput, 'keydown', { keyCode: keycode('right') })
    expect(period.className).toEqual('ReactInTime-digit ReactInTime-digit--selected')
  })

  it('should unselect if escape key is pressed', () => {
    events.fire(period, 'click')
    events.fire(periodInput, 'keydown', { keyCode: keycode('escape') })
    expect(period.className).toEqual('ReactInTime-digit')
  })

  it('should select time input if any digit is selected', () => {
    events.fire(hourInput, 'click')
    expect(node.firstChild.className).toEqual('ReactInTime ReactInTime--selected')
    events.fire(minuteInput, 'click')
    expect(node.firstChild.className).toEqual('ReactInTime ReactInTime--selected')
    events.fire(periodInput, 'click')
    expect(node.firstChild.className).toEqual('ReactInTime ReactInTime--selected')
  })
})
