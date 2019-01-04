<template>
  <div class="max_width coupon">
    <div class="count_down" v-if="timeShow">
      <b>开抢倒计时 </b>
      <div class="count_txt"><span>{{hours0}}</span><span>{{hours1}}</span>：<span>{{minites0}}</span><span>{{minites1}}</span>：<span>{{seconds0}}</span><span>{{seconds1}}</span></div>
    </div>
    <div class="btn_box">
      <div class="get_btn ">
        <div class="btn_no" :class="{btn_ok: active}" ></div>
        <p class="coupon_num">{{isNow}}剩余加息券张数：<span>{{couponNum}}</span> 张</p>
      </div>
      <div class="get_yet dis_none">
        <p>您已经领取过啦！把机会留给别人吧！</p>
        <p>您还可以：</p>
        <div class="three_btn">继续领3%加息券</div>
      </div>
    </div>
    <div class="explain_list">
      <ul>
        <li>活动开始时间11月1日。</li>
        <li>活动期间，每天11点和16点准点开抢，每个时间点共5张5%加息券。</li>
        <li>同一拓道账户中仅可有一张5%加息券，多次获取无效。</li>
        <li>5%加息券仅限11月11日当天可用。</li>
        <li>由于同一时间段抢券人数较多，请您务必确认登录状态。最终抢券结果以账户中加息券到账与否为准。</li>
        <li>最终解释权归拓道金服所有。 </li>
      </ul>
    </div>
    <!--领取成功弹窗-->
    <div class="layer_ok layer_box" v-if="layer_ok">
      <div class="layer_con layerOk">
        <div class="layer_btn check">去查看</div>
        <div class="close" @click="layer_ok = !layer_ok"><i class="iconfont">&#xe6c9;</i></div>
      </div>
      <div class="shada"></div>
    </div>
    <!--本时段已抢完-->
    <div class="layer_over layer_box" v-if="layer_over">
      <div class="layer_con layerEnd">
        <div class="close" @click="layer_over = !layer_over"><i class="iconfont">&#xe6c9;</i></div>
      </div>
      <div class="shada"></div>
    </div>
    <!--未登录-->
    <div class="layer_login layer_box" v-if="layer_login">
      <div class="layer_con layerLogin">
        <div class="layer_btn login">立即登录</div>
        <div class="close" @click="layer_login = !layer_login"><i class="iconfont">&#xe6c9;</i></div>
      </div>
      <div class="shada"></div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '任性抢五周年专享5%加息券'
  },
  data () {
    return {
      timeShow: false, // 倒计时显示隐藏
      layer_ok: false,
      layer_over: false,
      layer_login: false,
      active: false,
      time: '', // 循环计时器
      isNow: '下一场次',
      couponNum: 5, // 剩余加息券
      resultTime: 0, // 剩余时间的总毫秒数
      hours1: '',
      hours2: '',
      minites1: '',
      minites2: '',
      seconds1: '',
      seconds2: ''
    }
  },
  methods: {
    startSell () {
      let that = this
      let nowTime = new Date()// 当前时间
      let endTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), 19, 0, 0)
      that.resultTime = Math.floor(endTime - nowTime) / 1000
      that.countDown()
      clearInterval(that.time)
      that.time = setInterval(() => { // 倒计时
        that.countDown()
      }, 1000)
    },
    countDown () {
      let that = this
      if (that.resultTime > 1) {
        that.resultTime = that.resultTime - 1
        let second = Math.floor(that.resultTime % 60)
        let minite = Math.floor((that.resultTime / 60) % 60)
        let hour = Math.floor((that.resultTime / 3600) % 24)
        second = second < 10 ? ('0' + second) : second.toString()
        minite = minite < 10 ? ('0' + minite) : minite.toString()
        hour = hour < 10 ? ('0' + hour) : hour.toString()
        that.hours0 = hour.split('')[0]
        that.hours1 = hour.split('')[1]
        that.minites0 = minite.split('')[0]
        that.minites1 = minite.split('')[1]
        that.seconds0 = second.split('')[0]
        that.seconds1 = second.split('')[1]
        that.timeShow = true
      } else if (that.resultTime < 1) {
        that.timeShow = false
        that.active = true
        that.isNow = '当前'
        that.couponNum = 3
        clearInterval(that.time)
      }
    }
  },
  mounted () {
    this.startSell()
  }
}
</script>
<style lang="stylus" scoped>
html,body
  font-family: PingFangSC-Regular, sans-serif
.dis_none
  display: none
.coupon
  width: 100%
  height:19.38rem
  position:relative
  background: url(../../assets/images/activity/anniversary-five/coupon-bg.png) no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  .count_down
    position: fixed
    left:0
    top:0
    right:0
    font-size:0.3rem
    color: #FFF5E6
    height: 0.74rem
    line-height: 0.74rem
    background-color: #F9481F
    text-align: center
    overflow: hidden
    z-index: 999
    .count_top
      position: relative
      display: inline-block
      padding-left:0.4rem
    .count_txt
      display: inline-block
    b
      font-weight: normal
      position: relative
      padding-left: 0.45rem
      &:after
        content: ""
        position: absolute
        left: 0
        top: 10%
        width: 0.28rem
        height: 0.32rem
        background: url(../../assets/images/activity/anniversary-five/alarm-bg.png) no-repeat
        -webkit-background-size: 100% 100%
        background-size: 100% 100%
    div span
      display: inline-block
      width:0.36rem
      height: 0.42rem
      line-height: 0.42rem
      background-color:#E60B14
      color: #fff
      margin-right: 0.08rem
      border-radius: 2px
      font-weight: bold
  .btn_box
    text-align: center
    position: absolute
    top: 7.56rem
    left: 50%
    -webkit-transform: translateX(-50%)
    -moz-transform: translateX(-50%)
    -ms-transform: translateX(-50%)
    -o-transform: translateX(-50%)
    transform: translateX(-50%)
  .get_btn div
    display: inline-block
    width: 2.6rem
    height: 2.6rem
    &.btn_no
      background: url(../../assets/images/activity/anniversary-five/get-btn.png) no-repeat
      background-position: 0 0
      background-size: 5rem 2.6rem
    &.btn_ok
      background: url(../../assets/images/activity/anniversary-five/get-btn.png) no-repeat
      background-position: -2.5rem 0
      background-size: 5rem 2.6rem
      cursor: pointer
  .get_btn p
    font-size: 0.3rem
    color: #fff
    white-space: nowrap
    span
      font-size:0.46rem
      color:#FFF54E
  .get_yet
    margin-top: 0.6rem
    line-height: 0
    p
      font-size: 0.3rem
      line-height: 0.36rem
      white-space: nowrap
      &:nth-child(1)
        color: #fff
      &:nth-child(2)
        color: #A81B25
        margin-top: 0.39rem
    .three_btn
      display: inline-block
      width: 4.08rem
      height: 0.82rem
      line-height: 0.82rem
      color: #ef2432
      font-size: 0.42rem
      margin-top: 0.25rem
      border-radius: 20px
      box-shadow: 0px 5px 0px #f8983c, 0px 6px 20px rgba(0, 0, 0, .5)
      font-weight: bold
      background: -webkit-linear-gradient(bottom, #ffec69 , #fec026)
      background: -o-linear-gradient(bottom, #ffec69, #fec026)
      background: -moz-linear-gradient(bottom, #ffec69, #fec026)
      background: linear-gradient(to bottom, #ffec69 , #fec026)
      cursor: pointer
  .explain_list
    position: absolute
    bottom:1rem
    left:0
    padding:0 0.75rem 0 0.95rem
    li
      font-size:0.28rem
      color:#fff
      line-height: 0.42rem
      text-align: justify
      position: relative
      &:before
        content: ""
        display: inline-block
        position: absolute
        left:-0.3rem
        width:0.12rem
        height:0.12rem
        background-color: #FFF0AE
        border-radius: 50%
  .explain_list li:nth-child(1):before,li:nth-child(4):before,li:nth-child(6):before
    top:39%
  .explain_list li:nth-child(2):before,li:nth-child(3):before
    top:19%
  .explain_list li:nth-child(5):before
    top:12%
  .layer_box
    .shada
      position: fixed
      left:0
      top:0
      right:0
      bottom:0
      background-color: rgba(0,0,0,0.5)
    .layer_con
      text-align: center
      z-index: 99
      width:5.7rem
      height:5.3rem
      position: fixed
      top:50%
      left:50%
      -webkit-transform: translateY(-50%) translateX(-50%)
      -moz-transform: translateY(-50%) translateX(-50%)
      -ms-transform: translateY(-50%) translateX(-50%)
      -o-transform: translateY(-50%) translateX(-50%)
      transform: translateY(-50%) translateX(-50%)
    .layerOk
      background:url(../../assets/images/activity/anniversary-five/layer-ok.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .layerEnd
      background:url(../../assets/images/activity/anniversary-five/layer-end.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .layerLogin
      background:url(../../assets/images/activity/anniversary-five/layer-login.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .layer_btn
      position: absolute
      bottom:0.7rem
      left: 50%
      font-size: 0.42rem
      color: #cc272d
      -webkit-transform: translateX(-50%)
      -moz-transform: translateX(-50%)
      -ms-transform: translateX(-50%)
      -o-transform: translateX(-50%)
      transform: translateX(-50%)
      display: inline-block
      width: 2.95rem
      height: 0.76rem
      line-height: 0.76rem
      border-radius: 20px
      box-shadow: 0px 5px 0px #f7a73b, 0px 6px 12px rgba(0, 0, 0, .5)
      background: -webkit-linear-gradient(right, #fae04b , #ffc73d)
      background: -o-linear-gradient(right, #fae04b, #ffc73d)
      background: -moz-linear-gradient(right, #fae04b, #ffc73d)
      background: linear-gradient(to right, #fae04b , #ffc73d)
    .close
      width:100%
      height:1rem
      font-size: 0.7rem
      text-align: center
      line-height: 1rem
      color:rgba(255,255,255,0.8)
      position: absolute
      left:0
      bottom:-1rem
</style>