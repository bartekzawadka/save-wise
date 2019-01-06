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
import AutoComplete from "../../../../common/AutoComplete";

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
            allCategories: this.props.allCategories ? this.props.allCategories : [],
            categoriesNames: [],
            newExpenseCategory: ''
        };
    }

    getCategoriesSuggestions = () => {
        let names = [];
        if (this.props.allCategories && this.props.allCategories.length > 0) {
            names = this.props.allCategories.map(item => item.name);
        }

        return names;
    };

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

    onNewItemNameChange = () => newValue => {
        this.setState({
            newExpenseCategory: newValue
        });
    };

    add = () => {
        let categories = this.state.expenseCategories;

        let canPush = true;

        if(!this.state.newExpenseCategory){
            canPush = false;
        }

        for(let k in categories){
            if(!categories.hasOwnProperty(k)){
                continue;
            }

            if(categories[k].name.toLowerCase() === this.state.newExpenseCategory.toLowerCase()){
                canPush = false;
            }
        }

        if(canPush) {
            let value = this.state.newExpenseCategory;

            let itemToAdd = {
                name: value,
                types: [],
                sum: 0.0
            };

            if(this.props.allCategories && this.props.allCategories.length > 0){
                let filtered = this.props.allCategories.filter(item => {
                    return item.name.toLowerCase() === value.toLowerCase();
                });

                if(filtered && filtered.length > 0){
                    itemToAdd.value = filtered[0].name;
                    itemToAdd.types = filtered[0].types.map(type => {
                        return {
                            name: type.name,
                            value: 0
                        }
                    });
                }
            }

            categories.push(itemToAdd);
        }

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
                let suggestions = ec.types ? ec.types.map(item=>item.name) : [];

                return <ExpansionPanel defaultExpanded={false} key={'expenseCategoryList-' + ecIndex}>
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
                        <AmountsList showSum={false}
                                     onChange={this.onExpensesChange(ecIndex)}
                                     items={ec.types}
                                     newItemSuggestions={suggestions}
                                     newItemTitle="Nazwa kategorii"/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            })}
            <div className={classes.ExpenseCategoriesNewCategoryContainer}>
                <div className={classes.ExpenseCategoriesFullWidthInput}>
                <AutoComplete suggestions={this.getCategoriesSuggestions()}
                              value={this.state.newExpenseCategory}
                              onChange={this.onNewItemNameChange()}
                              placeholder="Nowa grupa wydatków"/>
                </div>
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
    allCategories: PropTypes.array,
    onChange: PropTypes.func,
};

export default withStyles(styles)(ExpenseCategories);
