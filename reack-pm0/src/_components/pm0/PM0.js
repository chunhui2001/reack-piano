import React, { Component } from 'react';

class PM0 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

handleInputTextChange (e) {
  let keyArr = e.target.name.split('.');
  if (keyArr.length === 1) {
    this.setState({ 
      ...this.state,
      task: {
        ...this.state.task,
        [keyArr[0]]: e.target.value
      }
    });
  } else if (keyArr.length === 2) {
    this.setState({ 
      ...this.state,
      task: {
        ...this.state.task,
        taskDef: {
          ...this.state.task.taskDef,
          [keyArr[1]]: e.target.value
        }
      }
    });
  }
}

render() {
  return (
      <div className={`${this.props.className} PM0`}>
        <input type="text" />
        <input type="button" value="Send" />
        <input type="button" value="ping" />
      </div>
    );
  }
}


export default PM0;
