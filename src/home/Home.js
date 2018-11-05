import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import {withStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './Home.css';
import {Link} from "react-router-dom";

const styles = theme => ({
    landingPageTitle: {
        color: grey['500']
    }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budgetPlans: []
        }
    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        let content;

        if (!this.state.budgetPlans || this.state.budgetPlans.length === 0) {
            content =
                <Grid container direction="column" alignItems="center" spacing="24" justify="center" className="landing-pane">
                    <Grid item>
                        <Typography variant="h3" className={classes.landingPageTitle}>
                            Nie masz jeszcze żadnego planu budżetowego!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" component={Link} to='/budgets/new'>
                            <AddIcon />
                            Utwóż nowy
                        </Button>
                    </Grid>
                </Grid>;
        }

        return (
            <div >
                {content}
            </div>
        );
    }
}

export default withStyles(styles)(Home);
