import React from 'react'
import PropTypes from 'prop-types'
import { Fish } from './Fish.js'
import { formatPrice, parsePrice } from '../helpers.js'

const EditFishForm = props => {
  const { index, fish: { name, price, isAvailable, desc, image } } = props
  const { deleteFish } = props

  const handleChange = event => {
    const { name, value } = event.currentTarget
    const { fish, index } = props
    const { updateFish } = props

    const updatedFish = {
      ...fish,
      [name]: name === 'price' ? parsePrice(value) : value
    }

    updateFish(index, updatedFish)
  }

  return (
    <form className='fish-edit'>
      <input
        name='name'
        type='text'
        placeholder='Name'
        value={name}
        onChange={handleChange}
      />
      <input
        name='price'
        type='text'
        placeholder='Price'
        value={formatPrice(price)}
        onChange={handleChange}
      />
      <select
        name='isAvailable'
        value={isAvailable ? 'available' : 'unavailable'}
        onChange={handleChange}
      >
        <option value='available'>Fresh</option>
        <option value='unavailable'>Sold Out</option>
      </select>
      <textarea
        name='desc'
        type='text'
        placeholder='Description'
        value={desc}
        onChange={handleChange}
      />
      <input
        name='image'
        type='text'
        placeholder='Image'
        value={image}
        onChange={handleChange}
      />
      <button onClick={() => deleteFish(index)}>Remove Fish</button>
    </form>
  )
}

EditFishForm.propTypes = {
  index: PropTypes.string,
  fish: PropTypes.shape(Fish.propTypes),
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func
}

export { EditFishForm }
