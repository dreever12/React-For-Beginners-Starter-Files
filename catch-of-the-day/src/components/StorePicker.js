import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getFunName } from '../helpers.js'

const StorePicker = props => {
  const [storeName, setStoreName] = useState(getFunName())

  const goToStore = event => {
    const { history } = props
    event.preventDefault()
    history.push(`/store/${storeName}`)
  }

  return (
    <>
      {/* react needs a single element in render returns, so we wrap */}
      {/* babel is converting <> to <React.Fragment>, I think */}
      <h1> fishing time </h1>
      <form className='store-selector' onSubmit={goToStore}>
        <h2> please enter a store </h2>
        <input
          onChange={({ target }) => setStoreName(target.value)}
          type='text'
          required
          placeholder='store name'
          value={storeName}
        />
        <button type='submit'>visit store ↣</button>
      </form>
    </>
  )
}

StorePicker.propTypes = {
  history: PropTypes.object
}

export { StorePicker }
