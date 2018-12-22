import React, {Component} from 'react';
import {TextField, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import {Link} from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import CurrencyField from "../budgets/new/components/CurrencyField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import ExpenseService from "../../services/ExpenseService";

const styles = theme => ({
    root: {
        maxWidth: '600px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    datePicker: {
        margin: theme.spacing.unit,
        width: '100%'
    },
    error: {
        color: "#ff3d00"
    },
    formContainer: {
        margin: '0 auto'
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
    },
    saveButton: {
        marginLeft: 'auto'
    },
    actions: {
        display: 'flex'
    },
});


class AddExpense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            types: [],
            date: {
                value: new Date().yyyymmdd(),
                isInvalid: false,
                defaultErrorMessage: 'Data wydatku jest wymagana',
                errorMessage: ''
            },
            category: {
                value: '',
                isInvalid: true,
                defaultErrorMessage: 'Nie wybrano kategorii wydatku',
                errorMessage: 'Nie wybrano kategorii wydatku'
            },
            type: {
                value: '',
                isInvalid: true,
                defaultErrorMessage: 'Nie wybrano typu kategorii',
                errorMessage: 'Nie wybrano typu kategorii'
            },
            comment: {
                value: ''
            },
            amount: {
                value: 0.0,
                isInvalid: true,
                defaultErrorMessage: 'Kwota wydatku jest nieprawidłowa',
                errorMessage: 'Kwota wydatku jest nieprawidłowa'
            },
            isFormInvalid: true
        };

        this.expenseService = new ExpenseService();
    }

    componentDidMount() {
        this.expenseService.getExpenseCategories().then(data => {
            let state = this.state;
            state.categories = data.data;
            state.types = AddExpense.getTypes(this.state);

            this.setState(state);
        });
    }

    onValueChange = (property) => event => {
        let state = this.state;
        state[property].value = event.target.value;
        if (state[property].value) {
            state[property].isInvalid = false;
            state[property].errorMessage = '';
        } else {
            state[property].isInvalid = true;
            state[property].errorMessage = state[property].defaultErrorMessage;
        }

        if (property === 'category') {
            state['type'].value = '';
            state.types = AddExpense.getTypes(state);
        }

        this.setState(state);
        this.validateForm();
    };

    static getTypes(state) {
        let types = [];
        if (state.category.value) {
            for (let k in state.categories) {
                if (state.categories.hasOwnProperty(k)) {
                    if (state.categories[k].name !== state.category.value) {
                        continue;
                    }

                    types = state.categories[k].types.map(item => {
                        return item.name;
                    });
                }
            }
        }

        return types;
    }

    onAmountChange = () => event => {
        let state = this.state;

        try {
            state.amount.value = parseFloat(event.target.value);
            if (state.amount.value > 0.0) {
                state.amount.isInvalid = false;
                state.amount.errorMessage = '';
            } else {
                state.amount.isInvalid = true;
                state.amount.errorMessage = state.amount.defaultErrorMessage;
            }
        } catch {
            state.amount.isInvalid = true;
            state.amount.errorMessage = state.amount.defaultErrorMessage;
        }

        this.setState(state);
        this.validateForm();
    };

    validateForm = () => {
        let state = this.state;
        state.isFormInvalid = state.date.isInvalid
            || state.category.isInvalid
            || state.type.isInvalid
            || state.amount.isInvalid;

        this.setState(state);
    };

    submit = () => {
        let data = {
            date: this.state.date.value,
            category: this.state.category.value,
            type: this.state.type.value,
            comment: this.state.comment.value,
            amount: this.state.amount.value
        };

        this.expenseService.addExpense(this.props.match.params.planId, data)
            .then(()=>{
                this.props.history.push('/');
            })
            .catch(e=>{
                console.log(e);
            })
    };

    render() {
        const {classes} = this.props;

        return <div className={classes.root}>
            <Card>
                <CardHeader title="Dodaj wydatek"/>
                <CardContent>
                    <div className={classes.formContainer} align="center">
                        <TextField
                            label="Data wydatku"
                            type='date'
                            required
                            error={this.state.date.isInvalid}
                            helperText={this.state.date.errorMessage}
                            value={this.state.date.value}
                            onChange={this.onValueChange('date')}
                            className={classes.datePicker}
                            InputLabelProps={{
                                shrink: true
                            }}/>
                    </div>
                    <div className={classes.formContainer} align="center">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="expense-category">Kategoria</InputLabel>
                            <Select value={this.state.category.value}
                                    required
                                    error={this.state.category.isInvalid}
                                    onChange={this.onValueChange('category')}
                                    inputProps={{
                                        name: 'expense-category',
                                        id: 'expense-category'
                                    }}>
                                {this.state.categories.map((item) => {
                                    return <MenuItem value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                })}
                            </Select>
                            <FormHelperText
                                className={classes.error}>{this.state.category.errorMessage}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.formContainer} align="center">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="expense-type">Typ</InputLabel>
                            <Select value={this.state.type.value}
                                    required
                                    error={this.state.type.isInvalid}
                                    onChange={this.onValueChange('type')}
                                    inputProps={{
                                        name: 'expense-type',
                                        id: 'expense-type'
                                    }}>
                                {this.state.types.map((item) => {
                                    return <MenuItem value={item}>
                                            {item}
                                    </MenuItem>
                                })}
                            </Select>
                            <FormHelperText className={classes.error}>{this.state.type.errorMessage}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.formContainer} align="center">
                        <FormControl className={classes.formControl}>
                            <TextField value={this.state.amount.value}
                                       required
                                       error={this.state.amount.isInvalid}
                                       helperText={this.state.amount.errorMessage}
                                       onChange={this.onAmountChange()}
                                       label="Kwota" InputProps={{
                                inputComponent: CurrencyField,
                                endAdornment: <InputAdornment position="end">zł</InputAdornment>
                            }}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.formContainer} align="center">
                        <FormControl className={classes.formControl}>
                            <TextField value={this.state.comment.value}
                                       onChange={this.onValueChange('comment')}
                                       label="Komentarz" rows={6} multiline/>
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Button variant="outlined" color="default" component={Link} to="/">
                        <CloseIcon/>
                        Anuluj
                    </Button>
                    <Button variant="outlined"
                            color="primary"
                            disabled={this.state.isFormInvalid}
                            className={classes.saveButton}
                            onClick={this.submit}>
                        <SaveIcon/>
                        Zapisz
                    </Button>
                </CardActions>
            </Card>
        </div>
    }
}

export default withStyles(styles)(AddExpense);
