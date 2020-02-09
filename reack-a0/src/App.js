import React, { Component } from 'react';
// import logo _form './logo.svg';
import './App.css';

import Button from './_components/button/Button';

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
        <Button>a0</Button>
      </div>
    );
  }
}

export default App;
