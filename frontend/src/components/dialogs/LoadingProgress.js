import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';
import { withStyles } from '@mui/styles';


class LoadingProgress extends Component {
    render() {
        const { classes, show } = this.props;

        return (
            show &&
            <div className={classes.root}>
                <LinearProgress color='secondary' />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
    }
});

LoadingProgress.propTypes = {
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingProgress);