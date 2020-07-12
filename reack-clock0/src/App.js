import React, { Component } from 'react';
import Clock0 from './_components/clock0/Clock0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <Clock0>Clock0</Clock0>
      </div>
    );
  }
}

export default App;
