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

class AddTeamMemberDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.open,
			user: this.props.user,
			projectId: this.props.project.getId(),
			members: [],
			memberId: null
		};
	}

	componentDidMount() {
		if (!this.props.memberId) {
			this.getMembersToAdd()
		}
	}

	addMemberToProject = () => {
		if (!this.state.memberId) {
			return;
		}
		SwiftBoardAPI.getAPI()
			.addProjectPerson(
				this.state.projectId,
				this.state.memberId
			)
			.then(() => {
				this.setState({
					memberId: null
				});
				this.props.close();
			});
	};

	getMembersToAdd() {
		SwiftBoardAPI.getAPI()
			.getPersonsToAddToPoject(this.state.projectId)
			.then((data) => {
				this.setState({
					members: data
				});
			});
	}

	handleMemberChange = (value) => {
		this.setState({ memberId: value });
	};

	render() {
		const {
			members,
			memberId
		} = this.state;

		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.isOpen}
					onClose={this.props.close}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Add Member to Project Team</DialogTitle>
					<DialogContent>
						<Grid container spacing={3} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									id="add-person-to-project"
									style={{ width: "100%" }}
									label="Select Member"
									select
									onChange={(event) =>
										this.handleMemberChange(event.target.value)
									}
									value={memberId ? memberId : 0}
								>
									<MenuItem value="">{""}</MenuItem>
									{members.map((option) => (
										<MenuItem key={option.getId()} value={option.getId()}>
											{option.getFirstname()}
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
							onClick={this.addMemberToProject}
						>
							Add Member
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

AddTeamMemberDialog.propTypes = {
	user: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default AddTeamMemberDialog;