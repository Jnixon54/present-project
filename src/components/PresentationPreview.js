import React, { Component } from 'react'
import {connect} from 'react-redux';
// import { advanceSlide, returnSlide } from '../ducks/presentationReducer';
import {Link} from 'react-router-dom';
import { getCurrentPresentationSlides, updatePresentationID } from '../ducks/presentationReducer';


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
    return (
      <div>
      <div className="left">

      </div>
      <div className="right">
        <div>
          { this.props.currentSlide }
          <button>
            Begin Presentation
          </button>
          <Link to={`/presentation/${this.props.match.params.id}/presenter`}>
            <div>
              Presenter view
            </div>
          </Link>
          <Link to={`/presentation/${this.props.match.params.id}/projector`}>
            <div>
              Projector view
            </div>
          </Link>
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