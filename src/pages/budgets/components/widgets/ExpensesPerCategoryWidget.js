import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CurrencyText from "../../../../common/CurrencyText";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Widget from "./Widget";
import PercentageText from "../../../../common/PercentageText";
import {withStyles} from "@material-ui/core";

const styles = () => ({
    percentageOk: {
        color: "#357a38",
    },
    percentageWrong: {
        color: "#ff3d00",
    },
});

class ExpensesPerCategoryWidget extends Component {
    getPercentage = (sum, plannedSum) => {
        try {
            let plannedSumFloat = parseFloat(plannedSum);
            if (plannedSumFloat > 0.0) {
                return parseFloat(sum / plannedSum * 100.0);
            }
            return 0.0;
        } catch {
            return '-';
        }
    };

    getData = () => {
        let data = [];
        if (!this.props.plan.expensesPerCategory || this.props.plan.expensesPerCategory.length === 0) {
            return data;
        }

        return this.props.plan.expensesPerCategory.map(item => {
            return {
                name: item.category,
                plannedValue: parseFloat(item.plannedSum),
                realValue: parseFloat(item.sum),
                percentage: this.getPercentage(item.sum, item.plannedSum)
            }
        });
    };

    getColor = (item) => {
        if (item.percentage > 100.0) {
            return this.props.classes.percentageWrong;
        }
        if (item.percentage > 0.0) {
            return this.props.classes.percentageOk;
        }
    };

    render() {
        let data = this.getData();

        return <Widget
            gridSizeXl={12}
            gridSizeMd={12}
            gridSizeXs={12}
            plan={this.props}
            noPadding={true}
            title="Wydatki per kategoria">
            <Table padding='none'>
                <TableHead>
                    <TableRow>
                        <TableCell>Nazwa</TableCell>
                        <TableCell>Suma planowana</TableCell>
                        <TableCell>Suma rzeczywista</TableCell>
                        <TableCell>% realizacji</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => {
                        return (
                            <TableRow key={item.name}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    <CurrencyText value={item.plannedValue}/>
                                </TableCell>
                                <TableCell>
                                    <CurrencyText value={item.realValue}/>
                                </TableCell>
                                <TableCell>
                                    <PercentageText value={item.percentage} className={this.getColor(item)}/>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Widget>
    }
}

ExpensesPerCategoryWidget.propTypes = {
    plan: PropTypes.object.required
};

export default withStyles(styles)(ExpensesPerCategoryWidget);
