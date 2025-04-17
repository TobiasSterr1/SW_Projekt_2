import React, { Component } from "react";
import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Divider, ListItemText, Typography } from "@mui/material";
import {
	Delete as DeleteIcon,
	EditNoteOutlined as EditIcon,
} from "@mui/icons-material";
import DeleteCommentDialog from "../dialogs/comments/DeleteComment";
import UpdateCommentDialog from "../dialogs/comments/UpdateComment";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";


class CommentComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			card: this.props.card,
			comment: this.props.comment,
			showEditComment: false,
			showDeleteComment: false,
			person: null
		};
	}

	componentDidMount() {
		this.getPersonById();

	}

	getPersonById = () => {
		SwiftBoardAPI.getAPI()
			.getPersonById(this.state.comment.getPersonId())
			.then((data) => {
				this.setState({ person: data });
			});
	};

	openEditCommentDialog = () => {
		this.setState({
			showEditComment: true
		});
	}

	closeEditCommentDialog = () => {
		this.setState({
			showEditComment: false
		});
		this.props.refresh();
	}

	openDeleteCommentDialog = () => {
		this.setState({
			showDeleteComment: true
		});
	}

	closeDeleteCommentDialog = () => {
		this.setState({
			showDeleteComment: false
		});
		this.props.refresh();
	}

	render() {
		const { comment, user, person, showEditComment, showDeleteComment } = this.state;
		return (
			<div style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				maxHeight: "300px",
				border: 1,
				backgroundColor: "primary",
				padding: "1px",
				alignItems: comment.getPersonId() === user.getId() ? "flex-end" : "flex-start"
			}}>

				<div
					style={{
						minWidth: "50%",
						maxWidth: "70%",
						padding: "5px"
					}}
				>
					{
						person &&
						<Card
							variant="div"
							sx={{
								display: "flex",
								width: "100%",
								border: 1,
								borderStyle: "solid",
								borderColor: comment.getPersonId() === user.getId() ? "primary" : "red",
								color: "primary"
							}}
						>
							<CardContent
								style={{
									display: "flex",
									flexDirection: comment.getPersonId() === user.getId() ? "row" : "row-reverse",
									gap: "2px",
									padding: "2px",
									alignItems: "center",
									width: "100%",
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
									<Avatar
										src={user.getAvatar()} alt={user.getFirstname()} style={{ marginRight: '8px' }} />
								</div>
								<div
									style={{ width: "100%" }}
								>
									<div>
										<ListItemText
											style={{ padding: "1px" }}
											secondary={comment.getText()}
										/>
									</div>
									<Divider />
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "row"
										}}
									>
										<div
											style={{
												display: "flex",
												flex: 1,
												gap: "5px"
											}}
										>
											<Typography style={{ fontSize: "10px" }}>
												{comment.getCreatedAt().split("T")[0]}
											</Typography>
											<Typography style={{ fontSize: "10px" }}>
												{person.getFirstname()}
											</Typography>
										</div>
										<div>
											{
												comment.getPersonId() === user.getId() ?
													<>
														<DeleteIcon
															onClick={this.openDeleteCommentDialog}
															style={{
																marginLeft: "10px",
																color: "red",
																cursor: "pointer"
															}}
														/>
														<EditIcon
															onClick={this.openEditCommentDialog}
															style={{
																color: "primary",
																cursor: "pointer"
															}}
														/>
													</>
													: null
											}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					}
				</div>
				<DeleteCommentDialog
					user={user}
					comment={comment}
					isOpen={showDeleteComment}
					close={this.closeDeleteCommentDialog}
				/>
				<UpdateCommentDialog
					user={user}
					comment={comment}
					isOpen={showEditComment}
					close={this.closeEditCommentDialog}
				/>
			</div>
		);
	}
}

CommentComponent.propTypes = {
	user: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	card: PropTypes.object.isRequired,
	refresh: PropTypes.func.isRequired
};

export default CommentComponent;