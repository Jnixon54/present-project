import React, {Component} from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:3001/login', {
      username: this.state.username,
      password: this.state.password
    }).then(response => console.log('RESPONSE', response)).catch(console.log)
  }
  render(){
    console.log(this.state.username + ' ' + this.state.password)
    return (
      <div>
        <form>
          <div className="localLogin">
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            <input type="submit" value="Submit" onClick={this.handleSubmit}/>
          </div>
        </form>
        <a href="http://localhost:3001/google/auth/login">Login with google</a>
      </div>
    )
  }
}

export default Login

