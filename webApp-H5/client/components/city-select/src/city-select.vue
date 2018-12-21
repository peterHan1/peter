<template>
  <div class="citySelect" v-show="show">
    <transition name="fade">
      <div class="citySelect-mask" v-if="maskShow" :style="{background: 'rgba(0,0,0,'+opacity+')'}" @click="cancel"></div>
    </transition>
    <transition name="move"  @before-enter="beforeEnter" @enter="enter" @leave="leave" @after-leave="afterLeave">
      <div class="citySelect-con" v-if="cityShow">
        <div class="citySelect-top">
          <button class="citySelect-cancel" @click="cancel">取消</button>
          <button class="citySelect-yes" @click="select">确定</button>
        </div>
        <div class="citySelect-bottom">
          <div class="citySelect-inner citySelect-province" @touchstart="touchStartProvince($event)">
            <div class="citySelect-look"></div>
            <ul :style="{transform: 'perspective(1000px) rotateY(0deg) rotateX('+angle1+'deg)'}" :class="{active: active1}">
              <li v-for="(item, index) in provincs" :key="index" style="transform-origin: center center -89.5px;" :style="{transform: 'translateZ(89.5px) rotateX('+(-20*index)+'deg)'}" :class="[index === highLight1?'highLight':'', (index >= (showIndex1-4) && index<=(showIndex1+4))?'visible':'']" @click.stop="clickCity(index, 'province')">{{item.text}}</li>
            </ul>
          </div>
          <div class="citySelect-inner citySelect-city" @touchstart="touchStartCity($event)">
            <div class="citySelect-look"></div>
            <ul :style="{transform: 'perspective(1000px) rotateY(0deg) rotateX('+angle2+'deg)'}" :class="{active: active2}">
              <li v-for="(item, index) in citys" :key="index" style="transform-origin: center center -89.5px;" :style="{transform: 'translateZ(89.5px) rotateX('+(-20*index)+'deg)'}" :class="[index === highLight2?'highLight':'', (index >= (showIndex2-4) && index<=(showIndex2+4))?'visible':'']" @click.stop="clickCity(index, 'city')"><nobr>{{item.text}}</nobr></li>
            </ul>
          </div>
          <div class="citySelect-inner citySelect-area" @touchstart="touchStartArea($event)">
            <div class="citySelect-look"></div>
            <ul :style="{transform: 'perspective(1000px) rotateY(0deg) rotateX('+angle3+'deg)'}" :class="{active: active3}">
              <li v-for="(item, index) in areas"  :key="index" style="transform-origin: center center -89.5px;" :style="{transform: 'translateZ(89.5px) rotateX('+(-20*index)+'deg)'}" :class="[index === highLight3?'highLight':'', (index >= (showIndex3-4) && index<=(showIndex3+4))?'visible':'']" @click.stop="clickCity(index, 'area')"><nobr>{{item.text}}</nobr></li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import City from './city.js'
