import React, {Component} from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import CurrencyText from "../../../common/CurrencyText";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import {withStyles} from "@material-ui/core";
import Widget from "./Widget";

const styles = () => ({
    cardContent: {
        paddingTop: '0px'
    },
});

class IncomesPerCategoryWidget extends Component {
    render() {
        const data = [{name: "Test 1", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75},
            {name: "Test 2", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75},
            {name: "Test 3", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75},
            {name: "Test 4", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75},
            {name: "Test 5", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75},
            {name: "Test 6", plannedValue: 100.0, realValue: 75.0, diff: 25.0, percentage: 75}];

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
                        <TableCell>Różnica %</TableCell>
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
                                    <CurrencyText value={item.diff}/>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {item.percentage}%
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Widget>;
    }
}

export default withStyles(styles)(IncomesPerCategoryWidget);
