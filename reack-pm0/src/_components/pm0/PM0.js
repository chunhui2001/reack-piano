import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _PM0 extends Component {

  responseComponent = null;

  constructor(props) {
    super(props);
    this.state = {
      tabName: 'params',
      pmForm: {
        inputTextValue: ''
      }
    };
  }

  handleInputTextChange (e) {
    let keyArr = e.target.name.split('.');
    if (keyArr.length === 1) {
      this.setState({ 
        ...this.state,
        pmForm: {
          ...this.state.pmForm,
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

  handPmTabClick(tabName, e) {
    this.setState({
      ...this.state,
      tabName: tabName
    }) 
  }

  onSendClick() {

  }

  onButtonClick(type, e) {
    const { onButtonClickHand } = this.props;
    let _inputTextValue = this.state.pmForm.inputTextValue;
    if (!_inputTextValue || !_inputTextValue.trim()) {
      return;
    }
    if (!onButtonClickHand) {
      return;
    }
    onButtonClickHand(this, type, _inputTextValue);
  }

  getResponseComponent() {
      if (this.responseComponent) {
          return this.responseComponent;
      }
      return <h1>888</h1>;
  }

  refresh() {
    this.setState({
      ...this.state,
      timestamp: new Date().getTime()
    });
  }

  render() {

    const { 
      pmForm
    } = this.state;

    return (
        <div className={`${this.props.className} PM0`}>
        	<div className={'pm-body'}>
            <input style={{width:'465px'}} type="text" name='inputTextValue' 
                  onChange={(e) => {this.handleInputTextChange(e)}} value={pmForm.inputTextValue || ''} />
            <input onClick={this.onButtonClick.bind(this, 'send')} disabled={!pmForm.inputTextValue.trim()} type="button" value="Send" />
            <input onClick={this.onButtonClick.bind(this, 'ping')} disabled={!pmForm.inputTextValue.trim()} style={{marginRight: 0}} type="button" value="ping" />
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

  bodyTabsSection() {
    return <div className={'tab-panel tab-bodys'}>
              <div style={{color:'gray', padding: '0.425em .625em', backgroundColor: 'lavender'}}>
                <span><input name="g" id="r-none" type="radio" /><label htmlFor="r-none">NONE</label></span>
                <span><input name="g" id="r-form-data" type="radio" /><label htmlFor="r-form-data">form-data</label></span>
                <span><input name="g" id="r-form-urlencoded" type="radio" /><label htmlFor="r-form-urlencoded">x-www-form-urlencoded</label></span>
                <span><input name="g" id="r-form-raw" type="radio" /><label htmlFor="r-form-raw">raw</label></span>
                <span><input name="g" id="r-form-binary" type="radio" /><label htmlFor="r-form-binary">binary</label></span>
                <div className={'clear'}></div>
              </div>
              <div style={{padding:'1em'}}>
                1 <br />
                1 <br />
                1 <br />
                1 <br />
              </div>
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
  .clear {
    float: none;
    clear: both;
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
	}
	.pm-body input {
		font-size:1.125em;
		padding:.225em .325em;
		margin-right:.325em;
	}
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
    }
}`;

const PM0 = styled(_PM0)`
    ${mixin}
`;

export default PM0;
