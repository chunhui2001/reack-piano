import React, { Component } from 'react';
import PM0 from './_components/pm0/PM0';
import PMSchema from './_components/schema/PMSchema';

const bodyData = [
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

const headers = [
  {
    key: "Content-Type",
    val: 'application/json;utf-8',
    eg: 'application/json',
    desc: "头部参数"
  }
];

const queryParams = [
  {
    key: "pIndex",
    val: "0",
    desc: "页码",
    disable: false,
    dtype: 'number',
    required: 'N',
    defval: '0',
    eg: null,
    valid: '[0-9]{1,}',
  },{
    key: "pSize",
    val: "10",
    desc: "页大小",
    disable: false,
    dtype: 'number',
    required: 'N',
    defval: '10',
    eg: null,
    valid: '[0-9]{1,}',
  },{
    key: "sort",
    val: "-1",
    desc: "排序",
    disable: false,
    dtype: 'number',
    required: 'N',
    defval: '-1',
    eg: null,
    valid: null,
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pmSchema: PMSchema(
        "https://www.baidu.com/index/blogs",
        "get", 
        'application/json;utf-8',
        //'application/json',
        //'form-data',
        //'text/plain',
      )
    };
  }

  onButtonClickHand(pm, type, inputTextValue) {
    this.getList(pm);
    console.log(type, this.state.pmSchema);
    pm.refresh();
  }

  onTestClick() {
    let _theSchema = PMSchema(
        "http://172.28.128.1:19103/user/create",
        "get", 
        'x-www-form-urlencoded',
        bodyData,
        headers,
        queryParams,
        '/apidoc/9omLVPwNRmhJ9P7o5zoQ'
      );
    this.setState({
      ...this.state,
      pmSchema: _theSchema
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
               activeTab={ 'params' } schema={ this.state.pmSchema } 
               onSchemaStateChange={ (changedSchema) => this.onSchemaChange(changedSchema) } 
               onButtonClickHand={this.onButtonClickHand.bind(this)} />
      </div>
    );
  }
}

export default App;
