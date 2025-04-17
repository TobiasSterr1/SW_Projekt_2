import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Button,
	/*Table,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography*/
} from "@mui/material";
import {
	Add as AddIcon
} from "@mui/icons-material";
import PhaseBoard from "./BoardPhase";
import AddPhaseDialog from "../dialogs/phases/AddPhase";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";

class ProjectBoardWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			project: props.project,
			phases: [],
			cards: null,
			showAddPhaseDialog: false,
			randomKey: Math.random()
		};
	}

	componentDidMount() {
		this.getProjectPhase()
	}

	loadData = () => {
		this.props.refresh();
		this.getProjectPhase();
		this.setState({
			randomKey: Math.random()
		})
	}

	getProjectPhase = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPhases(this.state.project.getId())
			.then((data) => {
				this.setState({
					phases: data
				});
			})
	}

	openAddPhaseDialog = () => {
		this.setState({
			showAddPhaseDialog: true
		});
	}

	closeAddPhaseDialog = () => {
		this.setState({
			showAddPhaseDialog: false
		});
		this.getProjectPhase();
	}

	render() {
		const { user, project, phases, randomKey, showAddPhaseDialog } = this.state;
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "10px",
					height: "100%",
					border: 1,
					borderColor: "green",
					overflowX: "auto",
					paddingTop: "20px",
					paddingLeft: "20px",
					maxWidth: "100%"
				}}
			>
				{
					project && phases ?
						phases.map((phase, idx) => {
							return (
								<PhaseBoard
									key={`board-${idx}-${randomKey}-${phase.getName()}`}
									user={user}
									phase={phase}
									rank={phases.indexOf(phase) + 1}
									project={project}
									refresh={this.loadData}
								/>
							);
						}
						)
						: null
				}
				{project.getPersonId() === user.getId() &&
					<div style={{ flex: 1, minWidth: "300px" }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={this.openAddPhaseDialog}
						>
							Add Phase
						</Button>
					</div>
				}
				{
					// show btn to add new phase
					phases && phases ?
						<>

						</>
						: null
				}
				<AddPhaseDialog
					user={user}
					project={project}
					isOpen={showAddPhaseDialog}
					close={this.closeAddPhaseDialog}
				/>
			</div>
		);
	}
}

ProjectBoardWindow.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	refresh: PropTypes.func.isRequired,
};

export default ProjectBoardWindow;