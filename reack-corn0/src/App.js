import React, { Component } from 'react';
import CornExp from './_components/corn0/CornExp';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <CornExp>corn0</CornExp>
      </div>
    );
  }
}

export default App;
