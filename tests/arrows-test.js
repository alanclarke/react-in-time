import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import events from 'simulant'
import keycode from 'keycode'
import Time from 'src/'
import sinon from 'sinon'

describe('Arrows', () => {
  let node, date, digits, inputs, hourInput, minuteInput, periodInput, onChange

  beforeEach(() => {
    onChange = sinon.stub()
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    node = document.createElement('div')
    document.body.appendChild(node)
    render(<Time value={date} onChange={onChange} />, node, () => {
      digits = [].slice.call(node.querySelectorAll('.ReactInTime-Digit'))
      inputs = digits.map(digit => digit.querySelectorAll('input')[0])
      ;[hourInput, minuteInput, periodInput] = inputs
    })
  })

  afterEach(() => {
    document.body.removeChild(node)
    unmountComponentAtNode(node)
  })

  it('should increment hours when up arrow is pressed', () => {
    events.fire(hourInput, 'keydown', { keyCode: keycode('up') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 19:15:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should decrement hours when down arrow is pressed', () => {
    events.fire(hourInput, 'keydown', { keyCode: keycode('down') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 17:15:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should cycle hours when up arrow is pressed and time is 23', () => {
    date = new Date('Thu Jul 27 2017 23:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { keyCode: keycode('up') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 00:15:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should cycle hours when down arrow is pressed and time is 00', () => {
    date = new Date('Thu Jul 27 2017 00:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { keyCode: keycode('down') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 23:15:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should increment minutes when up arrow is pressed', () => {
    events.fire(minuteInput, 'keydown', { keyCode: keycode('up') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 18:16:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should decrement minutes when down arrow is pressed', () => {
    events.fire(minuteInput, 'keydown', { keyCode: keycode('down') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 18:14:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should cycle minutes when up arrow is pressed and time is 59', () => {
    date = new Date('Thu Jul 27 2017 18:59:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(minuteInput, 'keydown', { keyCode: keycode('up') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 19:00:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should cycle minutes when down arrow is pressed and time is 00', () => {
    date = new Date('Thu Jul 27 2017 18:00:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(minuteInput, 'keydown', { keyCode: keycode('down') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 17:59:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should toggle period when up arrow is pressed', () => {
    events.fire(periodInput, 'keydown', { keyCode: keycode('up') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 06:15:26 GMT+0100 (BST)'))).toEqual(true)
  })

  it('should toggle period when down arrow is pressed', () => {
    events.fire(periodInput, 'keydown', { keyCode: keycode('down') })
    expect(onChange.calledWith(new Date('Thu Jul 27 2017 06:15:26 GMT+0100 (BST)'))).toEqual(true)
  })
})
