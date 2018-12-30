import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import PlanService from "../../services/PlanService";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/es/Divider/Divider";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import CurrencyText from "../../common/CurrencyText";
import TextField from "@material-ui/core/TextField";
import CurrencyField from "./new/components/CurrencyField";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

const styles = () => ({
    EditIncomesRoot: {
        maxWidth: '960px',
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
    },
    EditIncomesTable: {
        margin: '0 auto'
    },
    EditIncomesConfirmButton: {
        marginLeft: 'auto'
    },
    EditIncomesNegativeDiff: {
        color: "#ff3d00"
    }
});

class EditIncomes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incomes: []
        };

        this.planService = new PlanService();
    }

    componentDidMount() {
        this.planService.getPlanIncomes(this.props.match.params.planId).then(data => {
            if (!data) {
                return;
            }

            let incomes = data.data;
            if (incomes && incomes.length > 0) {
                for (let k in incomes) {
                    if (incomes.hasOwnProperty(k)) {
                        incomes[k].diff = parseFloat(incomes[k].amount - incomes[k].plannedAmount)
                    }
                }
            }

            this.setState({
                incomes: incomes
            });
        }).catch(e => {
            //todo: add error dialog
            console.log(e);
        })
    }

    handleAmountChange = (index) => event => {
        let state = this.state;
        let value;
        try {
            value = parseFloat(event.target.value);
        } catch {
            value = state[index].amount;
        }

        state.incomes[index].amount = value;
        state.incomes[index].diff = parseFloat(value - state.incomes[index].plannedAmount);

        this.setState(state);
    };

    getTableBody = () => {
        if (!this.state.incomes) {
            return;
        }

        return this.state.incomes.map((item, index) => {
            return (<TableRow key={"income-category-" + index}>
                <TableCell component="th" scope="row">
                    {item.category}
                </TableCell>
                <TableCell numeric>
                    <CurrencyText value={item.plannedAmount}/>
                </TableCell>
                <TableCell numeric>
                    <TextField value={item.amount}
                               onChange={this.handleAmountChange(index)}
                               InputProps={{
                                   inputComponent: CurrencyField,
                                   endAdornment: <InputAdornment position="end">zł</InputAdornment>
                               }}/>
                </TableCell>
                <TableCell numeric>
                    <CurrencyText value={item.diff} className={item.diff < 0.0
                        ? this.props.classes.EditIncomesNegativeDiff
                        : ''}/>
                </TableCell>
            </TableRow>);
        });
    };

    submit = () => {
        this.planService.setPlanIncomes(this.props.match.params.planId, this.state.incomes)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(e => {
                //todo: add error dialog
                console.log(e);
            })
    };

    render() {
        const {classes} = this.props;

        return <div className={classes.EditIncomesRoot}>
            <Card>
                <CardHeader title="Określ rzeczywiste przychody"/>
                <Divider/>
                <CardContent>
                    <Table className={classes.EditIncomesTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa kategorii</TableCell>
                                <TableCell>Planowane przychody</TableCell>
                                <TableCell>Rzeczywiste przychody</TableCell>
                                <TableCell>Różnica</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.getTableBody()}
                        </TableBody>
                    </Table>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button variant="outlined" color="default" component={Link} to="/">
                        <CloseIcon/>
                        Anuluj
                    </Button>
                    <Button variant="outlined"
                            color="primary"
                            className={classes.EditIncomesConfirmButton}
                            onClick={this.submit}>
                        <SaveIcon/>
                        Zapisz
                    </Button>
                </CardActions>
            </Card>
        </div>
    }
}

export default withStyles(styles)(EditIncomes);
