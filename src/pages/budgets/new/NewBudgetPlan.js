import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import '../../../helpers/date';
import axios from 'axios';
import ApiCalls from '../../../ApiCalls';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import PlanPeriod from "./components/PlanPeriod";
import AmountsList from "./components/AmountsList";
import ExpenseCategories from "./components/ExpenseCategories";
import CurrencyText from "../../../common/CurrencyText";
import Summary from "./components/Summary";
import PlanService from "../../../services/PlanService";

const styles = theme => ({
    root: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    buttonNext: {
        float: 'right'
    },
    expensePanel: {
        width: '100%'
    },
    expensesLeftContainer: {
        display: 'flex',
        width: '100%',
        marginBottom: '10px'
    },
    expensesLeftTitle: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.primary,
        flex: '1 auto'
    },
    expensesLeftAmount: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.primary
    },
    expensesLeftAmountOk: {
        fontSize: theme.typography.pxToRem(18),
        color: "#357a38",
    },
    expensesLeftAmountWrong: {
        fontSize: theme.typography.pxToRem(18),
        color: "#ff3d00"
    },
    progressRoot: {
        flexGrow: 1
    },
    progressColorOk: {
        backgroundColor: "#6fbf73"
    },
    progressBarColorOk: {
        backgroundColor: "#357a38"
    },
    progressColorWrong: {
        backgroundColor: "#ff6333"
    },
    progressBarColorWrong: {
        backgroundColor: "#ff3d00",
    },
});

function getSteps() {
    return ['Wybierz okres rozliczeniowy', 'Zaplanuj przychody', 'Określ planowane wydatki', 'Podsumowanie'];
}

