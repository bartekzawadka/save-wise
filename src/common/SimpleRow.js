import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    title: {
        flex: 1
    },
    value: {},
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class SimpleRow extends Component {
    render() {
        const {classes} = this.props;

        return <TextField
            id="outlined-read-only-input"
            label={this.props.title}
            className={classes.textField}
            margin="normal"
            value={this.props.value}
            InputProps={{
                readOnly: true,
            }}
            variant="outlined"
        />

        // return <div className={classes.root}>
        //     <div className={classes.title}>
        //         {this.props.title}
        //     </div>
        //     <div className={classes.value}>
        //         {this.props.value}
        //     </div>
        // </div>
    }
}

export default withStyles(styles)(SimpleRow);
