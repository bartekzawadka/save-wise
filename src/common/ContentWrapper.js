import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    content: {
        padding: theme.spacing.unit * 8
    }
});

class ContentWrapper extends Component{
    render() {
        return <div className={this.props.classes.content}>
            {this.props.children}
        </div>
    }
}

export default withStyles(styles)(ContentWrapper);
