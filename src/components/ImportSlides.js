import React, { Component } from 'react';

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
      <div>
        <form>
          <input type="url" value={this.state.value} onChange={this.handleChange}placeholder="https://docs.google.com/presentation/d/..." />
          <input type="submit" value="Import" onClick={this.handleSubmit}/>
        </form>
        https://docs.google.com/presentation/d/1oCNQlcuNkiRwJu660XBnvZTHYdEOqw4DIJzPvOv85ek/edit#slide=id.gc6f972163_0_0
      </div>
    )
  }
}

export default ImportSlides


