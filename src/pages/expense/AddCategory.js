import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import {TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

class AddCategory extends Component{
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        };
    }

    handleClose = () => {
        this.props.onClose(this.state.category);
        this.setState({
            category: ''
        });
    };

    handleCategoryChange = event => {
      this.setState({
          category: event.target.value
      });
    };

    render() {
        const {...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} {...other}>
                <DialogTitle>Dodaj kategorię wydatków</DialogTitle>
                <DialogContent>
                    <TextField value={this.state.category}
                    onChange={this.handleCategoryChange}
                    required
                    label="Nazwa kategorii" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        <CloseIcon/>
                        Anuluj
                    </Button>
                    <Button onClick={this.handleClose} color="primary" variant="contained" autoFocus
                    disabled={!this.state.category}>
                        <AddIcon/>
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

AddCategory.propTypes = {
        onClose: PropTypes.func
};

export default AddCategory;
