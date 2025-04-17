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

class UpdatePhaseDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			project: this.props.project,
			phase: this.props.phase,
			originalRank: this.props.rank,
			rank: this.props.rank,
			name: this.props.phase.getName(),
			description: this.props.phase.getDescription(),
			ranks: []
		};
	}

	componentDidMount() {
		this.getProjectPhase()
	}

	getProjectPhase = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPhases(this.state.project.getId())
			.then((data) => {
				this.setState({
					ranks: [...Array(data.length).keys()].map(x => x + 1)
				});
			})
	}

	updatePhase = () => {
		let phase = this.props.phase;
		phase.setName(this.state.name);
		phase.setDescription(this.state.description);
		SwiftBoardAPI.getAPI()
			.updateProjectPhaseFromTo(
				phase, this.state.project.getId(),
				this.state.originalRank,
				this.state.rank
			)
			.then(() => {
				this.props.close();
				this.props.refresh()
			});
	};

	handleNameChange = (value) => {
		this.setState({ name: value });
	};

	handleDescriptionChange = (value) => {
		this.setState({ description: value });
	};

	handleRankChange = (value) => {
		this.setState({ rank: parseInt(value) });
	};

	render() {
		const {
			rank,
			ranks,
			name,
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
					<DialogTitle id="form-dialog-title">Update</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									id="update-phase-name"
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
									id="update-phase-rank"
									style={{ width: "100%" }}
									select
									label="Order"
									onChange={(event) =>
										this.handleRankChange(event.target.value)
									}
									value={rank}
								>
									{ranks.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="update-phase-description"
									style={{ width: "100%" }}
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
							disabled={!name.length}
							onClick={this.updatePhase}
						>
							Update
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

UpdatePhaseDialog.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	phase: PropTypes.object.isRequired,
	rank: PropTypes.number.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	refresh: PropTypes.func.isRequired
};

export default UpdatePhaseDialog