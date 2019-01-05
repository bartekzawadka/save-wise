import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import AmountsList from "./AmountsList";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import CurrencyText from "../../../../common/CurrencyText";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    ExpenseCategoriesExpansionPanelContainer: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    ExpenseCategoriesExpansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        flex: '1 auto'
    },
    ExpenseCategoriesExpansionPanelSubHeading: {
        fontWeight: 'bold'
    },
    ExpenseCategoriesNewCategoryContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    ExpenseCategoriesFullWidthInput: {
        flex: '1 auto',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    ExpenseCategoriesAddCategoryButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    ExpenseCategoriesDeleteCategoryButton: {
        color: "#ff3d00",
        padding: 0,
        marginLeft: theme.spacing.unit * 2
    }
});

class ExpenseCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expenseCategories: this.props.expenseCategories ? this.props.expenseCategories : [],
            newExpenseCategory: ''
        };
    }

    onExpensesChange = (index) => (items, sum) => {
        let state = this.state;
        state.expenseCategories[index].types = items;
        state.expenseCategories[index].sum = sum;

        this.setState(state);
        this.handleOnChange();
    };

    handleOnChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.expenseCategories);
        }
    }

    onNewItemNameChange = () => event => {
        this.setState({
            newExpenseCategory: event.target.value
        });
    };

    add = () => {
        let categories = this.state.expenseCategories;
        categories.push({
            name: this.state.newExpenseCategory,
            types: [],
            sum: 0.0
        });
        this.setState({
            expenseCategories: categories,
            newExpenseCategory: ''
        });
    };

    deleteCategory = (index) => {
        let expenseCategories = this.state.expenseCategories;
        expenseCategories.splice(index, 1);

        this.setState({
            expenseCategories: expenseCategories
        });
    };

    render() {
        const {classes} = this.props;

        return <div className={classes.ExpenseCategoriesExpansionPanelContainer}>
            {this.state.expenseCategories.map((ec, ecIndex) => {
                return <ExpansionPanel defaultExpanded={false} key={'expenseCategory-'+ecIndex}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.ExpenseCategoriesExpansionPanelHeading}>
                            {ec.name}
                        </Typography>
                        <Typography className={classes.ExpenseCategoriesExpansionPanelSubHeading}>
                            <CurrencyText value={ec.sum}/>
                        </Typography>
                        <div>
                            <IconButton className={classes.ExpenseCategoriesDeleteCategoryButton}
                                        onClick={() => this.deleteCategory(ecIndex)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AmountsList showSum={false} onChange={this.onExpensesChange(ecIndex)} items={ec.types}
                                     newItemTitle="Nazwa kategorii"/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            })}
            <div className={classes.ExpenseCategoriesNewCategoryContainer}>
                <TextField className={classes.ExpenseCategoriesFullWidthInput}
                           value={this.state.newExpenseCategory}
                           placeholder="Nowa grupa wydatków"
                           onChange={this.onNewItemNameChange()}
                />
                <IconButton color="primary"
                            className={classes.ExpenseCategoriesAddCategoryButton}
                            disabled={!this.state.newExpenseCategory}
                            onClick={this.add}>
                    <AddIcon/>
                </IconButton>
            </div>
        </div>
    }
}

ExpenseCategories.propTypes = {
    expenseCategories: PropTypes.array,
    onChange: PropTypes.func,
};

export default withStyles(styles)(ExpenseCategories);
