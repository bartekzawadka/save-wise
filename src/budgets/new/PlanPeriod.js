import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    datePickersContainer: {
        margin: '0 auto'
    },
    datePicker: {
        margin: theme.spacing.unit * 2,
        width: 200,
    },
});

class PlanPeriod extends Component{
    constructor(props){
        super(props);

        let date = new Date();
        let from = this.props.from;
        let to = this.props.to;

        if(!from){
            from = new Date(date.getFullYear(), date.getMonth(), 1).yyyymmdd();
        }
        if(!to){
            to = new Date(date.getFullYear(), date.getMonth() + 1, 0).yyyymmdd();
        }

        this.state = {
            from: from,
            to: to
        }
    }

    handleFromChange = () => event => {
        let state = this.state;
        state.from = event.target.value;
      this.setState(state);

      this.props.onDatesChanged(state);
    };

    handleToChange = () => event => {
        let state = this.state;
        state.to = event.target.value;
        this.setState(state);

        this.props.onDatesChanged(state);
    };

    render() {
        return <div className={this.props.classes.datePickersContainer}>
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
    }
}

PlanPeriod.propTypes = {
    classes: PropTypes.object.isRequired,
    onDatesChanged: PropTypes.func.isRequired,
    from: PropTypes.object,
    to: PropTypes.object
};

export default withStyles(styles)(PlanPeriod);
