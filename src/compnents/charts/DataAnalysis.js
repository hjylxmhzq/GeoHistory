import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/title';
import { optionalCallExpression } from '@babel/types';

const creatChartOption = (data) => ({

    title: {
        text: '分布状况',
        left: 'center',
        textStyle: {
            color: '#111'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data,
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
});


class DataAnalysis extends Component {
    constructor(props) {
        super(props);
        this.charts = React.createRef();
        this.lineChartsInstance = null;
        this.option = creatChartOption(props.data);

    }

    renderChart(data) {
        //console.log(data)
        data = data.selectedBoundary.map(i => {
            return {
                name: i.attributes.Name,
                value: parseInt(i.attributes.Area)
            }
        })
        console.log(data);
        this.lineChartsInstance = echarts.init(this.charts.current);
        this.lineChartsInstance.setOption(creatChartOption(data), true);
        this.lineChartsInstance.on('click', 'series', e => {
            const index = e.dataIndex;
            const name = e.name
            console.log(e)
            this.props.onClick(index, name);
        });
    }

    componentDidMount() {
        if (this.props.data.length) {
            this.renderChart.call(this, this.props.data);
        }
    }

    componentDidUpdate() {
        //console.log(this.renderChart)

        if (this.props.data.selectedBoundary.length > 0) {
            this.renderChart.call(this, this.props.data);
        }
    }

    render() {
        return (
            <div style={{ height: 200 }}>
                <div style={{ height: 200 }} ref={this.charts}></div>
            </div>
        )
    }
}


const createEventOption = (xData, yData) => {
    const option = {

        title: {
            text: '统计',
            left: 'center',
            textStyle: {
                color: '#111'
            }
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '数量',
                type: 'bar',
                barWidth: '70%',
                data: yData
            }
        ]
    };
    return option;
}

class EventDataAnalysis extends Component {
    constructor(props) {
        super(props);
        this.charts = React.createRef();
        this.lineChartsInstance = null;
        this.option = createEventOption(props.data);

    }

    renderChart(data) {
        //console.log(data)
        const result = {};
        data = data.selectedEvents.forEach(i => {
            if (result[i.attributes.HCityName]) {
                result[i.attributes.HCityName]++;
            } else {
                result[i.attributes.HCityName] = 1;
            }
        });
        const xData = [];
        const yData = [];
        Object.entries(result).forEach(i => {
            xData.push(i[0]);
            yData.push(i[1]);
        })
        console.log(xData, yData);
        this.lineChartsInstance = echarts.init(this.charts.current);
        this.lineChartsInstance.setOption(createEventOption(xData, yData), true);
        this.lineChartsInstance.on('click', 'series', e => {
            const index = e.dataIndex;
            const name = e.name
            console.log(e)
            this.props.onClick(index, name);
        });
    }

    componentDidMount() {
        if (this.props.data.length) {
            this.renderChart.call(this, this.props.data);
        }
    }

    componentDidUpdate() {
        //console.log(this.renderChart)

        if (this.props.data.selectedBoundary.length > 0) {
            this.renderChart.call(this, this.props.data);
        }
    }

    render() {
        return (
            <div style={{ height: 200 }}>
                <div style={{ height: 200 }} ref={this.charts}></div>
            </div>
        )
    }
}


export { DataAnalysis, EventDataAnalysis };