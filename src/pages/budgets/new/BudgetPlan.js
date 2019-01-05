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
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import PlanPeriod from "./components/PlanPeriod";
import AmountsList from "./components/AmountsList";
import ExpenseCategories from "./components/ExpenseCategories";
import CurrencyText from "../../../common/CurrencyText";
import Summary from "./components/Summary";
import PlanService from "../../../services/PlanService";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
    NewBudgetPlanRoot: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    NewBudgetPlanPaper: {
        padding: theme.spacing.unit * 2,
    },
    NewBudgetPlanContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    NewBudgetPlanButton: {
        marginRight: theme.spacing.unit,
    },
    NewBudgetPlanButtonNext: {
        float: 'right'
    },
    NewBudgetPlanExpensePanel: {
        width: '100%'
    },
    NewBudgetPlanExpensesLeftContainer: {
        display: 'flex',
        width: '100%',
        marginBottom: '10px'
    },
    NewBudgetPlanExpensesLeftTitle: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.primary,
        flex: '1 auto'
    },
    NewBudgetPlanExpensesLeftAmount: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.primary
    },
    NewBudgetPlanExpensesLeftAmountOk: {
        fontSize: theme.typography.pxToRem(18),
        color: "#357a38",
    },
    NewBudgetPlanExpensesLeftAmountWrong: {
        fontSize: theme.typography.pxToRem(18),
        color: "#ff3d00"
    },
    NewBudgetPlanProgressRoot: {
        flexGrow: 1
    },
    NewBudgetPlanProgressColorOk: {
        backgroundColor: "#6fbf73"
    },
    NewBudgetPlanProgressBarColorOk: {
        backgroundColor: "#357a38"
    },
    NewBudgetPlanProgressColorWrong: {
        backgroundColor: "#ff6333"
    },
    NewBudgetPlanProgressBarColorWrong: {
        backgroundColor: "#ff3d00",
    },
});

function getSteps() {
    return ['Wybierz okres rozliczeniowy', 'Zaplanuj przychody', 'Określ planowane wydatki', 'Podsumowanie'];
}

