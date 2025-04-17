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
import Project from "../../../api/bo/Project";

class AddProjectDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			title: "",
			startsAt: "",
			endsAt: "",
			description: "",
			personId: this.props.user.getId()
		};
	}

	addProject = () => {
		var project = new Project();
		project.setTitle(this.state.title);
		project.setStartsAt(this.state.startsAt);
		project.setEndsAt(this.state.endsAt);
		project.setDescription(this.state.description);
		project.setPersonId(this.state.personId);
		SwiftBoardAPI.getAPI()
			.addProject(project)
			.then((data) => {
				this.setState({
					title: "",
					startsAt: "",
					endsAt: "",
					description: "",
					personId: this.props.user.getId()
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
					<DialogTitle id="form-dialog-title">New Project</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
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
									id="add-start-at"
									style={{width: "100%"}}
									label="Start At"
									onChange={(event) =>
										this.handleStartsAtChange(event.target.value)
									}
									value={startsAt}
									type="date"
									InputProps={{
										readOnly: false
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
									InputProps={{
										readOnly: false
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="add-description"
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
							color="primary"
							onClick={this.addProject}
						>
							Add Project
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

AddProjectDialog.propTypes = {
	user: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default AddProjectDialog;