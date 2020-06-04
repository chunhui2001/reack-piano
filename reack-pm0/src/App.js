import React, { Component } from 'react';
import PM0 from './_components/pm0/PM0';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='root'>
          <PM0 />
        </div>
    );
  }
}


export default App;
