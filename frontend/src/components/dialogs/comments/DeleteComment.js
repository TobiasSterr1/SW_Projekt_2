import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class DeleteCommentDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			comment: this.props.comment
		};
	}

	componentDidUpdate() {
		if (!this.props.comment) {
			this.setState({
				comment: this.props.comment,
			});
		}
	}

	deleteComment = () => {
		SwiftBoardAPI.getAPI()
			.deleteComment(this.state.comment.getId())
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
					Delete comment
					</DialogTitle>
					<DialogContent>
						<Typography>
							Do you really wish to delete this comment?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.deleteComment}
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

DeleteCommentDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default DeleteCommentDialog;