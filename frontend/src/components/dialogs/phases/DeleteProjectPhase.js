import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeleteProjectPhaseDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			phase: this.props.phase,
			project: this.props.project
		};
	}

	componentDidUpdate() {
		if (!this.props.phase) {
			this.setState({
				phase: this.props.phase,
			});
		}
	}

	deleteProjectPhase = () => {
		SwiftBoardAPI.getAPI()
			.deleteProjectPhase(this.state.project.getId(), this.state.phase.getId())
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
						Phase
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to delete this phase from the project? Warning: By doing so all of the cards within this phase will be deleted too.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteProjectPhase}
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

DeleteProjectPhaseDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	phase: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeleteProjectPhaseDialog;