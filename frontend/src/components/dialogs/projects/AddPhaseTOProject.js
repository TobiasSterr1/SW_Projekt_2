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

class AddProjectPhaseDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			projectId: this.props.project.getId(),
			phases: [],
			phaseId: null
		};
	}

	componentDidMount() {
    if (!this.props.memberId) {
      this.getPhaseToAdd()
    }
  }

	addPhaseToProject = () => {
		if(!this.state.memberId){
			return;
		}
		SwiftBoardAPI.getAPI()
			.addProjectPhase(
				this.state.projectId,
				this.state.phaseId
				)
			.then(() => {
				this.setState({
					phaseId: null
				});
				this.props.close();
			});
	};

	getPhaseToAdd(){
		SwiftBoardAPI.getAPI()
			.getPhasesToAddToPoject(this.state.projectId)
			.then((data) => {
				this.setState({
					phases: data
				});
			});
	}

	handlePhaseChange = (value) => {
		this.setState({ phaseId: value });
	};

	render() {
		const {
			phases,
			phaseId
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Add Phase to Project</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									id="add-phase-to-project"
									style={{width: "100%"}}
									label="Select Phase"
									select
									onChange={(event) =>
										this.handlePhaseChange(event.target.value)
									}
									value={phaseId ? phaseId : 0}
								>
									<MenuItem value="">{""}</MenuItem>
										{phases.map((option) => (
											<MenuItem key={option.getId()} value={option.getId()}>
												{option.getName()}
											</MenuItem>
										))}
                </TextField>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="primary"
							onClick={this.addPhaseToProject}
						>
							Add Phase Project
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

AddProjectPhaseDialog.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default AddProjectPhaseDialog;