import React, { Component } from 'react';
import Drop0 from './_components/drop0/Drop0';
import Select0 from './_components/select0/Select0';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <div style={{height:'60px', backgroundColor:'red'}}>
          <Drop0>Select0</Drop0>
          <Drop0>Select1</Drop0>
          <Drop0>Select2</Drop0>
          <Drop0>Select3</Drop0>
        </div>
        <Select0>Select3</Select0>
      </div>
    );
  }
}

export default App;
