import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _Drop0 extends Component {

	render() {
		return <div className={`${this.props.className} Drop0`}>
            <div style={{display:'table', height:'100%'}}>
			     <span className={'drop'}>--请选择--</span>
            </div>
			<ul>
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

let mixinDrop0 = css`&{
    background-color: green;
    display: inline-block;
    position: relative;
    height:100%
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
    .drop {
        padding: 0 .625em;
        display: table-cell;
        height: 100%;
        vertical-align: middle;
    }
}`;

const Drop0 = styled(_Drop0)`
    ${mixinDrop0}
`;

export default Drop0;
