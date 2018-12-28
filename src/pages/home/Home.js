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

const styles = theme => ({
    landingPageTitle: {
        color: grey['500']
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
    zoom: {
        transitionDelay: `${theme.transitions.duration.leavingScreen}ms`
    },
    newPlanButton: {
        marginTop: '24px'
    },
    transitionDuration: {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: undefined
        };

        this.planService = new PlanService();
    }

    componentDidMount() {
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
        })
    }

    render() {
        const {classes} = this.props;

        let content;

        if (!this.state.budget) {
            return <Grid container direction="column" alignItems="center" justify="center" className="landing-pane">
                <Grid item>
                    <Typography variant="h3" className={classes.landingPageTitle}>
                        Ładowanie...
                    </Typography>
                </Grid>
            </Grid>;
        } else if (this.state.budget && !this.state.budget.id) {
            content =
                <div>
                    <Grid container direction="column" alignItems="center" justify="center" className="landing-pane">
                        <Grid item>
                            <Typography variant="h3" className={classes.landingPageTitle}>
                                Nie masz jeszcze budżetu wliczającego dzisiejszy dzień!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className={classes.newPlanButton}
                                    component={Link} to='/budgets/new'>
                                <AddIcon/>
                                Utwóż nowy
                            </Button>
                        </Grid>
                    </Grid>
                </div>;
        } else {
            content = <div>
                <PlanSummary plan={this.state.budget}/>
            </div>
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default withStyles(styles)(Home);
