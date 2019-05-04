import React from 'react'
import './style.scss'

class Envelope extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      openEnvelope: false
    }
  }

  flipCard (e) {
    if (!e.currentTarget.classList.contains('hover')) {
      e.currentTarget.classList.toggle('hover')
    }
  }

  openLetter = e => {
    e.stopPropagation()
    this.setState({
      ...this.state,
      openEnvelope: true
    })
  }

  get envelopeClass () {
    return `envelope ${this.state.openEnvelope ? 'open' : ''}`
  }

  render () {
    return (
      <div className="flip-container" onClick={ this.flipCard }>
        <div className="flipper">
          <div className="front">
            <div className={this.envelopeClass}>
              <div className="cover-front">
                <div className="recipient h-100 h3 text-white m-auto">
                  <span className="badge badge-light">{this.props.recipient}</span>
                </div>
                <div className="image h-100 m-auto">
                  <img src={this.props.frontImage} />
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <div className={this.envelopeClass}>
              <div className="flip" onClick={this.openLetter}>
                <div className="flip-paper"></div>
                <div className="flip-image text-center">
                  <img src={this.props.buttonImage}/>
                </div>
              </div>
              <div className="cover-back" onClick={this.openLetter}></div>
              <div className="letter">
                {this.props.letter}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Envelope