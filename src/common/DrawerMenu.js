import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HistoryIcon from "@material-ui/icons/History";
import CategoryIcon from "@material-ui/icons/Category";
import BarChartIcon from "@material-ui/icons/BarChart";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

class DrawerMenu extends Component{
    render() {
        return <List>
            <ListItem button key="MainMenu-PlansHistory" component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Start"} />
            </ListItem>
            <ListItem button key="MainMenu-PlansHistory" component={Link} to="/plan/history">
                <ListItemIcon>
                    <HistoryIcon/>
                </ListItemIcon>
                <ListItemText primary={"Historia planów"} />
            </ListItem>
            <ListItem button key="MainMenu-PlansHistory">
                <ListItemIcon>
                    <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary={"Katetorie wydatków"} />
            </ListItem>
            <ListItem button key="MainMenu-PlansHistory">
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary={"Katetorie przychodów"} />
            </ListItem>
        </List>
    }
}

export default DrawerMenu;
