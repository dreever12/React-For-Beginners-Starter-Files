import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header.js'
import { Inventory } from './Inventory.js'
import { Order } from './Order.js'
import { Fish } from './Fish.js'
import sampleFishes from '../sample-fishes.js'
import base from '../base.js'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  storeId () {
    const {
      match: {
        params: { storeId }
      }
    } = this.props
    return storeId
  }

  componentDidMount () {
    const storeId = this.storeId()
    const order = localStorage.getItem(storeId)
    if (order) this.setState({ order: JSON.parse(order) })

    this.baseRef = base.syncState(`${storeId}/fishes/`, {
      context: this,
      state: `fishes`
    })
  }

  componentDidUpdate () {
    const storeId = this.storeId()
    const { order } = this.state
    localStorage.setItem(storeId, JSON.stringify(order))
  }

  componentWillUnmount () {
    base.removeBinding(this.baseRef)
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes }
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes })
  }

  deleteFish = index => {
    const fishes = { ...this.state.fishes }
    fishes[index] = null // we do this because of firebase
    this.setState({ fishes })
  }

  updateFish = (index, fish) => {
    const fishes = { ...this.state.fishes }
    fishes[index] = fish
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = ({ key }) => {
    const { order } = this.state
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = index => {
    const order = { ...this.state.order }
    delete order[index] // TODO: check against localStorage?
    this.setState({ order })
  }

  render () {
    const { fishes, order } = this.state
    const { storeId } = this.props.match.params
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='probably safe to eat' />
          <ul className='fishes'>
            {Object.keys(fishes).map(name => (
              <Fish
                key={name}
                index={name}
                addToOrder={this.addToOrder}
                {...fishes[name]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={fishes}
          storeId={storeId}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      storeId: PropTypes.string.isRequired
    })
  })
}

export { App }
