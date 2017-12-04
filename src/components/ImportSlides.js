import React, { Component } from 'react';
import './ImportSlides.css';

class ImportSlides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false,
      presentation_id: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.handleImport(this.state.value);
    
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

  render () {
    return (
      <div className="import">
        <form>
          <div className="import-input">
            <input type="url" value={this.state.value} onChange={this.handleChange}placeholder="https://docs.google.com/presentation/d/..." />
          </div>
          <div className="import-submit">
            <input type="submit" value="Import" onClick={this.handleSubmit}/>
          </div>
        </form>
      </div>
    )
  }
}

export default ImportSlides


