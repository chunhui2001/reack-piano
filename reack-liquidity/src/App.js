import React, { Component } from 'react';
import Liquidity from './_components/liquidity/Liquidity';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Liquidity></Liquidity>
      </div>
    );
  }
}

export default App;
