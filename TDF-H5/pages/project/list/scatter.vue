<template>
  <cube-scroll
    ref="contentScroll0"
    :data="this.$store.state.project.scatterData"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <!-- <div>{{ this.$store.state.project.invalidFreeList }}</div> -->
    <ul class="pro-ul">
      <li
        v-for="(item, index) in this.$store.state.project.scatterData"
        v-if="item.borrowAccountScale!=100"
        :key="index">
        <router-link
          to="/project/details/scatterDetails/indexs">
          <div>
            <div class="pro-name">{{ item.name }}<tags :type="item.typeId" /></div>
            <dl class="pro-con">
              <dd>{{ item.borrowApr }}<i>%</i><i v-if="item.platformApr!=0">+{{ item.platformApr }}%</i></dd>
              <dd>{{ item.borrowPeriod }}个月</dd>
              <dd><button>立即加入</button></dd>
            </dl>
            <div class="bar">
              <div
                :style="{width: item.borrowAccountScale+'%'}"
                class="bar-in"/>
            </div>
            <p class="pro-btm">
              <span>{{ item.borrowStyle }}</span>
              <span>剩余可投:{{ item.surplusAmountFormat }}元</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <div
      v-show="this.$store.state.project.freeListOut.length!=0"
      class="separate"><span>已抢完</span></div>
    <ul class="pro-ul pro-invalid">
      <li
        v-for="(item, index) in this.$store.state.project.scatterData"
        v-if="item.borrowAccountScale==100"
        :key="index">
        <nuxt-link to="/project/details/scatterDetails/indexs">
          <div class="pro-name">{{ item.name }}<tags :type="item.typeId" /></div>
          <dl class="pro-con">
            <dd>{{ item.apr }}<i>%</i><i v-if="item.platformApr!=0">+{{ item.platformApr }}%</i></dd>
            <dd>{{ item.period }}个月</dd>
            <dd><button>已抢完</button></dd>
          </dl>
          <p class="pro-btm">
            <span>{{ item.interestAate }}</span>
            <span>剩余可投:{{ item.surplusAmountFormat }}元</span>
          </p>
        </nuxt-link>
      </li>
    </ul>
  </cube-scroll>
</template>
<script>
import { freeBorrowList } from '~/plugins/api.js'
import Tags from '~/components/business/tags/tags'
let pageNum = 1
let img = [1, 2, 3]
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
            more: '上拉加载更多',
            noMore: '没有更多数据了'
          }
        },
        scrollbar: true
      },
      pages: this.$store.state.project.freePages
    }
  },
  methods: {
    onPullingDown() {
      console.log('下拉')
      // this.$store.commit('project/setFreeList', img)
      setTimeout(async () => {
        pageNum = 1
        const params = { item: 10, page: 1 }
        let { data } = await freeBorrowList(this.$axios, params)
        this.$store.commit('project/setNull')
        // console.log(this.$store.state.project.freeList)
        let rs = data.content.dataRows
        for (let i = 0; i < rs.length; i++) {
          this.$store.commit('project/setFreeData', rs[i])
          rs[i].rate != 100
            ? this.$store.commit('project/setFreeList', rs[i])
            : this.$store.commit('project/setFreeListOut', rs[i])
        }
        // console.log(this.$store.state.project.freeList)
        // this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
      }, 1000)
      // this.$refs.contentScroll0.forceUpdate()
    },
    onPullingUp() {
      pageNum++
      // let pat = this.$store.state.project.freePages
      console.log(pageNum)
      console.log(this.pages)
      const params = {
        item: this.$store.state.project.freeItem,
        page: pageNum
      }
      // // 更新数据
      setTimeout(() => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          this.$store.dispatch('project/asyTest', params)
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
