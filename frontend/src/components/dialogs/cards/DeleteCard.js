import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeleteKanbanCardDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			user: this.props.user,
			card: props.card
		};
	}

	componentDidUpdate() {
		if (!this.props.card) {
			this.setState({
				card: this.props.card,
			});
		}
	}

	deleteCard = () => {
		SwiftBoardAPI.getAPI()
			.deleteCard(this.state.card.getId())
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
						Kanban Card
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to delete this Kanban Card?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteCard}
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

DeleteKanbanCardDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	card: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeleteKanbanCardDialog;