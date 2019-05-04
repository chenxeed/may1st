import React from 'react'
import LayoutMain from '../layouts/Main'
import Envelope from '../components/envelope'
import Invitation from '../components/invitation'
import { withRouter } from 'next/router'

class Index extends React.Component {

  constructor ({router}) {
    super()
    const passcode = router.query.passcode
    const recipient = router.query.recipient
    const children = router.query.children
    this.state = {
      recipient,
      children,
      passcode
    }
  }

  invitation () {

    return <Invitation
      recipient={ this.state.recipient }
      children={ this.state.children }
      passcode={ this.state.passcode }
    />
  }

  get invitationName () {
    return <div>
      {this.state.recipient}
      <br/>
      {this.state.children && `with ${this.state.children}`}
    </div>
  }

  render () {
    return (
      <LayoutMain>
        <Envelope
          letter={this.invitation()}
          recipient={this.invitationName}
          frontImage="/static/tsum2.png"
          buttonImage="/static/tsum2-cinderella.png"
          />
      </LayoutMain>
    )
  }
}

export default withRouter(Index)