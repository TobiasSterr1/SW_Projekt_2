import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeleteProjectDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			project: props.project
		};
	}

	componentDidUpdate() {
		if (!this.props.project.getId) {
			this.setState({
				project: this.props.project,
			});
		}
	}

	deleteProject = () => {
		SwiftBoardAPI.getAPI()
			.deleteProject(this.state.project.getId())
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
						Delete Project
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to delete this project? Warning: By doing so, the entire content will be deleted.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteProject}
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

DeleteProjectDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeleteProjectDialog;