import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeletePersonDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			person: props.person
		};
	}

	componentDidUpdate() {
		if (!this.props.person) {
			this.setState({
				person: this.props.person,
			});
		}
	}

	deletePerson = () => {
		SwiftBoardAPI.getAPI()
			.deletePerson(this.state.person.getId())
			.then(() => {
				this.props.close();
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
						Person
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to remove this team member?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deletePerson}
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

DeletePersonDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeletePersonDialog;