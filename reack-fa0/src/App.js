import React, { Component } from 'react';
import A1 from './_components/a1/A1';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <A1>a1</A1>
      </div>
    );
  }
}

export default App;
