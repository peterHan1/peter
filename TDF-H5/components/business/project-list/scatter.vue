<template>
  <cube-scroll
    ref="contentScroll0"
    :data="data"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul class="pro-ul">
      <li
        v-for="(item, index) in data"
        v-if="item.rate!=100"
        :key="index"
        @click="selected(item.desId)">
        <div>
          <div class="pro-name">{{ item.name }}
            <tags :type="item.typeId" />
            <img
              v-show="item.doubleBonus==2"
              src="~/assets/images/tags/jifen2.png">
            <img
              v-show="item.doubleBonus==3"
              src="~/assets/images/tags/jifen3.png">
            <img
              v-show="item.orZhuan==1"
              src="~/assets/images/tags/transfer.png">
            <img
              v-show="item.isApp==0"
              src="~/assets/images/tags/app.png">
          </div>
          <dl class="pro-con">
            <dd>{{ item.apr }}<i>%</i><i v-if="item.platformApr!=0">+{{ item.platformApr }}%</i></dd>
            <dd>{{ item.period }}个月</dd>
            <dd><button>立即出借</button></dd>
          </dl>
          <div class="bar">
            <div
              :style="{width: item.rate+'%'}"
              class="bar-in"/>
          </div>
          <p class="pro-btm">
            <span>{{ resolveType(item.amountType) }}</span>
            <span>剩余可投:{{ item.surplusAmountFormat }}元</span>
          </p>
        </div>
      </li>
    </ul>
    <div
      v-show="this.$store.state.project.scatterListOut.length!=0"
      class="separate"><span>已抢完</span></div>
    <ul class="pro-ul pro-invalid">
      <li
        v-for="(item, index) in data"
        v-if="item.rate==100"
        :key="index"
        @click="selected(item.desId)">
        <div class="pro-name">{{ item.name }}
          <tags :type="item.typeId" />
          <img
            v-show="item.doubleBonus==2"
            src="~/assets/images/tags/jifen2.png">
          <img
            v-show="item.doubleBonus==3"
            src="~/assets/images/tags/jifen3.png">
          <img
            v-show="item.orZhuan==1"
            src="~/assets/images/tags/transfer.png">
        </div>
        <dl class="pro-con">
          <dd>{{ item.apr }}<i>%</i><i v-if="item.platformApr!=0">+{{ item.platformApr }}%</i></dd>
          <dd>{{ item.period }}个月</dd>
          <dd><button>已抢完</button></dd>
        </dl>
        <p class="pro-btm">
          <span>{{ resolveType(item.amountType) }}</span>
          <span>剩余可投:{{ item.surplusAmountFormat }}元</span>
        </p>
      </li>
    </ul>
  </cube-scroll>

</template>
<script>
import { mapState } from 'vuex'
import { scatterList } from '~/api/project.js'
import Tags from '~/components/business/tags/tags'
let pageNum = 1
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            // more: '加载中',
            noMore: '没有更多数据了'
          }
        },
        scrollbar: true
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.project.scatterData,
      pages: state => state.project.scatterPages,
      item: state => state.project.initItem
    })
  },
  methods: {
    resolveType(amountType) {
      let typeStr = ''
      switch (amountType) {
        case 'month':
          typeStr = '等额本息'
          break
        case 'season':
          typeStr = '按季还款'
          break
        case 'end':
          typeStr = '到期还本还息'
          break
        case 'endmonth':
          typeStr = '到期还本，按月付息'
          break
        case 'endday':
          typeStr = '到期还本息，按天计息'
          break
        case 'endmonths':
          typeStr = '到期还本，按月付息，且当月还息 '
          break
        default:
          typeStr = 'null'
      }
      return typeStr
    },
    selected(desId) {
      this.$store.commit('project/setTransition', 'turn-on')
      // console.log(desId)
      // this.$emit('selected')
      this.$router.push({
        path: `/project/scatter-details/${desId}`
      })
    },
    onPullingDown() {
      console.log('下拉')
      setTimeout(async () => {
        pageNum = 1
        const params = { item: 10, page: 1 }
        let { content } = await scatterList(this.$axios, params)
        this.$store.commit('project/setScatterNull')
        this.$store.commit('project/scatterHandleData', content)
      }, 1000)
      // this.$refs.contentScroll0.forceUpdate()
    },
    onPullingUp() {
      pageNum++
      console.log(pageNum + 'xxxxxxx')
      console.log(this.pages)
      console.log('\\\\\\\\\\\\')
      // // 更新数据
      setTimeout(async () => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          const { content } = await scatterList(this.$axios, {
            page: pageNum,
            item: this.item
          })
          this.$store.commit('project/scatterHandleData', content)
        } else {
          // 如果没有新数据
          this.$refs.contentScroll0.forceUpdate()
        }
      }, 1000)
    }
  },
  components: {
    Tags
  }
}
</script>
<style lang="stylus">
.realTime
  height: 68px
  line-height: 68px
  overflow: hidden
  font-size: $fontsize-small-ss
  color: $color-gray3
  text-align: center

.pro-ul
  li
    // padding: 0 30px 0 35px
    padding: 35px
    border-bottom: 1px solid $color-gray5; /*no*/
    background-color: $color-white
    a
      display: block
    .pro-name
      font-size: $fontsize-medium
      color: $color-gray1
      display: flex
      align-items: center
    .pro-con
      display: flex
      height: 68px
      line-height: 1
      justify-content: space-between
      align-items: flex-end
      margin: 32px 0
      dd
        i
          font-size: $fontsize-large-xxx
        &:nth-child(1)
          font-size: 68px
          color: $color-primary
          line-height: 0.75
        &:nth-child(2)
            font-size: $fontsize-large-x
            color: $color-gray1
        &:nth-child(3)
          button
            width: 170px
            height: 68px
            line-height: 68px
            font-size: $fontsize-medium
            background: $color-primary
            color: $color-white
            border-radius: 34px
            text-align: center
    .bar
      width: 100%
      height: 4px
      border-radius: 2px
      background: $color-gray5
      position: relative
      overflow: hidden
      .bar-in
        position: absolute
        top: 0
        left: 0
        width: 30%
        height: 100%
        background: $gard
    .pro-btm
      font-size: $fontsize-small-ss
      color: $color-gray3
      margin-top: 15px
      span:nth-child(2)
        float: right
.pro-invalid
  li
    .pro-name
      color: $color-gray3
    .pro-con
      dd:nth-child(1)
        color: $color-gray3
      dd:nth-child(2)
        color: $color-gray3
      dd:nth-child(3)
        button
          background: $color-gray6
.separate
  text-align: center
  position: relative
  height: 93px
  &:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 50%
    border-top: 2px solid $color-gray5
  z-index: 9
  span
    position: absolute
    left: 50%
    transform: translateX(-50%)
    display: inline-block
    line-height: 93px
    font-size: $fontsize-small-ss
    color: $color-gray3
    background-color: $color-background
    z-index: 99
    padding: 0 30px
.cube-pulldown-wrapper
  text-align: center
  .before-trigger
    height: auto
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      line-height: 1
      transition: all 0.3s
      color: #666
      padding: 15px 0
      &.rotate
        transform: rotate(180deg)
  .after-trigger
    flex: 1
    margin: 0
    .text-wrapper
      margin: 0 auto
      margin-top: 14px
      padding: 5px 0
      color: #498ec2
      background-color: #d6eaf8
    .loading
      display: inline-block
    .cube-loading-spinners
      margin: auto
</style>
