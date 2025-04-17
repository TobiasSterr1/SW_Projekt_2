import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Button,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography
} from "@mui/material";
import {
	Add as AddIcon,
	Delete as DeleteIcon
} from "@mui/icons-material";
import AddTeamMemberDialog from "../dialogs/projects/AddTeamMember";
import DeleteTeamMemberDialog from "../dialogs/projects/DeleteTeamMember";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";

class ProjectTeamWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			project: props.project,
			projectId: props.project.getId(),
			members: null,
			selectedMember: null,
			showAddPersonDialog: false,
			showDeletePersonDialog: false,
			loadingInProgress: false,
			loadingError: null,
			error: null
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
			.catch((e) =>
				this.setState({
					loadingInProgress: false,
					loadingError: e,
				})
			);

		this.setState({
			loadingInProgress: true,
			loadingError: null,
		});
	};

	openShowDeleteDialog = (value) => {
		this.setState({
			showDeletePersonDialog: true,
			selectedMember: value
		});
	}

	openAddDialog = () => {
		this.setState({
			showAddPersonDialog: true
		});
	}

	closeAddDialog = () => {
		this.setState({
			showAddPersonDialog: false
		});
		this.getProjectTeam();
	}

	closeShowDeleteDialog = () => {
		this.setState({
			showDeletePersonDialog: false,
			selectedMember: null
		});
	}

	handleSelectedSuchProfile = (value) => {
		this.setState({ selectedMember: parseInt(value) });
	};

	render() {
		const {
			members, user, project, selectedMember,
			showAddPersonDialog, showDeletePersonDialog
		} = this.state;
		return (
			<div style={{height: "100%", margin: "0"}}>
				<div style={{
					display: "flex",
					flexDirection: "row-reverse",
					padding: "10px"
				}}>
					{project.getPersonId() === user.getId() && <Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={this.openAddDialog}
					>
						Add Team Member
					</Button>
					}
				</div>
				<div className="mi-table">
					<Typography
						variant="h4"
						style={{
							paddingLeft: "10px",
							color: "primary",
							fontWeight: "bold"
						}}
					>
						Team Members
					</Typography>
					<Table className="">
						<TableHead className="mi-table-header">
							<TableRow>
								<TableCell>
									<Typography className="mi-table-header-cell" variant="h6">
										Username
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="mi-table-header-cell" variant="h6">
										First Name
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="mi-table-header-cell" variant="h6">
										Last Name
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="mi-table-header-cell" variant="h6">
										Email
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="mi-table-header-cell" variant="h6">
										Actions
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{members &&
								members.map((member, idx) => (
									<TableRow key={idx}>
										<TableCell>
											<Typography className="mi-table-cell" variant="h6">
												{member.getUsername()}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography className="mi-table-cell" variant="h6">
												{member.getFirstname()}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography className="mi-table-cell" variant="h6">
												{member.getLastname()}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography className="mi-table-cell" variant="h6">
												{member.getEmail()}
											</Typography>
										</TableCell>
										<TableCell>
											{
												user.getId() === project.getPersonId() &&
												<DeleteIcon
													onClick={() => this.openShowDeleteDialog(member)}
													className="mm-block-f-icon"
												/>
											}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</div>
				<AddTeamMemberDialog
					user={user}
					project={project}
					isOpen={showAddPersonDialog}
					close={this.closeAddDialog}
				/>
				{selectedMember && <DeleteTeamMemberDialog
					key={`delte-member-${selectedMember.getId()}`}
					user={user}
					project={project}
					member={selectedMember}
					isOpen={showDeletePersonDialog}
					close={this.closeShowDeleteDialog}
					refresh={this.getProjectTeam}
				/>}
			</div>
		);
	}
}

ProjectTeamWindow.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

export default ProjectTeamWindow;