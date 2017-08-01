import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import events from 'simulant'
import keycode from 'keycode'
import Time from 'src/'
import sinon from 'sinon'

describe('Input', () => {
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

  it('should receive a valid hour input', () => {
    events.fire(hourInput, 'keydown', { which: keycode('1'), keyCode: keycode('1'), key: '1' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 13:15:26 GMT+0100 (BST)'))
  })

  it('should append a subsequent valid hour input', () => {
    date = new Date('Thu Jul 27 2017 13:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { which: keycode('2'), keyCode: keycode('2'), key: '2' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 12:15:26 GMT+0100 (BST)'))
  })

  it('should replace if appending leads to an invalid hour input', () => {
    date = new Date('Thu Jul 27 2017 16:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { which: keycode('1'), keyCode: keycode('1'), key: '1' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 13:15:26 GMT+0100 (BST)'))
  })

  it('should stay in the same period when changing hours', () => {
    date = new Date('Thu Jul 27 2017 01:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { which: keycode('1'), keyCode: keycode('1'), key: '1' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 11:15:26 GMT+0100 (BST)'))
  })

  it('should ignore non numbers typed into the hour input', () => {
    date = new Date('Thu Jul 27 2017 12:59:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(hourInput, 'keydown', { which: keycode('a'), keyCode: keycode('a'), key: 'a' })
    expect(onChange.called).toEqual(false)
  })

  it('should receive a valid minute input', () => {
    events.fire(minuteInput, 'keydown', { which: keycode('1'), keyCode: keycode('1'), key: '1' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 18:01:26 GMT+0100 (BST)'))
  })

  it('should append a subsequent valid minute input', () => {
    date = new Date('Thu Jul 27 2017 18:01:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(minuteInput, 'keydown', { which: keycode('2'), keyCode: keycode('2'), key: '2' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 18:12:26 GMT+0100 (BST)'))
  })

  it('should replace if appending leads to an invalid minute input', () => {
    date = new Date('Thu Jul 27 2017 18:09:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(minuteInput, 'keydown', { which: keycode('1'), keyCode: keycode('1'), key: '1' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 18:01:26 GMT+0100 (BST)'))
  })

  it('should ignore non numbers typed into the minute input', () => {
    date = new Date('Thu Jul 27 2017 12:59:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(minuteInput, 'keydown', { which: keycode('a'), keyCode: keycode('a'), key: 'a' })
    expect(onChange.called).toEqual(false)
  })

  it('should switch to pm if the user presses p', () => {
    date = new Date('Thu Jul 27 2017 06:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(periodInput, 'keydown', { which: keycode('p'), keyCode: keycode('p'), key: 'p' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)'))
  })

  it('should not switch if the user presses p and it is already pm', () => {
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(periodInput, 'keydown', { which: keycode('p'), keyCode: keycode('p'), key: 'p' })
    expect(onChange.called).toEqual(false)
  })

  it('should switch to am if the user presses a', () => {
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(periodInput, 'keydown', { which: keycode('a'), keyCode: keycode('a'), key: 'a' })
    expect(onChange.getCall(0).args[0]).toEqual(new Date('Thu Jul 27 2017 06:15:26 GMT+0100 (BST)'))
  })

  it('should not switch if the user presses a and it is already am', () => {
    date = new Date('Thu Jul 27 2017 06:15:26 GMT+0100 (BST)')
    render(<Time value={date} onChange={onChange} />, node, () => {})
    events.fire(periodInput, 'keydown', { which: keycode('a'), keyCode: keycode('a'), key: 'a' })
    expect(onChange.called).toEqual(false)
  })

  it('should not error if no onChange handler or date is passed in', () => {
    date = new Date('Thu Jul 27 2017 18:15:26 GMT+0100 (BST)')
    render(<Time />, node, () => {})
    render(<Time value={date} />, node, () => {})
    events.fire(periodInput, 'keydown', { which: keycode('a'), keyCode: keycode('a'), key: 'a' })
  })
})
