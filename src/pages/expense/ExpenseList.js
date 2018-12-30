import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
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
    }
});

class ExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

        this.expenseService = new ExpenseService();
    }

    onSearch = (searchData) => {
        this.expenseService.getExpenses(this.props.match.params.planId, searchData)
            .then(data => {
                console.log(data);
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
                                                      secondary={new Date(item.date).yyyymmdd()}/>
                                        <CurrencyText value={item.amount}/>
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
                <ExpenseFilter onSearch={this.onSearch}/>
                {this.getListItems()}
            </div>
        );
    }
}

export default withStyles(styles)(ExpenseList);