class BudgetPlan extends Component {
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

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (this.props.match.params.planId) {
            this.planService.getPlan(this.props.match.params.planId).then(result => {
                this.initializePlan(result);
            });
        } else {
            this.planService.getNewPlan().then(result => {
                this.initializePlan(result);
            });
        }
    };

    setIncomes = (plan) => {
        let result = [];
        let sum = 0;
        if (plan.data.incomes && plan.data.incomes.length > 0) {
            for (let k in plan.data.incomes) {
                if (plan.data.incomes.hasOwnProperty(k)) {
                    sum += plan.data.incomes[k].plannedAmount;
                    result.push({
                        name: plan.data.incomes[k].category,
                        value: plan.data.incomes[k].plannedAmount
                    })
                }
            }
        }

        return {
            result: result,
            sum: sum
        };
    };

    setExpenses = (plan) => {
        let result = [];
        if (plan.data.expenses && plan.data.expenses.length > 0) {
            for (let k in plan.data.expenses) {
                if (!plan.data.expenses.hasOwnProperty(k)) {
                    continue;
                }
                if (!result[plan.data.expenses[k].category]) {
                    result[plan.data.expenses[k].category] = [];
                }

                result[plan.data.expenses[k].category].push({
                    type: plan.data.expenses[k].type,
                    value: plan.data.expenses[k].plannedAmount
                });
            }

            let tmp = [];

            for (let v in result) {
                if (!result.hasOwnProperty(v)) {
                    continue;
                }
                let sum = 0;

                for (let s in result[v]) {
                    if (result[v].hasOwnProperty(s)) {
                        sum += result[v][s].value;
                    }
                }
                tmp.push({
                    name: v,
                    sum: sum,
                    types: result[v].map(category => {
                        return {
                            name: category.type,
                            value: category.value
                        }
                    })
                });
            }

            result = tmp;
        }

        return result;
    };

    initializePlan = (plan) => {
        let state = this.state;
        let result = plan;

        if (result.data.startDate) {
            let startDate = new Date(result.data.startDate.toString());
            startDate.setHours(0, 0, 0, 0);
            state.plan.from = startDate.yyyymmdd();
        }
        if (result.data.endDate) {
            let endDate = new Date(result.data.endDate.toString());
            endDate.setHours(0, 0, 0, 0);
            state.plan.to = endDate.yyyymmdd();
        }

        let incomes = this.setIncomes(result);

        state.plan.incomeCategories = incomes.result;
        state.plan.incomesSum = incomes.sum;
        state.plan.expenseCategories = this.setExpenses(result);

        this.setState(state);
        this.updateExpenses();
    };

    savePlan() {

        let incomes = this.state.plan.incomeCategories.map(item => {
            return {
                category: item.name,
                plannedAmount: item.value
            }
        });

        let expenses = [];
        //todo: refactor
        for (let k in this.state.plan.expenseCategories) {
            if (!this.state.plan.expenseCategories.hasOwnProperty(k)) {
                continue;
            }
            for (let t in this.state.plan.expenseCategories[k].types) {
                if (!this.state.plan.expenseCategories[k].types.hasOwnProperty(t)) {
                    continue;
                }
                expenses.push({
                    plannedAmount: this.state.plan.expenseCategories[k].types[t].value,
                    type: this.state.plan.expenseCategories[k].types[t].name,
                    category: this.state.plan.expenseCategories[k].name
                });
            }
        }

        let saveData = {
            startDate: this.state.plan.from,
            endDate: this.state.plan.to,
            incomes: incomes,
            expenses: expenses
        };

        if (this.props.match.params.planId) {
            this.planService.updatePlan(this.props.match.params.planId, saveData).then(() => {
                this.props.history.push('/');
            }).catch(e => console.log(e));
        } else {
            this.planService.addNewPlan(saveData).then(() => {
                this.props.history.push('/');
            }).catch(e => console.log(e));
        }
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
                return 'Nieokreślony krok';
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
        return <div className={classes.NewBudgetPlanExpensePanel}>
            <div className={classes.NewBudgetPlanExpensesLeftContainer}>
                <Typography className={classes.NewBudgetPlanExpensesLeftTitle}>
                    Suma przychodów:
                </Typography>
                <Typography className={classes.NewBudgetPlanExpensesLeftAmount}>
                    <CurrencyText value={this.state.plan.incomesSum}/>
                </Typography>
            </div>
            <div className={classes.NewBudgetPlanExpensesLeftContainer}>
                <Typography className={classes.NewBudgetPlanExpensesLeftTitle}>
                    Suma wydatków:
                </Typography>
                <Typography
                    className={classes.NewBudgetPlanExpensesLeftAmount}>
                    <CurrencyText value={this.state.plan.expensesSum}/>
                </Typography>
            </div>
            <div className={classes.NewBudgetPlanExpensesLeftContainer}>
                <Typography className={classes.NewBudgetPlanExpensesLeftTitle}>
                    Pozostało do zagospodarowania:
                </Typography>
                <Typography
                    className={this.state.plan.expensesLeft >= 0
                        ? classes.NewBudgetPlanExpensesLeftAmountOk
                        : classes.NewBudgetPlanExpensesLeftAmountWrong}>
                    <CurrencyText value={this.state.plan.expensesLeft}/>
                </Typography>
            </div>
            <div className={classes.NewBudgetPlanProgressRoot}>
                <LinearProgress variant="determinate" color="primary" value={this.state.plan.expensesLeftProgress}
                                classes={{
                                    colorPrimary: this.state.plan.expensesLeft >= 0
                                        ? classes.NewBudgetPlanProgressColorOk
                                        : classes.NewBudgetPlanProgressColorWrong,
                                    barColorPrimary: this.state.plan.expensesLeft >= 0
                                        ? classes.NewBudgetPlanProgressBarColorOk
                                        : classes.NewBudgetPlanProgressBarColorWrong
                                }}/>
            </div>
            <ExpenseCategories expenseCategories={this.state.plan.expenseCategories}
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
        if (this.state.activeStep === 0 && this.props.match.params.planId) {
            this.props.history.goBack();
            return;
        }

        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    getBackButton = () => {
        if (this.props.match.params.planId && this.state.activeStep === 0) {
            return <Button
                onClick={() => this.props.history.goBack()}
                className={this.props.classes.NewBudgetPlanButton}>
                <CloseIcon/>
                Anuluj
            </Button>
        } else {
            return <Button
                disabled={this.state.activeStep === 0}
                onClick={this.handleBack}
                className={this.props.classes.NewBudgetPlanButton}>
                <KeyboardArrowLeftIcon/>
                Wstecz
            </Button>
        }
    };

    render() {
        const {classes} = this.props;
        const steps = getSteps();

        return (
            <div className={classes.NewBudgetPlanRoot}>
                <Paper elevation={1} className={classes.NewBudgetPlanPaper}>
                    <Typography variant='h6'>
                        {this.props.match.params.planId ? 'Edycja planu budżetowego' : 'Nowy plan budżetowy'}
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
                            <div className={classes.NewBudgetPlanContainer}>
                                {this.getStepContent(this.state.activeStep, classes)}
                            </div>
                            <div>
                                {this.getBackButton()}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.NewBudgetPlanButtonNext}
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

BudgetPlan.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(BudgetPlan);
