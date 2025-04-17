import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import PersonReportCard from "../cards/PersonReportCard";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";

class ProjectReportWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			project: props.project,
			projectId: props.project.getId(),
			members: []
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
					members: data,
					loadingInProgress: false,
					error: null,
				});
			})
	};

	render() {
		const { members, project } = this.state;
		return (
			<div
				style={{
					height: "100%",
					margin: "0",
					padding: "20px"
				}}
			>
				<Grid container spacing={2} justifyContent="flex-start" alignItems="center">
					{members.map((member, idx) => (
						<Grid item xs={3} key={idx}>
							<PersonReportCard
								project={project}
								person={member}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}

ProjectReportWindow.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

export default ProjectReportWindow;