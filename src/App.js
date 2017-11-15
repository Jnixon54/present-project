import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Login from './components/Login';
import ImportSlides from './components/ImportSlides';
import SocketTest from './components/SocketTest';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentation_id: ''
    };
    this.handleImport = this.handleImport.bind(this);

  }
  handleImport(originalUrl){
    let url = '';
    try{
      url = new URL(originalUrl);
      this.setState({presentation_id: url.pathname.split('/')[3]}, () => {
        window.location.href=`http://localhost:3001/api/presentation/getPresentation/${this.state.presentation_id}`;
      })
    }
    catch(err) {
      alert('Please enter a valid URL.')
      console.log(err);
    }
  }
  render() {
    return (
      <div className="App">
        TEST
        <Login />
        <ImportSlides handleImport={this.handleImport}/>
        <SocketTest />
      </div>
    );
  }
}

export default App;
