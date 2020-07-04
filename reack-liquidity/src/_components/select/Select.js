import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _Select extends Component {


	constructor(props) {
		super(props);
		this.state = {

		};
	}

	onSelectedChange(e) {
		const { onChange } = this.props;
		this.setState({
			...this.state,
			val: e.target.value
		});
		if (onChange) {
			onChange(e.target.value);
		}
	}

	render() {
		return (
			<div className={`${this.props.className}`}>
				<select value={this.state.val} onChange={ (e) => this.onSelectedChange(e) }>
					<option value="mkt">Market order</option>
					<option value="fok">Fill or kill</option>
				</select>
			</div>
		);
	}

}


let mixin = css`&{
    /** customer: BUTTON; **/
	select, select:hover, select:focus {
	    outline:0 !important;
	    /*-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	    /*-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	    /*box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);*/
	}
}`;

const Select = styled(_Select)`
    ${mixin}
`;


export default Select;
