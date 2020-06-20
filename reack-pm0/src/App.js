import React, { Component } from 'react';
import PM0 from './_components/pm0/PM0';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  onButtonClickHand(pm, type, inputTextValue) {
    this.getList(pm);
    pm.refresh();
  }

  put() {
    let _items = this.state.items;
    _items.push(new Date().getTime());
    this.setState({
      ...this.state.items,
      items: _items
    });
    this.getList(this.refs.pm0);
    this.refs.pm0.refresh();
  }

  getList(e) {
    e.responseComponent = <div>
      { this.state.items.map((item, index) => {
        return <p key={index}>{item}</p>
      }) }
    </div>;
  }

  render() {
    let s = { inputGroupText: "aaa", selectRequestMethod:'post' };
    return (
      <div className='pm-app'>
          <input type="button" onClick={this.put.bind(this)} value="Test" />
          <PM0 ref="pm0" schema={ s } onSchemaStateChange={ (changedSchema) => console.log(changedSchema) } onButtonClickHand={this.onButtonClickHand.bind(this)} />
      </div>
    );
  }
}


export default App;
