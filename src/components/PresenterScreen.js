import React, { Component } from 'react'
import {connect} from 'react-redux';
import { advanceSlide, returnSlide } from '../ducks/presentationReducer';
// import {setSocketID, setUserID} from '../ducks/userReducer';

class PresenterScreen extends Component {
  render () {
    console.log(this.props.currentSlide);
    return (
      <div>
        { this.props.currentSlide }
        <button onClick={this.props.returnSlide}>
          Previous Slide
        </button>
        <button onClick={this.props.advanceSlide}>
          Next Slide
        </button>
        <a href="http://localhost:3000/presenter">LINK</a>
        <img src={this.props.currentSlideURL} alt="current slide"/>
      </div>
    )
  }
}

function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentSlide: state.presentation.currentSlide,
    currentSlideURL: state.presentation.currentSlideURL
  }
}

export default connect(mapStateToProps, { advanceSlide, returnSlide })(PresenterScreen);