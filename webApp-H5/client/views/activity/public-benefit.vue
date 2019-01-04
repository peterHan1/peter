<template>
  <div>
    <div class="box">
      <div class="benefit_bg1"></div>
      <div class="benefit_bg2" @click="palyVideo"></div>
      <div class="benefit_bg3"></div>
      <img src="../../assets/images/activity/benefit/return-bg.png"/>
      <div class="benefit_bg4"></div>
      <div class="benefit_bg5"></div>
      <a class="btn" href="http://www.ijyh.net/love_activity_detail?ID=c36818e45d9b402c9a1fd25a1a6e463a&GoodsType=2">爱心助学 了解更多</a>
    </div>
    <div class="videoBox" v-show="show">
      <span class="iconfont" @click="closeVideo">&#xe687;</span>
      <!-- <img src="../../assets/images/activity/benefit/return-bg.png" @click="closeVideo"/> -->
      <video controls="controls" width="100%" height="80%" ref="videos" id="videoPlay">
        <!--<source src="https://www.51tuodao.com/upload/data/upfiles/media/201611/23/td_release.mp4" type="video/mp4"/>-->
        <source src="https://www.51tuodao.com/upload/data/upfiles/media/20181221/yunnan.mp4" type="video/mp4" />
      </video>
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
      show: false
    }
  },
  methods: {
    palyVideo () {
      this.show = true
      this.$refs.videos.play()
    },
    closeVideo () {
      this.show = false
      this.$refs.videos.pause()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box
    width:100%
    padding-bottom: 1rem
    .dis_none
      display: none
    .benefit_bg1
      width:100%
      height:5.89rem
      background:url(../../assets/images/activity/benefit/benefit-bg1.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .benefit_bg2
      width:100%
      height:2.84rem
      background:url(../../assets/images/activity/benefit/benefit-bg2.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .benefit_bg3
      width:100%
      height:10.9rem
      background:url(../../assets/images/activity/benefit/benefit-bg3.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .benefit_bg4
      width:100%
      height:8.7rem
      background:url(../../assets/images/activity/benefit/benefit-bg4.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .benefit_bg5
      width:100%
      height:8.31rem
      background:url(../../assets/images/activity/benefit/benefit-bg5.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
    .btn
      display: block
      color:#fff
      width:100%
      line-height:1rem
      text-align: center
      font-size:0.32rem
      position: fixed
      left:0
      right:0
      bottom:0
      background: -webkit-linear-gradient(-10deg, #C6171B, #F1581B)
      background: -o-linear-gradient(-10deg, #C6171B, #F1581B)
      background: -moz-linear-gradient(-10deg, #C6171B, #F1581B)
      background: linear-gradient(-10deg, #C6171B, #F1581B)
      font-family: PingFangSC-Regular, sans-serif
  .videoBox
    position: fixed
    left:0
    top:0
    right:0
    bottom:0
    background-color:#000
    span
      position:absolute
      left:0
      top:0
      font-size: 0.4rem
      font-weight: bold
      color: #ccc
      padding: 0.3rem
      display: inline-block
    #videoPlay
      position: absolute
      top:50%
      -webkit-transform: translateY(-50%)
      -moz-transform: translateY(-50%)
      -ms-transform: translateY(-50%)
      -o-transform: translateY(-50%)
      transform: translateY(-50%)
</style>