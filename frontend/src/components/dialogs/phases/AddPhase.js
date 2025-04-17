import React, { Component } from "react";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	MenuItem,
	Tabs,
	Tab,
	TextField,
} from "@mui/material";
import SwiftBoardAPI from "../../../api/SwiftBoardAPI";
import Phase from "../../../api/bo/Phase";

class AddPhaseDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			project: this.props.project,
			isOpen: this.props.isOpen,
			name: "",
			description: "",
			value: 0,
			phasesToAdd: [],
			phaseToAddId: [],
		};
	}

	addPhase = () => {
		if (this.state.value === 0) {
			var phase = new Phase();
			phase.setName(this.state.name);
			phase.setDescription(this.state.description);
			SwiftBoardAPI.getAPI()
				.addPhaseToProject(this.state.project.getId(), phase)
				.then((data) => {
					this.setState({
						name: "",
						description: ""
					});
					this.props.close();
				});
		} else {
			SwiftBoardAPI.getAPI()
				.addProjectPhase(this.state.project.getId(), this.state.phaseToAddId)
				.then((data) => {
					this.getPhaseToAdd()
					this.props.close();
				});
		}
	};

	getPhaseToAdd = () => {
		SwiftBoardAPI.getAPI()
			.getPhasesToAddToPoject(this.state.project.getId())
			.then((data) => {
				this.setState({
					phasesToAdd: data
				});
				if (data.length > 0) {
					this.setState({
						phaseToAddId: data[0].getId()
					});
				}
			});
	};

	handleNameChange = (value) => {
		this.setState({ name: value });
	};

	handleDescriptionChange = (value) => {
		this.setState({ description: value });
	};

	handlePhaseToAddIdChange = (value) => {
		this.setState({ phaseToAddId: value });
	};

	handleValueChange = (event, newValue) => {
		this.setState({ value: newValue });
		if (newValue === 1) {
			this.getPhaseToAdd();
		}
	};

	render() {
		const {
			value,
			name,
			description,
			phaseToAddId,
			phasesToAdd
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">New Phase</DialogTitle>
					<DialogContent>
						<Divider />
						<Tabs value={value} onChange={this.handleValueChange}>
							<Tab label="New Phase" />
							<Tab label="Existing Phase" />
						</Tabs>
						<Divider />
						<div style={{ height: "100%", width: "100%", paddingTop: "10px" }}>
							{
								value === 0 ?
									<Grid container spacing={3} justifyContent="center">
										<Grid item xs={12}>
											<TextField
												id="add-phase-name"
												style={{ width: "100%" }}
												label="Name"
												onChange={(event) =>
													this.handleNameChange(event.target.value)
												}
												value={name}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												id="add-description"
												style={{ width: "100%" }}
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
									: null
							}
							{
								value === 1 ?
									<Grid container spacing={3} justifyContent="center">
										<Grid item xs={12}>
											<TextField
												id="select-add-phase-name"
												style={{ width: "100%" }}
												label="Select Phase"
												select
												onChange={(event) =>
													this.handlePhaseToAddIdChange(event.target.value)
												}
												value={phaseToAddId}
											>
												{phasesToAdd.map((option) => (
													<MenuItem key={option} value={option.getId()}>
														{option.getName()}
													</MenuItem>
												))}
											</TextField>
										</Grid>
									</Grid>
									: null
							}
						</div>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="primary"
							disabled={value === 0 && !name.length > 0}
							onClick={this.addPhase}
						>
							Add Phase
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

AddPhaseDialog.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
};

export default AddPhaseDialog;