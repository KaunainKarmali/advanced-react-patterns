// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(args))
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  function getTogglerProps({onClick, ...rest} = {}) {
    return {
      'aria-pressed': on, 
      onClick: callAll(toggle, onClick), 
      ...rest
    }
  }

  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...getTogglerProps()} />
      <hr />
      <button
        aria-label="custom-button"
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
