<template>
  <div>
    <div
      v-if="myChart == 'ranking'"
      id="ranking"/>
    <div
      v-else
      id="monthsData"/>
  </div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
import { weekVolumeChart, monthVolumeChart } from '~/api/home.js'
export default {
  name: 'Echarts',
  props: {
    myChart: String
  },
  data() {
    return {
      key: ['1', '2'],
      val: [1, 2],
      option: {}
    }
  },
  methods: {
    getData() {
      if (this.myChart === 'ranking') {
        weekVolumeChart(this.$axios).then(res => {
          this.key = res.content.eChart.key
          this.val = res.content.eChart.val
          this.draw()
        })
      } else if (this.myChart === 'monthsData') {
        monthVolumeChart(this.$axios).then(res => {
          this.key = res.content.eChart.key
          this.val = res.content.eChart.val
          this.draw()
        })
      }
    },
    draw() {
      let that = this
      let keys = []
      let vals = []
      let myChart = null
      if (this.myChart === 'ranking') {
        myChart = echarts.init(document.getElementById('ranking'))
      } else {
        myChart = echarts.init(document.getElementById('monthsData'))
      }
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
            data: that.key,
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
            data: that.val,
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
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
  #ranking
    width:100%
    height:5.1rem
    padding:0.4rem 0
    box-sizing: border-box
  #monthsData
    width:100%
    height:5.1rem
    padding:0.4rem 0
    box-sizing: border-box
</style>
