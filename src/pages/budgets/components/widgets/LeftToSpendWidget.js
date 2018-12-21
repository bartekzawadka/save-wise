import React, {Component} from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import CurrencyText from "../../../../common/CurrencyText";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import {withStyles} from "@material-ui/core";
import Widget from "./Widget";

const styles = theme => ({
    expensesLeftOk: {
        color: "#357a38",
        fontSize: theme.typography.pxToRem(28),
        marginBottom: '23px'
    },
});

class LeftToSpendWidget extends Component {
    render() {
        return <Widget
            gridSizeMd={12}
            gridSizeXs={12}
            gridSizeXl={12}
            noPadding={true}
            plan={this.props}
            title="Pozostało do wydania">
            <Typography className={this.props.classes.expensesLeftOk} align="center">
                <CurrencyText value={1560.82}/> (75%)
            </Typography>
            <LinearProgress variant="determinate" value="75" about="75%"/>
        </Widget>
    }
}

export default withStyles(styles)(LeftToSpendWidget);
