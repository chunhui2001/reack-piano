import React from 'react';
// Styled components 💅 is library that allows you create components easily and
// style them, css-in-js style. It's totally optional, but I prefer to use it
// to build things quickly and have them look great every step of the way.
import styled from 'styled-components';

// Style components take CSS in a template string. Even Sass functions with work!
// Each element is a property of styled, like h3, p, div, etc...
const Clock0Wrapper = styled.button`
	border-radius: 8px;
	color: #fff;
	background: green;
	padding: 8px 15px;
	border: none;
	outline: none;
	border-radius: 0;
	cursor: pointer;
`;

// Components are functions, and they must start with a capital letter
function Clock0(props) {
	// {...props} uses the the ES6 spread operator to send any props you may pass
	// along without changing any of the contents. This is basically just creating
	// a copy to pass along
	return <Clock0Wrapper {...props}>{props.children}</Clock0Wrapper>;
}

// This export will be picked up in ./index.js
export default Clock0;
