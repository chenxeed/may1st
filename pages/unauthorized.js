import React from 'react'
import LayoutMain from '../layouts/Main'
import Envelope from '../components/envelope'

class Unauthorized extends React.Component {

  constructor () {
    super()
  }

  message () {
    return <div className="h-100 row align-items-center">
        <div className="col text-center">
          <h1>Sorry, you are not allowed to access this page</h1>
        </div>
      </div>
  }

  render () {
    return (
      <LayoutMain>
        <Envelope
          letter={this.message()}
          frontImage="/static/tsum2.png"
          frontImage="/static/tsum2.png"
          />
      </LayoutMain>
    )
  }
}

export default Unauthorized