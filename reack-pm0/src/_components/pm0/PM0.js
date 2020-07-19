import React, { Component } from 'react';
import styled, { css } from "styled-components";
import { Lang } from 'reack-lang';
import { Fake } from 'reack-fake';

import PMSchema from "../schema/PMSchema";
import Helper from "./Helper";

const $ = Fake('$');

export class _PM0 extends Component {

  responseComponent = null;

  constructor(props) {
    super(props);
    this.state = {
      tabName: null,
      theSchema: PMSchema('https://www.google.com', 'get', 'none')
    };
  }

  // shouldComponentUpdate = (nextProps) => {
  //   debugger;
  //   return nextProps.schema !== this.props.schema;
  // }

  componentDidMount() {
    const { schema, activeTab } = this.props;
    let theSchema = schema ? schema : {};
    this.setState({
      ...this.state,
      tabName: this.state.tabName || activeTab || 'params',
      theSchema
    }, () => this.handPmTabClick(this.state.tabName));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      tabName: this.state.tabName || nextProps.activeTab,
      theSchema: nextProps.schema
    }, () => this.handPmTabClick(this.state.tabName));
  }

  // static getDerivedStateFromProps(props, state) {
  //     return {
  //       ...state,
  //       tabName: state.tabName || props.activeTab,
  //       theSchema: props.schema
  //     };
  // }

  handleInputTextChange (e) {
    const { onSchemaStateChange } = this.props;
    let keyArr = e.target.name.split('.');
    let currentVal = e.target.value;
    if (keyArr.length === 1) {
      this.setState({ 
        ...this.state,
        theSchema: {
          ...this.state.theSchema,
          [keyArr[0]]: currentVal
        }
      }, () => {
        if (onSchemaStateChange) {
          onSchemaStateChange(this.state.theSchema);
        }
        // if (keyArr[0] === 'inputGroupText') {
        //   this.handPmTabClick(this.state.tabName);
        // }
        this.refresh();
      });
    } else if (keyArr.length === 2) {
      this.setState({ 
        ...this.state,
        task: {
          ...this.state.task,
          taskDef: {
            ...this.state.task.taskDef,
            [keyArr[1]]: currentVal
          }
        }
      }, () => {
        if (onSchemaStateChange) {
          onSchemaStateChange(this.state.theSchema);
        }
        // if (keyArr[0] === 'inputGroupText') {
        //   this.handPmTabClick(this.state.tabName);
        // }
        this.refresh();
      });
    }
    
  }

  // 处理 tab 切换
  handPmTabClick(tabName) {
    if (tabName === 'params') {
      let urlObject = Lang.parseUrl(this.state.theSchema.inputGroupText.trim());
      let urlSearch = urlObject.search;
      let urlSearchArr = null;
      let queryParamsObject = null;
      if (urlSearch) {
        queryParamsObject = {};
        urlSearchArr = urlSearch.substr(1).split('&');
        for (let qKey of urlSearchArr) {
          if (!qKey || qKey === '') {
            continue;
          }
          queryParamsObject[qKey.split('=')[0]] = qKey.split('=')[1];
        }
      }
      let queryStringObject = [];
      if (!Lang.blank(queryParamsObject)) {
        // convert query string to array object
        for (const [key, value] of Object.entries(queryParamsObject)) {
          queryStringObject.push({
            key: key,
            val: value
          });
        }
      } 
      while (queryStringObject.length < 10) {
        queryStringObject.push({});
      }
      this.setState({
        ...this.state,
        queryParamsItems: queryStringObject,
        tabName: tabName
      });
      return;
    }
    this.setState({
      ...this.state,
      tabName: tabName
    }, () => this.refresh()) ;
  }

  // 处理button点击
  onButtonClick(type, e) {
    const { onButtonClickHand } = this.props;
    let _inputGroupText = this.state.theSchema.inputGroupText;
    if (!_inputGroupText || !_inputGroupText.trim()) {
      return;
    }
    if (!onButtonClickHand) {
      return;
    }
    onButtonClickHand(this, type, _inputGroupText);
  }

  // 取得展示内容响应
  getResponseComponent() {
      if (this.responseComponent) {
          return this.responseComponent;
      }
      return <h1 style={{textAlign: 'center', padding: '1em', color: 'gray'}}>Current does not have response.</h1>;
  }

  // 强制刷新状态
  refresh() {
    this.setState({
      ...this.state,
      timestamp: new Date().getTime()
    });
  }

  // 取得保存按钮
  getSaveButton() {
    const { 
      theSchema
    } = this.state;
    if (this.props.saveButton) {
      return this.props.saveButton;
    }
    return <input onClick={this.onButtonClick.bind(this, 'save')} 
                  disabled={theSchema && (!theSchema.inputGroupText || !theSchema.inputGroupText.trim()) } type="button" value="Save" />;
  }

  // 渲染组件
  render() {
    const { 
      theSchema
    } = this.state;
    return (
        <div className={`${this.props.className} PM0`}>
          <div className={'panel-left'}>
          	<div className={'pm-body container'}>
              <div className={'content'}>
                <div className={'div1'}>
                  <select name='selectRequestMethod' value={theSchema.selectRequestMethod || 'get'} onChange={(e) => {this.handleInputTextChange(e)}} >
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="put">PUT</option>
                    <option value="delete">DELETE</option>
                  </select>
                </div>
                <div className={'div2'}>
                  <input type="text" name='inputGroupText' 
                      onChange={(e) => {this.handleInputTextChange(e)}} value={theSchema.inputGroupText || ''} />
                </div>
                <div className={'clear'}></div>
              </div>
              <div className={'sidebar'}>
                <input onClick={this.onButtonClick.bind(this, 'send')} disabled={!theSchema.inputGroupText || !theSchema.inputGroupText.trim()} type="button" value="Send" />
                <input onClick={this.onButtonClick.bind(this, 'ping')} disabled={!theSchema.inputGroupText || !theSchema.inputGroupText.trim()} type="button" value="Ping" />
                { this.getSaveButton() }
          	  </div>
              <div className={'clear'}></div>
            </div>
            <div className={'pm-m'}>
            	<div className={'pm-tab'}>
            		<span className={this.state.tabName === 'params' ? 'active' : ''} onClick={this.handPmTabClick.bind(this, 'params')}>Params</span>
            		<span className={this.state.tabName === 'auth' ? 'active' : ''} onClick={this.handPmTabClick.bind(this, 'auth')}>Authorization</span>
            		<span className={this.state.tabName === 'headers' ? 'active' : ''} onClick={this.handPmTabClick.bind(this, 'headers')}>Headers(1)</span>
            		<span className={this.state.tabName === 'body' ? 'active' : ''} onClick={this.handPmTabClick.bind(this, 'body')}>Body</span>
                <span style={{float: 'right', textDecoration: 'underline', color: 'blue'}}>ApiDoc</span>
            	</div>
            	{ this.state.tabName === 'params' && this.paramsTabSection() }
              { this.state.tabName === 'auth' && this.authTabSection() }
              { this.state.tabName === 'headers' && this.headersTabSection() }
              { this.state.tabName === 'body' && this.bodyTabsSection() }
              <div className={'pm-response'}>
                <h4 style={{padding:'.525em .625em',margin:0, backgroundColor:'aliceblue', color:'gray', borderBottom:'solid 1px gainsboro'}}>Response</h4>
                <div style={{ backgroundColor: 'darkslateblue', color:'white', minHeight:'300px' }}>
                  { this.getResponseComponent() }
                </div>
              </div>
            </div>
            <div style={{display:'none'}}>{this.state.timestamp}</div>
          </div>
          <div className={'panel-right'}>
            1
          </div>
          <div className={'clear'}></div>
        </div>
    );
  }

  // 处理二级tab点击
  paramsTabSection() {
    return <div className={'tab-panel tab-params'}>
              <div style={{color:'gray', padding: '0.425em .625em', fontStyle: 'italic', backgroundColor: 'mintcream'}}>Query Params</div>
              <table className={'pm-table query-params-table'}>
                <tbody>
                  <tr>
                    <th style={{width:'25px'}}>&nbsp;</th>
                    <th>KEY</th>
                    <th>VALUE</th>
                    { /** <th>DESCRIPTION</th> **/ }
                  </tr>
                  { this.getQueryParamsItems() }
                </tbody>
              </table>
            </div>;
  }

  // 获取query展示区
  getQueryParamsItems = () => {
    return this.state.queryParamsItems && this.state.queryParamsItems.map((item, i) => {
      return <tr key={i}>
        <td style={{textAlign:'right'}}><input type="checkbox" /></td>
        <td className={'inputCell'}>
          <div><input type="text" value={item.key || ''} autoComplete="off"
                  onChange={ (e) => this.onQueryParamsItemChange(e, i) } 
                  onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                  onBlur={ (e) => this.clearInputStagingChange(e) }
                  onKeyDown={ (e) => this.onQueryParamTrAppend(e, i, 'key') }name='key' /></div>
        </td>
        <td className={'inputCell'}>
          <div><input type="text" value={item.val || ''} autoComplete="off"
                  onChange={ (e) => this.onQueryParamsItemChange(e, i) } 
                  onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                  onBlur={ (e) => this.clearInputStagingChange(e) }
                  onKeyDown={ (e) => this.onQueryParamTrAppend(e, i, 'val') }name='val' /></div>
        </td>
        { /** <td className={'inputCell'}>
          <div><input type="text" value={item.desc || ''} autoComplete="off"
                  onChange={ (e) => this.onQueryParamsItemChange(e, i) } 
                  onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                  onBlur={ (e) => this.clearInputStagingChange(e) }
                  onKeyDown={ (e) => this.onQueryParamTrAppend(e, i, 'desc') } name='desc' /></div>
        </td> **/}
      </tr>;
    }) ;
  }

  // 处理query参数状态变化
  onQueryParamsItemChange = (e, index) => {
    const { onSchemaStateChange } = this.props;
    let currentValue = e.target.value;
    let currentField = e.target.name;
    let queryParamsItemsUpdated = this.state.queryParamsItems;
    queryParamsItemsUpdated[index][currentField] = currentValue;
    let queryStringObject = this.getQueryStringObject(queryParamsItemsUpdated);
    let _url = Lang.parseUrl(this.state.theSchema.inputGroupText);
    let theQueryString = _url.protocol + '//' + _url.host + _url.pathname + decodeURI(Lang.toQueryString(queryStringObject));
    this.setState({
      ...this.state,
      theSchema: {
        ...this.state.theSchema,
        inputGroupText: theQueryString,
      }
    }, () => {
      if (onSchemaStateChange) {
        onSchemaStateChange(this.state.theSchema);
      }
    });
  }

  // 处理添加pm表格参数
  onTableTrAppend(e, index, field, theSchemaField) {
    if (window.event.keyCode === 9 && e.target.name === 'desc') {
      // tab 键
      if (this.state.theSchema[theSchemaField].length === index+1) {
        if (window.event.shiftKey) {
          // shift + tab
          return;
        }
        this.doTableTrAppendMoveFocus(e, field, theSchemaField, 'next', true, 'tab', index);
      }
    } else if ((window.event.shiftKey && window.event.keyCode === 40) || window.event.keyCode === 13) {
      // 下方向键 OR 回车键
      this.doTableTrAppendMoveFocus(e, field, theSchemaField, 'next', this.state.theSchema[theSchemaField].length === index+1, 'down', index);
    } else if (window.event.shiftKey && window.event.keyCode === 38) {
      // 上方向键
      this.moveFocus('.pm-table', e, 'prev', field, index);
    } else if (window.event.shiftKey && window.event.keyCode === 39) {
      // 右方向键
      this.moveFocus('.pm-table', e, 'right', field, index);
    } else if (window.event.shiftKey && window.event.keyCode === 37) {
      // 左方向键
      this.moveFocus('.pm-table', e, 'left', field, index);
    } 
  }

  // 处理添加pm表格参数后光标移动
  doTableTrAppendMoveFocus(e, field, theSchemaField, next, append, type, index) {
    const { onSchemaStateChange } = this.props;
    let _this = this;
    if (append) {
      let _theSchema = this.state.theSchema;
      let _bodyReqData = _theSchema[theSchemaField];
      _bodyReqData.push({});
      if (onSchemaStateChange) {
        onSchemaStateChange(_theSchema);
      }
    } else {
      if (type !== 'tab') {
        _this.moveFocus('.pm-table', e, next, field, index);
      }
    }
  }

  // 处理添加query参数
  onQueryParamTrAppend(e, index, field) {
    if (window.event.keyCode === 9 && e.target.name === 'desc') {
      if (this.state.queryParamsItems.length === index+1) {
        if (window.event.shiftKey) {
          // shift + tab
          return;
        }
        this.doQueryParamTrAppendMoveFocus(e, field, 'next', true, 'tab', index);
      }
    } else if ((window.event.shiftKey && window.event.keyCode === 40) || window.event.keyCode === 13) {
      // 下方向键 OR 回车键
      this.doQueryParamTrAppendMoveFocus(e, field, 'next', this.state.queryParamsItems.length === index+1, 'down', index);
    } else if (window.event.shiftKey && window.event.keyCode === 38) {
      // 上方向键
      this.moveFocus('.query-params-table', e, 'prev', field, index);
    } else if (window.event.shiftKey && window.event.keyCode === 39) {
      // 右方向键
      this.moveFocus('.query-params-table', e, 'right', field, index);
    } else if (window.event.shiftKey && window.event.keyCode === 37) {
      // 左方向键
      this.moveFocus('.query-params-table', e, 'left', field, index);
    } 
  }

  // 处理添加query参数后光标移动
  doQueryParamTrAppendMoveFocus(e, field, next, append, type, index) {
    let _this = this;
    if (append) {
      let _queryParamsItems = this.state.queryParamsItems;
      _queryParamsItems.push({});
      this.setState({
        ...this.state,
        queryParamsItems: _queryParamsItems
      }, () => {
        if (type !== 'tab') {
          _this.moveFocus('.query-params-table', e, next, field, index);
        }
      });
    } else {
      if (type !== 'tab') {
        _this.moveFocus('.query-params-table', e, next, field, index);
      }
    }
  }

  // 光标跳到下一行的对应的单元格
  moveFocus(classname, e, next, field, index) {
    let targetElement = null;
    if (next === 'next') {
      targetElement = $(classname).find('>tbody>tr:eq(' + (index + 2) + ')').find('>td').find('input[type=text][name=' + field + ']');
    } else if (next === 'prev') {
      targetElement = $(classname).find('>tbody>tr:eq(' + (index) + ')').find('>td').find('input[type=text][name=' + field + ']');
    } else {
      let parentTd = $(classname).find('>tbody>tr:eq(' + (index + 1) + ')').find('>td').find('input[type=text][name=' + field + ']').parents('td:first');
      if (next === 'right') {
        targetElement = $(parentTd[0]).next().find('input[type=text]');
      } else if (next === 'left') {
        targetElement = $(parentTd[0]).prev().find('input[type=text]');
      }
    } 
    if (targetElement != null) {
      this.onTdInputAddFocus(targetElement);
      $(targetElement).focus();
    }
  }

  onTdInputAddFocus(targetElement) {
    if ($(targetElement).attr('disabled')) {
      return;
    }
    $(targetElement).select();
    $(targetElement).parent().addClass('focus');
  }

  // 将query数组转成对象
  getQueryStringObject(queryParamsItems) {
    let result = {};
    for (let item of queryParamsItems) {
      if (item.key === 'desc') {
        continue;
      }
      if (!item.key || item.key === '') {
        item.key = '';
        if (!item.val || item.val === '') {
          continue;
        }
      }
      result[item.key] = item.val;
    }
    return result;
  }

  getEditerTable() {
    return <table className={'query-params-table'}>
            <tbody>
              <tr>
                <th style={{width:'25px'}}>&nbsp;</th>
                <th>KEY</th>
                <th>VALUE</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td style={{textAlign:'right'}}><input type="checkbox" /></td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
              </tr>
            </tbody>
          </table>;
  }

  getFormDataEditerTable(classname) {
    return <table className={`pm-table ${classname}`}>
            <tbody>
              <tr>
                <th style={{width:'25px'}}>&nbsp;</th>
                <th style={{width: '135px'}}>KEY</th>
                <th style={{width: '185px'}}>VALUE</th>
                <th style={{width: '45px'}}>DATATYPE</th>
                <th style={{width: '45px'}}>REQ</th>
                <th style={{width: '85px'}}>DEFAULTS</th>
                <th>VALIDATER</th>
                <th>E.G.</th>
                <th>DESCRIPTION</th>
              </tr>
              { this.getFormDataEditerTableTd() }
            </tbody>
          </table>;
  }

  getFormDataEditerTableTd() {
    if (!this.state.theSchema.bodyReqData || this.state.theSchema.bodyReqData.length === 0) {
      return <tr><td style={{textAlign:'right'}}>&nbsp;</td><td className={'empty-td'} colSpan="8">暂无数据</td></tr>;
    }
    return this.state.theSchema.bodyReqData.map((item, i) => {
      return <tr key={i}>
                <td style={{textAlign:'right'}}>
                  <input checked={!item.disable} onChange={ (e) => this.handTrDisable(e, i, 'bodyReqData', item) } type="checkbox" />
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('key', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'key', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="key" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('val', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'val', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="val" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('dtype', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'dtype', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="dtype" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('required', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'required', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="required" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('defval', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'defval', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="defval" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('valid', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'valid', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="valid" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('eg', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'eg', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="eg" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input autoComplete="off" disabled={item.disable} type="text" 
                          value={ this.getInputStringValue('desc', i, item) } 
                          onFocus={ (e) => this.onTdInputAddFocus(e.target) }
                          onBlur={ (e) => this.onFormDataItemChange(e, i) }
                          onKeyDown={ (e) => this.onTableTrAppend(e, i, 'desc', 'bodyReqData')}
                          onChange={ (e) => this.onInputChangeStaging(e, i) } name="desc" /></div>
                </td>
              </tr>;
    });
  }

  handTrDisable(e, index, schemaField, item) {
    const { onSchemaStateChange } = this.props;
    //debugger;
    console.log(e.target.checked);
    let _schema = this.state.theSchema;
    let _dataItem = _schema[schemaField];
    _dataItem[index].disable = !e.target.checked;
    _schema[schemaField] = _dataItem;
    if (onSchemaStateChange) {
      onSchemaStateChange(_schema);
    }
  }

  // 处理FormData参数状态变化
  onFormDataItemChange = (e, index) => {
    const { onSchemaStateChange } = this.props;
    let currentValue = e.target.value;
    let currentField = e.target.name;
    let _theSchema = this.state.theSchema;
    _theSchema.bodyReqData[index][currentField] = currentValue;
    if (onSchemaStateChange) {
        this.clearInputStagingChange(e, () => onSchemaStateChange(_theSchema));
    }
  }

  onInputChangeStaging = (e, index) => {
    let field = e.target.name;
    let key = index;
    let inputStringValue = {};
    inputStringValue[key] = {};
    inputStringValue[key][field] = e.target.value || ' ';
    this.setState({
      ...this.state,
      inputStringValue: inputStringValue
    });
  }

  clearInputStagingChange(e, done) {
    $(e.target).parent().removeClass('focus');
    this.setState({
      ...this.state,
      inputStringValue: null
    }, () => done && done());
  }

  getInputStringValue(field, index, item) {
    if (!this.state.inputStringValue || !this.state.inputStringValue[index] || !this.state.inputStringValue[index][field]) {
      if (item[field]) {
        return item[field];
      } 
      return '--';
    }
    return (this.state.inputStringValue[index] && this.state.inputStringValue[index][field]) || '';
  }

  authTabSection() {
    return <div className={'tab-panel tab-auth'}>
            <div className={'left'} style={{width:'30%', backgroundColor:'azure'}}>
              <div>
                1
              </div>
            </div>
            <div className={'right'} style={{width:'70%', backgroundColor:'ghostwhite'}}>
              <div>
                3
              </div>
            </div>
            <div className={'clear'}></div>
          </div>;
  }

  bodyRadioClick(e, type) {
    const { onSchemaStateChange } = this.props;
    if (type === 'otherInput') {
      type = e.target.value;
    }
    this.setState({
      ...this.state,
      theSchema: {
        ...this.state.theSchema,
        bodyRadioSelected: type
      }
    }, () => {
      if (onSchemaStateChange) {
        onSchemaStateChange(this.state.theSchema);
      }
    });
  }

  bodyRadioOtherChange = (e, type) => {
    this.setState({
      ...this.state,
      bodyRadioOtherValue: e.target.value
    });
  }

  getBodyRadioSection() {
    if (!this.state.theSchema.bodyRadioSelected || this.state.theSchema.bodyRadioSelected === 'none') {
      return <div style={{padding:'4em'}}>
              <h2 style={{ textAlign:'center' }}>This request does not have body</h2>
             </div>;
    } else if (this.state.theSchema.bodyRadioSelected === 'form-data') {
      return <div>
              { this.getFormDataEditerTable('form-data-table') }
             </div>;
    } else if (this.state.theSchema.bodyRadioSelected === 'x-www-form-urlencoded') {
      return <div>
              { this.getFormDataEditerTable('from-www-form-urlencoded') }
             </div>;
    } else if (this.state.theSchema.bodyRadioSelected.toLowerCase() === 'application/json' || this.state.theSchema.bodyRadioSelected.toLowerCase() === 'application/json;utf-8' ) {
      return <div style={{ position:'relative' }}>
               <div className={'jsonTextArea'}>
                <textarea 
                  onBlur={(e) => this.handleInputJsonStringUpdate(e) }
                  value={this.state.currentInputJsonString || Helper.jsonDataString(this.state.theSchema) || '{}' }
                  onChange={(e) => {this.handleInputJsonStringChange(e)}}></textarea>
               </div>
               <div className={'beautifulJson'} onClick={ this.beautifulJsonClick.bind(this) }>美化</div>
               <div style={{ textAlign:'center', display:'none' }}>加高</div>
             </div>;
    } 
    // others
    return <div style={{ position:'relative' }}><h1>暂不支持</h1></div>;
  }

  beautifulJsonClick() {
    this.setState({
      ...this.state,
      theSchema: {
        ...this.state.theSchema,
        bodyRequestData: this.state.theSchema.jsonDataString()
      }
    });
  }

  handleInputJsonStringUpdate(e) {
    const { onSchemaStateChange } = this.props;
    let currentJsonString = e.target.value;
    let _reqData = Helper.toBodyData(currentJsonString);
    $(".jsonTextArea textarea").removeClass("warnning");
    if (!_reqData) {
      $(".jsonTextArea textarea").addClass("warnning");
      return;
    } else {
      this.setState({
        ...this.state,
        currentInputJsonString: null
      }, () => {  
        let _theSchema = this.state.theSchema;
        _theSchema.bodyReqData = Helper.appendReqDataDesc(this.state.theSchema, _reqData);
        if (onSchemaStateChange) {
          onSchemaStateChange(_theSchema);
        }
      })
    }
  }

  handleInputJsonStringChange(e) {
    // value={ this.state.currentInputJsonString || Helper.jsonDataString(this.state.theSchema) || '{}' }
    this.setState({
      ...this.state,
      currentInputJsonString: e.target.value
    });
  }

  getBodyRadioSelectedChecked() {
    if (this.state.theSchema.bodyRadioSelected === 'none') {
      return false;
    }
    if (this.state.theSchema.bodyRadioSelected === 'x-www-form-urlencoded') {
      return false;
    }
    if (this.state.theSchema.bodyRadioSelected === 'form-data') {
      return false;
    }
    if (this.state.theSchema.bodyRadioSelected === 'application/json') {
      return false;
    }
    return true;
  }

  getBodyRadioOtherSelectedInput() {
    if (this.getBodyRadioSelectedChecked()) {
      return <input style={{ borderRadius: 0, padding: '.225em .625em', borderWidth: '1px', borderColor: 'black', fontSize: '.8em', color: 'blue', backgroundColor: 'bisque', borderStyle: 'dashed' }} 
                    onChange={ (e) => this.bodyRadioOtherChange(e, 'otherInput') }
                    onBlur={ (e) =>  this.bodyRadioClick(e, 'otherInput') }
                    onFocus={ (e) => e.target.select() }
                    placeholder={'请输入...'}
                    type="text" value={ this.state.bodyRadioOtherValue || this.state.theSchema.bodyRadioSelected || '' } />;
    }
    return null;
  }

  bodyTabsSection() {
    return <div className={'tab-panel tab-bodys'}>
              <div style={{color:'gray', padding: '0.625em 0.625em', backgroundColor: 'lavender'}}>
                <span><input name="g" id="r-none" type="radio" checked={ this.state.theSchema.bodyRadioSelected === 'none' }  
                             onChange={ (e) => this.bodyRadioClick(e, 'none') } /><label htmlFor="r-none">NONE</label></span>
                <span><input name="g" id="r-form-data" type="radio" checked={ this.state.theSchema.bodyRadioSelected === 'form-data' }
                             onChange={ (e) => this.bodyRadioClick(e, 'form-data') } /><label htmlFor="r-form-data">form-data</label></span>
                <span><input name="g" id="r-form-urlencoded" type="radio" checked={ this.state.theSchema.bodyRadioSelected === 'x-www-form-urlencoded' }
                             onChange={ (e) => this.bodyRadioClick(e, 'x-www-form-urlencoded') } /><label htmlFor="r-form-urlencoded">x-www-form-urlencoded</label></span>
                <span><input name="g" id="r-form-raw" type="radio" checked={ this.state.theSchema.bodyRadioSelected === 'application/json' }
                             onChange={ (e) => this.bodyRadioClick(e, 'application/json') } /><label htmlFor="r-form-raw">application/json</label></span>
                <span><input name="g" id="r-form-other" type="radio" checked={ this.getBodyRadioSelectedChecked() }
                             onChange={ (e) => this.bodyRadioClick(e, 'other') } /><label htmlFor="r-form-other">other</label></span>
                { this.getBodyRadioOtherSelectedInput() }
                <div className={'clear'}></div>
              </div>
              { this.getBodyRadioSection() }
            </div>;
  }

  headersTabSection() {
    return <div className={'tab-panel tab-headers'}>
              <div style={{color:'gray', padding: '0.425em .625em', fontStyle: 'italic', backgroundColor: 'lavender'}}>Headers</div>
              <table className={'pm-table query-params-table'}>
                <tbody>
                  <tr>
                    <th style={{width:'25px'}}>&nbsp;</th>
                    <th>KEY</th>
                    <th>VALUE</th>
                    <th>DESCRIPTION</th>
                  </tr>
                  <tr>
                    <td style={{textAlign:'right'}}><input type="checkbox" /></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>;
  }
}

let mixin = css`&{
  margin: auto;
  position: relative;
  .clear {
    float: none;
    clear: both;
  }
  .panel-left {
    width: calc(100% - 265px);
    float:left;
  }
  .panel-right {
    width:265px;
    background-color:green;
    height: 100%;
    position: absolute;
    right: 0;
  }
  .pm-tab > span {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: -moz-none;
      -o-user-select: none;
      user-select: none;
  }
	.pm-body {
		margin: .5em 0;
    margin-bottom:1em;
    margin-top: 0;
	}
	.pm-body input,.pm-body .link-button {
		font-size:1.225em;
		padding:.325em.625em;
    border-radius: 0;
    border-width: 1px;
    margin:0;
    margin-left: -1px;
    border-style:double;
    border-color:gray;
	}
  .pm-body input[type="button"],.pm-body .link-button {
    cursor:pointer;
    background-color:antiquewhite;
    color:black;
  }
  .content select {
    font-size:1.1em;
    padding:.4em .325em;
    border-radius: 0;
    border-width: 1px;
    margin:0;
    margin-right: -1px;
    border-style:double;
    border-color:gray;
    background-color: greenyellow;
  }
  .pm-body input:nth-last-child(1) {
    margin-right: 0;
  }
  .pm .pm-m {
		border-top: solid 1px gainsboro;
	}
	.pm-tab {
		background-color:aliceblue;
    border-bottom:solid 1px darkgray;
	}
  .pm-tab span {
  	display:inline-block;
  	padding:.625em 1em;
  	cursor:pointer;
  }
  .pm-tab span:hover{
	  background-color:burlywood;
   	border-bottom:solid 3px blue;
  	margin-bottom: -1px;
  }
  .pm-tab span.active {
  	border-bottom:solid 3px red;
  	margin-bottom: -1px;
  }
  .tab-panel {
  	background-color: floralwhite;
  }
  .query-params-table, .pm-table {
  	border-spacing: 0;
  	width: 100%;
  	border-top: solid 1px gainsboro;
  }
  .pm-table .empty-td {
     font-size: 1.25em;
     padding: .25em .425em;
     color: gray;
     font-style: italic;
  }
  .pm-table th, .pm-table td {
    text-align: left;
    border-right: solid 1px gainsboro;
    border-bottom: solid 1px gainsboro;
    padding: .325em .625em;
    font-size: .925em;
  }
  .query-params-table td, .query-params-table th {
  	
  }
  .from-www-form-urlencoded td, .from-www-form-urlencoded th {

  }
  .form-data-table .inputCell > div, .form-data-table .empty-td {
    background-color:thistle;
  }
  .form-data-table .inputCell input {
    background-color:thistle;
    color:darkviolet;
  }
  .from-www-form-urlencoded .inputCell > div, .from-www-form-urlencoded .empty-td {
    background-color:#65bb92;
  }
  .from-www-form-urlencoded .inputCell input {
    background-color:#65bb92;
    color: darkred;
  }
  .query-params-table tr td:nth-last-child(1), .query-params-table tr th:nth-last-child(1)
  .from-www-form-urlencoded tr td:nth-last-child(1), .from-www-form-urlencoded tr th:nth-last-child(1) {
  	border-right: none;
  }
  /* auth */
  .tab-panel.tab-auth {

  }
  .tab-panel.tab-auth .left, 
  .tab-panel.tab-auth .right {
    float:left;
    height:100%;
    min-height:200px;
  }
  .tab-panel.tab-auth .left > div, 
  .tab-panel.tab-auth .right > div {
    height:100%;
    padding:1em;
  }
  .tab-panel.tab-bodys span {
    display:inline-block;
    float:left;
    margin-right:1em;
    padding-top: .15em;
  }
  .container {
     height: auto;
  }
  .sidebar {
    float: right;
    text-align:right;
  }
  .content {
    width: calc(100% - 215px);
    float:left;
    /*height:31.9px; */
  }
  .content input[type="text"] {
    width: 100%;
  }
  .content > div {
    float:left;
    height:100%;
  }
  .content > .div2 {
    width: calc(100% - 118px);
    margin-right: -1px;
  }
  /** customer: BUTTON; **/
  .pm-body input[type="button"], input[type="button"]:hover, input[type="button"]:focus {
    outline:0 !important;
  }
  .pm-body .button,.pm-body input[type="button"]:active {
    background-color: darkkhaki;
  }
  .inputCell {
    padding: 0 !important;
  }
  .inputCell > div {
    background-color:darkkhaki;
    padding: .325em;
  }
  .inputCell > div.focus, .inputCell > div.focus input[type="text"]  {
    background-color:blue;
    color:chocolate;
  }
  .inputCell input {
    background-color:darkkhaki;
    border:none;
    height:100%;
    font-size:1em;
    width:100%;
    padding:0;
  }
  .inputCell input:disabled {
    text-decoration: line-through;
    font-style: italic;
    color: gray;
  }
  .jsonTextArea {
    padding: 1em;
    background-color: darkblue;
  }
  .jsonTextArea textarea {
    border: none;
    border-radius: 0;
    width: 100%;
    background-color: darkblue;
    min-height:230px;
    font-size: 1.45em;
    color: green;
    resize:none;
  }
  .beautifulJson {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.5em 1.3em;
    background-color: aquamarine;
    color: brown;
    border-radius: 40px;
    user-select: none;
  }
  .jsonTextArea .warnning {
    color:red;
    font-style: italic;
    text-decoration: underline;
  }
}`;

const PM0 = styled(_PM0)`
    ${mixin}
`;

export default PM0;
