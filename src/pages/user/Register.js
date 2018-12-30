import React, {Component} from 'react';
import {userService} from "../../services/UserService";
import Chip from "@material-ui/core/Chip/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {Link, Redirect} from "react-router-dom";
import {TextField, withStyles} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const styles = theme => ({
    RegisterRoot: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    RegisterChip: {
        margin: theme.spacing.unit,
    },
    RegisterFormContainer: {
        margin: '0 auto'
    },
    RegisterField: {
        minWidth: 400
    },
    RegisterChipError: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
    RegisterButton: {
        marginLeft: 'auto'
    },
    RegisterActions: {
        display: 'flex'
    },
});

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            registerButtonDisabled: true,
            submitted: false,
            errorMessage: '',
            registrationSucceeded: false
        };
    }

    submit = () => {
        let registration = {
            username: this.state.username,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
        };

        userService.register(registration)
            .then(() => {
                this.setState({
                    registrationSucceeded: true
                });
            }, e => {
                console.log(e);
                this.setState({
                    errorMessage: e.data.error,
                    username: '',
                    password: '',
                    passwordConfirm: ''
                });
            });
    };

    onFieldChange = (fieldName) => event => {
        let state = this.state;
        state[fieldName] = event.target.value;

        state.registerButtonDisabled = !state.username
            || !state.password
            || !state.passwordConfirm;

        this.setState(state);
    };

    getError = () => {
        if (this.state.errorMessage) {
            return <Chip label={this.state.errorMessage}
                         className={this.props.classes.RegisterChip}
                         classes={{
                             outlinedSecondary: this.props.classes.RegisterChipError
                         }}
                         color="secondary"
                         variant="outlined"
                         icon={<ErrorOutlineIcon/>}/>
        }
    };

    render() {
        const {classes} = this.props;

        if (this.state.registrationSucceeded) {
            return <Redirect to='/'/>
        }

        return <Card className={classes.RegisterRoot}>
            <CardHeader title="Rejestracja"/>
            <CardContent>
                <div className={classes.RegisterFormContainer} align="center">
                    {this.getError()}
                    <div>
                        <TextField label="Nazwa użytkownika"
                                   value={this.state.username}
                                   onChange={this.onFieldChange('username')}
                                   margin="normal"
                                   className={classes.RegisterField}/>
                    </div>
                    <div>
                        <TextField label="Hasło"
                                   value={this.state.password}
                                   onChange={this.onFieldChange('password')}
                                   type="password"
                                   margin="normal"
                                   className={classes.RegisterField}/>
                    </div>
                    <div>
                        <TextField label="Potwierdź hasło"
                                   value={this.state.passwordConfirm}
                                   onChange={this.onFieldChange('passwordConfirm')}
                                   type="password"
                                   margin="normal"
                                   className={classes.RegisterField}/>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.RegisterActions} disableActionSpacing>
                <Button variant="outlined" color="default" component={Link} to="/">
                    Anuluj
                </Button>
                <Button variant="outlined"
                        color="primary"
                        className={classes.RegisterButton}
                        onClick={this.submit}
                        disabled={this.state.registerButtonDisabled}>
                    Zarejestruj
                </Button>
            </CardActions>
        </Card>
    }
}

export default withStyles(styles)(Register);
