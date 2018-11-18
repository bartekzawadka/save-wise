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
import TextField from '@material-ui/core/TextField';
import '../../helpers/date';
import axios from 'axios';
import ApiCalls from '../../ApiCalls';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import NumberFormat from 'react-number-format';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CurrencyFormat from 'react-currency-format';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Chip from "@material-ui/core/Chip/Chip";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    root: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 0,
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
    datePickersContainer: {
        margin: '0 auto'
    },
    datePicker: {
        margin: theme.spacing.unit * 2,
        width: 200,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    tableRoot: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        maxWidth: 800,
        margin: '10px auto 20px auto'
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    tableInput: {
        width: '100px',
        paddingTop: '8px'
    },
    tableSumInput: {
        width: '100px',
        marginRight: '48px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    tableSummarySumInput: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    expensesLeftSummaryInputOk: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#357a38",
    },
    expensesLeftSummaryInputWrong: {
        width: '100px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#ff3d00"
    },
    tableCategoryNameInput: {
        width: '100%'
    },
    expensePanel: {
        width: '100%'
    },
    summaryPanel: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        flex: '1 auto'
    },
    expansionPanelSubHeading: {
        fontWeight: 'bold'
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
    summaryTitleIconOk: {
        display: 'inline-block',
        color: "#357a38"
    },
    summaryTitleIconWrong: {
        display: 'inline-block',
        color: "#ff3d00"
    },
    summaryTitleOk: {
        color: "#357a38",
        borderColor: "#357a38"
    },
    summaryTitleWrong: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
    summaryTitleContainer: {
        // textAlign: 'center'
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    }
});

function getSteps() {
    return ['Wybierz okres rozliczeniowy', 'Zaplanuj przychody', 'Określ planowane wydatki', 'Podsumowanie'];
}

