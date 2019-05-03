import React from 'react'
import LayoutMain from '../layouts/Main'

class Unauthorized extends React.Component {

  constructor () {
    super()
  }

  render () {
    return (
      <LayoutMain>
        <h1>Sorry you are not permitted to access this page</h1>
      </LayoutMain>
    )
  }
}

export default Unauthorized