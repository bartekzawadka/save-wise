import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const styles = theme => ({
    datePickersContainer: {
        margin: '0 auto'
    },
    datePicker: {
        margin: theme.spacing.unit * 2,
        width: 200,
    },
    errorMessageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chipOutline: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class PlanPeriod extends Component {
    constructor(props) {
        super(props);

        let from = this.props.from;
        let to = this.props.to;

        this.state = {
            from: from,
            to: to,
            datesValid: true
        }
    }

    handleFromChange = () => event => {
        let state = this.state;
        state.from = event.target.value;
        state.datesValid = this.isPeriodValid();
        this.setState(state);

        this.props.onDatesChanged(state);
    };

    handleToChange = () => event => {
        let state = this.state;
        state.to = event.target.value;
        state.datesValid = this.isPeriodValid();
        this.setState(state);

        this.props.onDatesChanged(state);
    };

    isPeriodValid() {
        if (this.state.from && this.state.to && this.state.to > this.state.from) {
            return true;
        } else {
            return false;
        }
    }

    getError() {
        if (!this.state.datesValid) {
            return <Chip
                label="Data końcowa musi być późniejsza niż data początkowa"
                className={this.props.classes.chip}
                variant="outlined"
                color="secondary"
                classes={{
                    outlinedSecondary: this.props.classes.chipOutline
                }}
                icon={<ErrorOutlineIcon/>}/>
        }
    }

    render() {
        return <div className={this.props.classes.datePickersContainer}>
            <div>
                <TextField
                    label='Od'
                    type='date'
                    value={this.state.from}
                    onChange={this.handleFromChange()}
                    className={this.props.classes.datePicker}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                <TextField
                    label='Do'
                    type='date'
                    value={this.state.to}
                    onChange={this.handleToChange()}
                    className={this.props.classes.datePicker}
                    InputLabelProps={{
                        shrink: true
                    }}/>
            </div>
            <div align="center">
                {this.getError()}
            </div>
        </div>
    }
}

PlanPeriod.propTypes = {
    onDatesChanged: PropTypes.func.isRequired,
    from: PropTypes.object,
    to: PropTypes.object
};

export default withStyles(styles)(PlanPeriod);
