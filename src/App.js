import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {fade} from '@material-ui/core/styles/colorManipulator';
import {CssBaseline} from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom';
import Home from './pages/home/Home';
import BudgetsList from './pages/budgets/BudgetsList';
import NewBudgetPlan from "./pages/budgets/new/NewBudgetPlan";
import {loadProgressBar} from "axios-progress-bar";
import 'axios-progress-bar/dist/nprogress.css';
import moment from 'moment';
import 'moment/locale/pl';
import {userService} from "./services/UserService";
import UserMenu from "./UserMenu";
import ChangePassword from "./pages/user/ChangePassword";
import Register from "./pages/user/Register";
import EditIncomes from "./pages/budgets/EditIncomes";
import ExpenseList from "./pages/expense/ExpenseList";
import AddEditExpense from "./pages/expense/AddEditExpense";
import logo from "./logo.png";
import Main from "./pages/user/Main";

function getTheme(type) {
    return createMuiTheme({
        palette: {
            type: type,
            primary: {
                main: '#006699'
            },
            secondary: {
                main: '#ffc400',
            },
        },
    });
}

const theme = getTheme('light');

const styles = theme => ({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    menuButtonIcon: {
        marginRight: 10,
        marginTop: 8
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontFamily: 'Kabel Bk BT',
        fontSize: 35,
        textDecoration: 'none'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    logo: {
        marginRight: 5
    }
});

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        userService.isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to='/main' />
    )}/>
);

class App extends Component {
    constructor(props) {
        super(props);
        loadProgressBar({
            showSpinner: false
        });
    }

    render() {
        const {classes} = this.props;
        moment.locale('pl');

        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <img src={logo} width={48} height={48} className={classes.logo} alt=""/>
                                <Typography className={classes.title} color="inherit" variant="h6" noWrap
                                            component={Link} to="/">
                                    savewise
                                </Typography>
                                <div className={this.props.classes.grow}/>
                                <UserMenu />
                            </Toolbar>
                        </AppBar>
                    </div>

                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/main" component={Main}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute exact path="/changePassword" component={ChangePassword}/>
                    <PrivateRoute exact path="/budgets/list" component={BudgetsList}/>
                    <PrivateRoute exact path='/budgets/new' component={NewBudgetPlan}/>
                    <PrivateRoute exact path='/expense/add/:planId' component={AddEditExpense}/>
                    <PrivateRoute exact path='/plan/incomes/:planId' component={EditIncomes}/>
                    <PrivateRoute exact path='/expenses/:planId' component={ExpenseList}/>
                    <PrivateRoute exact path='/expense/edit/:planId/:expenseId' component={AddEditExpense}/>
                    <Redirect to="/main" />
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);
