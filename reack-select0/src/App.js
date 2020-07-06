import React, { Component } from 'react';
import Select0 from './_components/select0/Select0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <div style={{height:'auto', backgroundColor:'red'}}>
          <Select0>Select0</Select0>
          <Select0>Select1</Select0>
          <Select0>Select2</Select0>
          <Select0>Select3</Select0>
        </div>
      </div>
    );
  }
}

export default App;
