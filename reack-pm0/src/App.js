import React, { Component } from 'react';
import PM0 from './_components/pm0/PM0';
import PMSchema from './_components/schema/PMSchema';

import Service from './_components/service/Service';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pmSchema: PMSchema(
        "https://www.baidu.com", 
        "get", 
        'application/json',
        JSON.stringify({"a": 1, "b": 2}, null, 2)
      )
    };
  }

  onButtonClickHand(pm, type, inputTextValue) {
    this.getList(pm);
    console.log(type, inputTextValue);
    pm.refresh();
  }

  onTestClick() {
    this.setState({
      ...this.state,
      pmSchema: PMSchema(
        "https://www.163.com", 
        "get", 
        'application/json',
        JSON.stringify({"a": 1, "b": 2}, null, 2)
      )
    });
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
    let theQueryString = Service.queryString().stringify({}, {sort: false});
    return (
      <div className='pm-app'>
          <input type="button" onClick={this.onTestClick.bind(this)} value="Test" />
          <PM0 ref="pm0" 
               activeTab={ 'body' } schema={ this.state.pmSchema } 
               onSchemaStateChange={ (changedSchema) => console.log(changedSchema) } onButtonClickHand={this.onButtonClickHand.bind(this)} />
      </div>
    );
  }
}


export default App;
