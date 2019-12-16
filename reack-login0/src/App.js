import React, { Component } from 'react';
// import logo _form './logo.svg';
import './App.css';

import Login0 from './_components/login0/Login0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }


  fileUpload(f) {
    // debugger;
  }

  render() {
    return (
      <div className="App">
        <Login0>login0</Login0>
      </div>
    );
  }
}

export default App;
