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
    return <div className="container-fluid invitation-wrapper pt-3 pb-3">
      <div className="container">
        <div className="row intro">
          <div className="col-sm-4 m-auto text-center">
            <h4>You are invited</h4>
            <h1>Maydelyn is Turning</h1>
            <div>
              <img className="w-100" src="/static/turn-to-1.png" />
            </div>
          </div>
        </div>
        <div className="row detail">
          <div className="col-sm-4 ml-auto text-center">
            <p className="lead">
              <span className="h2 font-weight-bold">May 26th 3PM</span>
            </p>
            
          </div>
          <div className="col-sm-4 mr-auto text-center">
            <p className="h2 font-weight-bold">
              Bakmi GM Puri Mall, Jakarta
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-4 w-50 mb-5 photos" onClick={() => this.togglePhotoPreview(true) }>
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
        <div className="row">
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">RSVP</h5>
                <p className="card-text">Would you be able to attend my birthday party?</p>
                <a href="#" className="btn btn-success">Yes</a>
                {' '}
                <a href="#" className="btn btn-secondary">No</a>
              </div>
            </div>
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