function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator=" "
            decimalSeparator=","
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class NewBudgetPlan extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            activeStep: 0,
            plan: {
                from: new Date(date.getFullYear(), date.getMonth(), 1).yyyymmdd(),
                to: new Date(date.getFullYear(), date.getMonth() + 1, 0).yyyymmdd(),
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
        }
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        let result = await axios.get(ApiCalls.getNewPlanGetUrl());
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
                "value": 0,
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
                category: {
                    name: item.name
                },
                amount: item.value
            }
        });

        let expenses = [];
        for(let k in this.state.plan.expenseCategories){
            if(this.state.plan.expenseCategories.hasOwnProperty(k)){
                for(let t in this.state.plan.expenseCategories[k].types){
                    if(this.state.plan.expenseCategories[k].types.hasOwnProperty(t)){
                        expenses.push({
                            amount: this.state.plan.expenseCategories[k].types[t].value,
                            type: this.state.plan.expenseCategories[k].types[t].name,
                            category: {
                                name: this.state.plan.expenseCategories[k].name,
                                types: this.state.plan.expenseCategories[k].types
                            }
                        });
                    }
                }
            }
        }

        let saveData = {
            startDate: this.state.plan.from,
            endDate: this.state.plan.to,
            plannedIncomes: incomes,
            plannedExpenses: expenses
        };


        axios.post(ApiCalls.getPlanUrl(), saveData).then(()=>{
            return <Redirect to='/' />
        }).catch((e) => {
            console.log(e);
        })
    }

    addIncomeCategory() {
        let state = this.state;
        state.plan.incomeCategories.push({
            name: state.plan.newIncomeCategoryName,
            value: 0
        });

        state.plan.newIncomeCategoryName = "";
        this.setState(state);
    }

    addExpenseType(categoryName) {
        let state = this.state;
        for (let k in state.plan.expenseCategories) {
            if (state.plan.expenseCategories.hasOwnProperty(k)) {
                if (state.plan.expenseCategories[k].name === categoryName) {
                    state.plan.expenseCategories[k].types.push({
                        name: state.plan.newExpenses[categoryName],
                        value: 0
                    });
                }
            }
        }

        console.log(state.plan.newExpenses[categoryName]);
        state.plan.newExpenses[categoryName] = "";
        console.log(state.plan.newExpenses[categoryName]);
        this.setState(state);
    }

    deleteIncomeCategory(name) {
        let state = this.state;
        let index;
        for (let k in state.plan.incomeCategories) {
            index = k;
            if (state.plan.incomeCategories.hasOwnProperty(k)) {
                if (state.plan.incomeCategories[k].name === name) {
                    break;
                }
            }
        }

        state.plan.incomeCategories.splice(index, 1);

        this.setState(state);
        this.updateIncomesSum();
    }

    deleteExpenseType(expenseCategoryIndex, expenseTypeIndex) {
        let state = this.state;
        state.plan.expenseCategories[expenseCategoryIndex].types.splice(expenseTypeIndex, 1);
        this.setState(state);
    }

    getStepContent(step, classes) {
        switch (step) {
            case 0:
                return this.getPeriod(classes);
            case 1:
                return this.getIncomeCategories(classes);
            case 2:
                return this.getExpenseCategories(classes);
            case 3:
                return this.getSummary(classes);
            case 4:
                return this.savePlan();
            default:
                return 'Unknown step';
        }
    }

    handleModelChange = name => event => {
        let state = this.state;
        state.plan[name] = event.target.value;

        this.setState(state);
    };

    handleNewIncomeCategoryNameChange = () => event => {
        let state = this.state;
        state.plan.newIncomeCategoryName = event.target.value;

        this.setState(state);
    };

    handleNewExpenseTypeNameChange = (categoryName) => event => {
        let state = this.state;
        state.plan.newExpenses[categoryName] = event.target.value;

        this.setState(state);
    };

    handleIncomeCategoryValueChange = categoryName => event => {
        let state = this.state;
        for (let k in state.plan.incomeCategories) {
            if (state.plan.incomeCategories.hasOwnProperty(k)) {
                if (state.plan.incomeCategories[k].name === categoryName) {
                    state.plan.incomeCategories[k].value = parseFloat(event.target.value);
                }
            }
        }

        this.setState(state);
        this.updateIncomesSum();
    };

    handleExpenseTypeValueChange = (categoryIndex, typeIndex) => event => {
        let state = this.state;
        state.plan.expenseCategories[categoryIndex].types[typeIndex].value = parseFloat(event.target.value);
        this.setState(state);
        this.updateExpenseCategorySum(categoryIndex);
    };

    updateIncomesSum() {
        let sum = 0;
        let state = this.state;

        for (let i in state.plan.incomeCategories) {
            if (state.plan.incomeCategories.hasOwnProperty(i)) {
                sum += parseFloat(state.plan.incomeCategories[i].value);
            }
        }

        state.plan.incomesSum = sum;
        this.setState(state);

        this.updateExpensesLeft();
    }

    updateExpensesLeft() {
        let state = this.state;

        let expensesSum = 0;
        for (let k in state.plan.expenseCategoriesSums) {
            if (state.plan.expenseCategoriesSums.hasOwnProperty(k)) {
                expensesSum += parseFloat(state.plan.expenseCategoriesSums[k]);
            }
        }

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

    updateExpenseCategorySum = categoryIndex => {
        let state = this.state;
        let categoryName = state.plan.expenseCategories[categoryIndex].name;
        let sum = 0;
        for (let k in state.plan.expenseCategories[categoryIndex].types) {
            if (state.plan.expenseCategories[categoryIndex].types.hasOwnProperty(k)) {
                sum += parseFloat(state.plan.expenseCategories[categoryIndex].types[k].value);
            }
        }

        state.plan.expenseCategoriesSums[categoryName] = sum;

        let totalSum = 0;
        for (let k in state.plan.expenseCategoriesSums) {
            if (state.plan.expenseCategoriesSums.hasOwnProperty(k)) {
                totalSum += parseFloat(state.plan.expenseCategoriesSums[k]);
            }
        }
        state.plan.expensesSum = totalSum;

        this.setState(state);
        this.updateExpensesLeft();
    };

    getPeriod(classes) {
        return <div className={classes.datePickersContainer}>
            <TextField
                label='Od'
                type='date'
                value={this.state.plan.from}
                onChange={this.handleModelChange('from')}
                className={classes.datePicker}
                InputLabelProps={{
                    shrink: true,
                }}/>
            <TextField
                label='Do'
                type='date'
                value={this.state.plan.to}
                onChange={this.handleModelChange('to')}
                className={classes.datePicker}
                InputLabelProps={{
                    shrink: true
                }}/>
        </div>
    }

    getNextDisabled() {
        switch (this.state.activeStep) {
            case 0:
                return false;
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

    getIncomeCategories(classes) {
        return <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Nazwa kategorii</TableCell>
                    <TableCell numeric>Kwota</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.plan.incomeCategories.map(ic => {
                    return (
                        <TableRow key={'incomeCategory-' + ic.name}>
                            <TableCell component="th" scope="row">
                                {ic.name}
                            </TableCell>
                            <TableCell numeric>
                                <TextField className={classes.tableInput}
                                           value={ic.value}
                                           onChange={this.handleIncomeCategoryValueChange(ic.name)}
                                           InputProps={{
                                               inputComponent: NumberFormatCustom,
                                               endAdornment: <InputAdornment position="end">zł</InputAdornment>
                                           }}
                                />
                                <IconButton color="secondary" component="span"
                                            onClick={() => this.deleteIncomeCategory(ic.name)}>
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
                <TableRow key="new-income-category">
                    <TableCell numeric>
                        <TextField className={classes.tableCategoryNameInput}
                                   value={this.state.plan.newIncomeCategoryName}
                                   placeholder="Nazwa kategorii"
                                   onChange={this.handleNewIncomeCategoryNameChange()}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton color="primary" onClick={() => this.addIncomeCategory()} style={{float: 'right'}}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow key="sum">
                    <TableCell component="th" scope="row">
                        <b>SUMA</b>
                    </TableCell>
                    <TableCell numeric>
                        <CurrencyFormat className={classes.tableSumInput}
                                        value={this.state.plan.incomesSum}
                                        displayType='text'
                                        thousandSeparator=' '
                                        suffix=" zł"
                                        decimalSeparator=','/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    }

    getSummary(classes) {
        return <div className={classes.summaryPanel}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Pozycja</TableCell>
                        <TableCell numeric>Kwota</TableCell>
                    </TableRow>
                </TableHead>
                <TableRow key="summary-incomes-sum">
                    <TableCell scope="row">
                        Suma przychodów
                    </TableCell>
                    <TableCell numeric>
                        <CurrencyFormat className={classes.tableSummarySumInput}
                                        value={this.state.plan.incomesSum}
                                        displayType='text'
                                        thousandSeparator=' '
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        suffix=" zł"
                                        decimalSeparator=','/>
                    </TableCell>
                </TableRow>
                <TableRow key="summary-expenses-sum">
                    <TableCell scope="row">
                        Suma wydatków
                    </TableCell>
                    <TableCell numeric>
                        <CurrencyFormat className={classes.tableSummarySumInput}
                                        value={this.state.plan.expensesSum}
                                        displayType='text'
                                        thousandSeparator=' '
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        suffix=" zł"
                                        decimalSeparator=','/>
                    </TableCell>
                </TableRow>
                <TableRow key="summary-difference-sum">
                    <TableCell scope="row">
                        <b>Różnica</b>
                    </TableCell>
                    <TableCell numeric>
                        <CurrencyFormat className={this.state.plan.expensesLeft === 0.0? classes.expensesLeftSummaryInputOk: classes.expensesLeftSummaryInputWrong}
                                        value={this.state.plan.expensesLeft}
                                        displayType='text'
                                        thousandSeparator=' '
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        suffix=" zł"
                                        decimalSeparator=','/>
                    </TableCell>
                </TableRow>
            </Table>

            <div className={classes.summaryTitleContainer}>
                <Chip label={this.state.plan.expensesLeft === 0.0 ? "Bilans planu prawidłowy!" : "Całkowita kwota kosztów nie pokrywa planowanych wydatków!"}
                      className={classes.chip}
                      variant="outlined"
                      color={this.state.plan.expensesLeft === 0.0 ? "primary" : "secondary"}
                      classes={{
                          outlinedPrimary: classes.summaryTitleOk,
                          outlinedSecondary: classes.summaryTitleWrong
                      }}
                      icon={this.state.plan.expensesLeft === 0.0 ? <CheckCircleOutlineIcon/> : <ErrorOutlineIcon/>} />
            </div>
        </div>
    }

    getExpenseCategories(classes) {
        return <div className={classes.expensePanel}>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Suma przychodów:
                </Typography>
                <Typography className={classes.expensesLeftAmount}>
                    <CurrencyFormat value={this.state.plan.incomesSum}
                                    displayType='text'
                                    suffix=' zł'
                                    thousandSeparator=' '
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    decimalSeparator=','/>
                </Typography>
            </div>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Suma wydatków:
                </Typography>
                <Typography
                    className={classes.expensesLeftAmount}>
                    <CurrencyFormat value={this.state.plan.expensesSum}
                                    displayType='text'
                                    suffix=' zł'
                                    thousandSeparator=' '
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    decimalSeparator=','/>
                </Typography>
            </div>
            <div className={classes.expensesLeftContainer}>
                <Typography className={classes.expensesLeftTitle}>
                    Pozostało do zagospodarowania:
                </Typography>
                <Typography
                    className={this.state.plan.expensesLeft >= 0 ? classes.expensesLeftAmountOk : classes.expensesLeftAmountWrong}>
                    <CurrencyFormat value={this.state.plan.expensesLeft}
                                    displayType='text'
                                    suffix=' zł'
                                    thousandSeparator=' '
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    decimalSeparator=','/>
                </Typography>
            </div>
            <div className={classes.progressRoot}>
                <LinearProgress variant="determinate" color="primary" value={this.state.plan.expensesLeftProgress}
                                classes={{
                                    colorPrimary: this.state.plan.expensesLeft >= 0 ? classes.progressColorOk : classes.progressColorWrong,
                                    barColorPrimary: this.state.plan.expensesLeft >= 0 ? classes.progressBarColorOk : classes.progressBarColorWrong
                                }}/>
            </div>
            {this.state.plan.expenseCategories.map((ec, ecIndex) => {
                return (
                    <ExpansionPanel defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.expansionPanelHeading}>
                                {ec.name}
                            </Typography>
                            <Typography className={classes.expansionPanelSubHeading}>
                                {<CurrencyFormat value={this.state.plan.expenseCategoriesSums[ec.name]}
                                                 displayType='text'
                                                 thousandSeparator=' '
                                                 suffix=' zł'
                                                 decimalSeparator=','/>}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell numeric>Kwota</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ec.types.map((expenseType, expenseTypIndex) => {
                                        return (
                                            <TableRow key={'expense-' + ec.name + '-' + expenseType.name}>
                                                <TableCell component="th" scope="row">
                                                    {expenseType.name}
                                                </TableCell>
                                                <TableCell numeric>
                                                    <TextField className={classes.tableInput}
                                                               value={expenseType.value}
                                                               onChange={this.handleExpenseTypeValueChange(ecIndex, expenseTypIndex)}
                                                               InputProps={{
                                                                   inputComponent: NumberFormatCustom,
                                                                   endAdornment: <InputAdornment
                                                                       position="end">zł</InputAdornment>
                                                               }}
                                                    />
                                                    <IconButton color="secondary" component="span"
                                                                onClick={() => this.deleteExpenseType(ecIndex, expenseTypIndex)}>
                                                        <CloseIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow key={"new-expense-type-" + ec.name}>
                                        <TableCell numeric>
                                            <TextField className={classes.tableCategoryNameInput}
                                                       value={this.state.plan.newExpenses[ec.name]}
                                                       placeholder="Nazwa kategorii"
                                                       onChange={this.handleNewExpenseTypeNameChange(ec.name)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => this.addExpenseType(ec.name)}
                                                        style={{float: 'right'}}>
                                                <AddIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    }

    handleNext = () => {
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep + 1
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
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
                        {steps.map((label, index) => {
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
                                <Typography className={classes.instructions}>
                                    <div className={classes.container}>
                                        {this.getStepContent(this.state.activeStep, classes)}
                                    </div>
                                </Typography>
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
