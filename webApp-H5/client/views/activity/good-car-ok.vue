<template>
  <div class="joinIn_ok">
    <div class="top">
      <span class="iconfont">&#xe68f;</span>
      <p>申请成功!</p>
    </div>
    <div class="com">
      <p>我们将在1个工作日内联系您</p>
      <p>(18:00以后及非工作日提交的申请将顺延至下个工作日进行处理)</p>
      <p>请留意接听<span class="phone">400-998-7666</span>的来电</p>
    </div>
    <div class="bot">
      <a href="#">返回首页</a>
    </div>
    <div class="log"></div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '申请结果'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
*
  -webkit-overflow-scrolling: touch
  box-sizing:border-box
.phone_btn
  width:100%
  border-top:1px solid #e4e4e4
  overflow: hidden
  span
    display: inline-block
    width:45%
    line-height:0.8rem
    text-align:center
    &:nth-child(1)
      border-right: 1px solid #e4e4e4
      cursor:pointer
    a
      display: inline-block
      width:100%
      height:100%
      color:#ff7400
.dis_none
  display: none
input,textarea
  -webkit-appearance: normal
  -moz-appearance: normal
  -o-appearance: normal
  appearance: normal
  border:none
  outline:none
.div_bot input::-webkit-input-placeholder
    color: #626262
.div_bot input:-moz-placeholder
    color:#626262
.div_bot input::-moz-placeholder
    color:#626262
.div_bot input:-ms-input-placeholder
    color:#626262
.tex_bot textarea::-webkit-input-placeholder
    color: #626262
.joinIn_ok
  width:100%
  height:100%
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  font-family:"Microsoft YaHei"
  background-color:#f2f3f7
  .top
    width:100%
    height:2.5rem
    background-color:#3547A6
    text-align:center
    font-size:0.32rem
    color:#d3b580
    span
      display: inline-block
      margin-top:0.55rem
      color: #ef8014
      font-size: 1rem
     p
      margin-top:0.2rem
      letter-spacing:1px
      color: #ef8014
  .com
    width:100%
    height:1.78rem
    padding-top:0.3rem
    text-align: center
    font-size:0.24rem
    color:#626262
    p
      line-height:0.4rem
      .phone
        color:#ff7400
        font-size:0.26rem
  .bot
    width:100%
    padding:0 0.3rem
    font-size:0.3rem
    margin-top:0.2rem
    a
      display: inline-block
      width:100%
      height:0.8rem
      line-height:0.8rem
      text-align:center
      border-radius:5px
      color:#fff
      background-color:#ef8014
  .log
    position:absolute
    bottom:1%
    left:36%
    display: inline-block
    width:1.92rem
    height:0.23rem
    background:url(../../assets/images/activity/good-car/log.png) no-repeat
    background-size:100% 100%
</style>