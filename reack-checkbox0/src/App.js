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
        <CheckBox0 size={'big'} value={"3"} onChange={(e) => { console.log(e.target.checked) }}>checkbox0</CheckBox0>
        <CheckBox0 size={'default'} value={"2"}>checkbox0</CheckBox0>
        <CheckBox0 size={'small'} value={"1"} checked={true}>checkbox0</CheckBox0>
      </div>
    );
  }
}

export default App;
