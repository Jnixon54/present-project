import React, { Component } from 'react'
import {connect} from 'react-redux';
// import { advanceSlide, returnSlide } from '../ducks/presentationReducer';
import {Link} from 'react-router-dom';
import { getCurrentPresentationSlides, updatePresentationID } from '../ducks/presentationReducer';

import './PresentationPreview.css';


// import './PresentationPreview.css';
// import {setSocketID, setUserID} from '../ducks/userReducer';


class PresentationPreview extends Component {

  componentDidMount() {
    this.props.updatePresentationID(this.props.match.params.id);
    this.props.getCurrentPresentationSlides(this.props.match.params.id);
    // axios.get(`http://localhost:3001/slides/${presentationID}`).then(res => { return res.data})
  }

  render () {
    console.log(this.props.slideArray);
    let arr = this.props.slideArray;
    arr.sort((a, b) => a.slide_number - b.slide_number)
    console.log(arr)
    // if (this.props.slideArray) {
  //   arr = arr.map((slide, index) => {
  //     console.log(slide)
  //     return <div>{slide[index].url}</div>
  //     // <div className="slide-container">
  //     //     <div >
  //     //       <img src={slide[index].url} alt={index + 1} />
  //     //     </div>
  //     // </div> 
  //   })
  // }
    console.log('format', arr)
    return (
      <div>
        <div className="preview-container">
        <h1>
          PREVIEW
        </h1>
          <div className="interface-links">
            <Link to={`/presentation/${this.props.match.params.id}/presenter`}>
              <div>
                Presenter Screen
              </div>
            </Link>
            <Link to={`/presentation/${this.props.match.params.id}/projector`}>
              <div>
                Projector Screen
              </div>
            </Link>
          </div>
          <div className="slides-container">
          {/* { arr } */}
          </div>
        </div>
      </div>  
    )
  }
}

function mapStateToProps(state){
  // const { currentSlide } = state.presentation;
  return {
    currentPresentationSlides: state.presentation.currentPresentationSlides,
    slideArray: state.presentation.slideArray
  }
}

export default connect(mapStateToProps, { getCurrentPresentationSlides, updatePresentationID })(PresentationPreview);