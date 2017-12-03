import React, { Component } from 'react'
import {connect} from 'react-redux';
import { advanceSlide, returnSlide, updatePresentationID} from '../ducks/presentationReducer';

import './PresenterScreen.css';
// import {setSocketID, setUserID} from '../ducks/userReducer';



class PresenterScreen extends Component {

  componentDidMount() {
    this.props.updatePresentationID(this.props.match.params.id)
  }

  render () {
    // console.log(this.props.currentSlide);
    console.log('CURRENT PRES: ' + this.props.currentPresentation)
    const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);
    const nextSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide + 1);
    console.log(this.props.slideArray)
    console.log(typeof currentSlide)
    console.log(nextSlide);
    return (
      <div>
        { this.props.currentPresentation} - 
        { this.props.currentSlide }
        <button onClick={this.props.returnSlide}>
          Previous Slide
        </button>
        <button onClick={this.props.advanceSlide}>
          Next Slide
        </button>
        <div className="slides-container">
          <div className="current-slide">
            { (this.props.currentSlide > 0 && currentSlide) ? <img src={currentSlide.url} alt="current slide" /> : <p>Hello</p>}
          </div>
          <div className="preview-slide">
            { nextSlide ? <img src={nextSlide.url} alt="next slide" /> : <p>Hello</p>}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentSlide: state.presentation.currentSlide,
    currentSlideURL: state.presentation.currentSlideURL,
    currentPresentation: state.presentation.currentPresentation,
    nextSlideURL: state.presentation.nextSlideURL,
    slideArray: state.presentation.slideArray
  }
}

export default connect(mapStateToProps, { advanceSlide, returnSlide, updatePresentationID })(PresenterScreen);