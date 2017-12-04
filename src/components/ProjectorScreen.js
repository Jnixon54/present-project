import React, { Component } from 'react'
import {connect} from 'react-redux';
import DataScreen from './DataScreen';
import './ProjectorScreen.css'

class ProjectorScreen extends Component {
  render () {
    const slide = this.props.currentSlideURL ? <img src={this.props.currentSlideURL} alt="" /> : <div className="student-link">{'Link: ' + `http://localhost:3000/presentation/${this.props.match.params.id}/student`}</div>;
    // const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);
    // const slide = currentSlide ? <img src={currentSlide.url} alt="img" /> : 'Connection Info';
    console.log('Slide array length', this.props.slideShowLength)
    console.log('current: ', this.props.currentSlideURL)
    return (
      <div className="big-slide">
        { (this.props.currentSlide <= this.props.slideShowLength) || this.props.currentSlideURL ? slide : <DataScreen /> }
      </div>
    )
  }
}
function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentSlide: state.presentation.currentSlide,
    currentSlideURL: state.presentation.currentSlideURL,
    slideArray: state.presentation.slideArray,
    slideShowLength: state.presentation.slideShowLength
  } 
}

export default connect(mapStateToProps)(ProjectorScreen);
//Load current slide