import React from 'react'
import ReactSwipe from 'react-swipe'
import { shuffle } from '../../helper/'
import axios from 'axios'
import './style.scss'

class Invitation extends React.Component {

  photos = [
    'may13.jpg',
    'may6.jpeg',
    'may12.jpg',
    'may4.jpeg',
    'may3.jpeg',
    'may10.jpg',
    'may2.jpeg',
    'may11.jpg',
    'may1.jpeg',
  ]
  animation = [
    'bounce',
    'rubberBand',
    'shake',
    'wobble',
    'tada',
    'swing'
  ]
  tsum2s = ['eeyore', 'daisy', 'tigger', 'stitch', 'cinderella', 'mickey']
  reactSwipeEl = null

  constructor(props) {
    super(props)

    this.state = {
      passcode: props.passcode,
      recipient: props.recipient,
      children: props.children,
      showTsum2: false,
      showPhotoPreview: false,
      canAttend: null,
      submittingAttend: false
    }
  }

  togglePhotoPreview = visible => {
    this.setState({
      ...this.state,
      showPhotoPreview: visible
    })
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      showTsum2: true
    })
  }

  confirmAttend = canAttend => {
    const passcode = this.state.passcode
    this.setState({
      ...this.state,
      submittingAttend: true
    })
    axios.post('/confirm', {
      canAttend,
      passcode
    }).then((response) => {
      this.setState({
        ...this.state,
        canAttend,
        submittingAttend: false
      })
    })
  }

  attendForm () {
    const isSubmitting = this.state.submittingAttend
    const disabled = isSubmitting ? 'disabled' : ''
    const message = isSubmitting
    ? 'Confirming, please wait...'
    : 'Would you be able to attend my birthday party?'
    return <div>
      <p className="h5">{message}</p>
      <button onClick={() => this.confirmAttend(true)} className={"btn btn-block btn-success"} disabled={disabled}>Yes I Can!</button>
      {' '}
      <button onClick={() => this.confirmAttend(false)} className={"btn btn-block btn-secondary"} disabled={disabled}>Sorry, I can't...</button>
    </div>
  }

  attendConfirmed () {
    const msg = this.state.canAttend ? 'See you soon!' : 'So sad you cannot make it..'
    return <div className="attendance">
      <p className="h5">Thank you for confirming! {msg}</p>
      {this.state.canAttend && <img className="bounceIn" src='/static/may3.jpeg' />}
    </div>
  }

  render () {
    return <div className="container-fluid invitation-wrapper pt-3 pb-3">
      <div className="container">
        <div className="row intro">
          <div className="col-md-6 m-auto text-center">
            <h2>You are invited to Maydelyn's party!</h2>
            <div className="turn-to-1">
              <img className="mw-100" src="/static/turn-to-1.png" />
              <div className="tsum2s row">
              { this.state.showTsum2 && shuffle(this.tsum2s).map((tsum2, idx) => {
                return <div
                  key={tsum2}
                  className={`tsum2 col animated infinite ${this.animation[idx % this.animation.length]}`}
                  style={{top: `${(-50 + 50 * Math.sin(Math.PI * (idx+0.5) / this.tsum2s.length))}%`}}>
                  <img src={`/static/tsum2-${tsum2}.png`} />
                </div>
              })}
              </div>
            </div>
            {this.state.children && 
            <h2>Bring {this.state.children} too to have fun!</h2>
            }
          </div>
        </div>
        <div className="row detail justify-content-center align-items-center pt-5">
          <div className="col-6 text-center">
            <p className="lead">
              <span className="h3 font-weight-bold">May 26th 3PM, @ Bakmi GM Puri Mall Jakarta</span>
            </p>
          </div>
          <div className="col-6 photos" onClick={() => this.togglePhotoPreview(true) }>
            { this.photos.map((name, idx) => {
              return <img
                key={name}
                src={`/static/${name}`}
                style={{transform: `rotate(${((this.photos.length/2)*-10) + (idx*10)}deg)`}} />
            })}
          </div>
        </div>
        { this.state.showPhotoPreview &&
        <div className="container-fluid photo-preview">
          <button
            type="button"
            className="btn btn-dark btn-lg close-button"
            onClick={() => this.togglePhotoPreview(false)}>Close</button>
          <div className="container preview-container">
            <ReactSwipe
              className="carousel"
              swipeOptions={{ continuous: true }}
              ref={el => (this.reactSwipeEl = el)}>
              { this.photos.map((name, idx) => {
                return <div className="text-center photo-wrapper" key={name} >
                    <img className="border border-white" src={`/static/${name}`}/>
                  </div>
              })}
            </ReactSwipe>
            <div className="navigation text-center row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-info btn-lg btn-block"
                  onClick={() => this.reactSwipeEl.prev()}>Prev</button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-info btn-lg btn-block"
                  onClick={() => this.reactSwipeEl.next()}>Next</button>
              </div>
            </div>
          </div>
        </div>
        }
        <div className="row justify-content-center">
          <div className="col-sm-8 text-center">
            <h3>Dear {this.state.recipient},</h3>
            {this.state.canAttend === null
            ? this.attendForm()
            : this.attendConfirmed()}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center h4">
            <a href="https://chenxeed.com" className="badge badge-info">
              Made by ChenXeed
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Invitation