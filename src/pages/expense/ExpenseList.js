import React, {Component} from 'react';
import {IconButton, ListItemSecondaryAction, withStyles} from '@material-ui/core';
import ExpenseFilter from "./components/ExpenseFilter";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Paper from "@material-ui/core/Paper";
import ExpenseService from "../../services/ExpenseService";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import CurrencyText from "../../common/CurrencyText";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ConfirmationDialog from "../../common/dialogs/ConfirmationDialog";

const styles = () => ({
    ExpenseListRoot: {
        marginTop: '30px',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px'
    },
    ExpenseListGoBackButton: {
        marginBottom: 10
    },
    ExpenseListButtonBarRightButton: {
        float: 'right'
    },
    ExpenseListPaper: {
        marginTop: 10
    },
    ExpenseListTitle: {
        marginBottom: 10
    },
    ExpenseListItemAmount: {
        marginRight: 30
    },
    ExpenseListItemDelete: {
        marginRight: 5,
        color: '#ff3d00'
    }
});

class ExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            expenseDeleteDialogOpen: false,
            expenseDeleteData: {},
            expenseCategories: [],
            filter: {
                dateFrom: undefined,
                dateTo: undefined,
                category: this.props.match.params.category ? atob(this.props.match.params.category) : ''
            }
        };

        this.expenseService = new ExpenseService();
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        this.expenseService.getExpenseCategories()
            .then(data => {
                if(data && data.data && data.data.length > 0){
                    let categories = data.data.map(item=>item.name);
                    this.setState({
                        expenseCategories: categories
                    })
                }
            }).catch(e => console.log(e));
    };

    onSearch = (searchData) => {
        if (searchData) {
            let state = this.state;
            state.filter = searchData;
            this.setState(state);
        }

        this.expenseService.getExpenses(this.props.match.params.planId, this.state.filter)
            .then(data => {
                this.setState({
                    data: data && data.data ? data.data : {}
                });
            })
            .catch(e => console.log(e));
    };

    onGoBack = () => {
        this.props.history.goBack();
    };

    getListItems = () => {
        if (!this.state.data) {
            return;
        }

        let items = [];
        for (let prop in this.state.data) {
            if (this.state.data.hasOwnProperty(prop) && this.state.data[prop] && this.state.data[prop].length > 0) {
                items.push(<Paper elevation={1} className={this.props.classes.ExpenseListPaper}>
                        <List component="nav">
                            <ListSubheader>{prop}</ListSubheader>
                            {
                                this.state.data[prop].map(item => {
                                    return <ListItem button component={Link}
                                                     to={"/expense/edit/" + this.props.match.params.planId + "/" + item.id}>
                                        <ListItemText primary={item.type}
                                                      secondary={new Date(item.date).yyyymmdd()}>
                                        </ListItemText>
                                        <CurrencyText value={item.amount}
                                                      className={this.props.classes.ExpenseListItemAmount}/>
                                        <ListItemSecondaryAction>
                                            <IconButton className={this.props.classes.ExpenseListItemDelete}
                                                        onClick={() => this.handleDeleteDialogOpen(
                                                            this.props.match.params.planId,
                                                            item.id)}>
                                                <DeleteForeverIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                })
                            }
                        </List>
                    </Paper>
                );
            }
        }

        return items;
    };

    handleDeleteDialogClose = (result) => {
        if (result
            && this.state.expenseDeleteData
            && this.state.expenseDeleteData.planId
            && this.state.expenseDeleteData.expenseId) {
            this.expenseService.deleteExpense(
                this.state.expenseDeleteData.planId,
                this.state.expenseDeleteData.expenseId)
                .then(() => {
                    this.onSearch();
                }).catch(e => {
                console.log(e);
            });
        }

        this.setState({
            expenseDeleteData: {},
            expenseDeleteDialogOpen: false
        });
    };

    handleDeleteDialogOpen = (planId, expenseId) => {
        this.setState({
            expenseDeleteData: {
                planId: planId,
                expenseId: expenseId
            },
            expenseDeleteDialogOpen: true
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.ExpenseListRoot}>
                <Typography variant="h6" className={classes.ExpenseListTitle}>
                    Lista wydatków
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.ExpenseListGoBackButton}
                        onClick={this.onGoBack}>
                    <KeyboardArrowLeftIcon/>
                    Powrót
                </Button>
                <Button color="secondary"
                        variant="contained"
                        className={classes.ExpenseListButtonBarRightButton}
                        component={Link}
                        to={"/expense/add/" + this.props.match.params.planId}>
                    <AddIcon/>
                    Dodaj wydatek
                </Button>
                <ExpenseFilter onSearch={this.onSearch}
                               filter={this.state.filter}
                               categories={this.state.expenseCategories}
                />
                {this.getListItems()}
                <ConfirmationDialog message="Czy na pewno chcesz usunąć wydatek? Ta operacja jest nieodwracalna!"
                                    title="Czy chcesz kontynuować?"
                                    open={this.state.expenseDeleteDialogOpen}
                                    onClose={this.handleDeleteDialogClose}/>
            </div>
        );
    }
}

export default withStyles(styles)(ExpenseList);
