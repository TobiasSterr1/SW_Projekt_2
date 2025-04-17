import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";
import Card from "../../../api/bo/Card";

class AddKanbanCardDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			phase: this.props.phase,
			personId: this.props.user.getId(),
			members: null,
			title: "",
			startsAt: "",
			endsAt: "",
			description: "",
			points: 0,
			memberId: "",
			projectId: this.props.project.getId()
		};
	}

	componentDidMount() {
		this.getProjectTeam();
	}

	getProjectTeam = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPersons(this.state.projectId)
			.then((data) => {
				this.setState({
					members: data
				});
				if (data.length > 0) {
					this.setState({
						memberId: data[0].getId()
					});
				}
			})
	};

	addCard = () => {
		var card = new Card();
		card.setTitle(this.state.title);
		card.setStartsAt(this.state.startsAt);
		card.setEndsAt(this.state.endsAt);
		card.setDescription(this.state.description);
		card.setPoints(this.state.points);
		card.setPersonId(this.state.memberId);
		card.setProjectId(this.state.projectId);
		card.setPhaseId(this.state.phase.getId());
		SwiftBoardAPI.getAPI()
			.addCard(card)
			.then((data) => {
				this.setState({
					title: "",
					startsAt: "",
					endsAt: "",
					description: "",
					points: 0,
					personId: this.props.user.getId(),
					projectId: this.props.projectId,
					memberId: null,
					phase: this.props.phase
				});
				this.props.close();
			});
	};

	handleTitleChange = (value) => {
		this.setState({ title: value });
	};

	handleStartsAtChange = (value) => {
		this.setState({ startsAt: value });
	};

	handleEndsAtChange = (value) => {
		this.setState({ endsAt: value });
	};

	handleDescriptionChange = (value) => {
		this.setState({ description: value });
	};

	handlePointsChange = (value) => {
		this.setState({ points: parseInt(value) });
	};

	handleMemberChange = (value) => {
		this.setState({ memberId: value });
	};

	render() {
		const {
			phase,
			members,
			memberId,
			title,
			startsAt,
			endsAt,
			description,
			points
		} = this.state;
		const { project } = this.props;

		return (
			<div>
				{
					members ?
					<Dialog
						fullWidth
						open={this.props.isOpen}
						onClose={this.props.close}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add Card in {phase.getName()}</DialogTitle>
						<DialogContent>
							<Grid container spacing={3} justifyContent="center">
									<Grid item xs={6}>
										<TextField
											id="add-title"
											style={{width: "100%"}}
											label="Title"
											onChange={(event) =>
												this.handleTitleChange(event.target.value)
											}
											value={title}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="add-points"
											type="number"
											style={{width: "100%"}}
											label="StoryPoints"
											onChange={(event) =>
												this.handlePointsChange(event.target.value)
											}
											value={points}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="add-starts-at"
											style={{width: "100%"}}
											label="Starts At"
											onChange={(event) =>
												this.handleStartsAtChange(event.target.value)
											}
											value={startsAt}
											type="date"
											inputProps={{
												min: project.getStartsAt(),
												max: project.getEndsAt()
											}}
											InputProps={{
												readOnly: false,
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="add-ends-at"
											style={{width: "100%"}}
											label="Ends At"
											onChange={(event) =>
												this.handleEndsAtChange(event.target.value)
											}
											value={endsAt}
											type="date"
											inputProps={{
												min: project.getStartsAt(),
												max: project.getEndsAt()
											}}
											InputProps={{
												readOnly: false
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="add-assign-to"
											style={{ width: "100%" }}
											label="Assign to"
											select
											onChange={(event) =>
												this.handleMemberChange(event.target.value)
											}
											value={memberId ? memberId : 0}
										>
											<MenuItem value="">{""}</MenuItem>
											{members.map((option) => (
												<MenuItem key={option.getId()} value={option.getId()}>
													{option.getFirstname()}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="add-description"
											style={{width: "100%"}}
											label="Description"
											onChange={(event) =>
												this.handleDescriptionChange(event.target.value)
											}
											value={description}
											multiline
											rows={4}
										/>
									</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button
								variant="contained"
								color="primary"
								disabled={!title.length > 0 || !startsAt.length > 0 || !endsAt.length > 0 || !points > 0}
								onClick={this.addCard}
							>
								Add Card
							</Button>
							<Button
								variant="contained"
								color="red"
								onClick={this.props.close}
							>
								Close
							</Button>
						</DialogActions>
					</Dialog>
					: null
				}
			</div>
		);
	}
}

AddKanbanCardDialog.propTypes = {
	user: PropTypes.object.isRequired,
	phase: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
};

export default AddKanbanCardDialog;