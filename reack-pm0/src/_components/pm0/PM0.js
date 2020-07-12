import React, { Component } from 'react';
import styled, { css } from "styled-components";

import PMSchema from "../schema/PMSchema";

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      tabName: this.state.tabName || nextProps.activeTab,
      theSchema: nextProps.schema
    });
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
      });
    }
  }

  handPmTabClick(tabName) {
    if (tabName === 'params') {
      this.pubQueryParamsItems(() => {
        this.setState({
          ...this.state,
          tabName: tabName
        }) ;
      });
      return;
    }
    this.setState({
      ...this.state,
      tabName: tabName
    }, () => this.refresh()) ;
  }

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

  getResponseComponent() {
      if (this.responseComponent) {
          return this.responseComponent;
      }
      return <h1 style={{textAlign: 'center', padding: '1em', color: 'gray'}}>Current does not have response.</h1>;
  }

  refresh() {
    this.setState({
      ...this.state,
      timestamp: new Date().getTime()
    });
  }

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

  paramsTabSection() {
    return <div className={'tab-panel tab-params'}>
              <div style={{color:'gray', padding: '0.425em .625em', fontStyle: 'italic', backgroundColor: 'mintcream'}}>Query Params</div>
              <table className={'query-params-table'}>
                <tbody>
                  <tr>
                    <th style={{width:'25px'}}>&nbsp;</th>
                    <th>KEY</th>
                    <th>VALUE</th>
                    <th>DESCRIPTION</th>
                  </tr>
                  { this.getQueryParamsItems() }
                </tbody>
              </table>
            </div>;
  }

  pubQueryParamsItems = (done) => {
    let queryParamsItems = [
      {
        key: 'a',
        val: 1,
        desc: 'desc1'
      },
      {
        key: 'b',
        val: '2',
        desc: 'desc2'
      }
    ];
    this.setState({
      ...this.state,
      queryParamsItems: queryParamsItems
    }, () => { done(); });
  }

  getQueryParamsItems = () => {
    return this.state.queryParamsItems && this.state.queryParamsItems.map((item, i) => {
      return <tr key={i}>
        <td style={{textAlign:'right'}}><input type="checkbox" /></td>
        <td className={'inputCell'}>
          <div><input type="text" value={item.key} onChange={ (e) => this.onQueryParamsItemChange(e, i) } name='key' /></div>
        </td>
        <td className={'inputCell'}>
          <div><input type="text" value={item.val} onChange={ (e) => this.onQueryParamsItemChange(e, i) } name='val' /></div>
        </td>
        <td className={'inputCell'}>
          <div><input type="text" value={item.desc} onChange={ (e) => this.onQueryParamsItemChange(e, i) } name='desc' /></div>
        </td>
      </tr>;
    }) ;
  }

  onQueryParamsItemChange = (e, index) => {
    let currentValue = e.target.value;
    let currentField = e.target.name;
    let queryParamsItemsUpdated = this.state.queryParamsItems;
    queryParamsItemsUpdated[index][currentField] = currentValue;
    this.setState({
      ...this.state,
      queryParamsItems: queryParamsItemsUpdated,
      theSchema: {
        ...this.state.theSchema,
        inputGroupText: "2222"
      }
    });
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
              { this.getEditerTable() }
             </div>;
    } else if (this.state.theSchema.bodyRadioSelected === 'www-form-urlencoded') {
      return <div>
              { this.getEditerTable() }
             </div>;
    } else if (this.state.theSchema.bodyRadioSelected === 'application/json') {
      return <div style={{ position:'relative' }}>
               <div className={'jsonTextArea'}>
                <textarea name='bodyRequestData' 
                          onChange={(e) => {this.handleInputTextChange(e)}}
                          value={ this.state.theSchema.bodyRequestData || '{}' }></textarea>
               </div>
               <div className={'beautifulJson'} onClick={ this.beautifulJsonClick.bind(this) }>美化</div>
               <div style={{ textAlign:'center', display:'none' }}>加高</div>
             </div>;
    } 
    // others
    return <div style={{ position:'relative' }}>
               <div className={'jsonTextArea'} style={{ backgroundColor: 'darkblue' }}>
                <textarea name='bodyRequestData' style={{ backgroundColor: 'darkblue' }}
                          onChange={(e) => {this.handleInputTextChange(e)}}
                          value={ this.state.theSchema.bodyRequestData }></textarea>
               </div>
             </div>;
  }

  beautifulJsonClick() {
    this.setState({
      ...this.state,
      theSchema: {
        ...this.state.theSchema,
        bodyRequestData: JSON.stringify(JSON.parse(this.state.theSchema.bodyRequestData), null, 2)
      }
    });
  }

  getBodyRadioSelectedChecked() {
    if (this.state.theSchema.bodyRadioSelected === 'none') {
      return false;
    }
    if (this.state.theSchema.bodyRadioSelected === 'www-form-urlencoded') {
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
                    type="text" value={ this.state.bodyRadioOtherValue || '' } />;
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
                <span><input name="g" id="r-form-urlencoded" type="radio" checked={ this.state.theSchema.bodyRadioSelected === 'www-form-urlencoded' }
                             onChange={ (e) => this.bodyRadioClick(e, 'www-form-urlencoded') } /><label htmlFor="r-form-urlencoded">x-www-form-urlencoded</label></span>
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
              <table className={'query-params-table'}>
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
  .pm
	.pm-m {
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
  .query-params-table {
  	border-spacing: 0;
  	width: 100%;
  	border-top: solid 1px gainsboro;
  }
  .query-params-table td, .query-params-table th {
  	border-right: solid 1px gainsboro;
  	border-bottom: solid 1px gainsboro;
  	padding: .325em .625em;
  	font-size: .925em;
  }
  .query-params-table tr td:nth-last-child(1), .query-params-table tr th:nth-last-child(1){
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
  .inputCell input {
    background-color:darkkhaki;
    border:none;
    height:100%;
    font-size:1.325em;
    width:100%;
    padding:0;
  }
  .jsonTextArea {
    padding: 1em;
    background-color: darkolivegreen;
  }
  .jsonTextArea textarea {
    border: none;
    border-radius: 0;
    width: 100%;
    background-color: darkolivegreen;
    min-height:230px;
    font-size: 1.45em;
    color: gold;
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
}`;

const PM0 = styled(_PM0)`
    ${mixin}
`;

export default PM0;
