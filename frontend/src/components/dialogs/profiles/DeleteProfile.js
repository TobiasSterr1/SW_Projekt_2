import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app'
// import firebase from "firebase/app";

class DeleteProfileDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user
		};
	}

	deleteProfile = () => {
		SwiftBoardAPI.getAPI()
			.deletePerson(this.state.user.getId())
			.then(() => {
				this.props.close();
				firebase.auth().signOut();
			});
	}

	render() {
		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Profile
					</DialogTitle>
					<DialogContent>
						<Typography variant="h5">
							Do you really wish to delete your profile?
						</Typography>
						<Typography variant="h7">
							Warning: Deleting your profile will result in the automatic removal of your projects, along with their entire content.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteProfile}
						>
							Accept
						</Button>
						<Button
							variant="contained"
							style={{ backgroundColor: "red", color: "white" }}
							onClick={this.props.close}
						>
							Decline
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

DeleteProfileDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeleteProfileDialog;