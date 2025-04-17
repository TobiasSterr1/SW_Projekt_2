import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link as ReactLink } from "react-router-dom";
import {
	Avatar, IconButton, List, ListItem,
	ListItemIcon, ListItemText, Menu,
	MenuItem, Paper, Link,
	Typography
} from "@mui/material";
import {
	Delete as DeleteIcon,
	Home as HomeIcon,
	Info as InfoIcon,
	Edit as EditIcon,
	Logout as LogoutIcon
} from '@mui/icons-material';
import DeleteProfileDialog from "./dialogs/profiles/DeleteProfile"
import UpdateProfileDialog from "./dialogs/profiles/UpdateProfile"
// import firebase from "firebase/app";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app'
import "../App.css"

const menus = [
	{
		name: "Projects",
		nav: "/projects",
		icon: <HomeIcon />
	},
	{
		name: "About Us",
		nav: "/about",
		icon: <InfoIcon />
	}
];

class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			isMenuOpen: false,
			showDeleteProfileDialog: false,
			showEditProfileDialog: false,
			anchorElUser: null
		};
	}

	handleCloseUserMenu = () => {
		this.setState({ isMenuOpen: false });
	};

	handleOpenUserMenu = (event) => {
		this.setState({
			anchorElUser: event.currentTarget,
			isMenuOpen: true
		});
	};

	handleAccountMenuLogout = () => {
		firebase.auth().signOut();
	}

	openDeleteProfileDialog = () => {
		this.setState({ showDeleteProfileDialog: true });
	};

	closeDeleteProfileDialog = () => {
		this.setState({
			showDeleteProfileDialog: false
		});
	};

	openEditProfileDialog = () => {
		this.setState({ showEditProfileDialog: true });
	};

	closeEditProfileDialog = () => {
		this.setState({
			showEditProfileDialog: false
		});
	};

	render() {
		const {
			isMenuOpen, user, anchorElUser,
			showDeleteProfileDialog, showEditProfileDialog
		} = this.state;

		return (
			<div
				style={{
					display: "flex",
					maxHeight: "4rem",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#08284f"
				}}
			>
				<div className="app-title">
					<Typography variant='h3' style={{ color: "white" }}>
						SwiftBoard
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						borderColor: "red",
						border: 1
					}}
				>
					{menus.map((menu, index) => (
						<Link
							component={ReactLink}
							style={{
								textDecoration: "none",
								color: "white",
								margin: "0px",
								padding: "0px"
							}}
							to={menu.nav}
							key={`menu-${index}`}
						>
							<ListItem style={{margin: "0px"}}>
								<ListItemIcon sx={{ color: "white", minWidth: "30px", margin: "0px", padding: "0px" }}>
									{menu.icon}
								</ListItemIcon>
								<ListItemText sx={{ color: "white", fontSize: "25px", }} primary={menu.name} />
							</ListItem>
						</Link>
					))}
				</div>
				<nav className="app-navbar">
					<List>
						<ListItem>
							<IconButton
								onClick={this.handleOpenUserMenu}
								sx={{
									p: 0,
									ml: "auto",
									mr: 1
								}}
							>
								<Avatar
									sx={{
										mr: 1
									}}
									alt="Google Profile Picture"
									src={user.getAvatar()}
								/>
								<Typography color={"white"}>
									{user.getFirstname()}
								</Typography>
							</IconButton>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={isMenuOpen}
								onClose={this.handleCloseUserMenu}
							>
								<Paper elevation={0} sx={{ width: 150, maxWidth: '100%' }}>
									<MenuItem
										onClick={this.handleAccountMenuLogout}
										sx={{
											"&.MuiButtonBase-root:hover": {
												bgcolor: "#08284f",
												color: "white"
											},
										}}
									>
										<ListItemIcon>
											<LogoutIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText >Logout</ListItemText>
									</MenuItem>
									<MenuItem
										onClick={this.openEditProfileDialog}
										sx={{
											"&.MuiButtonBase-root:hover": {
												bgcolor: "#08284f",
												color: "white"
											},
										}}
									>
										<ListItemIcon>
											<EditIcon fontSize="small" color="primary" />
										</ListItemIcon>
										<ListItemText >Edit Profile</ListItemText>
									</MenuItem>
									<MenuItem
										onClick={this.openDeleteProfileDialog}
										sx={{
											"&.MuiButtonBase-root:hover": {
												bgcolor: "#08284f",
												color: "white"
											},
										}}
									>
										<ListItemIcon>
											<DeleteIcon fontSize="small" color="red" />
										</ListItemIcon>
										<ListItemText >Delete Profile</ListItemText>
									</MenuItem>
								</Paper>
							</Menu>
						</ListItem>
					</List>
				</nav>
				<DeleteProfileDialog
					user={user}
					isOpen={showDeleteProfileDialog}
					close={this.closeDeleteProfileDialog}
				/>
				<UpdateProfileDialog
					user={user}
					isOpen={showEditProfileDialog}
					close={this.closeEditProfileDialog}
				/>
			</div>
		)
	}
}

AppHeader.propTypes = {
	user: PropTypes.object.isRequired
};

export default AppHeader;