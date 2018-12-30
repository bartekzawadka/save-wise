import React, {Component} from 'react';
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {withStyles} from "@material-ui/core";

const styles = () => ({
    WidgetCardContent: {
        paddingTop: '0px'
    },
});

class Widget extends Component{
    getCardHeader(){
        return <CardHeader
            subheader={this.props.title}
        />
    }

    render() {
        return <Grid item xs={this.props.gridSizeXs} md={this.props.gridSizeMd} xl={this.props.gridSizeXl}>
            <Card>
                {this.getCardHeader()}
                <CardContent className={this.props.noPadding === true ? this.props.classes.WidgetCardContent : undefined}>
                    {this.props.children}
                </CardContent>
            </Card>
        </Grid>
    }
}

Widget.propTypes = {
    plan: PropTypes.object.isRequired,
    gridSizeXs: PropTypes.number.isRequired,
    gridSizeMd: PropTypes.number.isRequired,
    gridSizeXl: PropTypes.number.isRequired,
    title: PropTypes.string,
    noPadding: PropTypes.bool.isRequired
};

export default withStyles(styles)(Widget);
