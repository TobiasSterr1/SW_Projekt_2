import React, { Component } from "react";
import PropTypes from "prop-types";
import "../assets/css/login.css";

class Login extends Component {
	handleSignInButton = () => {
		this.props.onSignIn();
	};

	/** Rendert die Seite zum Einloggen in die Applikation */
	render() {
		//const {} = this.props;

		return (
			<div className="main-login dflex">
				<div className="login-content">
					<h1>Your Project Management App</h1>
					<p>Manage your projects efficiently with SwiftBoard.</p>
					<button className="google-login-button" onClick={this.handleSignInButton}>
						{/*<GoogleIcon className="google-icon" />*/}
						Log in with Google
					</button>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	onSignIn: PropTypes.func.isRequired,
};

export default Login;