import React from 'react'
import './style.scss'

class Envelope extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      openEnvelopeStatus: null
    }
  }

  flipCard (e) {
    if (!e.currentTarget.classList.contains('hover')) {
      e.currentTarget.classList.toggle('hover')
    }
  }

  openLetter = async e => {
    e.stopPropagation()
    const transitionDuration = 1000
    // Handle the envelope opening status similarly like
    // the provided styles in the CSS. Check the css
    // for more detail.
    this.setState({
      ...this.state,
      openEnvelopeStatus: 'open-cover'
    })
    await new Promise(res => setTimeout(res, transitionDuration))
    this.setState({
      ...this.state,
      openEnvelopeStatus: 'take-out-letter'
    })
    await new Promise(res => setTimeout(res, transitionDuration))
    this.setState({
      ...this.state,
      openEnvelopeStatus: 'show-letter'
    })
  }

  get envelopeClass () {
    switch(this.state.openEnvelopeStatus) {
      case 'open-cover': {
        return `envelope open-cover`
      }
      case 'take-out-letter': {
        return `envelope open-cover take-out-letter`
      }
      case 'show-letter': {
        return `envelope show-letter`
      }
      default: {
        return 'envelope'
      }
    }
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