# react-in-time
A keyboard friendly react component for capturing time

## features
- small UI surface area (just a form input)
- keyboard friendly
- simple UX (can use arrows, tabs or type time)
- simple api (accepts a date object and supplies an onChange handler)
- no dependencies
- 100% test coverage
- es6 (supports tree shaking)

## installation
`npm install --save react-in-time`

## usage
```js
var ReactDom = require('ReactDom')
var Time = require('react-in-time')

function render (date) {
  ReactDom.render((
    <Time value={date} onChange={render} />
  ), document.body)
}
```

## styles
see styles.css

## run tests
`npm test`

## demo
`npm start`

![demo](./demo.gif)
