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
    root: {
        maxWidth: '700px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    field: {
        width: '100%'
    },
    formContainer: {
        margin: '0 auto'
    },
    changePasswordButtonContainer: {
        display: 'flex'
    },
    changePasswordButton: {
        marginLeft: 'auto'
    },
    actions: {
        display: 'flex'
    },
    chip: {
        margin: theme.spacing.unit,
    },
    chipError: {
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

        if (this.state.changePasswordSucceeded) {
            return <Redirect to='/'/>
        }

        return <Card className={classes.root}>
            <CardHeader title="Zmiana hasła"/>
            <CardContent>
                <div className={classes.formContainer} align="center">
                    {this.getError()}
                    <div>
                        <TextField label="Nazwa użytkownika"
                                   value={this.state.username}
                                   onChange={this.onFieldChange('username')}
                                   margin="normal"
                                   className={classes.field}/>
                    </div>
                    <div>
                        <TextField label="Stare hasło"
                                   value={this.state.oldPassword}
                                   onChange={this.onFieldChange('oldPassword')}
                                   type="password"
                                   margin="normal"
                                   className={classes.field}/>
                    </div>
                    <div>
                        <TextField label="Nowe hasło"
                                   value={this.state.newPassword}
                                   onChange={this.onFieldChange('newPassword')}
                                   type="password"
                                   margin="normal"
                                   className={classes.field}/>
                    </div>
                    <div>
                        <TextField label="Potwierdź hasło"
                                   value={this.state.passwordConfirm}
                                   onChange={this.onFieldChange('passwordConfirm')}
                                   type="password"
                                   margin="normal"
                                   className={classes.field}/>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <Button variant="outlined" color="default" component={Link} to="/">
                    Anuluj
                </Button>
                <Button variant="outlined"
                        color="primary"
                        className={classes.changePasswordButton}
                        onClick={this.submit}
                        disabled={this.state.buttonDisabled}>
                    Zmień hasło
                </Button>
            </CardActions>
        </Card>
    }
}

export default withStyles(styles)(ChangePassword);
