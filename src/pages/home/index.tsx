import React from 'react';
import { Card, Row, Col } from 'antd';
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from "echarts-for-react";

export default class Dashboard extends React.Component {
  getOption = () => {
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push('第' + (i + 1) + '日');
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    return {
      title: {
        text: 'Echarts Demo',
        subtext: '柱状图动画延迟',
        left: 30
      },
      legend: {
        orient: 'vertical',
        data: ['股票1', '股票2']
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
      },
      yAxis: {
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx: any) {
          return idx * 10;
        }
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx: any) {
          return idx * 20 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx: any) {
        return idx * 5;
      }
    }
  }

  render() {
    return (
      <Card style={{ marginTop: '15px' }} >
        <Row>
          <Col className="gutter-row" span={24} >
            <div><ReactEcharts style={{ height: '720px' }} option={this.getOption()} /></div>
          </Col>
        </Row>
      </Card>
    );
  }
}
