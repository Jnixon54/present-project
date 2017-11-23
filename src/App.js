import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import HomePage from './components/HomePage';
import ImportSlides from './components/ImportSlides';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentation_id: '',

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
  handleChange(event){
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }
  // handleSubmit(event){
  //   event.preventDefault();
  //   axios.post('http://localhost:3001/login', {
  //     username: this.state.username,
  //     password: this.state.password
  //   }).then(response => console.log(response)).catch(console.log)
  // }

  render() {
    return (
      <div className="App">
        <div className="container">
          <HomePage />
          <ImportSlides handleImport={this.handleImport}/>
        </div>
      </div>
    );
  }
}

export default App;
