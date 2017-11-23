import React, { Component } from 'react';
import Login from './Login';
import './HomePage.css';
class HomePage extends Component {
  render () {
    return (
      <div className="home-container">
        <div>
          <h1><span id="title-highlight">PRESENT</span>ABLE</h1>
          <Login />
        </div>
        <div className="horizontal-line line-1"/>
        <div className="horizontal-line line-2"/>
        <div className="horizontal-line line-3"/>
        <div className="horizontal-line line-4"/>
        <div className="vertical-line line-5"/>
        <div className="vertical-line line-6"/>
        <div className="vertical-line line-7"/>
        <div className="vertical-line line-8"/>
        <div className="box"/>
      </div>
    )
  }
}

export default HomePage