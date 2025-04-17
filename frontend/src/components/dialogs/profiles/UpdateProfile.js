import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class UpdateProfileDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			user: this.props.user,
			firstname: this.props.user.getFirstname(),
			lastname: this.props.user.getLastname(),
			username: this.props.user.getUsername(),
			email: this.props.user.getEmail()
		};
	}

	componentDidMount() { }

	updateProfile = () => {
		var person = this.state.user;
		person.setFirstname(this.state.firstname);
		person.setLastname(this.state.lastname);
		person.setUsername(this.state.username);
		person.setEmail(this.state.email);
		SwiftBoardAPI.getAPI()
			.updatePerson(person)
			.then(() => {
				this.props.close();
			});
	};

	handleFirstnameChange = (value) => {
		this.setState({ firstname: value });
	};

	handleLastnameChange = (value) => {
		this.setState({ lastname: value });
	};

	handleUsernameChange = (value) => {
		this.setState({ username: value });
	};

	handleEmailChange = (value) => {
		this.setState({ email: value });
	};

	render() {
		const { lastname, firstname, username, email } = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Profile Update</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={6}>
								<TextField
									id="update-profile-firstname"
									style={{ width: "100%" }}
									label="First Name"
									onChange={(event) =>
										this.handleFirstnameChange(event.target.value)
									}
									value={firstname}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-profile-lastname"
									style={{ width: "100%" }}
									label="Last Name"
									onChange={(event) =>
										this.handleLastnameChange(event.target.value)
									}
									value={lastname}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-profile-username"
									style={{ width: "100%" }}
									label="Username"
									onChange={(event) =>
										this.handleUsernameChange(event.target.value)
									}
									value={username}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-profile-email"
									style={{ width: "100%" }}
									label="Email"
									onChange={(event) =>
										this.handleEmailChange(event.target.value)
									}
									value={email}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.updateProfile}
						>
							Update Profile
						</Button>
						<Button
							variant="contained"
							color="red"
							onClick={this.props.close}
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

UpdateProfileDialog.propTypes = {
	user: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;