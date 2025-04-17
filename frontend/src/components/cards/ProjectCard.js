import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Typography } from "@mui/material";
import {
	Delete as DeleteIcon,
	Dashboard as DashboardIcon,
	EditNoteOutlined as EditIcon,
} from "@mui/icons-material";
import "../../assets/css/project.css";

class ProjectCard extends Component {
	navigateToBoard = () => {
    const { history, project } = this.props;
    history.push(`/project-board/${project.getId()}`);
  };
	render() {
		const { project, user } = this.props;
		return (
			<div className="main-projects-card">
				<Typography
					className="project-card-title"
					variant="h6"
					style={{
						fontWeight: "bold",
						color: "primary"
					}}
				>
					{project.getTitle()}
				</Typography>
				<hr style={{marginBottom: "1px", marginTop: "1px"}}/>
				<div className="project-card-details">
					<Typography variant="p" className="kanban-card-description">
						{project.getDescription()}
					</Typography>
				</div>
				<hr style={{marginBottom: "1px", marginTop: "1px"}}/>
				<div className="project-card-actions">
					{project.getPersonId() === user.getId() && <DeleteIcon
						onClick={() => this.props.openDelete(project)}
						style={{
							marginLeft: "10px",
							color: "red",
							cursor: "pointer"
						}}
					/>}
					{project.getPersonId() === user.getId() && <EditIcon
						onClick={() => this.props.openEdit(project)}
						style={{
							color: "primary",
							cursor: "pointer"
						}}
					/>}
					<DashboardIcon
						onClick={this.navigateToBoard}
						style={{
							color: "primary",
							cursor: "pointer"
						}}
					/>
				</div>
			</div>
		);
	}
}

ProjectCard.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	openEdit: PropTypes.func.isRequired,
	openDelete: PropTypes.func.isRequired
};

export default withRouter(ProjectCard);