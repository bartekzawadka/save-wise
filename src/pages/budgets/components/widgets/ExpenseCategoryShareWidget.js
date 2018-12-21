import React, {Component} from 'react';
import {Pie} from "react-chartjs-2";
import Widget from "./Widget";

class ExpenseCategoryShareWidget extends Component {
    getData() {
        return {
            labels: ["Przychody", "Wydatki"],
            datasets: [{
                data: [7724.48, 2255.11],
                backgroundColor: [
                    'rgba(255, 22, 132, 0.8)',
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
            gridSizeXl={6}
            gridSizeMd={6}
            gridSizeXs={12}
            plan={this.props}
            noPadding={true}
            title="Udziały kategorii w wydatkach">
            <Pie data={this.getData()} legend={{
                display: false
            }}/>
        </Widget>
    }
}

export default ExpenseCategoryShareWidget;
