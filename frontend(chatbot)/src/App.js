import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import Content from './component/Content';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Content} />
      </div>
    );
  }
}

export default App;
