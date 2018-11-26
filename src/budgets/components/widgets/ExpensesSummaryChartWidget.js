import React, {Component} from 'react';
import {Bar} from "react-chartjs-2";
import Widget from "./Widget";

class ExpensesSummaryChart extends Component {
    getData() {
        return {
            labels: ["Przychody", "Wydatki"],
            datasets: [{
                data: [7724.48, 2255.11],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ]
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
            <Bar data={this.getData()} legend={{
                display: false
            }}/>
        </Widget>
    }
}

export default ExpensesSummaryChart;
