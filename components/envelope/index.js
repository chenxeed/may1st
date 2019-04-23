import React from 'react'
import './style.scss'

class Envelope extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      openEnvelope: false,
      showLetter: false
    }
  }

  openLetter = () => {
    this.setState({
      ...this.state,
      openEnvelope: true
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        showLetter: true
      })
    }, 1000)
  }

  get flipClass () {
    return `flip ${this.state.openEnvelope ? 'open' : ''}`
  }

  get letterClass () {
    return `letter ${this.state.showLetter ? 'open' : ''}`
  }


  render () {
    return (
      <div className="invitation">
        <div className="envelope" onClick={this.openLetter}>
          <div className={this.letterClass}>
            {this.props.children}
          </div>
          <div className={this.flipClass}></div>
          <div className="cover"></div>
        </div>
      </div>
    )
  }
}

export default Envelope