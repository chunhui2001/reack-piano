import React, { Component } from 'react';
import Fack from './_components/fack/Fack';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <Fack>Fack</Fack>
      </div>
    );
  }
}

export default App;
