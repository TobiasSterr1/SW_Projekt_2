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

class UpdateKanbanCardDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			user: this.props.user,
			card: this.props.card,
			members: [],
			phases: [],
			title: this.props.card.getTitle(),
			startsAt: this.props.card.getStartsAt(),
			endsAt: this.props.card.getEndsAt(),
			description: this.props.card.getDescription(),
			points: this.props.card.getPoints(),
			personId: this.props.user.getId(),
			projectId: this.props.card.getProjectId(),
			memberId: this.props.card.getPersonId(),
			phaseId: this.props.card.getPhaseId()
		};
	}

	componentDidMount() {
		this.getProjectTeam();
		this.getProjectPhases();
	}

	getProjectTeam = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPersons(this.state.projectId)
			.then((data) => {
				this.setState({
					members: data
				});
			})
	};

	getProjectPhases = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPhases(this.state.projectId)
			.then((data) => {
				this.setState({
					phases: data
				});
			})
	}

	updateCard = () => {
		var card = this.state.card
		card.setTitle(this.state.title);
		card.setStartsAt(this.state.startsAt);
		card.setEndsAt(this.state.endsAt);
		card.setDescription(this.state.description);
		card.setPoints(this.state.points);
		card.setPersonId(this.state.memberId);
		card.setProjectId(this.state.projectId);
		card.setPhaseId(this.state.phaseId);
		SwiftBoardAPI.getAPI()
			.updateCard(card)
			.then(() => {
				this.props.refresh();
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

	handlePhaseChange = (value) => {
		this.setState({ phaseId: value });
	};

	render() {
		const {
			title,
			startsAt,
			endsAt,
			memberId,
			phaseId,
			description,
			points,
			members,
			phases
		} = this.state;
		const { project } = this.props;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Update Kanban Card</DialogTitle>
					<DialogContent>
							<Grid container spacing={3} justifyContent="center">
									<Grid item xs={6}>
										<TextField
											id="update-card-name"
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
											id="update-card-points"
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
											id="update-card-starts-at"
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
												readOnly: false
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="update-card-ends-at"
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
									<Grid item xs={6}>
										<TextField
											id="update-card-assign-to"
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
									<Grid item xs={6}>
										<TextField
											id="update-card-phase"
											style={{ width: "100%" }}
											label="New Phase"
											select
											onChange={(event) =>
												this.handlePhaseChange(event.target.value)
											}
											value={phaseId}
										>
											{phases.map((option) => (
												<MenuItem key={option.getId()} value={option.getId()}>
													{option.getName()}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="update-card-description"
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
							onClick={this.updateCard}
						>
							Update Card
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
			</div>
		);
	}
}

UpdateKanbanCardDialog.propTypes = {
	user: PropTypes.object.isRequired,
	card: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	refresh: PropTypes.func.isRequired,
};

export default UpdateKanbanCardDialog;