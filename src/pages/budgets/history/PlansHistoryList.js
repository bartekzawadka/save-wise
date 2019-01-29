import React, {Component} from 'react';
import {
    Divider,
    ExpansionPanel, ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText,
    TextField, Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import ContentWrapper from "../../../common/ContentWrapper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import PlanService from "../../../services/PlanService";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import CurrencyText from "../../../common/CurrencyText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ConfirmationDialog from "../../../common/dialogs/ConfirmationDialog";
import {Link} from "react-router-dom";

const styles = theme => ({
    PlansHistoryListRoot: {
        marginTop: '30px',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px'
    },
    PlansHistoryListTitle: {
        marginBottom: 10
    },
    PlansHistoryListGoBackButton: {
        marginBottom: 10
    },
    PlansHistoryListFilterHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    PlansHistoryListFilterContainer: {
        margin: '0 auto'
    },
    PlansHistoryListFilterField: {
        margin: theme.spacing.unit,
        width: 200,
    },
    PlansHistoryListPaper: {
        marginTop: 10
    },
    PlansHistoryListSuccessColor: {
        color: '#357a38'
    },
    PlansHistoryListItemDelete: {
        marginRight: 5,
        color: '#ff3d00'
    }
});

class PlansHistoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                dateFrom: undefined,
                dateTo: undefined
            },
            plans: [],
            deleteDialogOpen: false,
            itemToDeleteId: undefined
        };

        this.planService = new PlanService();
    }

    componentDidMount() {
        this.onSearch();
    }

    onValueChange = (property) => event => {
        let state = this.state;
        state.filter[property] = event.target.value;
        this.setState(state);
    };

    onGoBack = () => {
        this.props.history.goBack();
    };

    onSearch = () => {
        this.planService.getPlans(this.state.filter)
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    this.setState({
                        plans: data.data
                    });
                }
            })
            .catch(e => {
                //todo: replace with error handling
                console.log(e);
            })
    };

    handleDeleteDialogOpen = (id) => {
        this.setState({
            itemToDeleteId: id,
            deleteDialogOpen: true
        });
    };

    handleDeleteDialogClosed = (result) => {
        if (result && this.state.itemToDeleteId) {
            this.planService.deletePlan(this.state.itemToDeleteId)
                .then(this.onSearch)
                .catch(e => {
                    console.log(e);
                })
        }

        this.setState({
            itemToDeleteId: undefined,
            deleteDialogOpen: false
        });
    };

    getDataList = () => {
        if (!this.state.plans || this.state.plans.length === 0) {
            return;
        }

        return <Paper className={this.props.classes.PlansHistoryListPaper} elevation={1}>
            <List component="nav">
                {
                    this.state.plans.map((item, index) => {
                        let period = new Date(item.startDate).yyyymmdd() + ' - ' + new Date(item.endDate).yyyymmdd();
                        let link = item.isActive ? '/' : '/plan/dashboard/'+item.id;
                        let subheader = <div>
                            <div>
                                <span>Przychody: </span>
                                <CurrencyText value={item.incomesSum}/>
                            </div>
                            <div>
                                <span>Wydatki: </span>
                                <CurrencyText value={item.expensesSum}/>
                            </div>
                        </div>;
                        return <div><ListItem button component={Link} to={link}>
                            <ListItemIcon>
                                {item.isActive
                                    ? <Tooltip title="Bieżący">
                                        <HomeIcon className={this.props.classes.PlansHistoryListSuccessColor}/>
                                    </Tooltip>
                                    : <Tooltip title="Historyczny"><HistoryIcon/></Tooltip>}
                            </ListItemIcon>
                            <ListItemText primary={'Okres rozliczeniowy: ' + period}
                                          secondary={subheader}/>
                            <ListItemSecondaryAction>
                                <IconButton className={this.props.classes.PlansHistoryListItemDelete}
                                            onClick={() => this.handleDeleteDialogOpen(item.id)}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                            {index < this.state.plans.length - 1 ? <Divider/> : null}
                        </div>
                    })
                }
            </List>
        </Paper>
    };

    render() {
        const {classes} = this.props;

        return <ContentWrapper>
            <div className={classes.PlansHistoryListRoot}>
                <Typography variant="h6" className={classes.PlansHistoryListTitle}>
                    Historia realizacji planów budżetowych
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.PlansHistoryListGoBackButton}
                        onClick={this.onGoBack}>
                    <KeyboardArrowLeftIcon/>
                    Powrót
                </Button>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.PlansHistoryListFilterHeading}>
                            Filtry
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.PlansHistoryListFilterContainer}>
                            <TextField className={classes.PlansHistoryListFilterField}
                                       label="Data od:"
                                       type="date"
                                       onChange={this.onValueChange('dateFrom')}
                                       InputLabelProps={{
                                           shrink: true
                                       }}/>
                            <TextField className={classes.PlansHistoryListFilterField}
                                       label="Data do:"
                                       type="date"
                                       onChange={this.onValueChange('dateTo')}
                                       InputLabelProps={{
                                           shrink: true
                                       }}/>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button variant="contained" color="secondary" onClick={this.onSearch}>
                            <SearchIcon/>
                            Szukaj
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                {this.getDataList()}
                <ConfirmationDialog message="Czy na pewno chcesz usunąć ten budżet? Ta operacja jest nieodwracalna!"
                                    title="Czy chcesz kontynuować?"
                                    open={this.state.deleteDialogOpen}
                                    onClose={this.handleDeleteDialogClosed}/>
            </div>
        </ContentWrapper>
    }
}

export default withStyles(styles)(PlansHistoryList);
