<template>
  <cube-scroll
    :scrollEvents="['scroll']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div 
      class="scatter_item">
      <div class="safeguard_step">
        <div class="title">
          <span/> 保障措施
        </div>
        <div class="step_info">
          <p>1.车辆完成合法抵押手续；</p>
          <p>2.车辆在车管所进行登记并安装Gps追踪器，由风控部门进行全程监控；</p>
          <p> 3.多家专业车辆评估机构对比评估，保证评估价格合理；</p>
          <p> 4.电话核实商业保单正常；</p>
          <p> 5.如借款人在借款期间，出现征信异常将通过站内信的方式给予出借人提示。</p>
        </div>
      </div>
      <div class="money_mange">
        <div class="title">
          <span/> 资金分账管理
        </div>
        <div class="mange_info">
          拓道金服坚守信息中介平台定位，不设资金池。实现平台自有资金与用户资金的账户分设管理和风险隔离，平台与会员资金交易变动交由银行进行管理与监督，平台无法接触交易资金。
        </div>
      </div>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  methods: {
    onScroll(pos) {
      if (pos.y > 20) {
        this.pullTxt = '松手，返回标的信息'
        this.pullY = pos.y
      } else {
        this.pullTxt = '下拉释放，返回标的信息'
        this.pullY = pos.y
      }
    },
    onPullingDown() {
      setTimeout(() => {
        this.$emit('downFn')
      }, 100)
    }
  }
}
</script>
<style lang="stylus" scoped>
.title
  width:100%
  height: 70px
  line-height: 70px
  font-size: $fontsize-medium 
  color: $color-gray1
  border-bottom: 1px solid $color-gray7
  span
    display: inline-block
    width: 6px
    height: 24px
    background-color: $color-primary
    border-radius: 4px
    margin: 0 14px 0 30px
    vertical-align: middle
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.scatter_item
  width: 100%
  background-color: $color-white
  .info_details
    width: 100%
    border-bottom: 20px solid $color-background
    padding: 24px 0 15px
    p
      line-height: 37px
      font-size: $fontsize-small-s
      padding: 0 30px
      margin-bottom: 12px
      display: flex
    span
      flex: 1
      i
        margin-right: 47px
        color: $color-gray3
      b
        color: $color-gray1
  .safeguard_step
    .step_info
      height: 342px
      padding: 24px 51px 7px 31px
      font-size: $fontsize-small-s
      color: $color-gray1
      border-bottom: 20px solid $color-background
      p
        line-height: 40px
        text-align: justify
  .money_mange
    .mange_info
      padding: 24px 30px
      font-size: $fontsize-small-s
      color: $color-gray1
      line-height: 40px
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none      
</style>
