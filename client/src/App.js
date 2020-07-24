import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  onClickButton = async e => {
    e.preventDefault();
    const response = await fetch('/api/db', {
      method: 'GET',
    });
    const body = await response.text();

    this.setState({responseToPost: body});
  }

  onClickDeleteButton = async e => {
    e.preventDefault();
    const response = await fetch('/api/delete', {
      method: 'GET',
    });
    const body = await response.text();

    this.setState({responseToPost: body});
  }
  
  onClickInsertButton = async e => {
    e.preventDefault();
    const response = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });

    const body = await response.text();

    this.setState({responseToPost: body});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            정현수
          </p>
          <form onSubmit={this.onClickInsertButton}>
            <input 
            type="text"
            value={this.state.post}
            onChange={e => this.setState({post: e.target.value})}
            />
            <button type="submit">삽입하기</button>
          </form>
            <button onClick={this.onClickButton}>데이터 보기</button>
            <button onClick={this.onClickDeleteButton}>모든 데이터 삭제</button>
          <p>
            {this.state.responseToPost}
          </p>

        </header>
      </div>
    );
  }
}

export default App;
