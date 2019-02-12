import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import ContentWrapper from "../../../common/ContentWrapper";
import Paper from "@material-ui/core/Paper";
import IncomeService from "../../../services/IncomeService";
import ItemsList from "../common/ItemsList";

const styles = () => ({
    IncomeCategoriesListRoot: {
        marginTop: '30px',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px'
    }
});

class IncomesCategoriesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.incomeService = new IncomeService();
    }

    componentDidMount() {
        this.incomeService.getIncomeCategories().then(data => {
            if (!data || !data.data) {
                return;
            }

            this.setState({
                data: data.data
            });
        }).catch(e => {
            console.log(e);
        });
    }

    onListItemsChange = (items) => {
        this.setState({
            data: items
        });
    };

    getListItems = () => {
        return <ItemsList onChange={this.onListItemsChange}
                          items={this.state.data}
                          newItemTitle="Nazwa kategorii"/>
    };

    render() {
        const {classes} = this.props;

        return <ContentWrapper>
            <div className={classes.IncomeCategoriesListRoot}>
                <Paper elevation={1}>
                    <div>
                        {this.getListItems()}
                    </div>
                </Paper>
            </div>
        </ContentWrapper>;
    }
}

export default withStyles(styles)(IncomesCategoriesList);
