import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {CssBaseline} from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom';
import Home from './pages/home/Home';
import BudgetsList from './pages/budgets/BudgetsList';
import BudgetPlan from "./pages/budgets/new/BudgetPlan";
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
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import DrawerMenu from "./common/DrawerMenu";
import PlansHistoryList from "./pages/budgets/history/PlansHistoryList";
import PlanDashboard from "./pages/budgets/history/PlanDashboard";
import IncomesCategoriesList from "./pages/categories/incomes/IncomesCategoriesList";

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
        typography: {
            useNextVariants: true,
        },
    });
}

const theme = getTheme('light');

const styles = theme => ({
    AppRootClass: {
        width: '100%'
    },
    AppGrow: {
        flexGrow: 1,
    },
    AppBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    AppTitle: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontFamily: 'Kabel Bk BT',
        fontSize: 35,
        textDecoration: 'none'
    },
    AppLogoClass: {
        marginRight: 5
    },
    AppMenuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        marginLeft: -12,
        marginRight: 20,
    },
    fullList: {
        width: 'auto'
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

        this.state = {
            drawerOpen: false
        };
    }

    toggleDrawer = state => () => {
        this.setState({
            drawerOpen: state
        });
    };

    getSwipeableDrawer = () => {
        return <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
            >
                <div className={this.props.classes.fullList}>
                    <DrawerMenu />
                </div>

            </div>
        </Drawer>
    };

    render() {
        const {classes} = this.props;
        moment.locale('pl');

        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={classes.AppRootClass}>
                        <AppBar position="fixed" className={classes.AppBar}>
                            <Toolbar>
                                <IconButton className={classes.AppMenuButton}
                                            onClick={this.toggleDrawer(true)}
                                            color="inherit"
                                            aria-label="Menu">
                                    <MenuIcon />
                                </IconButton>
                                <img src={logo}
                                     width={48}
                                     height={48}
                                     className={classes.AppLogoClass}
                                     alt=""/>
                                <Typography className={classes.AppTitle} color="inherit" variant="h6"
                                            component={Link} to="/">
                                    savewise
                                </Typography>
                                <div className={this.props.classes.AppGrow}/>
                                <UserMenu />
                            </Toolbar>
                        </AppBar>
                    </div>
                    {this.getSwipeableDrawer()}

                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/main" component={Main}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute exact path="/changePassword" component={ChangePassword}/>
                    <PrivateRoute exact path='/budgets/new' component={BudgetPlan}/>
                    <PrivateRoute exact path='/budgets/edit/:planId' component={BudgetPlan} />
                    <PrivateRoute exact path='/expense/add/:planId' component={AddEditExpense}/>
                    <PrivateRoute exact path='/plan/incomes/:planId' component={EditIncomes}/>
                    <PrivateRoute exact path='/plan/history' component={PlansHistoryList}/>
                    <PrivateRoute exact path='/plan/dashboard/:planId' component={PlanDashboard} />
                    <PrivateRoute exact path='/expenses/:planId' component={ExpenseList}/>
                    <PrivateRoute exact path='/expenses/:planId/:category' component={ExpenseList}/>
                    <PrivateRoute exact path='/expense/edit/:planId/:expenseId' component={AddEditExpense}/>
                    <PrivateRoute exact path='/categories/income' component={IncomesCategoriesList} />
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);
