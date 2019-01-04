<template>
  <div class="max_width coupon_load">
    <div class="load_banner"></div>
    <div class="load_five">
      <router-link to="/anniversary-five" class="btn_five">去抢券</router-link>
    </div>
    <div class="load_three">
      <router-link to="/get-coupon" class="btn_three">去领券</router-link>
    </div>
    <div class="load_appoint">
      <a href="javascript:;" class="appoint_txt" @click="ruleShow1 = !ruleShow1">查看详细规则</a>
    </div>
    <div class="load_invest">
      <a href="javascript:;" class="invest_txt" @click="ruleShow2 = !ruleShow2">查看详细规则</a>
    </div>
    <div class="load_one">
      <a href="javascript:;" class="btn_one">查看详情</a>
    </div>
    <div class="layer_box layer_rule" v-if="ruleShow1">
      <div class="layerRule">
        <div class="layer_tltBg"></div>
        <div class="layerRule_list">
          <p>约标时间：11月1日-11月10日。（双11当天不约标）</p>
          <p class="p_border">约标成功后，将按照约标顺序在双11当天进行放标。建议约标成功的用户提前做好资金准备，并联系客服。</p>
          <h5>其他说明：</h5>
          <ul>
            <li>约标是由用户主动发起，预约11月11日的项目进行出借。</li>
            <li>约标20万起约，平台将根据约标金额匹配1个以上标的，均仅限约标用户一个人出借；当约标金额较大，拓道配置多个标的时，将给予多个加息券补贴(五周年专享5%加息券不补贴)！</li>
            <li>约标，需要用户主动联系在线客服 , 或拨打客服热线 4008566685；</li>
            <li>约标可以正常使用优惠券(加息券、抵用券)，单个标的仅限使用一张；</li>
            <li>最终解释权归拓道金服所有。</li>
          </ul>
        </div>
        <div class="close" @click="ruleShow1 = !ruleShow1"><i class="iconfont">&#xe68b;</i></div>
      </div>
      <div class="shada"></div>
    </div>
    <div class="layer_box layer_state" v-if="ruleShow2">
      <div class="layerRule layerState">
        <div class="layer_tltBg"></div>
        <div class="layerRule_list">
          <h5>活动规则：</h5>
          <ul>
            <li>总出借金额：计算活动期间出借散标及加入省心投的总金额。新手标及债权转让的金额不计算在内。</li>
            <li>省心投按照加入时间和加入金额计算。</li>
            <li>活动奖励将在11月11日发放。有效期仅限双11当天，满千元出借1月及以上项目可用。50元、450元、900元满1000元可用，1900元满2000元可用。</li>
            <li>最终解释权归拓道金服所有。 </li>
          </ul>
        </div>
        <div class="close" @click="ruleShow2 = !ruleShow2"><i class="iconfont">&#xe68b;</i></div>
      </div>
      <div class="shada"></div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      ruleShow1: false,
      ruleShow2: false
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
html,body
  font-family: PingFangSC-Regular, sans-serif
.coupon_load
  background-color: #fda43e
  padding-bottom: 0.4rem
  div
    position: relative
    a
      font-size: 0.36rem
      color: #a03c28
      display: inline-block
      width: 2.88rem
      text-align: center
      border-radius: 20px
      box-shadow: 0px 5px 0px #d95912, 0px 6px 20px rgba(0, 0, 0, .5)
      font-weight: bold
      background: -webkit-linear-gradient(bottom, #fcdd5b , #fdbb33)
      background: -o-linear-gradient(bottom, #fcdd5b, #fdbb33)
      background: -moz-linear-gradient(bottom, #fcdd5b, #fdbb33)
      background: linear-gradient(to bottom, #fcdd5b , #fdbb33)
      cursor: pointer
  .load_five a,.load_three a
    height: 0.86rem
    line-height: 0.88rem
    position: absolute
    left: 50%
    bottom: 10%
    -webkit-transform: translateX(-50%)
    -moz-transform: translateX(-50%)
    -ms-transform: translateX(-50%)
    -o-transform: translateX(-50%)
    transform: translateX(-50%)
  .load_appoint a,.load_invest a
    height: 0.76rem
    line-height: 0.78rem
    position: absolute
    right: 1.15rem
    top: 34%
  .load_invest a
    top: 32%
  .load_banner
    width: 100%
    height: 10.86rem
    background:url(../../assets/images/activity/anniversary-five-load/load-banner.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
  .load_five
    width: 100%
    height: 7.63rem
    background:url(../../assets/images/activity/anniversary-five-load/load-five.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    margin-top: -0.7rem
  .load_three
    width: 100%
    height: 7.63rem
    background:url(../../assets/images/activity/anniversary-five-load/load-three.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    margin-top: -0.7rem
  .load_appoint
    width: 100%
    height: 8.97rem
    background:url(../../assets/images/activity/anniversary-five-load/load-appoint.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    margin-top: -0.2rem
  .load_invest
    width: 100%
    height: 9.47rem
    background:url(../../assets/images/activity/anniversary-five-load/load-invest.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    margin-top: -0.5rem
  .load_one
    width: 100%
    height: 5.07rem
    background:url(../../assets/images/activity/anniversary-five-load/load-one.png) no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    margin-top: -0.5rem
    a
      height: 0.76rem
      line-height: 0.78rem
      position: absolute
      right: 1.15rem
      top: 61%
  .layer_box
    .layerRule
      width: 6.5rem
      height: auto
      font-size: 0.26rem
      color: #a16b35
      padding: 0.8rem 0.3rem 0.3rem
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      background-color: #f6ae66
      border-radius: 20px
      z-index: 99
      position: fixed
      top: 46%
      left:50%
      -webkit-transform: translateY(-50%) translateX(-50%)
      -moz-transform: translateY(-50%) translateX(-50%)
      -ms-transform: translateY(-50%) translateX(-50%)
      -o-transform: translateY(-50%) translateX(-50%)
      transform: translateY(-50%) translateX(-50%)
      .layer_tltBg
        position: absolute
        left: -0.3rem
        right: -0.3rem
        top: -0.3rem
        height: 1.2rem
        background: url(../../assets/images/activity/anniversary-five-load/layer-tlt.png) no-repeat
        -webkit-background-size: 100% 100%
        background-size: 100% 100%
      p
        line-height: 0.4rem
        text-align: justify
      .p_border
        border-bottom: 1px solid #E99D50
        padding-bottom: 0.1rem
      h5
        font-weight: normal
        margin: 0.1rem 0 0.08rem
        font-size: 0.28rem
      li
        line-height: 0.4rem
        margin-top: 0.1rem
        padding-left: 0.23rem
        position: relative
        &:before
          content: ""
          display: inline-block
          position: absolute
          top: 16%
          left:0
          width:0.12rem
          height:0.12rem
          background-color: #a16b35
          border-radius: 50%
        &:nth-child(2):before
          top:5%
        &:nth-child(3):before
          top:15%
        &:nth-child(4):before
          top:10%
        &:nth-child(5):before
          top:26%
    .layerState li:nth-child(1):before
      top: 10%
    .layerState li:nth-child(2):before
      top: 20%
    .layerState li:nth-child(3):before
      top:5%
    .layerState li:nth-child(4):before
      top:26%
    .layerState h5
      margin: 0rem 0 0.08rem
  .shada
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,0.5)
  .close
    width:100%
    height:1rem
    font-size: 0.7rem
    text-align: center
    line-height: 1rem
    color:rgba(255,255,255,0.8)
    position: absolute
    left:0
    bottom:-1.2rem
</style>