import React, { Component } from 'react'

import io from 'socket.io-client';

const PORT = 3001;

class SocketTest extends Component {
  componentDidMount() {
    this.socket = io(`http://localhost:${PORT}`)
    console.log(this.socket)
    
  }

  render () {
    return (
      <div>
        socket
      </div>
    )
  }
}

export default SocketTest