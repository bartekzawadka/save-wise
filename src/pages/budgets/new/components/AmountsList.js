import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CurrencyField from "./CurrencyField";
import {withStyles} from "@material-ui/core";
import CurrencyText from "../../../../common/CurrencyText";

const styles = () => ({
    AmountsListTable: {
        margin: '5px auto 15px auto'
    },
    AmountsListTableInput: {
        width: '100px',
        paddingTop: '8px'
    },
    AmountsListFullWidthInput: {
        width: '100%'
    },
    AmountsListTableSumInput: {
        width: '100px',
        marginRight: '48px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
});

class AmountsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items ? this.props.items : [],
            newItemName: '',
            sum: 0.0
        };
        this.updateSum();
    }

    add() {
        let state = this.state;
        state.items.push({
            name: state.newItemName,
            value: 0
        });

        state.newItemName = "";
        this.setState(state);
        if(this.props.onChange){
            this.props.onChange(state.items);
        }

        this.updateSum();
        this.handleOnChange();
    }

    onNewItemNameChange = () => event => {
        this.setState({
            newItemName: event.target.value
        });
    };

    onItemAmountChange = name => event => {
        let state = this.state;
        for (let k in state.items) {
            if (state.items.hasOwnProperty(k)) {
                if (state.items[k].name === name) {
                    state.items[k].value = parseFloat(event.target.value);
                }
            }
        }

        this.setState(state);

        this.updateSum();
        this.handleOnChange();
    };

    deleteItem = (name) =>{
        let state = this.state;
        let index;
        for (let k in state.items) {
            index = k;
            if (state.items.hasOwnProperty(k)) {
                if (state.items[k].name === name) {
                    break;
                }
            }
        }

        state.items.splice(index, 1);

        this.setState(state);

        this.updateSum();
        this.handleOnChange();
    };

    handleOnChange(){
        if(this.props.onChange){
            this.props.onChange(this.state.items, this.state.sum);
        }
    }

    updateSum(){
        let sum = 0;
        let state = this.state;

        for (let i in state.items) {
            if (state.items.hasOwnProperty(i)) {
                sum += parseFloat(state.items[i].value);
            }
        }

        state.sum = sum;
        this.setState(state);
    }

    getSum(){
        if(this.props.showSum){
            return <TableRow key="sum">
                <TableCell component="th" scope="row">
                    <b>SUMA</b>
                </TableCell>
                <TableCell numeric>
                    <CurrencyText value={this.state.sum} className={this.props.classes.AmountsListTableSumInput}/>
                </TableCell>
            </TableRow>
        }
    }

    render() {
        const {classes} = this.props;

        return  <Table className={classes.AmountsListTable}>
            <TableHead>
                <TableRow>
                    <TableCell>Nazwa kategorii</TableCell>
                    <TableCell numeric>Kwota</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.items.map(ic => {
                    return (
                        <TableRow key={'item-category-' + ic.name}>
                            <TableCell component="th" scope="row">
                                {ic.name}
                            </TableCell>
                            <TableCell numeric>
                                <TextField className={classes.AmountsListTableInput}
                                           value={ic.value}
                                           onChange={this.onItemAmountChange(ic.name)}
                                           InputProps={{
                                               inputComponent: CurrencyField,
                                               endAdornment: <InputAdornment position="end">zł</InputAdornment>
                                           }}
                                />
                                <IconButton color="secondary" component="span"
                                            onClick={() => this.deleteItem(ic.name)}>
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
                <TableRow key="new-income-category">
                    <TableCell numeric>
                        <TextField className={classes.AmountsListFullWidthInput}
                                   value={this.state.newItemName}
                                   placeholder={this.props.newItemTitle}
                                   onChange={this.onNewItemNameChange()}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton color="primary" onClick={() => this.add()} style={{float: 'right'}}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                {this.getSum()}
            </TableBody>
        </Table>
    }
}

AmountsList.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    newItemTitle: PropTypes.string.isRequired,
    showSum: PropTypes.bool.isRequired
};

export default withStyles(styles)(AmountsList);
