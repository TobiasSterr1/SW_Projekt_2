import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Typography, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SwiftBoardAPI from "../api/SwiftBoardAPI";
import AddProjectDialog from "../components/dialogs/projects/AddProjects";
import UpdateProjectDialog from "../components/dialogs/projects/UpdateProject";
import DeleteProjectDialog from "../components/dialogs/projects/DeleteProject";
import ProjectCard from "../components/cards/ProjectCard";
import "../assets/css/project.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      projects: [],
      selectedProject: null,
      showAddDialog: false,
      showUpdateDialog: false,
      showDeleteDialog: false,
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    SwiftBoardAPI.getAPI()
      .getProjectsByPerson(this.state.user.getId())
      .then((data) => {
        this.setState({
          user: this.props.user,
          projects: data,
        });
      });
  }

  openAddDialog = () => {
    this.setState({
      showAddDialog: true,
    });
  };

  closeAddDialog = () => {
    this.setState({
      showAddDialog: false,
    });
    this.getProjects();
  };

  openUpdateDialog = (project) => {
    this.setState({
      selectedProject: project,
      showUpdateDialog: true,
    });
  };

  closeUpdateDialog = () => {
    this.setState({
      showUpdateDialog: false,
    });
    this.getProjects();
  };

  openDeleteDialog = (project) => {
    this.setState({
      selectedProject: project,
      showDeleteDialog: true,
    });
  };

  closeDeleteDialog = () => {
    this.setState({
      showDeleteDialog: false,
    });
    this.getProjects();
  };

  render() {
    const {
      projects,
      user,
      selectedProject,
      showAddDialog,
      showDeleteDialog,
      showUpdateDialog,
    } = this.state;

    return (
      <>
        <div className="main-projects">
          {projects.length > 0 ? (
            <div className="projects-header">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => this.openAddDialog()}
              >
                {window.innerWidth > 600 ? "Add New Project" : "+"}
              </Button>
            </div>
          ) : null}
          {projects.length > 0 ? (
            <div className="project-list">
              <Grid
                container
                spacing={2}
                justifyContent="flex-start"
                alignItems="center"
              >
                {projects.map((project, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <ProjectCard
                      project={project}
                      user={user}
                      openEdit={this.openUpdateDialog}
                      openDelete={this.openDeleteDialog}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>
                You are currently not involved in any projects, and you have not initiated any projects yet.
              </Typography>
              <Button
                variant="contained"
                style={{
                  padding: "10px",
                  backgroundColor: "primary",
                  color: "white",
                }}
                onClick={this.openAddDialog}
              >
                Create New Project
              </Button>
            </div>
          )}
          <AddProjectDialog
            user={user}
            isOpen={showAddDialog}
            close={this.closeAddDialog}
          />
          {selectedProject && (
            <>
              <UpdateProjectDialog
                user={user}
                key={selectedProject.getId()}
                project={selectedProject}
                isOpen={showUpdateDialog}
                close={this.closeUpdateDialog}
              />
              <DeleteProjectDialog
                user={user}
                key={selectedProject}
                project={selectedProject}
                isOpen={showDeleteDialog}
                close={this.closeDeleteDialog}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

Projects.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Projects;