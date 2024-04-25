import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class Time extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();

        // Define default daily activities and their durations
        this.defaultData = [
            { label: 'Sleep', value: 8 },
            { label: 'Work', value: 8 },
            { label: 'Exercise', value: 1 },
            { label: 'Socialize', value: 2 },
            { label: 'Other', value: 5 },
        ];

        this.colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']; // Example colors
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        const { data, colors } = this.props;

        const chartData = data && data.length > 0 ? data : this.defaultData;
        const chartColors = colors && colors.length > 0 ? colors : this.colors;

        if (this.chartRef.current) {
            new Chart(this.chartRef.current, {
                type: 'pie',
                data: {
                    labels: chartData.map(item => item.label),
                    datasets: [{
                        data: chartData.map(item => item.value),
                        backgroundColor: chartColors,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.chartRef} />
            </div>
        );
    }
}

export default Time;
