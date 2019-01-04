<template>
  <div class="about">
    <Header navLeftTxt="icon">关于拓道</Header>
    <div class="nav">
      <tabs :value="tabValue" @change="handleChangeTab">
        <tab label="平台信息" index="1">
          <div class="terraces about_com">
            <div class="terrace_top">
              <h3>基本信息</h3>
              <div>
                <p>拓道金服（杭州拓道互联网金融服务有限公司）是中国领先的汽车金融服务平台，成立于2013年11月，注册/实缴资本5000万元。</p>
                <p>2017年，平台完成了8000万A轮融资（由杭州市财政、西湖房产集团、济民资本参股的知名机构帮实资本、虫二文化产业基金领投，蓝山资本、宏桥资本、透视资本等跟投）。在五年的合规发展道路上，拓道金服获得了社会各界和资本市场的认可，相继被评为“中国汽车金融十强企业”、“互联网金融百强企业”。并于同年4月成功接入银行资金存管。目前使用新网银行的资金存管系统。</p>
              </div>
            </div>
            <div class="terrace_bot">
              <h3>企业相关信息</h3>
              <div class="bot_icon">
                <div class='icon_top flex'>
                  <router-link to="/inform/about/info" class="flex-1">
                    <i class="iconfont">&#xe69f;</i>
                    <p class="mt">从业机构 </p>
                    <p>平台信息</p>
                  </router-link>
                  <router-link to="/inform/about/bank" class="flex-1">
                    <i class="iconfont">&#xe6a2;</i>
                    <p class="mt">资金存管 </p>
                    <p>新网银行</p>
                  </router-link>
                  <router-link to="/inform/about/board" class="flex-1">
                    <i class="iconfont">&#xe6a0;</i>
                    <p class="mt">董事、监事</p>
                    <p>高级管理人员</p>
                  </router-link>
                </div>
                <div class='icon_bot flex'>
                  <router-link to="/inform/about/shareholder" class="flex-1">
                    <i class="iconfont">&#xe69e;</i>
                    <p class="mt">实际控制人与</p>
                    <p>持股5%以上股东</p>
                  </router-link>
                  <router-link to="/inform/about/record" class="flex-1">
                    <i class="iconfont">&#xe6cd;</i>
                    <p class="mt">备案信息 </p>
                  </router-link>
                  <router-link to="/inform/about/great" class="flex-1">
                    <i class="iconfont">&#xe6a1;</i>
                    <p class="mt">从业机构</p>
                    <p>重大事项信息</p>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="inform_signature">
              <div><h3 class="title">法人签章</h3></div>
              <img src="../../../assets/images/inform/signature-2.png" alt="">
            </div>
          </div>
        </tab>
        <tab label="组织架构" index="2">
          <div class="framework about_com">
            <div class="framework_bg"></div>
            <div class="inform_signature">
              <div><h3 class="title">法人签章</h3></div>
              <img src="../../../assets/images/inform/signature-2.png" alt="">
            </div>
          </div>
        </tab>
        <tab label="人员信息" index="3">
          <div class="personnel about_com">
            <div class="personnel_bg"></div>
            <div class="inform_signature">
              <div><h3 class="title">法人签章</h3></div>
              <img src="../../../assets/images/inform/signature-2.png" alt="">
            </div>
          </div>
        </tab>
        <tab label="相关证件" index="4">
          <div class="certificate about_com">
            <div class="flex" v-for="(item, index) in imgLists" :key="index">
              <div class="div_fr div_img flex-1" @click="show(index*2)">
                <img class="lazy" :src="item.src1">
                <div class="txt_p">
                  <p>{{item.title1}}</p>
                </div>
              </div>
              <div class="div_img flex-1" @click="show(index*2+1)">
                <img class="lazy" :src="item.src2" v-if="item.src2">
                <div class="txt_p" v-if="item.src2">
                  <p>{{item.title2}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="inform_signature">
            <div><h3 class="title">法人签章</h3></div>
            <img src="../../../assets/images/inform/signature-2.png" alt="">
          </div>
        </tab>
        <tab label="法人签章" index="5">
          <div class="signature about_com">
            <div class="signature_bg"></div>
          </div>
        </tab>
      </tabs>
    </div>
    <div class="img_show" v-if="maskShow">
      <ul :style="{ transform: 'translate3d('+ distance + 'px, 0, 0)'}" :class="{active: isActive}" class="slider">
        <li @touchstart="touchstart($event)"
            @touchmove="touchmove($event)"
            @touchend="touchend($event)"
            @click="maskShow = isActive = false" v-for="(src,index) in imgSrc"  :key="index">
          <img :src="src"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import img1 from '../../../assets/images/inform/certificate/cernew01.png'
import img2 from '../../../assets/images/inform/certificate/cernew02.png'
import img3 from '../../../assets/images/inform/certificate/cernew03.png'
import img4 from '../../../assets/images/inform/certificate/cernew04.jpeg'
import img5 from '../../../assets/images/inform/certificate/cernew05.jpeg'
import img6 from '../../../assets/images/inform/certificate/cernew06.png'
import img7 from '../../../assets/images/inform/certificate/cernew07.png'
import img8 from '../../../assets/images/inform/certificate/cernew08.png'
import img9 from '../../../assets/images/inform/certificate/cernew09.jpg'

import imgActive1 from '../../../assets/images/inform/certificate/certificate01.jpg'
import imgActive2 from '../../../assets/images/inform/certificate/certificate02.jpg'
import imgActive3 from '../../../assets/images/inform/certificate/certificate03.jpg'
import imgActive4 from '../../../assets/images/inform/certificate/certificate04.jpg'
import imgActive5 from '../../../assets/images/inform/certificate/certificate05.jpg'
import imgActive6 from '../../../assets/images/inform/certificate/certificate06.jpg'
import imgActive7 from '../../../assets/images/inform/certificate/certificate07.jpg'
import imgActive8 from '../../../assets/images/inform/certificate/certificate08.jpg'
import imgActive9 from '../../../assets/images/inform/certificate/certificate09.jpg'
export default {
  metaInfo: {
    title: '关于拓道'
  },
  data () {
    return {
      tabValue: '1',
      maskShow: false,
      imgLists: [{src1: img1, title1: '新网银行存管协议-1', src2: img2, title2: '新网银行存管协议-2'}, {src1: img3, title1: '拓道金服营业执照', src2: img4, title2: '营业许可证(ICP+EDI)-1'}, {src1: img5, title1: '营业许可证(ICP+EDI)-2', src2: img6, title2: '营业许可证(ICP+EDI)-3'}, {src1: img7, title1: '营业许可证(ICP+EDI)-4', src2: img8, title2: '信息系统安全等级证书'}, {src1: img9, title1: '信息系统等级测评基本页', src2: '', title2: ''}],
      imgSrc: [imgActive1, imgActive2, imgActive3, imgActive4, imgActive5, imgActive6, imgActive7, imgActive8, imgActive9],
      distanceStart: 0,
      distance: 0,
      showIndex: 0,
      isActive: false,
      startX: 0,
      maxWidth: 0,
      maxIndex: 0
    }
  },
  mounted () {
    let that = this
    window.onresize = function () {
      that.isActive = false
      that.maxWidth = document.querySelector('.img_show').clientWidth
      that.distance = -that.maxWidth * that.showIndex
    }
  },
  methods: {
    handleChangeTab (value) {
      this.tabValue = value
    },
    show (index) {
      this.maskShow = true
      this.isActive = false
      this.$nextTick(function () {
        this.maxIndex = document.querySelector('.slider').getElementsByTagName('li').length
        this.maxWidth = document.querySelector('.img_show').clientWidth
        this.showIndex = index
        this.distance = -this.maxWidth * index
      })
    },
    touchstart (e) {
      this.startX = e.targetTouches[0].pageX
      this.distanceStart = this.distance
    },
    touchmove (e) {
      e.preventDefault()
      e.stopPropagation()
      let shuX = e.targetTouches[0].pageX
      let jl = shuX - this.startX
      if (Math.abs(jl) > 2) {
        this.isActive = false
      } else {
        return false
      }
      if (jl > 0 && this.showIndex <= 0) {
        jl = Math.pow(jl, 0.8)
      } else if (jl < 0 && this.showIndex >= (this.maxIndex - 1)) {
        jl = -Math.pow(Math.abs(jl), 0.8)
      }
      this.distance = this.distanceStart + jl
    },
    touchend (e) {
      this.isActive = true
      if (this.distance > this.distanceStart) {
        this.showIndex -= 1
        if (this.showIndex < 0) {
          this.showIndex = 0
        }
      } else if (this.distance < this.distanceStart) {
        this.showIndex += 1
        if (this.showIndex > (this.maxIndex - 1)) {
          this.showIndex = this.maxIndex - 1
        }
      } else {
        this.showIndex = this.showIndex
      }
      this.distance = -this.maxWidth * this.showIndex
    }
  }
}
</script>
<style lang="stylus" scoped>
  .about
    padding-top: 0.88rem
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color:white
    width: 100%
    height: 100%
    .nav
      width: 100%
      height: 0.8rem
      line-height: 0.8rem
      background-color: white
      li
        height: 0.8rem
        float: left
        width: 20%
        text-align: center
        a
          display: block
          width: 80%
          height: 0.8rem
          font-size: 0.26rem
          color: #626262
          box-sizing: border-box
          margin: 0 auto
          &.on
            color: #FF7400
            border-bottom: 2px solid #FF7a00
  .about_com
    border-top: 0.18rem solid #f2f3f7
  .terrace_top,.terrace_bot
    background-color: white
    padding: 0 0.3rem
  .terrace_top
    div
      overflow: hidden
      padding-bottom: 0.32rem
     p
      font-size: 0.24rem
      color: #626262
      line-height: 0.4rem
      margin-top: 0.14rem
  .terrace_bot
    border-top: 0.2rem solid #f2f3f7
    .flex
      display: flex
      padding-top: 0.5rem
      overflow: hidden
      .flex-1
        flex: 1
    .bot_icon
      overflow: hidden
    p
      font-size: 0.24rem
      color: #626262
      height: 0.3rem
      line-height: 0.3rem
      margin-bottom: 0.1rem
      &.mt
        margin-top: 0.1rem
    a
      text-align: center
    .iconfont
      color: #FF7400
      font-size: 0.6rem
    .icon_top
      margin-top: 0.2rem
    .icon_bot
      margin: 0.3rem 0 0.8rem 0
  .framework,.personnel
    background-color: white
    overflow: hidden
  .framework .framework_bg
    width: 6.06rem
    height: 9.26rem
    background: url(../../../assets/images/inform/framework-bg.png) no-repeat
    background-size: 100% 100%
    margin: 0.75rem auto
  .personnel
    padding: 0.46rem 0rem 0
  .personnel_bg
    width: 6.8rem
    height: 7.96rem
    background: url(../../../assets/images/inform/personnel-bg.png) no-repeat
    background-size: 100% 100%
    margin: 0 auto
  .certificate
    padding: 0 0.3rem
    background-color: white
    padding-top: 0.2rem
    padding-bottom: 0.65rem
    .flex
      display: flex
      overflow: hidden
    .flex-1
      flex: 1
    .div_fr
      margin-right: 0.3rem
    .div_img
      width: 3.28rem
      height: 4.6rem
      margin-top: 0.18rem
      position: relative
      img
        width: 3.28rem
        height: 4.6rem
      a
        display: block
      .txt_p
        width: 100%
        height: 0.48rem
        line-height: 0.48rem
        text-align: center
        position: absolute
        left: 0
        bottom: 0
        background-color: rgba(57,59,63,0.5)
        p
          font-size: 0.22rem
          color: #fff
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid #f2f3f7
    border-bottom: 0.2rem solid #f2f3f7
    h3
      font-size: 0.28rem
      color: #212a36
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid #e4e4e4
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
  .signature
    background-color: #fff
    .signature_bg
      width: 6.92rem
      height: 6.31rem
      margin: 0 auto
      background: url(../../../assets/images/inform/signature.png) no-repeat
      background-size: 100% 100%
  .img_show
    opacity: 1
    z-index: 90
    width: 100%
    height: 100%
    padding: 1.68rem 0 0.8rem
    box-sizing: border-box
    background-color: #000
    overflow: hidden
    position: fixed
    top: 0
    left: 0
    .slider
      height: 100%
      touch-action: none
      width: 100%
      white-space: nowrap
      li
        width: 100%
        height: 100%
        display: inline-block
        position: relative
        img
          position: absolute
          display: block
          height: auto
          width: 100%
          vertical-align: middle
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          max-height: 100%
          max-width: 100%
          margin-left: auto
          margin-right: auto
          user-select: none
    .active
      transition: all 0.5s ease-out 0s
  h3
    font-size: 0.28rem
    color: #212a36
    height: 0.8rem
    line-height: 0.8rem
    border-bottom: 1px solid #e4e4e4
    font-weight: normal
</style>