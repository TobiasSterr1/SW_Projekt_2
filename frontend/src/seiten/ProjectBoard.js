import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SwiftBoardAPI from "../api/SwiftBoardAPI";
import { Divider, Tabs, Tab, Typography } from "@mui/material";
import ProjectTeamWindow from "../components/windows/ProjectTeamWindow";
import ProjectBoardWindow from "../components/windows/ProjectBoardWindow";
import ProjectReportWindow from "../components/windows/ProjectReportWindow";
import { DoneSharp as DoneSharpIco } from '@mui/icons-material';


class ProjectBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: this.props.user,
			projectId: null,
			project: null,
			value: 0,
			persons: [],
			phases: [],
			cards: [],
			donePhase: null
		};
	}

	componentDidMount() {
		const projectId = this.props.match.params.id;
		this.setState({ projectId: parseInt(projectId) });
		this.getCurrentProject(projectId);
		this.resfresh();
		this.setState({ mounted: true });
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	loadData = () => {
		this.getProjectPhases();
		this.getProjectPersons();
		this.getProjectCards();
		this.getDonePhase();
		this.getProjectStats();
	}

	handleValueChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	getCurrentProject = (projectId) => {
		SwiftBoardAPI.getAPI()
			.getProjectById(projectId)
			.then((data) => {
				this.setState({
					project: data
				});
			});
	}

	getPojectPhase = () => {
		SwiftBoardAPI.getAPI()
			.getProjects()
			.then((data) => {
				this.setState({
					projects: data
				});
			});
	}

	getProjectPhases = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPhases(this.state.project.getId())
			.then((data) => {
				this.setState({
					phases: data
				});
			})
	}

	getProjectPersons = () => {
		SwiftBoardAPI.getAPI()
			.getProjectPersons(this.state.person.getId())
			.then((data) => {
				this.setState({
					persons: data,
				});
			})
	};

	getProjectCards = () => {
		SwiftBoardAPI.getAPI()
			.getProjectCards(this.state.project.getId())
			.then((data) => {
				this.setState({
					cards: data
				});
			})
	}

	getDonePhase = () => {
		SwiftBoardAPI.getAPI()
			.getPhaseByName("done")
			.then((data) => {
				this.setState({
					donePhase: data
				});
				this.getProjectStats();
			})
	};

	getProjectStats = () => {
		const doneNumber = this.state.cards.reduce(
			(acc, c) => {
				if (c.getPhaseId() === this.state.donePhase.getId()) {
					return acc + 1;
				} else {
					return acc;
				}
			}, 0);
		this.setState({
			donePercent: doneNumber
		});
	}

	// refresh the data after 10s
	resfresh() {
		this.intervalId = setInterval(() => this.loadData(), 30000);
	}

	render() {
		const { project, person, value, cards, donePercent } = this.state;

		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					height: "100%",
					borderWidth: "1px",
					borderTop: 1,
					borderRight: 1,
					borderBlockColor: "green",
					borderBlockStyle: "solid"
				}}
			>
				{person && project ?
					<>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								width: "100",
								padding: "10px"
							}}
						>
							{/** Project Title */}
							<div
								style={{
									display: "flex",
									flex: 1,
									flexDirection: "column"
								}}
							>
								<Typography variant="h4" color="primary" fontWeight="bold">
									{project.getTitle()}
								</Typography>
							</div>
							{/** Prject Infos*/}
							<div
								style={{
									display: "flex",
									flex: 1,
									flexDirection: "column"
								}}
							>
								<span>
									From {project.getStartsAt()} to {project.getEndsAt()}
								</span>
							</div>
							{/** Project Status */}
							<div
								style={{
									display: "flex",
									flex: 1,
									flexDirection: "column"
								}}
							>
								<div>
									<Typography>
										{donePercent} / {cards.length} done <DoneSharpIco />
									</Typography>
								</div>
							</div>
						</div>
						<Divider />
						<Tabs value={value} onChange={this.handleValueChange}>
							<Tab label="Project Team" />
							<Tab label="Kanban Board" />
							<Tab label="Project Report" />
						</Tabs>
						<Divider />
						<div style={{ height: "100%" }}>
							{
								value === 0 ?
									<ProjectTeamWindow
										user={person}
										project={project}
									/>
									: null
							}
							{
								value === 1 ?
									<ProjectBoardWindow
										user={person}
										project={project}
										refresh={this.loadData}
									/>
									: null
							}
							{
								value === 2 ?
									<ProjectReportWindow
										user={person}
										project={project}
										refresh={this.loadData}
									/>
									: null
							}
						</div>
					</>
					: null
				}
			</div>
		);
	}
}

ProjectBoard.propTypes = {
	user: PropTypes.object.isRequired
};

export default withRouter(ProjectBoard);