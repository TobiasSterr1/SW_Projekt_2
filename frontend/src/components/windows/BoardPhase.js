import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Divider,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {
    Menu as MenuIcon
} from "@mui/icons-material";
import KanbanCard from "../cards/KanbanCard";
import AddKanbanCardDialog from "../dialogs/cards/AddCard";
import UpdatePhaseDialog from "../dialogs/phases/UpdatePhase";
import DeleteProjectPhaseDialog from "../dialogs/phases/DeleteProjectPhase";
import SwiftBoardAPI from "../../api/SwiftBoardAPI";

class PhaseBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            phase: this.props.phase,
            rank: this.props.rank,
            project: this.props.project,
            projectId: this.props.project.getId(),
            cards: null,
            anchorEl: null,
            showMenu: false,
            showAddcard: false,
            showEditPhase: false,
            showDeletePhase: false
        };
    }

    componentDidMount() {
        this.getProjectPhaseCard();
    }

    loadData = () => {
        this.props.refresh();
        this.getProjectPhaseCard();
    }

    getProjectPhaseCard = () => {
        SwiftBoardAPI.getAPI()
            .getProjectCardsByPhase(
                this.state.project.getId(),
                this.state.phase.getId()
            )
            .then((data) => {
                this.setState({
                    cards: data
                });
            })
    }

    handleMenuClick = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    openMenuDialog = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            showMenu: true
        });
    }

    closeMenuDialog = () => {
        this.setState({
            showMenu: false
        });
    }

    openAddCardDialog = () => {
        this.setState({
            showAddcard: true,
            showMenu: false
        });
    }

    closeAddCardDialog = () => {
        this.setState({
            showAddcard: false
        });
        this.getProjectPhaseCard();
    }

    openEditPhaseDialog = () => {
        this.setState({
            showEditPhase: true,
            showMenu: false
        });
    }

    closeEditPhaseDialog = () => {
        this.setState({
            showEditPhase: false
        });
    }

    openDeletePhaseDialog = () => {
        this.setState({
            showDeletePhase: true,
            showMenu: false
        });
    }

    closeDeletePhaseDialog = () => {
        this.setState({
            showDeletePhase: false
        });
        this.loadData();
    }

    render() {
        const {
            user, cards, phase, rank, project, showMenu, anchorEl,
            showAddcard, showEditPhase, showDeletePhase
        } = this.state;
        return (
            <div
                style={{
                    flex: "1", // Verhindert, dass eine Phase die gesamte Breite einnimmt
                    minWidth: "50px", // Mindestbreite für jede Phase
                    maxWidth: "300px", // Maximale Breite für jede Phase
                    borderRadius: "10px 10px 0 0",
                    padding: "4px",
                    border: 1,
                    borderStyle: "solid",
                    backgroundColor: "primary",
                    marginBottom: "10px" // Abstand zwischen den Phasen
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%" // Festlegen der Höhe
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px" // Anpassen der Polsterung
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {phase.getName()}
                        </Typography>
                        <Button
                            id="basic-button"
                            aria-controls={showMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={showMenu ? 'true' : undefined}
                            onClick={this.openMenuDialog}
                            startIcon={<MenuIcon />}
                        />
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={showMenu}
                        onClose={this.closeMenuDialog}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={this.openAddCardDialog}>Add Card</MenuItem>
                        <MenuItem onClick={this.openEditPhaseDialog}>Edit</MenuItem>
                        <MenuItem onClick={this.openDeletePhaseDialog}>Delete</MenuItem>
                    </Menu>
                    <Divider />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            overflowY: "auto",
                            paddingTop: "10px",
                            gap: "5px"
                        }}
                    >
                        {
                            cards ?
                                cards.map((card, idx) => {
                                    return (
                                        <KanbanCard
                                            key={`board-${idx}`}
                                            user={user}
                                            card={card}
                                            project={project}
                                            phase={phase}
                                            refresh={this.loadData}
                                        />
                                    );
                                }
                                )
                                : null
                        }
                    </div>
                    <AddKanbanCardDialog
                        user={user}
                        project={project}
                        phase={phase}
                        isOpen={showAddcard}
                        close={this.closeAddCardDialog}
                    />
                    <UpdatePhaseDialog
                        key={`up-phase-${phase.getId()}`}
                        user={user}
                        project={project}
                        phase={phase}
                        rank={rank}
                        isOpen={showEditPhase}
                        close={this.closeEditPhaseDialog}
                        refresh={this.loadData}
                    />
                    <DeleteProjectPhaseDialog
                        key={`del-phase-${phase.getId()}`}
                        user={user}
                        project={project}
                        phase={phase}
                        isOpen={showDeletePhase}
                        close={this.closeDeletePhaseDialog}
                        refresh={this.closeDeletePhaseDialog}
                    />
                </div>
            </div>
        );
    }
}

PhaseBoard.propTypes = {
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    phase: PropTypes.object.isRequired,
    rank: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default PhaseBoard;