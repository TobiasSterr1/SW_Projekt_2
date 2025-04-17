import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class UpdatePersonDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			person: this.props.person,
			username: this.props.person.getUsername(),
			firstname: this.props.person.getFirstname(),
			lastname: this.props.person.getLastname(),
			email: this.props.person.getEmail(),
			personId: this.props.user.getId()
		};
	}

	componentDidMount() {
		if (!this.props.person) {
			this.setState({
				person: this.props.person,
				username: this.props.person.getUsername(),
				firstname: this.props.person.getFirstname(),
				lastname: this.props.person.getLastname(),
				email: this.props.person.getEmail(),
				personId: this.props.user.getId()
			});
		}
	}

	updatePerson = () => {
		var person = this.state.person;
		person.setUsername(this.state.username);
		person.setFirstname(this.state.firstname);
		person.setLastname(this.state.lastname);
		person.setEmail(this.state.email);
		SwiftBoardAPI.getAPI()
			.updatePerson(person)
			.then(() => {
				this.props.close();
			});
	};

	handleUsernameChange = (value) => {
		this.setState({ username: value });
	};

	handleFirstnameChange = (value) => {
		this.setState({ firstname: value });
	};

	handleLastnameChange = (value) => {
		this.setState({ lastname: value });
	};

	handleEmailChange = (value) => {
		this.setState({ email: value });
	};

	render() {
		const {
			username,
			firstname,
			lastname,
			email
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Person Aktualisieren</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={6}>
								<TextField
									id="update-username"
									label="Benutzername"
									onChange={(event) =>
										this.handleUsernameChange(event.target.value)
									}
									value={username}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="add-firstname"
									label="Vorname"
									onChange={(event) =>
										this.handleFirstnameChange(event.target.value)
									}
									value={firstname}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-lastname"
									label="Nachname"
									onChange={(event) =>
										this.handleLastnameChange(event.target.value)
									}
									value={lastname}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-email"
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
							color="primary"
							disabled={!email.length > 0 || !lastname.length > 0}
							onClick={this.updatePerson}
						>
							Update Person
						</Button>
						<Button
							variant="contained"
							color="secondary"
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

UpdatePersonDialog.propTypes = {
	user: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default UpdatePersonDialog;