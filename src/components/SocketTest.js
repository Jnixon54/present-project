import React, { Component } from 'react'

import io from 'socket.io-client';

const PORT = 3001;
const socket = io(`http://localhost:${PORT}`)

class SocketTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    socket.on('test', (message) => {
      this.setState({messages: [...this.state.messages, message.text]})
      console.log(this.state.messages);
    })
  }
  componentDidMount() {
    // this.socket = io(`http://localhost:${PORT}`)
    // console.log(this.socket)
    console.log(socket);
    
  }

  render () {
    return (
      <div>
        socket
        {this.state.messages.map((message) => {
          return <p>{message}</p>
        })}

      </div>
    )
  }
}

export default SocketTest