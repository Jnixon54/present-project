import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import ImportSlides from './components/ImportSlides';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentation_id: ''
    };
    this.handleImport = this.handleImport.bind(this);

  }
  // componentDidMount(){
  //   axios.get("/api/test").then(response => console.log(response));
  // }
  handleImport(originalUrl){
    let url = '';
    try{
      url = new URL(originalUrl);
      this.setState({presentation_id: url.pathname.split('/')[3]}, () => {
        // axios.get(`http://localhost:3001/api/presentation/getpresentation/${this.state.presentation_id}`);
        window.location.href=`http://localhost:3001/api/presentation/getPresentation/${this.state.presentation_id}`;
      })
    }
    catch(err) {
      alert('Please enter a valid URL.')
      console.log(err);
    }
    
    
  }
//https://docs.google.com/presentation/d/1oCNQlcuNkiRwJu660XBnvZTHYdEOqw4DIJzPvOv85ek/edit#slide=id.gc6f972163_0_0

  render() {
    return (
      <div className="App">
        TEST
        <Login />
        <ImportSlides handleImport={this.handleImport}/>
      </div>
    );
  }
}

export default App;
