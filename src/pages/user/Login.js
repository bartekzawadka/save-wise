import React, { Component } from 'react';
import { userService } from "../../services/UserService";
import { TextField, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import Chip from "@material-ui/core/Chip/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Redirect } from "react-router-dom";
import ErrorResolver from '../../common/ErrorResolver';

const styles = theme => ({
    LoginRoot: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    LoginPaper: {
        padding: theme.spacing.unit * 2,
    },
    LoginPaperLoginContainer: {
        width: 400,
        margin: '0 auto'
    },
    LoginField: {
        minWidth: 400
    },
    LoginButtonContainer: {
        marginTop: '10px',
    },
    LoginButton: {
        width: 200
    },
    LoginChip: {
        margin: theme.spacing.unit,
    },
    LoginChipError: {
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
            loginErrorMessage: [],
            loginSucceeded: false
        };
    }

    submit = () => {
        userService.login(this.state.username, this.state.password)
            .then(() => {
                this.setState({
                    loginSucceeded: true
                });
            }, e => {
                this.setState({
                    loginErrorMessage: ErrorResolver.resolveError(e.data),
                    username: '',
                    password: '',
                });
            });
    };

    onFieldChange = (fieldName) => event => {
        let state = this.state;
        state[fieldName] = event.target.value;

        state.loginButtonDisabled = !state['username'] || !state['password'];

        this.setState(state);
    };

    getError = () => {
        if (this.state.loginErrorMessage && this.state.loginErrorMessage.length > 0) {
            return this.state.loginErrorMessage.map(item => {
                return <Chip label={item}
                    className={this.props.classes.LoginChip}
                    classes={{
                        outlinedSecondary: this.props.classes.LoginChipError
                    }}
                    color="secondary"
                    variant="outlined"
                    icon={<ErrorOutlineIcon />} />
            });
        }
    };

    render() {
        const { classes } = this.props;

        if (this.state.loginSucceeded) {
            return <Redirect to='/' />
        }

        return (
            <div className={classes.LoginRoot}>
                <Paper elevation={1} className={classes.LoginPaper}>
                    <Typography variant='h5'>
                        Logowanie
                    </Typography>

                    <div className={classes.LoginPaperLoginContainer} align="center">
                        {this.getError()}
                        <div>
                            <TextField label="Nazwa użytkownika"
                                value={this.state.username}
                                onChange={this.onFieldChange('username')}
                                margin="normal"
                                className={classes.LoginField} />
                        </div>
                        <div>
                            <TextField label="Hasło"
                                value={this.state.password}
                                onChange={this.onFieldChange('password')}
                                type="password"
                                margin="normal"
                                className={classes.LoginField} />
                        </div>
                        <div align="center" className={classes.LoginButtonContainer}>
                            <Button variant="outlined"
                                color="primary"
                                className={classes.LoginButton}
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
