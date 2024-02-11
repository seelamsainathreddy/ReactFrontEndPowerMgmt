import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class MonthlyConnectionsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthlyData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Monthly Connections',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56, 55, 40, 50, 66, 67, 70, 80] // Sample data
                    }
                ]
            }
        };
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Monthly Connections</h2>
                <div>
                    <Bar
                        data={this.state.monthlyData}
                        options={{
                            title: {
                                display: true,
                                text: 'Monthly Connection Bar Chart',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyConnectionsChart;
