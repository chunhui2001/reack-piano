import React, { Component } from "react";

import {Button} from "reack-button0";

class Login0 extends Component {

	onLogin() {
		
		const { onLoginClick } = this.props;

        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

		onLoginClick({ username: username, password: password });

	}

	render() {
		return (
			<div style={{ display: "inline-block", maxWidth: "650px", backgroundColor: "red", padding: "1em" }}>
				<div>
					<span>用户名： </span><input ref={input => (this.usernameInput = input)} type={'text'} />
				</div>
				<div>
					<span>密码： </span><input ref={input => (this.passwordInput = input)} type={'password'} />
				</div>
				<Button onClick={this.onLogin.bind(this)} style={{ fontSize:'1em' }}>登入</Button>
			</div>
		);
	}
}

export default Login0;
