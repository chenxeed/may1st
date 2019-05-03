import React from 'react'
import LayoutMain from '../layouts/Main'
import Envelope from '../components/envelope'
import Invitation from '../components/invitation'
import { withRouter } from 'next/router'

class Index extends React.Component {

  constructor ({router}) {
    super()
    this.state = {
      recipient: router.query.recipient
    }
  }

  render () {
    return (
      <LayoutMain>
        <Envelope
          letter={<Invitation/>}
          recipient={this.state.recipient}
          frontImage="/static/tsum2.png"
          frontImage="/static/tsum2.png"
          />
      </LayoutMain>
    )
  }
}

export default withRouter(Index)