class NewBudgetPlan extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            activeStep: 0,
            plan: {
                from: new Date(date.getFullYear(), date.getMonth(), 1).yyyymmdd(),
                to: new Date(date.getFullYear(), date.getMonth() + 1, 0).yyyymmdd(),
                datesValid: true,
                incomeCategories: [],
                newIncomeCategoryName: "",
                newExpenses: [],
                incomesSum: 0,
                expenseCategories: [],
                expenseCategoriesSums: [],
                expensesLeft: 0,
                expensesLeftProgress: 0,
                expensesSum: 0
            }
        };

        this.planService = new PlanService();
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        let result = await this.planService.getNewPlan();
        let state = this.state;

        let data = result.data.incomeCategories;
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                data[k].value = 0
            }
        }

        state.plan.incomeCategories = data;

        state.plan.expenseCategories = result.data.expenseCategories.map(category => {
            return {
                "name": category.name,
                "sum": 0,
                "types": category.types.map(type => {
                    return {
                        "name": type.name,
                        "value": 0
                    }
                })
            }
        });

        let expenseCategoriesSums = [];
        state.plan.expenseCategories.map(item => {
            expenseCategoriesSums[item.name] = 0
        });

        state.plan.expenseCategoriesSums = expenseCategoriesSums;

        this.setState(state);
    }

    savePlan() {

        let incomes = this.state.plan.incomeCategories.map(item => {
            return {
                category: item.name,
                plannedAmount: item.value
            }
        });

        let expenses = [];
        for (let k in this.state.plan.expenseCategories) {
            if (this.state.plan.expenseCategories.hasOwnProperty(k)) {
                for (let t in this.state.plan.expenseCategories[k].types) {
                    if (this.state.plan.expenseCategories[k].types.hasOwnProperty(t)) {
                        expenses.push({
                            plannedAmount: this.state.plan.expenseCategories[k].types[t].value,
                            type: this.state.plan.expenseCategories[k].types[t].name,
                            category: this.state.plan.expenseCategories[k].name
                        });
                    }
                }
            }
        }

        let saveData = {
            startDate: this.state.plan.from,
            endDate: this.state.plan.to,
            incomes: incomes,
            expenses: expenses
        };

        this.planService.addNewPlan(saveData).then(() => {
            this.props.history.push('/');
        }).catch(e => console.log(e));
    }

    updateIncomeCategories = () => (items, sum) => {
        let state = this.state;

        state.plan.incomeCategories = items;
        state.plan.incomesSum = sum;

        this.setState(state);
        this.updateExpenses();
    };

    getStepContent(step, classes) {
        switch (step) {
            case 0:
                return this.getPeriod();
            case 1:
                return <AmountsList items={this.state.plan.incomeCategories}
                                    newItemTitle="Nazwa kategorii" onChange={this.updateIncomeCategories()}
                                    showSum={true}/>;
            case 2:
                return this.getExpenseCategories(classes);
            case 3:
                return this.getSummary();
            default:
                return 'Unknown step';
        }
    }

    handlePeriodChange = () => data => {
        let state = this.state;
        state.plan.from = data.from;
        state.plan.to = data.to;
        state.plan.datesValid = data.datesValid;

        this.setState(state);
    };

    updateExpenses() {
        let state = this.state;

        let expensesSum = 0;
        for (let k in state.plan.expenseCategories) {
            if (state.plan.expenseCategories.hasOwnProperty(k)) {
                expensesSum += parseFloat(state.plan.expenseCategories[k].sum);
            }
        }

        state.plan.expensesSum = expensesSum;
        state.plan.expensesLeft = parseFloat(state.plan.incomesSum - expensesSum);
        let progress = parseInt(((state.plan.expensesLeft) * 100.0 / state.plan.incomesSum));
        if (progress < 0) {
            progress = 0;
        } else if (progress > 100) {
            progress = 100;
        }
        state.plan.expensesLeftProgress = progress;

        this.setState(state);
    }

    getPeriod() {
        return <PlanPeriod
            onDatesChanged={this.handlePeriodChange()}
            from={this.state.plan.from}
            to={this.state.plan.to}/>
    }

    getNextDisabled() {
        switch (this.state.activeStep) {
            case 0:
                return !this.state.plan.datesValid;
            case 1:
                return this.state.plan.incomesSum <= 0.0;
            case 2:
                return false;
            case 3:
                return false;
            default:
                return false;
        }
    }

    getSummary() {
        return <Summary plan={this.state.plan}/>
    }

    handleOnExpenseCategoriesChange = () => (expenseCategories) => {
        let state = this.state;
        state.plan.expenseCategories = expenseCategories;
        this.setState(state);
        this.updateExpenses();
    };

    getExpenseCategories(classes) {
        return <div className={classes.expensePanel}>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Suma przychodów:
                </Typography>
                <Typography className={classes.expensesLeftAmount}>
                    <CurrencyText value={this.state.plan.incomesSum}/>
                </Typography>
            </div>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Suma wydatków:
                </Typography>
                <Typography
                    className={classes.expensesLeftAmount}>
                    <CurrencyText value={this.state.plan.expensesSum}/>
                </Typography>
            </div>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Pozostało do zagospodarowania:
                </Typography>
                <Typography
                    className={this.state.plan.expensesLeft >= 0 ? classes.expensesLeftAmountOk : classes.expensesLeftAmountWrong}>
                    <CurrencyText value={this.state.plan.expensesLeft}/>
                </Typography>
            </div>
            <div className={classes.progressRoot}>
                <LinearProgress variant="determinate" color="primary" value={this.state.plan.expensesLeftProgress}
                                classes={{
                                    colorPrimary: this.state.plan.expensesLeft >= 0 ? classes.progressColorOk : classes.progressColorWrong,
                                    barColorPrimary: this.state.plan.expensesLeft >= 0 ? classes.progressBarColorOk : classes.progressBarColorWrong
                                }}/>
            </div>
            <ExpenseCategories classes={classes} expenseCategories={this.state.plan.expenseCategories}
                               onChange={this.handleOnExpenseCategoriesChange()}/>
        </div>
    }

    handleNext = () => {
        const {activeStep} = this.state;

        if (activeStep === getSteps().length - 1) {
            this.savePlan();
            return;
        }

        this.setState({
            activeStep: activeStep + 1
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const {classes} = this.props;
        const steps = getSteps();

        return (
            <div className={classes.root}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography variant='h6'>
                        Nowy plan budżetowy
                    </Typography>
                    <Stepper activeStep={this.state.activeStep}>
                        {steps.map((label) => {
                            const props = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        <div>
                            <div className={classes.container}>
                                {this.getStepContent(this.state.activeStep, classes)}
                            </div>
                            <div>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}>
                                    <KeyboardArrowLeftIcon/>
                                    Wstecz
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.buttonNext}
                                    disabled={this.getNextDisabled()}
                                >
                                    {this.state.activeStep === steps.length - 1 ? <CheckIcon/> :
                                        <KeyboardArrowRightIcon/>}
                                    {this.state.activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

NewBudgetPlan.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(NewBudgetPlan);
