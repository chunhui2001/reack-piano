import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _Select0 extends Component {

	render() {
		return <div className={`${this.props.className} Select0`}>
			<span className={'sel'}>--请选择--</span>
			<ul className={`${this.props.className} Select0`}>
				<li>GET</li>
				<li>POST</li>
				<li>DELTE</li>
			</ul>
		</div>;
	}

}

let mixinSelect0 = css`&{
    background-color: aqua;
    display: inline-block;
    position: relative;
    overflow: hidden;
    >span:hover {
    	background-color: blue;
    }
    > ul {
    	margin: 0;
    	padding: 0;
    	list-style: none;
    	position: absolute;
    	left: 0;
    	margin-top: 22px;
    	min-width: 100%;
    }
    .sel {
    	background-color: green;
    }
}`;

const Select0 = styled(_Select0)`
    ${mixinSelect0}
`;

export default Select0;
