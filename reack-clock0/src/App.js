import React, { Component } from 'react';
import DigitClock from './_components/digit-clock/DigitClock';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <DigitClock />
      </div>
    );
  }
}

export default App;
