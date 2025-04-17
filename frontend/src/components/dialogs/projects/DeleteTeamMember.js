import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeleteTeamMemberDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			user: this.props.user,
			project: this.props.project,
			member: this.props.member
		};
	}

	componentDidUpdate() {}

	deleteTeamMember = () => {
		SwiftBoardAPI.getAPI()
			.deleteProjectPerson(
				this.state.project.getId(),
				this.state.member.getId()
			)
			.then(() => {
				this.props.refresh();
				this.props.close();
			});
	}

	render() {
		const { project, member } = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to remove {member.getFirstname()} from project {project.getTitle()} ?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteTeamMember}
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

DeleteTeamMemberDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	member: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	refresh: PropTypes.func.isRequired
}

export default DeleteTeamMemberDialog;