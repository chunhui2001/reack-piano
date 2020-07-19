import React, { Component } from 'react';
import PM0 from './_components/pm0/PM0';
import PMSchema from './_components/schema/PMSchema';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pmSchema: PMSchema(
        "https://www.baidu.com", 
        "get", 
        //'application/json;utf-8',
        'form-data',
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
    let bodyData = [
      {
        key: "id",
        val: 1,
        desc: "用户ID",
        disable: true,
        dtype: 'string',
        required: 'Y',
        defval: '无',
        eg: null,
        valid: '0-25',
      }, {
        key: "username",
        val: "keeshz.hang",
        desc: "用户名",
        disable: false,
        dtype: 'string',
        required: 'Y',
        defval: '无',
        eg: null,
        valid: '0-25',
      }, {
        key: "age",
        val: "18",
        desc: "年龄",
        disable: false,
        dtype: 'object',
        required: 'N',
        defval: '无',
        eg: null,
        valid: '[0-9]',
      }, {
        key: "image",
        val: "http://www.imge.com",
        desc: "头像",
        disable: false,
        dtype: 'file',
        required: 'N',
        defval: '无',
        eg: null,
        valid: 'binary',
      }
    ];
    this.setState({
      ...this.state,
      pmSchema: PMSchema(
        "https://www.163.com?id=你好", 
        "get", 
        //'application/json;utf-8',
        'x-www-form-urlencoded',
        JSON.stringify({"a": 1, "b": 2}, null, 2),
        bodyData
      )
    });
    this.refs.pm0.refresh();
  }

  onSchemaChange(schema) {
    this.setState({
      ...this.state,
      pmSchema: schema
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
    return (
      <div className='pm-app'>
          <input type="button" onClick={this.onTestClick.bind(this)} value="Test" />
          <PM0 ref="pm0" 
               activeTab={ 'body' } schema={ this.state.pmSchema } 
               onSchemaStateChange={ (changedSchema) => this.onSchemaChange(changedSchema) } onButtonClickHand={this.onButtonClickHand.bind(this)} />
      </div>
    );
  }
}


export default App;
