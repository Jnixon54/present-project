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
    console.log(this.props.slideArray)
    const currentSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide);
    const nextSlide = this.props.slideArray.find(item => item.slide_number === this.props.currentSlide + 1);

    const displayCurrentSlide = (this.props.currentSlide > 0 && currentSlide) ? <img src={currentSlide.url} alt="" /> : <div className="slides-container"/>
    const displayNextSlide = nextSlide ? <img src={nextSlide.url} alt="" /> : <p>Hello</p>

    let currentSlideQuestions = [];
    this.props.questions.forEach((question) => { 
      if (question.slideNumber === this.props.currentSlide) {
          currentSlideQuestions.push(question.question)
        }
      }
    )
    currentSlideQuestions = currentSlideQuestions.map((question, index) => {return <p><span>{index}. </span>{question}</p> })
    console.log(currentSlideQuestions)
    return (
      <div>
        <div className="slides-container slide-container">
          <div className="current-slide">
            { displayCurrentSlide }
          </div>
          <div className="preview-slide">
            { displayNextSlide }
            <div className="current-slide-questions">
            { currentSlideQuestions }
            </div>
          </div>
        </div>
        <div className="slideshow-buttons">
          <button onClick={this.props.returnSlide}>
            {'<< '}Previous Slide
          </button>
          <div className="slide-number">
            { this.props.currentSlide }
          </div>
          <button onClick={this.props.advanceSlide}>
            Next Slide >>
          </button>
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
    slideArray: state.presentation.slideArray,
    questions: state.student.questions
  }
}

export default connect(mapStateToProps, { advanceSlide, returnSlide, updatePresentationID })(PresenterScreen);