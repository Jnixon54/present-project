import React, { Component } from 'react'
import {connect} from 'react-redux';
// import {setSocketID, setUserID} from '../ducks/userReducer';

class ProjectorScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Link client ID to projector ID
  }

  render () {
    console.log(this.props.currentSlide);
    return (
      <div>
        { this.props.currentSlide }
      </div>
    )
  }
}

function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentSlide: state.presentation.currentSlide
  }
}

export default connect(mapStateToProps)(ProjectorScreen);
//Load current slide