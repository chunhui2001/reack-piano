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
                <li>DELTE</li>
                <li>DELTE</li>
                <li>DELTE</li>
                <li>DELTE</li>
                <li>DELTE</li>
                <li>DELTE</li>
			</ul>
		</div>;
	}

}

let mixinSelect0 = css`&{
    background-color: green;
    display: inline-block;
    position: relative;
    :hover {
        background-color: red;
    }
    :hover > ul {
        display: inline;
    }
    > ul {
	    margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        left: 0;
        top:100%;
        margin-top: 0%;
        min-width: 100%;
        display: none;
    }
    > ul > li {
        background-color: red;
        background-color: blue;
    }
    > ul > li:hover {
        background-color: red;
    }
    .sel {
        padding: 0 .625em;
        display: inline-block;
    }
}`;

const Select0 = styled(_Select0)`
    ${mixinSelect0}
`;

export default Select0;
