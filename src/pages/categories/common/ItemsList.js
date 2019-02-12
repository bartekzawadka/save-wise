import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/core";
import AutoComplete from "../../../common/AutoComplete";

const styles = () => ({
    ItemsListTable: {
        margin: '5px auto 15px auto'
    },
    ItemsListTableInput: {
        width: '100px',
        paddingTop: '8px'
    },
    ItemsListFullWidthInput: {
        width: '100%'
    },
    ItemsListTableSumInput: {
        width: '100px',
        marginRight: '48px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
});

class ItemsList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items ? this.props.items : [],
            newItemName: ''
        };
    }

    add() {
        let state = this.state;

        let canPush = true;

        if (!state.newItemName) {
            canPush = false;
        } else {
            for (let k in this.props.items) {
                if (!this.props.items.hasOwnProperty(k)) {
                    break;
                }

                if (this.props.items[k].name.toLowerCase() === state.newItemName.toLowerCase()) {
                    canPush = false;
                    break;
                }
            }
        }

        if (canPush) {
            this.props.push({
                name: state.newItemName,
                value: 0
            });
        }

        state.newItemName = "";
        this.setState(state);
        if (this.props.onChange) {
            this.props.onChange(this.props.items);
        }

        this.handleOnChange();
    }

    onNewItemNameChange = () => newValue => {
        this.setState({
            newItemName: newValue
        });
    };

    deleteItem = (name) => {
        let state = this.state;
        let index;
        for (let k in this.props.items) {
            index = k;
            if (this.props.items.hasOwnProperty(k)) {
                if (this.props.items[k].name === name) {
                    break;
                }
            }
        }

        this.props.items.splice(index, 1);

        this.setState(state);

        this.handleOnChange();
    };

    handleOnChange() {
        if (this.props.onChange) {
            this.props.onChange(this.props.items, this.state.sum);
        }
    }

    render() {
        const {classes} = this.props;

        return <Table className={classes.AmountsListTable}>
            <TableHead>
                <TableRow>
                    <TableCell>Nazwa</TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.items.map(ic => {
                    return (
                        <TableRow key={'item-category-' + ic.name}>
                            <TableCell component="th" scope="row">
                                {ic.name}
                            </TableCell>
                            <TableCell>
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
                        <AutoComplete
                            value={this.state.newItemName}
                            suggestions={this.props.newItemSuggestions}
                            placeholder={this.props.newItemTitle}
                            className={classes.AmountsListFullWidthInput}
                            onChange={this.onNewItemNameChange()}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton color="primary" onClick={() => this.add()} style={{float: 'right'}}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    }
}

ItemsList.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    newItemTitle: PropTypes.string.isRequired,
    newItemSuggestions: PropTypes.array
};

export default withStyles(styles)(ItemsList);
