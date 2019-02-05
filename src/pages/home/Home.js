import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import {withStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './Home.css';
import {Link} from "react-router-dom";
import PlanSummary from '../budgets/components/PlanSummary';
import PlanService from "../../services/PlanService";
import Drawer from "@material-ui/core/Drawer";
import ContentWrapper from "../../common/ContentWrapper";
import DrawerMenu from "../../common/DrawerMenu";

const drawerWidth = 280;

const styles = theme => ({
    HomeRoot: {
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    HomeContent: {
        flexGrow: 1,
    },
    HomeLandingPageTitle: {
        color: grey['500'],
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    HomeNewPlanButton: {
        marginTop: '24px'
    },
    toolbar: theme.mixins.toolbar
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: undefined,
            drawerOpen: false
        };

        this.planService = new PlanService();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.planService.getCurrentPlan().then(data => {
            let plans = {};
            if (data && data.data) {
                plans = data.data;
            }
            this.setState({
                budget: plans
            });
        }).catch(e => {
            //todo: handle error
            console.log(e);

            this.setState({
                budget: {}
            });
        });
    };

    getNormalDrawer = () => {
        return <Drawer
            className={this.props.classes.drawer}
            variant="permanent"
            classes={{
                paper: this.props.classes.drawerPaper,
            }}
        >
            <div className={this.props.classes.toolbar}/>
            <DrawerMenu />
        </Drawer>
    };

    render() {
        const {classes} = this.props;

        let content;

        if (!this.state.budget) {
            return <Grid container direction="column" alignItems="center" justify="center" className="landing-pane">
                <Grid item>
                    <Typography variant="h4" className={classes.HomeLandingPageTitle}>
                        Ładowanie...
                    </Typography>
                </Grid>
            </Grid>;
        } else if (this.state.budget && !this.state.budget.id) {
            content =
                <div>
                    <Grid container direction="column" alignItems="center" justify="center" className="landing-pane">
                        <Grid item>
                            <Typography variant="h4" className={classes.HomeLandingPageTitle}>
                                Nie masz jeszcze budżetu wliczającego dzisiejszy dzień!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className={classes.HomeNewPlanButton}
                                    component={Link} to='/budgets/new'>
                                <AddIcon/>
                                Utwóż nowy
                            </Button>
                        </Grid>
                    </Grid>
                </div>;
        } else {
            content = <div>
                <PlanSummary planId={this.state.budget.id} onPlanChanged={this.getData}/>
            </div>
        }

        return (
            <div className={classes.HomeRoot}>
                {this.getNormalDrawer()}
                <div className={classes.HomeContent}>
                    <ContentWrapper>
                        {content}
                    </ContentWrapper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
