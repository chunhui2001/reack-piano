import React, { Component } from 'react';
import DigitClock from './_components/digit-clock/DigitClock';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.serverTime) {
        return;
    }
    let _this = this;
    _this.interval = setInterval(() => {
        _this.setState({
          serverTime: new Date().getTime()
        });
    }, 1000);
}

  render() {
    return (
      <div className="App">
        <DigitClock serverTime={ this.state.serverTime } />
      </div>
    );
  }
}

export default App;
