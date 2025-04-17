import React, { Component } from 'react';
import PropTypes from "prop-types";
import SwiftBoardAPI from '../api/SwiftBoardAPI';
import { Typography } from "@mui/material";
import { DoneSharp as DoneSharpIco } from '@mui/icons-material';


class ProjectHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			project: this.props.project,
			persons: [],
			phases: [],
			cards: [],
			donePhase: null
		};
	}

	componentDidMount() {
		this.loadData();
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
			.getProjectPersons(this.state.user.getId())
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
				console.log(data);
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
		const { project, cards, donePercent } = this.state;

		return (
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100",
					padding: "10px"
				}}
			>
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
		)
	}
}

ProjectHeader.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

export default ProjectHeader;