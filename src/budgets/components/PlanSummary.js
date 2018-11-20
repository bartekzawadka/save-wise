import React, {Component} from 'react';
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    card: {
        width: 400,
    }
});

class PlanSummary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return <Card className={classes.card}>
            <CardHeader title={this.props.plan ? this.props.plan.startDate : ''}>

            </CardHeader>
        </Card>
    }
}

PlanSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PlanSummary);
