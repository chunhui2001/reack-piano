import React, { Component } from 'react';

import Login0 from './_components/login0/Login0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  onLoginClick(result) {
    if (!result) {
      return;
    }

    debugger;
  }


  render() {
    return (
      <div className="App">
        <Login0 onLoginClick={this.onLoginClick.bind(this)}>login0</Login0>
      </div>
    );
  }
}

export default App;
