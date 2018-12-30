import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider/Divider";
import {userService} from "./services/UserService";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import HistoryIcon from"@material-ui/icons/History";
import VpnKeyIcon from"@material-ui/icons/VpnKey";
import ExitToAppIcon from"@material-ui/icons/ExitToApp";

const ITEM_HEIGHT = 48;

const styles = theme => ({
    UserMenuLoginButton: {
        marginLeft: 5
    },
    UserMenuIcon: {
        color: theme.palette.common.white
    },
    UserMenuMenuIcon: {
        marginRight: theme.spacing.unit
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
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    getUserButton(isOpen) {
        if (userService.isAuthenticated()) {
            let userInfo = JSON.parse(userService.getUserInfo());

            return <Button
                aria-owns={isOpen ? 'long-menu' : undefined}
                aria-haspopup="true"
                variant="flat"
                onClick={this.handleClick}
                className={this.props.classes.UserMenuIcon}
            >
                <AccountCircleIcon/>
                {userInfo.username}
            </Button>
        } else {
            return <IconButton
                aria-label="More"
                aria-owns={isOpen ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={this.props.classes.UserMenuIcon}

            >
                <AccountCircleIcon/>
            </IconButton>
        }
    }

    getMenu = (anchorEl,isOpen) => {
        if (userService.isAuthenticated()) {
            return <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={this.handleClose}
                className={this.props.classes.UserMenuLoginButton}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                <MenuItem disabled>
                    <HistoryIcon className={this.props.classes.UserMenuMenuIcon}/>
                    Historia budżetów
                </MenuItem>
                <Divider/>
                <MenuItem component={Link} to="/changePassword">
                    <VpnKeyIcon className={this.props.classes.UserMenuMenuIcon}/>
                    Zmiana hasła
                </MenuItem>
                <Divider/>
                <MenuItem onClick={this.logout}>
                    <ExitToAppIcon className={this.props.classes.UserMenuMenuIcon}/>
                    Wyloguj
                </MenuItem>
            </Menu>
        } else {
            return <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={this.handleClose}
                className={this.props.classes.UserMenuLoginButton}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                <MenuItem component={Link} to="/main">
                    Logowanie
                </MenuItem>
            </Menu>
        }
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                {this.getUserButton(open)}
                {this.getMenu(anchorEl, open)}
            </div>
        );
    }
}

export default withStyles(styles)(UserMenu);
