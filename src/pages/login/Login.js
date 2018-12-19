import React, {Component} from 'react';
import {userService} from "../../services/UserService";
import {TextField, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/es/Button/Button";
import Chip from "@material-ui/core/es/Chip/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {Redirect} from "react-router-dom";

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
    loginContainer: {
        width: 400,
        margin: '0 auto'
    },
    field: {
        minWidth: 400
    },
    loginButton: {
        marginTop: '10px'
    },
    chip: {
        margin: theme.spacing.unit,
    },
    chipError: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginButtonDisabled: true,
            submitted: false,
            loginErrorMessage: '',
            loginSucceeded: false
        };
    }

    submit = () => {
        if (this.state.usernameInvalid || this.state.passwordInvalid) {
            return;
        }

        userService.login(this.state.username, this.state.password)
            .then(() => {
                console.log('OK!');
                console.log(this.props);
                this.setState({
                    loginSucceeded: true
                });
            }, e => {
                this.setState({
                    loginErrorMessage: e.data.error,
                    username: '',
                    usernameInvalid: true,
                    password: '',
                    passwordInvalid: true,
                });
            });
    };

    onFieldChange = (fieldName) => event => {
        let state = this.state;
        state[fieldName] = event.target.value;
        state[fieldName + 'Invalid'] = !event.target.value;

        state.loginButtonDisabled = !state['username'] || !state['password'];

        this.setState(state);
    };

    getError = () => {
        if (this.state.loginErrorMessage) {
            return <Chip label={this.state.loginErrorMessage}
                         className={this.props.classes.chip}
                         classes={{
                             outlinedSecondary: this.props.classes.chipError
                         }}
                         color="secondary"
                         variant="outlined"
                         icon={<ErrorOutlineIcon/>}/>
        }
    };

    render() {
        const {classes} = this.props;

        if(this.state.loginSucceeded){
            return <Redirect to='/'/>
        }

        return (
            <div className={classes.root}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography variant='h6'>
                        Logowanie
                    </Typography>

                    <div className={classes.loginContainer} align="center">
                        {this.getError()}
                        <div>
                            <TextField label="Nazwa użytkownika"
                                       value={this.state.username}
                                       onChange={this.onFieldChange('username')}
                                       margin="normal"
                                       className={classes.field}/>
                        </div>
                        <div>
                            <TextField label="Hasło"
                                       value={this.state.password}
                                       onChange={this.onFieldChange('password')}
                                       type="password"
                                       margin="normal"
                                       className={classes.field}/>
                        </div>
                        <div align="right" className={classes.loginButton}>
                            <Button variant="contained"
                                    color="secondary"
                                    onClick={this.submit}
                                    disabled={this.state.loginButtonDisabled}>
                                Zaloguj
                            </Button>
                        </div>
                    </div>

                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
