import React, { Component } from 'react';

import styled, { css } from "styled-components";

export class _PM0 extends Component {

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
      	<div className={'pm-body'}>
			<input type="text" />
	        <input type="button" value="Send" />
	        <input type="button" value="ping" />
      	</div>
        <div className={'pm-body'}>
        	<div className={'pm-tab'}>
        		<span className={'active'}>Params</span>
        		<span>Authorization</span>
        		<span>Headers(1)</span>
        		<span>Body</span>
        	</div>
        	<div className={'tab-panel'}>
        		<div style={{color:'gray'}}>Query Params</div>
        		<table className={'query-params-table'}>
        			<tbody>
        				<tr>
        					<td>&nbsp;</td>
        					<td>KEY</td>
        					<td>VALUE</td>
        					<td>DESCRIPTION</td>
        				</tr>
        				<tr>
        					<td style={{textAlign:'right'}}><input type="checkbox" /></td>
        					<td>&nbsp;</td>
        					<td>&nbsp;</td>
        					<td>&nbsp;</td>
        				</tr>
        			</tbody>
        		</table>
        	</div>
        </div>
      </div>
    );
  }
}



let mixin = css`&{
	max-width: 600px;
	.pm-body {
		margin: .5em 0;
	}
	.pm-body input {
		font-size:1.125em;
		padding:.125em .625em;
		margin-right:.325em;
	}
	.pm-tab {
		background-color:aliceblue;
    	border-bottom:solid 1px darkolivegreen;
	}
    .pm-tab span {
    	display:inline-block;
    	padding:.325em 1em;
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
    .query-params-table {
    	border-spacing: 0;
    	width: 100%;
    }
    .query-params-table td {
    	border-right: solid 1px gray;
    	border-bottom: solid 1px gray;
    	padding: .125em .625em;
    	font-size: .925em;
    }

    .query-params-table tr td:nth-last-child(1){
    	border-right: none;
    }
}`;

const PM0 = styled(_PM0)`
    ${mixin}
`;

export default PM0;
