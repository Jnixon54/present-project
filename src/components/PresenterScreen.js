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

export default connect(mapStateToProps, { advanceSlide, returnSlide })(PresenterScreen);