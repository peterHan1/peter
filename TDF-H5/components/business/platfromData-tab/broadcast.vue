<template>
  <cube-scroll>
    <div class="platform_c">
      <div class="echart_top">
        <h3>平台7日数据播报</h3>
        <Echarts :myChart="myChart1"/>
      </div>
      <div class="echart_bot">
        <h3>平台月度数据播报</h3>
        <Echarts :myChart="myChart2"/>
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="~assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
import Echarts from './echarts.vue'
export default {
  data() {
    return {
      myChart1: 'ranking',
      myChart2: 'monthsData'
    }
  },
  components: {
    Echarts
  }
}
</script>
<style lang="stylus" scoped>
  .platform_c
    margin-top 20px
  .echart_top
    background-color:$color-white
    padding:0 30px
  .echart_bot
    background-color:$color-white
    margin-top:20px
    padding:0 30px
  h3
    line-height:80px
    font-size: $fontsize-small-s
    color:$color-gray1
    font-weight: normal
    background-color:$color-white
    border-bottom: 1px solid $color-gray5
  .inform_signature
    background-color: #fff
    border-top: 20px solid $color-background
    border-bottom: 20px solid $color-background
    div
      padding: 0 30px
    img
      width: 100%
      height: 380px
</style>
