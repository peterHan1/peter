<template>
  <cube-scroll>
    <div class="platform_c">
      <div class="echart_top">
        <h3>平台7日数据播报</h3>
        <!-- <v-echarts :myChart="myChart1"></v-echarts> -->
      </div>
      <div class="echart_bot">
        <h3>平台月度数据播报</h3>
        <!-- <v-echarts :myChart="myChart2"></v-echarts> -->
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../../assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
// const echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/title')
export default {
  data() {
    return {
      myChart1: {
        id: 'ranking',
        dataX: `'08-30', '08-31', '09-01', '09-02', '09-03', '09-04', '09-05'`,
        series: `1183.69, 1503.12, 1341.7, 952.63, 798.37, 1270.37, 1203.5`
      },
      myChart2: {
        id: 'monthsData',
        dataX: `'03月', '04月', '05月', '06月', '07月', '08月'`,
        series: `20066.48, 24480.06, 32809.37, 38141.23, 31667.78, 40349.79`
      }
    }
  },
  methods: {
    drawEcharts(id, dataX, series) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption({
        title: {
          text: '撮合融资额（万元）',
          x: '-5px',
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
            color: '$color-gray8',
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
            data: dataX,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '$color-gray5'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '$color-gray8',
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
                color: ['$color-gray5'],
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
                color: '$color-gray8',
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
            data: series,
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
                    color: '$color-primary',
                    fontStyle: 'normal'
                  }
                }
              }
            }
          }
        ]
      })
    }
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
