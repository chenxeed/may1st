import React from 'react'
import LayoutMain from '../layouts/Main'
import Envelope from '../components/envelope'

class Index extends React.Component {

  constructor (props) {
    super()
  }

  render () {
    return (
      <LayoutMain>
        <Envelope>
          Please come to my party yeah
        </Envelope>
      </LayoutMain>
    )
  }
}

export default Index