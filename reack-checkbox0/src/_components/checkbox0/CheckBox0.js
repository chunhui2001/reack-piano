import React, { Component } from 'react';
import styled, { css } from "styled-components";

export class _CheckBox0 extends Component {


	constructor(props) {
		super(props);
		this.state = {
		  
		};
	}

	componentDidMount() {

	}

	static getDerivedStateFromProps(props, state) {
	  return {
	    ...state,
	    checked: props.checked,
	    value: props.value,
	  };
	}

	onChange(e) {
		const { onChange } = this.props;
		if (onChange) {
			onChange(e);
		}
	}

	render() {
		return <span className={`${this.props.className}`} style={{display: 'inline-block'}}>
			<label className={`container ${this.props.size}`}>
			  <input type="checkbox" value={this.state.value} checked={this.state.checked} onChange={(e) => this.onChange(e)} />
			  <span className="checkmark"></span>
			</label>
		</span>;
	}
}

let mixinCheckBox0 = css`&{
	border: solid 1px gray;
	/** big **/
	.container.big .checkmark:after {
	    width: 7px;
	    height: 12px;
	    left: 8px;
	    top: 3px;
	}
	.container.big, .container.big input, .container.big .checkmark {
		height: 25px;
		width: 25px;
	}

	/** default **/
	.container.default .checkmark:after {
		width: 5px;
		height: 10px;
		left: 6px;
		top: 2px;
	}
	.container.default, .container.default input, .container.default .checkmark {
		height: 20px;
		width: 20px;
	}

	/** small **/
	.container.small .checkmark:after {
		width: 5px;
		height: 10px;
		left: 5px;
		top: 1px;
	}
	.container.small, .container.small input, .container.small .checkmark {
		height: 18px;
		width: 18px;
	}

	/* Customize the label (the container) */
	.container {
		display: table;
		position: relative;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-color: red;
	}

	/* Hide the browser's default checkbox */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		margin: 0;
		padding:0;
	}
	.container:after {
		clear: both;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #eee;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background-color: #2196F3;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.container .checkmark:after {
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
}`;

const CheckBox0 = styled(_CheckBox0)`
    ${mixinCheckBox0}
`;


export default CheckBox0;