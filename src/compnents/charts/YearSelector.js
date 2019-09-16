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
        this.init = true;
    }

    updateChart(startValue, endValue) {
        this.lineChartsInstance && this.lineChartsInstance.setOption(this.option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: this.xData
            },
            yAxis: {
                show: true,
                splitLine: {
                    show: false
                },
                interval: 500000000,
                name: '面积'
            },
            dataZoom: [{
                startValue,
                endValue
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
            },
            series: {
                name: '疆域面积',
                type: 'line',
                color:['#b78b26'],
                areaStyle: {
                    color: '#b78b26' //折线下方色块颜色
                },
                data: this.data,
                areaStyle: {}
            }
        },true);
    }

    renderChart(data, startValue=0, endValue=131) {
        //console.log(data)
        this.xData = data.map(function (item) {
            return item[0];
        });
        this.data = data.map(function (item) {
            return (item[1] / 1.56).toFixed(0); // 面积数据存在问题，暂时解决
        });
        this.lineChartsInstance = echarts.init(this.charts.current);
        this.lineChartsInstance.setOption(this.option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: this.xData
            },
            yAxis: {
                show: true,
                splitLine: {
                    show: false
                },
                interval: 500000000,
                name: '面积'
            },
            dataZoom: [{
                startValue,
                endValue
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
            },
            series: {
                name: '疆域面积',
                type: 'line',
                color:['#b78b26'],
                areaStyle: {
                    color: '#b78b26' //折线下方色块颜色
                },
                data: this.data,
                areaStyle: {}
            }
        },true);
        this.lineChartsInstance.on('click', 'series', e => {
            const index = e.dataIndex;
            const name = e.name
            console.log(e)
            this.props.onClick(index,name);
            this.props.onCurrentYearIdxChange(index);
        });
    }

    componentDidMount() {
        if (this.props.data.length) {
            this.renderChart.call(this, this.props.data, 0, 131);
        }
    }

    componentDidUpdate(prevProps) {
        //console.log(this.renderChart)
        
        if (this.props.data.length && !this.init) {
            let startValue, endValue;
            if (this.props.center) {
                startValue = this.props.center - 4 < 0 ? 0 : this.props.center - 4;
                endValue = this.props.center + 4;
            }
            this.updateChart.call(this, startValue, endValue);
        } else if (this.props.data && this.init) {
            this.renderChart.call(this, this.props.data, 0, 131);
            this.init = false;
        }
    }

    render() {
        return (
            <div style={this.props.style} className={s.charts}>
                <div  ref={this.charts}></div>
            </div>
        )
    }
}

export { YearSelector };