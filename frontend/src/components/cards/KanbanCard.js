import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Divider, ListItemText } from "@mui/material";
import {
    Delete as DeleteIcon,
    Comment as CommentIcon,
    EditNoteOutlined as EditIcon,
} from "@mui/icons-material";
import CardCommentDialog from "../dialogs/cards/CardComment";
import DeleteKanbanCardDialog from "../dialogs/cards/DeleteCard";
import UpdateKanbanCardDialog from "../dialogs/cards/UpdateCard";

class KanbanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            card: props.card,
            project: props.project,
            showEditCard: false,
            showCommentCard: false,
            showDeleteCard: false
        };
    }

    componentDidMount() {}

    openEditCardDialog = () => {
        this.setState({
            showEditCard: true
        });
    };

    closeEditCardDialog = () => {
        this.setState({
            showEditCard: false
        });
        this.props.refresh();
    };

    openCommentCardDialog = () => {
        this.setState({
            showCommentCard: true
        });
    };

    closeCommentCardDialog = () => {
        this.setState({
            showCommentCard: false
        });
    };

    openDeleteCardDialog = () => {
        this.setState({
            showDeleteCard: true
        });
    };

    closeDeleteCardDialog = () => {
        this.setState({
            showDeleteCard: false
        });
        this.props.refresh();
    };

    render() {
        const { card, user, project, showDeleteCard, showEditCard, showCommentCard } = this.state;
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: 1,
                    padding: "1px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        overflow: "hidden" // Hinzugefügtes overflow-Attribut
                    }}
                >
                    <Card style={{ backgroundColor: "#f0f0f0" }}>
                        <div>
                            <ListItemText
                                style={{ padding: "1px"}}
                                primary={`Title: ${card.getTitle()}`}
                                secondary={`Points: ${card.getPoints()}`}
                            />
                            <Divider />
                            <ListItemText
                                style={{ padding: "1px" }}
                                primary="Description:"
                                secondary={card.getDescription()}
                            />
                        </div>
                        <Divider />
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row-reverse"
                            }}
                        >
                            <DeleteIcon
                                onClick={this.openDeleteCardDialog}
                                style={{
                                    marginLeft: "10px",
                                    color: "red",
                                    cursor: "pointer"
                                }}
                            />
                            <EditIcon
                                onClick={this.openEditCardDialog}
                                style={{
                                    color: "primary",
                                    cursor: "pointer"
                                }}
                            />
                            <CommentIcon
                                onClick={this.openCommentCardDialog}
                                style={{
                                    color: "primary",
                                    cursor: "pointer"
                                }}
                            />
                        </div>
                    </Card>
                </div>
                <UpdateKanbanCardDialog
                    user={user}
                    card={card}
                    project={project}
                    isOpen={showEditCard}
                    close={this.closeEditCardDialog}
                    refresh={this.props.refresh}
                />
                <DeleteKanbanCardDialog
                    user={user}
                    card={card}
                    isOpen={showDeleteCard}
                    close={this.closeDeleteCardDialog}
                />
                <CardCommentDialog
                    user={user}
                    card={card}
                    isOpen={showCommentCard}
                    close={this.closeCommentCardDialog}
                    refresh={this.props.refresh}
                />
            </div>
        );
    }
}

KanbanCard.propTypes = {
    user: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    phase: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
};

export default KanbanCard;