import React, { Component } from 'react';
import './App.css';
import {SERVER_URL} from "./config";
import 'ol/ol.css'
import OLMapFragment from './components/OLMapFragment'

class App extends Component {

  render() {
    return (
      <OLMapFragment />
    );
  }
}

export default App;