Vue.prototype.$dataCity = City
export default {
  name: 'city-select',
  props: ['cityShow'],
  data () {
    return {
      show: false, // 整个插件的显示隐藏
      opacity: 0.3, // 蒙版的透明度
      maskShow: false, // 蒙版的显示隐藏
      provincs: this.$dataCity, // 省份
      angle1: 0, // 省份旋转角度
      angleStart1: 0, // 省份按下时的初始角度
      active1: false, // 省份手指松开时添加transition动画属性
      showIndex1: 0, // 省份每次滑动需要显示的li标签的下标，用来控制visibility的属性
      length1: 0, // 省份li标签的总长度（省份个数）
      highLight1: 0, // 省份高亮时的下标，用来控制字体颜色变黑高亮
      citys: this.$dataCity[0].children,
      angle2: 0,
      angleStart2: 0,
      active2: false,
      showIndex2: 0,
      length2: 0,
      highLight2: 0, // 市高亮
      areas: this.$dataCity[0].children[0].children,
      angle3: 0,
      angleStart3: 0,
      active3: false,
      showIndex3: 0,
      length3: 0,
      highLight3: 0, // 区高亮
      startY: 0, // 每次鼠标按下时的坐标
      lastTwoPoint: [], // 记录手指松开时，最后移动的两个点的位置
      maxAngle: 20, // 走完一个li标签最多所需要旋转的角度，由rotateX的值得来
      value: ''
    }
  },
  mounted () {
    this.length1 = this.provincs.length
    this.length2 = this.citys.length
    this.length3 = this.areas.length
  },
  methods: {
    getValue () {
      this.$emit('cityValue', this.value)
    },
    cancel () {
      this.$emit('on-close')
    },
    select () {
      this.value = this.$dataCity[this.showIndex1].text + ' ' + this.$dataCity[this.showIndex1].children[this.showIndex2].text + ' ' + this.$dataCity[this.showIndex1].children[this.showIndex2].children[this.showIndex3].text
      this.getValue()
      this.$emit('on-close')
    },
    beforeEnter () {
      this.show = true
    },
    afterLeave () {
      this.show = false
    },
    enter () {
      this.maskShow = true
    },
    leave () {
      this.maskShow = false
    },
    touchStartProvince (e) {
      this.startY = e.targetTouches[0].clientY
      this.angleStart1 = this.angle1
      this.active1 = false
      this.touchMoveProvince()
      this.touchEndProvince()
    },
    touchMoveProvince () {
      let that = this
      window.ontouchmove = function (e) {
        let event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        let shuY = event.changedTouches[0].clientY
        that.lastTwoPoint.shift()
        that.lastTwoPoint.push(shuY + ',' + that.lastTwoPoint.shift())
        let jl = shuY - that.startY
        that.angle1 = that.angleStart1 - jl
        // 控制选择角度的最大最小值
        if (that.angle1 <= -30) {
          that.angle1 = -30
        } else if (that.angle1 >= that.maxAngle * (that.length1 - 1) + 30) {
          that.angle1 = that.maxAngle * (that.length1 - 1) + 30
        }
        // 控制字体高亮
        if (that.angle1 > -20 && that.angle1 < that.maxAngle * (that.length1 - 1) + 20) {
          if ((that.angle1 % that.maxAngle >= that.maxAngle / 2 && that.angle1 > 0) || (that.angle1 >= -(that.maxAngle / 2) && that.angle1 < 0)) {
            that.highLight1 = Math.floor(that.angle1 / that.maxAngle) + 1
          } else {
            that.highLight1 = Math.floor(that.angle1 / that.maxAngle)
          }
        } else {
          that.highLight1 = -1
        }
        // 计算每次滑动需要显示的li标签的下标
        if (that.angle1 > that.angleStart1) { // 向上滑
          if (that.angle1 % that.maxAngle >= that.maxAngle / 2) {
            that.showIndex1 = Math.floor(that.angle1 / that.maxAngle) + 1
          } else {
            that.showIndex1 = Math.floor(that.angle1 / that.maxAngle)
          }
          if (that.showIndex1 > (that.length1 - 1)) {
            that.showIndex1 = that.length1 - 1
          }
        } else if (that.angle1 < that.angleStart1 && that.angle1 >= 0) { // 向下滑
          if (that.angle1 % that.maxAngle <= that.maxAngle / 2) {
            that.showIndex1 = Math.ceil(that.angle1 / that.maxAngle) - 1
          } else {
            that.showIndex1 = Math.ceil(that.angle1 / that.maxAngle)
          }
          if (that.showIndex1 < 0) {
            that.showIndex1 = 0
          }
        } else if (that.angle1 < 0) {
          that.showIndex1 = 0
        }
      }
    },
    touchEndProvince () {
      let that = this
      window.ontouchend = function (e) {
        that.active1 = true
        that.active2 = true
        that.active3 = true
        that.angle1 = that.maxAngle * that.showIndex1
        if (that.angle1 > -20 && that.angle1 < that.maxAngle * (that.length1 - 1) + 20) {
          if ((that.angle1 % that.maxAngle >= that.maxAngle / 2 && that.angle1 > 0) || (that.angle1 >= -(that.maxAngle / 2) && that.angle1 < 0)) {
            that.highLight1 = Math.floor(that.angle1 / that.maxAngle) + 1
          } else {
            that.highLight1 = Math.floor(that.angle1 / that.maxAngle)
          }
        } else {
          that.highLight1 = -1
        }
        that.changeCity()
        window.ontouchmove = null
      }
    },
    touchStartCity (e) {
      this.startY = e.targetTouches[0].clientY
      this.angleStart2 = this.angle2
      this.active2 = false
      this.touchMoveCity()
      this.touchEndCity()
    },
    touchMoveCity () {
      let that = this
      window.ontouchmove = function (e) {
        let event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        let shuY = event.changedTouches[0].clientY
        let jl = shuY - that.startY
        that.angle2 = that.angleStart2 - jl
        // 控制选择角度的最大最小值
        if (that.angle2 <= -30) {
          that.angle2 = -30
        } else if (that.angle2 >= that.maxAngle * (that.length2 - 1) + 30) {
          that.angle2 = that.maxAngle * (that.length2 - 1) + 30
        }
        // 控制字体高亮
        if (that.angle2 > -20 && that.angle2 < that.maxAngle * (that.length2 - 1) + 20) {
          if ((that.angle2 % that.maxAngle >= that.maxAngle / 2 && that.angle2 > 0) || (that.angle2 >= -(that.maxAngle / 2) && that.angle2 < 0)) {
            that.highLight2 = Math.floor(that.angle2 / that.maxAngle) + 1
          } else {
            that.highLight2 = Math.floor(that.angle2 / that.maxAngle)
          }
        } else {
          that.highLight2 = -1
        }
        // 计算每次滑动需要显示的li标签的下标
        if (that.angle2 > that.angleStart2) { // 向上滑
          if (that.angle2 % that.maxAngle >= that.maxAngle / 2) {
            that.showIndex2 = Math.floor(that.angle2 / that.maxAngle) + 1
          } else {
            that.showIndex2 = Math.floor(that.angle2 / that.maxAngle)
          }
          if (that.showIndex2 > (that.length2 - 1)) {
            that.showIndex2 = that.length2 - 1
          }
        } else if (that.angle2 < that.angleStart2 && that.angle2 >= 0) { // 向下滑
          if (that.angle2 % that.maxAngle <= that.maxAngle / 2) {
            that.showIndex2 = Math.ceil(that.angle2 / that.maxAngle) - 1
          } else {
            that.showIndex2 = Math.ceil(that.angle2 / that.maxAngle)
          }
          if (that.showIndex2 < 0) {
            that.showIndex2 = 0
          }
        } else if (that.angle2 < 0) {
          that.showIndex2 = 0
        }
      }
    },
    touchEndCity () {
      let that = this
      window.ontouchend = function (e) {
        that.active2 = true
        that.active3 = true
        that.angle2 = that.maxAngle * that.showIndex2
        if (that.angle2 > -20 && that.angle2 < that.maxAngle * (that.length2 - 1) + 20) {
          if ((that.angle2 % that.maxAngle >= that.maxAngle / 2 && that.angle2 > 0) || (that.angle2 >= -(that.maxAngle / 2) && that.angle2 < 0)) {
            that.highLight2 = Math.floor(that.angle2 / that.maxAngle) + 1
          } else {
            that.highLight2 = Math.floor(that.angle2 / that.maxAngle)
          }
        } else {
          that.highLight2 = -1
        }
        that.changeCity()
        window.ontouchmove = null
      }
    },
    touchStartArea (e) {
      this.startY = e.targetTouches[0].clientY
      this.angleStart3 = this.angle3
      this.active3 = false
      this.touchMoveArea()
      this.touchEndArea()
    },
    touchMoveArea () {
      let that = this
      window.ontouchmove = function (e) {
        let event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        let shuY = event.changedTouches[0].clientY
        let jl = shuY - that.startY
        that.angle3 = that.angleStart3 - jl
        // 控制选择角度的最大最小值
        if (that.angle3 <= -30) {
          that.angle3 = -30
        } else if (that.angle3 >= that.maxAngle * (that.length3 - 1) + 30) {
          that.angle3 = that.maxAngle * (that.length3 - 1) + 30
        }
        // 控制字体高亮
        if (that.angle3 > -20 && that.angle3 < that.maxAngle * (that.length3 - 1) + 20) {
          if ((that.angle3 % that.maxAngle >= that.maxAngle / 2 && that.angle3 > 0) || (that.angle3 >= -(that.maxAngle / 2) && that.angle3 < 0)) {
            that.highLight3 = Math.floor(that.angle3 / that.maxAngle) + 1
          } else {
            that.highLight3 = Math.floor(that.angle3 / that.maxAngle)
          }
        } else {
          that.highLight3 = -1
        }
        // 计算每次滑动需要显示的li标签的下标
        if (that.angle3 > that.angleStart3) { // 向上滑
          if (that.angle3 % that.maxAngle >= that.maxAngle / 2) {
            that.showIndex3 = Math.floor(that.angle3 / that.maxAngle) + 1
          } else {
            that.showIndex3 = Math.floor(that.angle3 / that.maxAngle)
          }
          if (that.showIndex3 > (that.length3 - 1)) {
            that.showIndex3 = that.length3 - 1
          }
        } else if (that.angle3 < that.angleStart3 && that.angle3 >= 0) { // 向下滑
          if (that.angle3 % that.maxAngle <= that.maxAngle / 2) {
            that.showIndex3 = Math.ceil(that.angle3 / that.maxAngle) - 1
          } else {
            that.showIndex3 = Math.ceil(that.angle3 / that.maxAngle)
          }
          if (that.showIndex3 < 0) {
            that.showIndex3 = 0
          }
        } else if (that.angle3 < 0) {
          that.showIndex3 = 0
        }
      }
    },
    touchEndArea () {
      let that = this
      window.ontouchend = function (e) {
        that.active3 = true
        that.angle3 = that.maxAngle * that.showIndex3
        if (that.angle3 > -20 && that.angle3 < that.maxAngle * (that.length3 - 1) + 20) {
          if ((that.angle3 % that.maxAngle >= that.maxAngle / 2 && that.angle3 > 0) || (that.angle3 >= -(that.maxAngle / 2) && that.angle3 < 0)) {
            that.highLight3 = Math.floor(that.angle3 / that.maxAngle) + 1
          } else {
            that.highLight3 = Math.floor(that.angle3 / that.maxAngle)
          }
        } else {
          that.highLight3 = -1
        }
        window.ontouchmove = null
      }
    },
    changeCity () {
      if (this.showIndex2 >= this.$dataCity[this.showIndex1].children.length - 1) {
        this.showIndex2 = this.$dataCity[this.showIndex1].children.length - 1
      }
      if (this.showIndex3 >= this.$dataCity[this.showIndex1].children[this.showIndex2].children.length - 1 && this.$dataCity[this.showIndex1].children[this.showIndex2].children !== undefined) {
        this.showIndex3 = this.$dataCity[this.showIndex1].children[this.showIndex2].children.length - 1
      } else if (this.$dataCity[this.showIndex1].children[this.showIndex2].children === undefined) {
        this.areas = []
      }
      this.citys = this.$dataCity[this.showIndex1].children
      this.areas = this.$dataCity[this.showIndex1].children[this.showIndex2].children
      this.length2 = this.citys.length
      this.length3 = this.areas.length
      this.highLight1 = this.showIndex1
      this.highLight2 = this.showIndex2
      this.highLight3 = this.showIndex3
      this.angle1 = this.maxAngle * this.showIndex1
      this.angle2 = this.maxAngle * this.showIndex2
      this.angle3 = this.maxAngle * this.showIndex3
    },
    clickCity (index, type) {
      this.active1 = true
      this.active2 = true
      this.active3 = true
      if (type === 'province') {
        this.showIndex1 = index
      } else if (type === 'city') {
        this.showIndex2 = index
      } else {
        this.showIndex3 = index
      }
      this.changeCity()
    }
  }
}
</script>
<style lang="stylus" scoped>
*
  box-sizing: border-box
