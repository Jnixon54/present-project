import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {setSocketID, setUserID} from '../ducks/userReducer';
import DataScreen from './DataScreen';

import './StudentScreen.css';

import { updateInput, submitQuestion } from '../ducks/studentReducer'

class StudentScreen extends Component {

  // componentDidMount() {
  //   const slide = this.props.currentSlideURL;
  // }
  
  _onSubmit(e) {
    e.preventDefault();
    this.props.submitQuestion();
  }

  render () {
    const slide = this.props.currentSlideURL ? <img src={this.props.currentSlideURL} alt="img" /> : 'Connection Info';
    // const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);
    // const slide = currentSlide ? <img src={currentSlide.url} alt="img" /> : 'Connection Info';
    const slideShowMarkup = 
      <div>
        <div className="big-slide">
          { slide }
        </div>
        <div className="outer">
          <div className="student-toolbar">
            <form>
              <div className="student-input" >
                <input type="text" value={this.props.questionInputValue} onChange={e => {this.props.updateInput(e.target.value)}} placeholder="Ask a question" />
              </div>
              <div className="student-submit" >
                <input type="submit" value="Ask!" onClick={e => this._onSubmit(e)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    return (
      <div>
        {(this.props.currentSlide <= this.props.slideShowLength) || this.props.currentSlideURL ? slideShowMarkup : 
          <div className="big-slide">
            <DataScreen />
          </div>}
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
    questionInputValue: state.student.questionInputValue
  }
}

export default connect(mapStateToProps, { updateInput, submitQuestion })(StudentScreen);
//Load current slide