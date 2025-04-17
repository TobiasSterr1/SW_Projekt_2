import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeletePhaseDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			phase: props.phase
		};
	}

	componentDidUpdate() {
		if (!this.props.phase) {
			this.setState({
				phase: this.props.phase,
			});
		}
	}

	deletePhase = () => {
		SwiftBoardAPI.getAPI()
			.deletePhase(this.state.phase.getId())
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
							Do you really wish to delete this phase?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deletePhase}
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

DeletePhaseDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	phase: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeletePhaseDialog;