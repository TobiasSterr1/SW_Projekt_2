import React, { Component } from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//import "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app'
import firebaseConfig from "./firebaseconfig";
import SwiftBoardAPI from "./api/SwiftBoardAPI";
import LoadingProgress from "./components/dialogs/LoadingProgress";
import ContextErrorMessage from "./components/dialogs/ContextErrorMessage";
import Login from "./seiten/login";
import Projects from "./seiten/projects";
import About from "./seiten/About";
import ProjectBoard from "./seiten/ProjectBoard";
import AppHeader from "./components/AppHeader";
import "./App.css"

class App extends Component {
	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);
		// Init an empty state
		this.state = {
			currentUser: null,
			user: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	static getDerivedStateFromError(error) {
		return { appError: error };
	}

	handleAuthStateChange = (user) => {
		if (user) {
			this.setState({
				authLoading: true
			});
			user.getIdToken().then(token => {
				document.cookie = `token=${token};path=/`;
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
			this.getUserByGoogleId(user);
		} else {
			document.cookie = "token=;path=/SameSite=None";
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	/**
	 * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 *
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = "de";
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	//** Fetch den User aus dem Backend */
	getUserByGoogleId = (user) => {
		SwiftBoardAPI.getAPI()
			.getPersonByGoogleId(user.uid)
			.then((data) => {
				this.setState({ user: data });
			});
	};

	render() {
		const { currentUser, user, appError, authError, authLoading } = this.state;
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					{currentUser && user ?
						<div className="main">
							<AppHeader user={user} />
							<Redirect from="/" to="/projects" />
							<Route exact path="/about">
								<About user={user} />
							</Route>
							<Route exact path="/projects">
								<Projects user={user} />
							</Route>
							<Route exact path="/project-board/:id">
								<ProjectBoard user={user} />
							</Route>
							<LoadingProgress show={authLoading} />
							<ContextErrorMessage
								error={authError}
								contextErrorMsg={`Something went wrong during sighn in process.`}
								onReload={this.handleSignIn}
							/>
							<ContextErrorMessage
								error={appError}
								contextErrorMsg={`Something went wrong inside the app. Please reload the page.`}
							/>
						</div>
						:
						<>
							<Redirect from="/" to="/login" />
							<Route exact path="/login">
								<Login onSignIn={this.handleSignIn} />
							</Route>
						</>
					}
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;