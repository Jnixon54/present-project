import React, { Component } from 'react'
import {connect} from 'react-redux';
import './ProjectorScreen.css'

class ProjectorScreen extends Component {
  render () {
    const slide = this.props.currentSlideURL ? <img src={this.props.currentSlideURL} alt="img" /> : 'Connection Info';
    // const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);
    // const slide = currentSlide ? <img src={currentSlide.url} alt="img" /> : 'Connection Info';
    return (
      <div className="big-slide">
        { slide }
      </div>
    )
  }
}
function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentSlide: state.presentation.currentSlide,
    currentSlideURL: state.presentation.currentSlideURL,
    slideArray: state.presentation.slideArray
  }
}

export default connect(mapStateToProps)(ProjectorScreen);
//Load current slide