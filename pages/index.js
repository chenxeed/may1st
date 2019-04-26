import React from 'react'
import LayoutMain from '../layouts/Main'
import Envelope from '../components/envelope'
import Invitation from '../components/invitation'

class Index extends React.Component {

  constructor (props) {
    super()
  }

  render () {
    return (
      <LayoutMain>
        <Envelope
          letter={<Invitation/>}
          recipient="To Ronaldo and Familia"
          />
      </LayoutMain>
    )
  }
}

export default Index