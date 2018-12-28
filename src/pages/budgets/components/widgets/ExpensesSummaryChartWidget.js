import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Bar} from "react-chartjs-2";
import Widget from "./Widget";

class ExpensesSummaryChartWidget extends Component {
    getValue = (property) => {
        try {
            return parseFloat(this.props.plan[property] ? this.props.plan[property] : 0.0);
        } catch {
            return 0.0;
        }
    };

    getData = () => {
        return [
            this.getValue('incomesSum'),
            this.getValue('expensesSum')
        ]
    };

    getChartParams() {
        return {
            labels: ["Przychody", "Wydatki"],
            datasets: [{
                data: this.getData(),
                backgroundColor: [
                    '#77a258', '#d84315'
                ],
            }]
        }
    }

    render() {
        return <Widget
            noPadding={true}
            plan={this.props}
            gridSizeXs={12}
            gridSizeMd={6}
            gridSizeXl={6}
            title="Zestawienie wydatków">
            <Bar data={this.getChartParams()} legend={{
                display: false
            }} options={{
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }}/>
        </Widget>
    }
}

ExpensesSummaryChartWidget.propTypes = {
    plan: PropTypes.object.required
};

export default ExpensesSummaryChartWidget;
