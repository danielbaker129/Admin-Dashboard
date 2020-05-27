import React, { Component } from 'react';
import Dashboard from './dashboard.js'
import firebase from './firebase.js'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Dashboard />
      </div>
    );
  }
}

export default App;