.citySelect
  width: 100%
  height: 100%
  font-family: "Microsoft YaHei"
  position: fixed
  margin:0 auto
  left: 0
  top:0
  z-index: 999
  .citySelect-mask
    position: absolute
    left: 0
    top:0
    width: 100%
    height: 100%
  .citySelect-con
    position: absolute
    bottom: 0
    width: 100%
    z-index: 1000
    border-top: solid 1px #ccc
    background-color: #eee
    box-shadow: 0 -5px 7px 0 rgba(0,0,0,.1)
    &.move-enter-active
      transition: bottom .2s ease-out 5ms
    &.move-leave-active
      transition: bottom .2s ease-out
    &.move-enter,&.move-leave-to
      bottom: -5rem
    .citySelect-top
      padding: 0.1rem
      font-size: 0.24rem
      overflow: hidden
      button
        display: inline-block
        padding: 0rem 0.15rem
        color: #333
        height: 0.5rem
        line-height: 0.5rem
        text-align:center
        border: 1px solid #ccc
        border-radius: 3px
        background: #fff
        float: left
        &.citySelect-yes
          color: #fff
          background: #007aff
          border: 1px solid #007aff
          float: right
    .citySelect-bottom
      position: relative
      width: 100%
      height: 4rem
      border-top: solid 1px #ddd
      .citySelect-inner
        width: 33.333333%
        height: 100%
        touch-action: none
        position: relative
        float:left
        -webkit-mask: -webkit-linear-gradient(bottom,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent)
        -webkit-mask: linear-gradient(top,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent)
        .citySelect-look
          position: absolute
          left:0
          top: 50%
          z-index: 20
          margin-top: -0.36rem
          width: 100%
          height: 0.72rem
          line-height: 0.72rem
          border-top: solid 1px rgba(0,0,0,.1)
          border-bottom: solid 1px rgba(0,0,0,.1)
        ul
          position: absolute
          left:0
          top: 50%
          z-index: 20
          margin-top: -0.36rem
          width: 100%
          height: 0.72rem
          line-height: 0.72rem
          transform-style: preserve-3d
          li
            width: 100%
            height: 100%
            line-height: 0.74rem
            position: absolute
            text-align: center
            vertical-align: middle
            font-size: 0.32rem
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif
            color: #888
            text-overflow: ellipsis
            overflow:hidden
            visibility: hidden
            &.visible
              visibility: visible
            &.highLight
              color: #222
        .active
          transition: all 100ms ease-out 0s
  .fade-enter-active,.fade-leave-active
    transition: opacity .1s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>