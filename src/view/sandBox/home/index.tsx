import { Card } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import _ from 'lodash'
type EChartsOption = echarts.EChartsOption;

const Home: React.FC = () => {

  const chartRef: any = useRef()
  const chartBlurRef: any = useRef()

  useEffect(() => {

    axios.get("http://localhost:2222/news?publishState=2&_expand=category").then(res => {
      renderView(_.groupBy(res.data, (item: { category: { title: any; }; }) => item.category.title))
      renderBulrView(_.groupBy(res.data, (item: { category: { title: any; }; }) => item.category.title))
    })

    // 组件卸载
    return () => {
      //  销毁实例。实例销毁后无法再被使用
      window.onresize = null
    }
  }, [])

  const renderView = (data: any) => {
    const chart = echarts.init(chartRef.current)
    const options: EChartsOption = {
      title: {
        text: '事件分类图示'
      },
      xAxis: {
        type: 'category',
        data: Object.keys(data)
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      legend: {
        data: ['数量']
      },
      series: [
        {
          data: Object.values(data).map(item => (item as Array<any>).length),
          itemStyle: {
            "color": function (params) {
              var colorarrays = ["#5119e4", "#fd6975", "#dbdaad", "#7f99ea", "#3c05fa", "#9c65f4", "#32a78e", "#3ad94d", "#748259", "#b629e0", "#abde87", "#6edaf4"];
              return colorarrays[params.dataIndex];
            }
          },
          name: '数量',
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },

        }
      ]
    };
    chart.setOption(options)
    // 窗口改变重新加载
    window.onresize = () => {
      console.log('111');
      chart.resize()
    }
  }

  const renderBulrView = (data: any) => {

    let list = []
    for (let i in data) {
      list.push({
        name: i,
        value: data[i].length
      })
    }
    const chart = echarts.init(chartBlurRef.current)
    const options: EChartsOption = {
      title: {
        text: '个人数据分析展示'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(options)
    // 窗口改变重新加载
    window.onresize = () => {
      console.log('111');
      chart.resize()
    }
  }

  return (
    <Fragment>
      <div style={{ marginBottom: 50, fontSize: 20, fontWeight: 'bold', color: '#555555' }} >WelCome To ReactEvents</div>
      <div style={{display: 'flex'}}>
        <div style={{ width: "600px", height: "400px" }} ref={chartRef}></div>
        <div style={{ width: "600px", height: "400px" }} ref={chartBlurRef}></div>
      </div>
    </Fragment>
  )
}

export default Home;