import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import ContentWrapper from "../../../common/ContentWrapper";
import PlanSummary from "../components/PlanSummary";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

const styles = theme => ({
    PlanDashboardRoot: {
        marginTop: '30px',
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
    },
});

class PlanDashboard extends Component {
    onGoBack = () => {
        this.props.history.goBack();
    };

    render() {
        return <ContentWrapper>
            <div className={this.props.classes.PlanDashboardRoot}>
                <Button variant="contained"
                        color="primary"
                        onClick={this.onGoBack}>
                    <KeyboardArrowLeftIcon/>
                    Powrót
                </Button>
            </div>
            <PlanSummary planId={this.props.match.params.planId}/>
        </ContentWrapper>
    }
}

export default withStyles(styles)(PlanDashboard);
