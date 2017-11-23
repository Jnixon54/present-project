/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import React, { Component } from 'react'

import io from 'socket.io-client';
// 
const PORT = 3001;
const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`)

class SocketTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ''
    };
    socket.on('test', (message) => {
      this.setState({messages: [...this.state.messages, message.text]})
      console.log(this.state.messages);
    })
    socket.on('broadcast', (message) => {
      console.log(message)
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // this.socket = io(`http://localhost:${PORT}`)
    // console.log(this.socket)
    console.log(socket);
    
  }
  handleChange(event){
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    socket.emit('sendMessage', {message: this.state.message})
  }
  render () {
    console.log(this.state.message);
    return (
      <div>
        <form >
          <input type="text" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Type your message here" />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        {/* socket
        {this.state.messages.map((message) => {
          return <p>{message}</p>
        })} */}

      </div>
    )
  }
}

export default SocketTest