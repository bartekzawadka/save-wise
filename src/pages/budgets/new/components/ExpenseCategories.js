import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import AmountsList from "./AmountsList";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import CurrencyText from "../../../../common/CurrencyText";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    ExpenseCategoriesExpansionPanelContainer: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    ExpenseCategoriesExpansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        flex: '1 auto'
    },
    ExpenseCategoriesExpansionPanelSubHeading: {
        fontWeight: 'bold'
    }
});

class ExpenseCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expenseCategories: this.props.expenseCategories ? this.props.expenseCategories : []
        }
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

    render() {
        const {classes} = this.props;

        return <div className={classes.ExpenseCategoriesExpansionPanelContainer}>
            {this.state.expenseCategories.map((ec, ecIndex) => {
                return <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.ExpenseCategoriesExpansionPanelHeading}>
                            {ec.name}
                        </Typography>
                        <Typography className={classes.ExpenseCategoriesExpansionPanelSubHeading}>
                            <CurrencyText value={ec.sum}/>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AmountsList showSum={false} onChange={this.onExpensesChange(ecIndex)} items={ec.types}
                                     classes={classes} newItemTitle="Nazwa kategorii"/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            })}
        </div>
    }
}

ExpenseCategories.propTypes = {
    expenseCategories: PropTypes.array,
    onChange: PropTypes.func,
};

export default withStyles(styles)(ExpenseCategories);
