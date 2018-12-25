import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pie} from "react-chartjs-2";
import Widget from "./Widget";
import ColorHelper from "../../../../common/ColorHelper";

class ExpenseCategoryShareWidget extends Component {
    getData = () => {
        let result = {
            data: [],
            labels: [],
            backgroundColor: []
        };

        if (!this.props.plan.expensesPerCategory || this.props.plan.expensesPerCategory.length === 0) {
            return result;
        }

        let totalSum = 0.0;

        for (let k in this.props.plan.expensesPerCategory) {
            if (this.props.plan.expensesPerCategory.hasOwnProperty(k)) {
                try {
                    totalSum += this.props.plan.expensesPerCategory[k].sum;
                } catch {
                }
            }
        }

        for (let k in this.props.plan.expensesPerCategory) {
            if (this.props.plan.expensesPerCategory.hasOwnProperty(k)) {
                try {
                    let sum = parseFloat(this.props.plan.expensesPerCategory[k].sum);
                    if (sum > 0.0) {
                        result.data.push(parseFloat((sum / totalSum) * 100.0));
                        result.labels.push(this.props.plan.expensesPerCategory[k].category);
                        result.backgroundColor.push(ColorHelper.generateRandomColor());
                    }
                } catch {
                }
            }
        }

        return result;
    };

    getChartParams() {
        let data = this.getData();

        return {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: data.backgroundColor
            }]
        }
    }

    render() {
        return <Widget
            gridSizeXl={6}
            gridSizeMd={6}
            gridSizeXs={12}
            plan={this.props}
            noPadding={true}
            title="Udziały kategorii w wydatkach [%]">
            <Pie data={this.getChartParams()} legend={{
                display: true
            }}/>
        </Widget>
    }
}

ExpenseCategoryShareWidget.propTypes = {
    plan: PropTypes.object.required
};

export default ExpenseCategoryShareWidget;
