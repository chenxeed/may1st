import React from 'react'
import ReactSwipe from 'react-swipe'
import './style.scss'

class Invitation extends React.Component {

  photos = ['may1.jpeg', 'may2.jpeg', 'may3.jpeg', 'may4.jpeg']
  reactSwipeEl = null

  constructor(props) {
    super(props)

    this.state = {
      showPhotoPreview: false
    }
  }

  togglePhotoPreview = visible => {
    this.setState({
      ...this.state,
      showPhotoPreview: visible
    })
  }

  render () {
    return <div className="container-fluid invitation-wrapper">
      <div className="row intro">
        <div className="col text-center">
          <h4>You are invited</h4>
          <h1>Maydelyn is Turning</h1>
          <div>
            <img className="w-100" src="/static/turn-to-1.png" />
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center detail">
        <div className="col-sm-4 ml-auto text-center">
          <p className="lead">
            <span className="h4 font-weight-bold">May</span>
            <br/>
            <span className="h2 font-weight-bold">26th</span>
            <br/>
            <span className="h4 font-weight-bold">3PM</span>
          </p>
          
        </div>
        <div className="col-sm-4 mr-auto text-center">
          <p className="h3">
            <img className="w-50" src="/static/bakmi-gm.png" />
            <br/>
            Bakmi GM Puri Mall, Jakarta
          </p>
        </div>
      </div>
      <div className="row text-center">
        <h2 className="col">Her Gallery</h2>
      </div>
      <div className="row">
        <div className="col w-50 mb-5 photos" onClick={() => this.togglePhotoPreview(true) }>
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
          className="btn btn-dark close-button"
          onClick={() => this.togglePhotoPreview(false)}>Close</button>
        <div className="container preview-container">
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: true }}
            ref={el => (this.reactSwipeEl = el)}>
            { this.photos.map((name, idx) => {
              return <img
                className="border border-white"
                key={name}
                src={`/static/${name}`}/>
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
    </div>
  }
}

export default Invitation