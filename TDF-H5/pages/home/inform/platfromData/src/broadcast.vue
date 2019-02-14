<template>
  <cube-scroll>
    <div class="platform_c">
      <div class="echart_top">
        <h3>平台7日数据播报</h3>
        <Echarts :myChart="myChart1"/>
        <!-- <div id="ranking"/> -->
      </div>
      <div class="echart_bot">
        <h3>平台月度数据播报</h3>
        <Echarts :myChart="myChart2"/>
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../../assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
import Echarts from './echarts.vue'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
import {
  weekVolumeChart,
  monthVolumeChart
} from '../../../../../plugins/api.js'
export default {
  data() {
    return {
      myChart1: {
        id: 'ranking',
        // key: [1, 2, 3],
        // val: [10, 50, 100]
        key: this.$store.state.home.weekEChartKey,
        val: this.$store.state.home.weekEChartVal
      },
      myChart2: {
        id: 'monthsData',
        // key: [],
        // val: []
        key: this.$store.state.home.monthEChartKey,
        val: this.$store.state.home.monthEChartVal
      }
    }
  },
  // async fetch({ app, store }) {
  //   await store.dispatch('home/getWeekEchart')
  //   await store.dispatch('home/getMonthEchart')
  // },
  mounted() {
    // this.getData()
    // this.draw(this.myChart1)
    // this.draw(this.myChart2)
  },
  methods: {
    async getData() {
      const weekData = await weekVolumeChart(this.$axios)
      this.myChart1.key = weekData.content.eChart.key
      this.myChart1.val = weekData.content.eChart.val
      console.log(this.myChart1.key)
      // this.$store.commit('home/setWeekEchart', weekData.content.eChart)
      const monthData = await monthVolumeChart(this.$axios)
      this.$store.commit('home/setMonthEchart', monthData.content.eChart)
      console.log(this.$store.state.home.weekEChartKey)
    },
    draw(myCharts) {
      let myChart = echarts.init(document.getElementById(myCharts.id))
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
            data: myCharts.key,
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
            data: myCharts.val,
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
  components: {
    Echarts
  }
}
</script>
<style lang="stylus" scoped>
  .platform_c
    margin-top 0.2rem
  .echart_top
    background-color:$color-white
    padding:0 0.3rem
  .echart_bot
    background-color:$color-white
    margin-top:0.2rem
    padding:0 0.3rem
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
  h3
    line-height:0.8rem
    font-size: $fontsize-small-s
    color:$color-gray1
    font-weight: normal
    background-color:$color-white
    border-bottom: 1px solid $color-gray5
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid $color-background
    border-bottom: 0.2rem solid $color-background
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
</style>
