import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class UpdateCommentDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			comment: this.props.comment,
			text: this.props.comment.getText()
		};
	}

	updateComment = () => {
		var com = this.state.comment;
		com.setText(this.state.text);
		SwiftBoardAPI.getAPI()
			.updateComment(com)
			.then(() => {
				this.props.close();
			});
	}

	handelTextChange = (value) => {
		this.setState({
			text: value
		});
	}

	render() {
		const { text } = this.state;
		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Update Comment
					</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									id="update-comment-text"
									style={{ width: "100%" }}
									label="Text"
									onChange={(event) =>
										this.handelTextChange(event.target.value)
									}
									value={text}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							disabled={!text.length > 0}
							onClick={this.updateComment}
						>
							Update
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

UpdateCommentDialog.propTypes = {
	/** @ignore */
	user: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default UpdateCommentDialog;