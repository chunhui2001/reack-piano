import React, { Component } from 'react';
import CornExp from './_components/corn0/CornExp';

class App extends Component {
  
  constructor(props) {

    super(props);
    this.state = { value1: "* * * * *", value2: "* * * * *" };

  }

  render() {
    return (
      <div className="App">
          <CornExp locale={"zh_CN"} value={this.state.value2} onChange={value => this.setState({ value2: value })}/>
      </div>
    );
  }
}

export default App;
