import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Divider,
	TextField,
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";
import Comment from "../../../api/bo/Comment";
import CommentComponent from "../../cards/Comment";

class CardCommentDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			card: this.props.card,
			comments: null,
			text: "",
		};
	}

	componentDidMount() {
		this.getCardComments();
	}

	getCardComments = () => {
		SwiftBoardAPI.getAPI()
			.getCommentByCardId(this.state.card.getId())
			.then((data) => {
				this.setState({
					comments: data
				});
			})
	};

	addCardComment = () => {
		var comment = new Comment();
		comment.setText(this.state.text);
		comment.setPersonId(this.state.user.getId());
		comment.setCardId(this.state.card.getId());
		SwiftBoardAPI.getAPI()
			.addComment(comment)
			.then((data) => {
				this.setState({
					text: "",
				});
				this.getCardComments();
			});
	};

	handleTextChange = (value) => {
		this.setState({ text: value });
	};

	render() {
		const {
			comments,
			card,
			user,
			text
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Kommentare für {card.getTitle()}</DialogTitle>
					<Divider />
					<DialogContent style={{ margin: "0px", padding: "0px" }}>
						<div
							style={{
								margin: "0px",
								padding: "0px",
								display: "flex",
								flexDirection: "column",
								width: "100%",
								height: "450px"
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									flex: 1,
									overflowY: "auto"
								}}
							>
								{
									comments && comments.length > 0 ?
										comments.map((comment, idx) => (
											<CommentComponent
												key={`comment-${idx}-${comment.getId()}-${comment.getLastUpdateAt()}`}
												user={user}
												card={card}
												comment={comment}
												refresh={this.getCardComments}
											/>
										))
										: null
								}
							</div>
							<div
								style={{
									display: "flex",
								}}
							>
								<Grid container spacing={3} justifyContent="center">
									<Grid item xs={12}>
										<TextField
											id="add-comment"
											style={{ width: "100%" }}
											placeholder="Kommentare eingeben "
											onChange={(event) =>
												this.handleTextChange(event.target.value)
											}
											onKeyUp={(evt) => {
												if (evt.key === 'Enter') {
													this.addCardComment();
													evt.preventDefault();
												}
											}}
											value={text}
										/>
									</Grid>
								</Grid>
							</div>
						</div>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Button
							variant="contained"
							color="red"
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

CardCommentDialog.propTypes = {
	user: PropTypes.object.isRequired,
	card: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
};

export default CardCommentDialog;