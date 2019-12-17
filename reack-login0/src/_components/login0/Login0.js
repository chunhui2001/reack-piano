import React, { Component } from "react";

import {Button} from "reack-button0";

class Login0 extends Component {

	onLogin() {
		
		const { onLoginClick } = this.props;

		onLoginClick(true);

	}

	render() {
		return (
			<div style={{ display: "inline-block", maxWidth: "650px", backgroundColor: "red", padding: "1em" }}>
				<div>
					<span>用户名： </span><input type="text" name="username" id="username" />
				</div>
				<div>
					<span>密码： </span><input type="password" name="passwd" id="passwd" />
				</div>
				<Button onClick={this.onLogin.bind(this)}>登入</Button>
			</div>
		);
	}
}

export default Login0;
