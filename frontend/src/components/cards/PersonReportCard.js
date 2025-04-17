import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
	Avatar, Card, CardContent,
	Slider, Typography
} from "@mui/material";
import "../../assets/css/project.css";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";

class PersonReportCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: this.props.person,
			project: this.props.project,
			cards: [],
			points: 0
		};
	}

	componentDidMount() {
		this.getProjectPhaseCard();
	}

	getProjectPhaseCard = () => {
		SwiftBoardAPI.getAPI()
			.getProjectCardsByPerson(
				this.state.project.getId(),
				this.state.person.getId()
			)
			.then((data) => {
				this.setState({
					cards: data,
					points: data.reduce((acc, card) => {
						return acc + parseInt(card.getPoints());
					}, 0)
				});
			})
	}

	nextNumber = (current, nextTo) => {
		const rest = current % nextTo;
		const next = current + (nextTo - rest);
		return next;
	}

	render() {
		const { person, cards, points } = this.state;
		return (
			<Card>
				<CardContent>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								marginRight: "16px"
							}}>
							<Avatar
								alt={`${person.getFirstname()} ${person.getLastname()}`}
								src={person.getAvatar()}
							/>
							<Typography variant="h6">{person.getFirstname()}</Typography>
						</div>

						<div style={{ flex: 1 }}>
							<Typography gutterBottom>{cards.length} Tasks</Typography>
							<Slider value={cards.length} max={this.nextNumber(cards.length, 5)} />

							{/*<Typography gutterBottom>Zeiten</Typography>
							<Slider value={timeWorked} max={100} />*/}

							<Typography gutterBottom>{points} Story Points </Typography>
							<Slider value={points} max={this.nextNumber(points, 50)} />
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
}

PersonReportCard.propTypes = {
	person: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

export default PersonReportCard;