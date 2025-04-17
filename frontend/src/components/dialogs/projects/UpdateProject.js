import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";

class UpdateProjectDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			project: this.props.project,
			title: this.props.project.getTitle(),
			startsAt: this.props.project.getStartsAt(),
			endsAt: this.props.project.getEndsAt(),
			description: this.props.project.getDescription(),
			personId: this.props.user.getId()
		};
	}

	componentDidMount() {
		if (!this.props.project) {
			this.setState({
				project: this.props.project,
				title: this.props.project.getTitle(),
				startsAt: this.props.project.getStartsAt(),
				endsAt: this.props.project.getEndsAt(),
				description: this.props.project.getDescription(),
				personId: this.props.user.getId()
			});
		}
	}

	updateProject = () => {
		var project = this.state.project;
		project.setTitle(this.state.title);
		project.setStartsAt(this.state.startsAt);
		project.setEndsAt(this.state.endsAt);
		project.setDescription(this.state.description);
		project.setPersonId(this.state.personId);
		SwiftBoardAPI.getAPI()
			.updateProject(project)
			.then(() => {
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

	render() {
		const {
			title,
			startsAt,
			endsAt,
			description
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Project Update</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									id="update-title"
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
									id="update-start-at"
									style={{width: "100%"}}
									label="Start At"
									onChange={(event) =>
										this.handleStartsAtChange(event.target.value)
									}
									value={startsAt ? startsAt : ""}
									type="date"
									InputProps={{
										readOnly: false
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="update-ends-at"
									style={{width: "100%"}}
									label="Ends At"
									onChange={(event) =>
										this.handleEndsAtChange(event.target.value)
									}
									value={endsAt ? endsAt : ""}
									type="date"
									InputProps={{
										readOnly: false
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="update-description"
									style={{width: "100%"}}
									label="Description"
									onChange={(event) =>
										this.handleDescriptionChange(event.target.value)
									}
									multiline
									rows={4}
									value={description}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							style={{ backgroundColor: "primary", color: "white" }}
							onClick={this.updateProject}
						>
							Update Project
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

UpdateProjectDialog.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default UpdateProjectDialog;