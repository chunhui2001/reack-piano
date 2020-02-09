import React, { Component } from 'react';
import Button from './_components/button/Button';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <Button>Button0</Button>
      </div>
    );
  }
}

export default App;
