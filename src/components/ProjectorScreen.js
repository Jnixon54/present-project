import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
// import {setSocketID, setUserID} from '../ducks/userReducer';
import './ProjectorScreen.css'
class ProjectorScreen extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   //Link client ID to projector ID
  //   axios.get(`http://localhost:3001/slide/44/${this.props.currentSlide}`).then(result => {
  //     console.log('Mount: ' + result.data.slide_number)
  //     this.slideURL = result.data.url;
  //   }).catch(console.log)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   axios.get(`http://localhost:3001/slide/44/${this.props.currentSlide}`).then(result => {
  //     console.log('Update: ' + result.data.slide_number)
  //     this.slideURL = result.data.url;
  //   }).catch(console.log)
  // }

  render () {
    // console.log(this.slideURL)
    console.log(this.props.currentSlide);
    const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);    
    return (
      <div className="big-slide">

        { currentSlide ? <img src={currentSlide.url} alt="img" /> : 'Connection Info'}

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