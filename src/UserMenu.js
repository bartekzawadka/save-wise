import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/es/Divider/Divider";
import {userService} from "./services/UserService";
import {withStyles} from "@material-ui/core";

const ITEM_HEIGHT = 48;

const styles = theme => ({
    loginButton: {
        marginLeft: 5
    },
    icon: {
        color: theme.palette.common.white
    }
});

class UserMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    logout = () => {
      userService.logout();
      window.location.reload(true);
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={this.props.classes.icon}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    className={this.props.classes.loginButton}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem component={Link} to="/login">
                        Zmiana hasła
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.logout}>
                        Wyloguj
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(UserMenu);
