import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import {TextField, withStyles} from "@material-ui/core";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
    formContainer: {
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        flex: '1 auto'
    }
});

class AddCategoryType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.category,
            categories: this.props.categories,
            type: ''
        };
    }

    close = (result) => {
        let data = {
            category: result ? this.state.category : undefined,
            type: result ? this.state.type : undefined
        };

        this.props.onClose(data.category, data.type);
        this.setState({
            type: ''
        });
    };

    handleClose = () => {
        this.close(false);
    };

    handleAdd = () => {
        this.close(true);
    };

    handleCategoryChange = event => {
        this.setState({
            category: event.target.value
        });
    };

    handleCategoryTypeChange = event => {
        this.setState({
            type: event.target.value
        });
    };

    render() {
        const {classes, open} = this.props;

        return (
            <Dialog onClose={this.handleClose} open={open} key={"add-category-type-dialog"} disableAutoFocus={true}>
                <DialogTitle>Dodaj typ kategorii</DialogTitle>
                <DialogContent>
                    <div className={classes.formContainer}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="expense-category-dialog">Kategoria</InputLabel>
                            <Select value={this.state.category}
                                    onChange={this.handleCategoryChange}
                                    inputProps={{
                                        name: 'expense-category-dialog',
                                        id: 'expense-category-dialog'
                                    }}>
                                {this.state.categories.map((item, index) => {
                                    return <MenuItem value={item.name}
                                                     divider={true}
                                                     key={"category-add-"+index}
                                                     id={"category-add-"+index}>
                                        {item.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.formContainer}>
                        <TextField value={this.state.type}
                                   className={classes.formControl}
                                   onChange={this.handleCategoryTypeChange}
                                   required
                                   label="Typ kategorii"/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        <CloseIcon/>
                        Anuluj
                    </Button>
                    <Button onClick={this.handleAdd} color="primary" variant="contained" autoFocus
                            disabled={!this.state.type}>
                        <AddIcon/>
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

AddCategoryType.propTypes = {
    onClose: PropTypes.func,
};

export default withStyles(styles)(AddCategoryType);
