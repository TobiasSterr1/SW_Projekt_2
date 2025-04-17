import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { withStyles } from "@mui/styles";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AutorenewIcon from '@mui/icons-material/Autorenew';

class ContextErrorMessage extends Component {
    #standardText = 'This should not have happend. Soooo sorry...';

    render() {
        const { classes, error, contextErrorMsg, onReload } = this.props;
        return (
            error !== null ?
                <Alert severity='error' className={classes.root}>
                    <div>
                        {this.#standardText}
                    </div>
                    <AlertTitle>
                        {contextErrorMsg}
                    </AlertTitle>
                    <div className={classes.margins}>
                        Error message (for debugging only) is:
                    </div>
                    <div>
                        {error.message}
                    </div>
                    {
                        onReload ?
                            <div className={classes.margins}>
                                <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                                    Reload
                                </Button>
                            </div>
                            : null
                    }
                </Alert>
                : null
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    margins: {
        marginTop: theme.spacing(2)
    }
});

/** PropTypes */
ContextErrorMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    contextErrorMsg: PropTypes.string,
    onReload: PropTypes.func
}

export default withStyles(styles)(ContextErrorMessage);