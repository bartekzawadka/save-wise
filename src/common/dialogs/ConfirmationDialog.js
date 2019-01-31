import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

class ConfirmationDialog extends Component {
    handleClose = (result) => {
        if (this.props.onClose) {
            this.props.onClose(result);
        }
    };

    getTitle = () => {
      if(this.props.title){
          return this.props.title;
      }

      return "Czy chcesz kontynuować?"
    };

    render() {
        return (
            <Dialog open={this.props.open}
                    onClose={() => this.handleClose(false)}>
                <DialogTitle>
                    {this.getTitle()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose(false)}>
                        <CloseIcon />
                        Anuluj
                    </Button>
                    <Button color="primary" onClick={() => this.handleClose(true)}>
                        <CheckIcon />
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

ConfirmationDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.required,
    open: PropTypes.bool.required,
    onClose: PropTypes.func
};

export default ConfirmationDialog;
