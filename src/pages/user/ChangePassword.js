import React, {Component} from 'react';
import {userService} from "../../services/UserService";
import {TextField, withStyles} from "@material-ui/core";
import Chip from "@material-ui/core/es/Chip";
import Button from "@material-ui/core/es/Button";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import {Link, Redirect} from "react-router-dom";

const styles = theme => ({
    ChangePasswordRoot: {
        maxWidth: '700px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    ChangePasswordField: {
        width: '100%'
    },
    ChangePasswordFormContainer: {
        margin: '0 auto'
    },
    ChangePasswordButton: {
        marginLeft: 'auto'
    },
    ChangePasswordActions: {
        display: 'flex'
    },
    ChangePasswordChip: {
        margin: theme.spacing.unit,
    },
    ChangePasswordChipError: {
        color: "#ff3d00",
        borderColor: "#ff3d00"
    },
});

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            oldPassword: '',
            newPassword: '',
            passwordConfirm: '',
            buttonDisabled: true,
            submitted: false,
            changePasswordErrorMessage: '',
            changePasswordSucceeded: false
        };
    }

    submit = () => {
        let data = {
            username: this.state.username,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            passwordConfirm: this.state.passwordConfirm
        };

        userService.changePassword(data)
            .then(() => {
                this.setState({
                    changePasswordSucceeded: true
                });
            }, e => {
                this.setState({
                    changePasswordErrorMessage: e.data.error,
                    username: '',
                    oldPassword: '',
                    newPassword: '',
                    passwordConfirm: '',
                });
            });
    };

    onFieldChange = (fieldName) => event => {
        let state = this.state;
        state[fieldName] = event.target.value;

        state.buttonDisabled = !state.username
            || !state.oldPassword
            || !state.newPassword
            || !state.passwordConfirm;

        this.setState(state);
    };

    getError = () => {
        if (this.state.changePasswordErrorMessage) {
            return <Chip label={this.state.changePasswordErrorMessage}
                         className={this.props.classes.ChangePasswordChip}
                         classes={{
                             outlinedSecondary: this.props.classes.ChangePasswordChipError
                         }}
                         color="secondary"
                         variant="outlined"
                         icon={<ErrorOutlineIcon/>}/>
        }
    };

    render() {
        const {classes} = this.props;

        if (this.state.changePasswordSucceeded) {
            return <Redirect to='/'/>
        }

        return <Card className={classes.ChangePasswordRoot}>
            <CardHeader title="Zmiana hasła"/>
            <CardContent>
                <div className={classes.ChangePasswordFormContainer} align="center">
                    {this.getError()}
                    <div>
                        <TextField label="Nazwa użytkownika"
                                   value={this.state.username}
                                   onChange={this.onFieldChange('username')}
                                   margin="normal"
                                   className={classes.ChangePasswordField}/>
                    </div>
                    <div>
                        <TextField label="Stare hasło"
                                   value={this.state.oldPassword}
                                   onChange={this.onFieldChange('oldPassword')}
                                   type="password"
                                   margin="normal"
                                   className={classes.ChangePasswordField}/>
                    </div>
                    <div>
                        <TextField label="Nowe hasło"
                                   value={this.state.newPassword}
                                   onChange={this.onFieldChange('newPassword')}
                                   type="password"
                                   margin="normal"
                                   className={classes.ChangePasswordField}/>
                    </div>
                    <div>
                        <TextField label="Potwierdź hasło"
                                   value={this.state.passwordConfirm}
                                   onChange={this.onFieldChange('passwordConfirm')}
                                   type="password"
                                   margin="normal"
                                   className={classes.ChangePasswordField}/>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.ChangePasswordActions} disableActionSpacing>
                <Button variant="outlined" color="default" component={Link} to="/">
                    Anuluj
                </Button>
                <Button variant="outlined"
                        color="primary"
                        className={classes.ChangePasswordButton}
                        onClick={this.submit}
                        disabled={this.state.buttonDisabled}>
                    Zmień hasło
                </Button>
            </CardActions>
        </Card>
    }
}

export default withStyles(styles)(ChangePassword);
