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
import {Link} from 'react-router-dom';
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
        width: '100px'
    },
    tableCategoryNameInput: {
        width: '100%'
    },
    error: {
        color: "#ff0000"
    }
});

function getSteps() {
    return ['Wybierz okres rozliczeniowy', 'Wybierz kategorie przychodów', 'Określ planowane wydatki', 'Podsumowanie'];
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
                incomesSum: 0,
                expenseCategories: []
            }
        }
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        let result = await axios.get(ApiCalls.getNewPlanIncomeCategoriesGetUrl());
        let state = this.state;

        let data = result.data;
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                data[k].value = 0
            }
        }

        this.state.plan.incomeCategories = data;
        this.setState(state);
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

    deleteIncomeCategory(name) {
        let state = this.state;
        let index;
        for(let k in state.plan.incomeCategories){
            index = k;
            if(state.plan.incomeCategories.hasOwnProperty(k)){
                if(state.plan.incomeCategories[k].name === name){
                    break;
                }
            }
        }

        state.plan.incomeCategories.splice(index, 1);

        this.setState(state);
        this.updateSum();
    }

    getStepContent(step, classes) {
        switch (step) {
            case 0:
                return this.getPeriod(classes);
            case 1:
                return this.getIncomeCategories(classes);
            case 2:
                return 'This is the bit I really care about!';
            case 3:
                return 'PODSUMOWANIE!';
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

    handleIncomeCategoryValueChange = categoryName => event => {
        let state = this.state;
        for (let k in state.plan.incomeCategories) {
            if (state.plan.incomeCategories.hasOwnProperty(k)) {
                if (state.plan.incomeCategories[k].name === categoryName) {
                    state.plan.incomeCategories[k].value = event.target.value;
                }
            }
        }

        this.setState(state);
        this.updateSum();
    };

    updateSum() {
        let sum = 0;
        let state = this.state;

        for (let i in state.plan.incomeCategories) {
            if (state.plan.incomeCategories.hasOwnProperty(i)) {
                sum += parseFloat(state.plan.incomeCategories[i].value);
            }
        }

        state.plan.incomesSum = sum;

        this.setState(state);
    }

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

    getIncomeCategories(classes) {
        return <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Nazwa kategorii</TableCell>
                    <TableCell numeric>Kwota</TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.plan.incomeCategories.map(ic => {
                    return (
                        <TableRow key={ic.name}>
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
                            </TableCell>
                            <TableCell>
                                <IconButton color="secondary" component="span" onClick={()=>this.deleteIncomeCategory(ic.name)}>
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
                <TableRow key="new-category">
                    <TableCell numeric>
                        <TextField className={classes.tableCategoryNameInput}
                                   value={this.state.plan.newIncomeCategoryName}
                                   onChange={this.handleNewIncomeCategoryNameChange()}
                        />
                    </TableCell>
                    <TableCell/>
                    <TableCell>
                        <IconButton color="primary" onClick={() => this.addIncomeCategory()}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow key="sum">
                    <TableCell component="th" scope="row">
                        <b>SUMA</b>
                    </TableCell>
                    <TableCell numeric>
                        <TextField className={classes.tableInput}
                                   defaultValue="0" value={this.state.plan.incomesSum}
                                   InputProps={{
                                       inputComponent: NumberFormatCustom,
                                       endAdornment: <InputAdornment position="end">zł</InputAdornment>
                                   }} disabled>
                        </TextField>
                    </TableCell>
                    <TableCell/>
                </TableRow>
            </TableBody>
        </Table>
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
        //const {activeStep} = this.state.activeStep;

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
                        {//TODO: Replace with summary
                        }
                        {this.state.activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&quot;re finished
                                </Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </div>
                        ) : (
                            <div>
                                { //TODO: Replace with content
                                }
                                <Typography className={classes.instructions}>
                                    <div className={classes.container}>
                                        {/*<StepContent>*/}
                                        {this.getStepContent(this.state.activeStep, classes)}
                                        {/*</StepContent>*/}
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
                                    >
                                        {this.state.activeStep === steps.length - 1 ? <CheckIcon/> :
                                            <KeyboardArrowRightIcon/>}
                                        {this.state.activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
                                    </Button>
                                </div>
                            </div>
                        )}
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
