import React, { Component } from 'react';
import CheckBox0 from './_components/checkbox0/CheckBox0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <CheckBox0>checkbox0</CheckBox0>
      </div>
    );
  }
}

export default App;
