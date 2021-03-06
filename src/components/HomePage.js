import React, { Component } from 'react'
import './HomePage.css';
import ImportSlides from './ImportSlides';
// import startConnection from '../connections';
// import store from '../store';
import {connect} from 'react-redux';
import {setSocketID, setUserID} from '../ducks/userReducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.setUserID(this.props.match.params.id);
    axios.get(`http://162.243.186.115.xip.io:3001/user_presentations/${this.props.match.params.id}`).then(result => {
      const promises = [];
      for (let i = 0; i < result.data.length; i++) {
        // console.log(result.data[i])
        promises.push(axios.get(`http://162.243.186.115.xip.io:3001/slides/${result.data[i].id}`));
      }
      axios.all(promises).then(results => {
        const presentations = [];
        results.forEach(result => presentations.push(result.data))
        this.setState({presentations})
      })
    });
    // console.log('PRESENTATIONS: ', presentations)
    // this.props.setSocketID(socketID);

  }
  
  render () {
    console.log('PRESENTATIONS2', this.state.presentations)
    const arr = Object.keys(this.state.presentations).map( key => {
      // console.log(key);
      return this.state.presentations[key];
    })
    let icons = [];
    // for (let i = 0; i < presentations.length; i++ ) {
    //   console.log(presentations[i])
    // }
    // icons = arr.map(el => {
    //   for (let i = 0; i < el.length; i++) {
    //     if (el[i].slide_number === 1){
    //       console.log(el[i].url)
    //       return el[i].url
    //     }

    //   }
    //   // console.log(filtered)
    // })
    console.log(arr)
    for (let i = 0; i < arr.length; i++){
      for (let j = 0; j < arr[i].length; j++){
        if (arr[i][j].slide_number === 1) {
          console.log(arr[i][j].url);
          icons.push(
          <div className="slide-container">
            <Link to={`/presentation/${arr[i][j].parent_id}`}>
              <div ><img src={arr[i][j].url} alt={JSON.stringify(arr[i][j].parent_id)} /></div>
            </Link>
          </div>)
        }
      }
    }


    console.log('icons', icons);

    return (
      <div className="container">
        <div className="right-container">
          <h1 className="home-header">
            Presentations
          </h1>
          <ImportSlides />
          <div className="presentations">
              { icons }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    userID: state.userID,
    socketID: state.socketID
  }
}

export default connect(mapStateToProps, { setUserID, setSocketID })(HomePage)