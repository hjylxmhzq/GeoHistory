import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/title';
import s from './YearSelector.less';

class YearSelector extends Component {
    constructor(props) {
        super(props);
        this.charts = React.createRef();
        this.lineChartsInstance = null;
        this.option = null;
    }

    renderChart(data) {
        this.lineChartsInstance = echarts.init(this.charts.current);
        this.lineChartsInstance.setOption(this.option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.map(function (item) {
                    return item[0];
                })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            dataZoom: [{
                startValue: '2014-06-01'
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
            },
            series: {
                name: 'Beijing AQI',
                type: 'line',
                data: data.map(function (item) {
                    return item[1];
                })
            }
        });
    }

    componentDidMount() {
        if (this.props.data.length) {
            this.renderChart.call(this, this.props.data);
        }
    }

    componentDidUpdate() {
        if (this.props.data.length) {
            this.renderChart.call(this, this.props.data);
        }
    }

    render() {
        return (
            <div className={s.charts}>
                <div  ref={this.charts}></div>
            </div>
        )
    }
}

export { YearSelector };