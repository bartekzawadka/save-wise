import React, {Component} from 'react';
import CurrencyText from "../../../../common/CurrencyText";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import {withStyles} from "@material-ui/core";
import Widget from "./Widget";
import PropTypes from "prop-types";
import PercentageText from "../../../../common/PercentageText";

const styles = () => ({
    IncomesPerCategoryWidgetValueWrong: {
        color: "#ff3d00",
    },
});

class IncomesPerCategoryWidget extends Component {
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
        if (!this.props.plan.incomesPerCategory || this.props.plan.incomesPerCategory.length === 0) {
            return data;
        }

        return this.props.plan.incomesPerCategory.map(item => {
            return {
                name: item.category,
                plannedValue: parseFloat(item.plannedSum),
                realValue: parseFloat(item.sum),
                percentage: this.getPercentage(item.sum, item.plannedSum),
                diff: parseFloat(item.sum - item.plannedSum)
            }
        });
    };

    getDiffColor = (item) => {
        if (item.diff < 0.0) {
            return this.props.classes.IncomesPerCategoryWidgetValueWrong;
        }
    };

    render() {
        let data = this.getData();

        return <Widget
            gridSizeXs={12}
            gridSizeXl={12}
            gridSizeMd={12}
            noPadding={true}
            plan={this.props}
            title="Przychody per kategoria">
            <Table padding='none'>
                <TableHead>
                    <TableRow>
                        <TableCell>Nazwa</TableCell>
                        <TableCell>Suma planowana</TableCell>
                        <TableCell>Suma rzeczywista</TableCell>
                        <TableCell>Różnica</TableCell>
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
                                    <CurrencyText value={item.diff} className={this.getDiffColor(item)}/>
                                </TableCell>
                                <TableCell>
                                    <PercentageText value={item.percentage}/>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Widget>;
    }
}

IncomesPerCategoryWidget.propTypes = {
    plan: PropTypes.object.required
};

export default withStyles(styles)(IncomesPerCategoryWidget);
