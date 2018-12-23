import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import moment from 'moment';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import ExpensesSummaryChartWidget from "./widgets/ExpensesSummaryChartWidget";
import LeftToSpendWidget from "./widgets/LeftToSpendWidget";
import ExpensesPerCategoryWidget from "./widgets/ExpensesPerCategoryWidget";
import ExpenseCategoryShareWidget from "./widgets/ExpenseCategoryShareWidget";
import IncomesPerCategoryWidget from "./widgets/IncomesPerCategoryWidget";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        marginTop: '30px',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    globalAmount: {
        fontSize: theme.typography.pxToRem(22),
        color: grey[700]
    },
    expensesLeftContainer: {
        width: '100%',
    },
    expensesLeftOk: {
        color: "#357a38",
        fontSize: theme.typography.pxToRem(28),
    },
    card: {
        maxWidth: 800,
    },
    avatar: {
        backgroundColor: red[500],
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    row: {
        display: 'flex'
    },
    sumTitle: {
        flex: '1 auto',
        paddingTop: '5px'
    },
    cardContent: {
        paddingTop: '0px'
    },
    sumContainer: {
        display: 'flex',
        marginBottom: '18px'
    },
    grow: {
        flexGrow: 1
    }
});

class PlanSummary extends Component {
    render() {
        const {classes} = this.props;

        return <div className={classes.root}>
            <Grid container alignItems="stretch" justify="center" spacing={8}>
                <Grid item xs={12}>
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Bieżąca realizacja budżetu
                                ({moment(this.props.plan.startDate).format('L') + " - " + moment(this.props.plan.endDate).format('L')})
                            </Typography>
                            <Button color="primary"
                                    variant="contained"
                                    component={Link}
                                    to={"/plan/incomes/"+this.props.plan.id}>
                                Przychody
                            </Button>
                            <Button color="secondary"
                                    variant="contained"
                                    component={Link}
                                    to={"/expense/add/"+this.props.plan.id}>
                                Dodaj wydatek
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <LeftToSpendWidget/>
                <ExpensesSummaryChartWidget/>
                <ExpenseCategoryShareWidget />
                <ExpensesPerCategoryWidget/>
                <IncomesPerCategoryWidget />
            </Grid>
        </div>
    }
}

PlanSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PlanSummary);
