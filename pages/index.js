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
          recipient="Ronaldo and Familia"
          frontImage="/static/tsum2.png"
          frontImage="/static/tsum2.png"
          />
      </LayoutMain>
    )
  }
}

export default Index