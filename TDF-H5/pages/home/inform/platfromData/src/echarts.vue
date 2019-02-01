<template>
  <div :id="myChart.id"/>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
export default {
  name: 'Echarts',
  props: {
    myChart: Object
  },
  data() {
    return {}
  },
  methods: {
    draw() {
      let that = this
      let myChart = echarts.init(document.getElementById(that.myChart.id))
      myChart.setOption({
        title: {
          text: '撮合融资额（万元）',
          x: '-5px',
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
            color: '#626262',
            fontFamily: 'Microsoft YaHei'
          }
        },
        grid: {
          left: '0',
          right: '2%',
          top: '17%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: that.myChart.key,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#e8e8e8'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#626262',
                fontSize: 12,
                fontStyle: 'normal'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#e8e8e8'],
                width: 0.5,
                type: 'solid'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#626262',
                fontSize: 12,
                fontStyle: 'normal'
              }
            }
          }
        ],
        series: [
          {
            name: '成交量',
            type: 'bar',
            data: that.myChart.val,
            barWidth: 12,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ff3501'
                  },
                  {
                    offset: 0.2,
                    color: '#ff9741'
                  },
                  {
                    offset: 1,
                    color: '#ffd6b3'
                  }
                ]),
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#FF7102',
                    fontStyle: 'normal'
                  }
                }
              }
            }
          }
        ]
      })
    }
  },
  mounted() {
    this.draw()
  }
}
</script>
<style lang="stylus" scoped>
</style>
