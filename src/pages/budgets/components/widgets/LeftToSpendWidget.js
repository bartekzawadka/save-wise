import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/es/Typography/Typography";
import CurrencyText from "../../../../common/CurrencyText";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import {withStyles} from "@material-ui/core";
import Widget from "./Widget";
import PercentageText from "../../../../common/PercentageText";

const styles = theme => ({
    expensesLeftOk: {
        color: "#357a38",
        fontSize: theme.typography.pxToRem(28),
        marginBottom: '23px'
    },
    expensesLeftWrong: {
        color: "#ff3d00",
        fontSize: theme.typography.pxToRem(28),
        marginBottom: '23px'
    },
});

class LeftToSpendWidget extends Component {
    getExpensesLeftPercentage = () => {
        let val = (this.getExpensesLeftValue()/this.props.plan.incomesSum * 100.0);
        return parseFloat(val);
    };

    getExpensesLeftValue = () => {
        return (this.props.plan.incomesSum - this.props.plan.expensesSum);
    };

    getColor = (value) => {
        if(value < 0.0){
            return this.props.classes.expensesLeftWrong;
        }

        return this.props.classes.expensesLeftOk;
    };

    render() {
        let value = this.getExpensesLeftValue();
        let percentage = this.getExpensesLeftPercentage();

        return <Widget
            gridSizeMd={12}
            gridSizeXs={12}
            gridSizeXl={12}
            noPadding={true}
            plan={this.props}
            title="Pozostało do wydania">
            <Typography className={this.getColor(value)} align="center">
                <CurrencyText value={value} /> (<PercentageText value={percentage}/>)
            </Typography>
            <LinearProgress variant="determinate"
                            value={percentage}/>
        </Widget>
    }
}

LeftToSpendWidget.propTypes = {
    plan: PropTypes.object.required
};

export default withStyles(styles)(LeftToSpendWidget);
