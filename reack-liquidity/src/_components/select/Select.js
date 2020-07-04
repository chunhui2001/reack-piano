import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _Select extends Component {


	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className={`${this.props.className}`}>
				Select
			</div>
		);
	}

}


let mixin = css`&{
	
}`;

const Select = styled(_Select)`
    ${mixin}
`;


export default Select;
