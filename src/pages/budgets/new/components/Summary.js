import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CurrencyText from "../../../../common/CurrencyText";
import Chip from "@material-ui/core/Chip";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const styles = theme => ({
    SummaryTable: {
        margin: '5px auto 15px auto'
    },
    SummaryTableTableSummarySumInput: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    SummarySummaryPanel: {
        width: '100%'
    },
    SummarySummaryTitleOk: {
        color: "#357a38",
        borderColor: "#357a38"
    },
    SummarySummaryTitleWrong: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
    SummarySummaryTitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    SummaryChip: {
        margin: theme.spacing.unit,
    },
    SummaryExpensesLeftSummaryInputOk: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#357a38",
    },
    SummaryExpensesLeftSummaryInputWrong: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#ff3d00"
    },
});

class Summary extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.plan;
    }

    render() {
        const {classes} = this.props;

        return <div className={classes.SummarySummaryPanel}>
            <Table className={classes.SummaryTable}>
                <TableHead>
                    <TableRow>
                        <TableCell>Pozycja</TableCell>
                        <TableCell numeric>Kwota</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="summary-incomes-sum">
                        <TableCell scope="row">
                            Suma przychodów
                        </TableCell>
                        <TableCell numeric>
                            <CurrencyText className={classes.SummaryTableTableSummarySumInput}
                                          value={this.state.incomesSum}/>
                        </TableCell>
                    </TableRow>
                    <TableRow key="summary-expenses-sum">
                        <TableCell scope="row">
                            Suma wydatków
                        </TableCell>
                        <TableCell numeric>
                            <CurrencyText className={classes.SummaryTableTableSummarySumInput}
                                          value={this.state.expensesSum}/>
                        </TableCell>
                    </TableRow>
                    <TableRow key="summary-difference-sum">
                        <TableCell scope="row">
                            <b>Różnica</b>
                        </TableCell>
                        <TableCell numeric>
                            <CurrencyText
                                className={this.state.expensesLeft === 0.0
                                    ? classes.SummaryExpensesLeftSummaryInputOk
                                    : classes.SummaryExpensesLeftSummaryInputWrong}
                                value={this.state.expensesLeft}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className={classes.SummarySummaryTitleContainer}>
                <Chip
                    label={this.state.expensesLeft === 0.0 ? "Bilans planu prawidłowy!" : "Całkowita kwota kosztów nie pokrywa planowanych wydatków!"}
                    className={classes.SummaryChip}
                    variant="outlined"
                    color={this.state.expensesLeft === 0.0 ? "primary" : "secondary"}
                    classes={{
                        outlinedPrimary: classes.SummarySummaryTitleOk,
                        outlinedSecondary: classes.SummarySummaryTitleWrong
                    }}
                    icon={this.state.expensesLeft === 0.0 ? <CheckCircleOutlineIcon/> : <ErrorOutlineIcon/>}/>
            </div>
        </div>
    }
}

Summary.propTypes = {
    plan: PropTypes.object.isRequired
};

export default withStyles(styles)(Summary);
