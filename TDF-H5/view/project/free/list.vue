<template>
  <div>
    <ul>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>112111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111<router-link to="/project/details">XXX</router-link></li>
    </ul>
  </div>
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
  created() {
    const params = {
      item: 10,
      page: 1
    }
    // console.log('我发fetch')
    this.$store.dispatch('project/asyTest', params)
  },
  methods: {
    onPullingDown() {
      console.log('下拉')
      setTimeout(async () => {
        pageNum = 1
        const params = {
          item: this.$store.state.project.fItem,
          page: 1
        }
        // this.$store.dispatch('project/refresh')
        let { data } = await freeBorrowList(this.$axios, params)
        let result = data.content.dataRows
        this.$store.commit('project/setNull')
        for (let i = 0; i < result.length; i++) {
          this.$store.commit('project/setFreeData', result[i])
          if (result[i].rate != 100) {
            this.$store.commit('project/setFreeList', result[i])
          } else {
            this.$store.commit('project/setFreeListOut', result[i])
          }
        }
        // this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
      }, 1000)
    },
    onPullingUp() {
      pageNum++
      console.log(pageNum)
      console.log(this.pages)
      const params = {
        item: this.$store.state.project.fItem,
        page: pageNum
      }
      // // 更新数据
      setTimeout(async () => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          // this.$store.dispatch('project/getScatterList', params)
          let { data } = await freeBorrowList(this.$axios, params)
          let result = data.content.dataRows
          this.$store.commit('project/setFreePages', data.content.pages)
          this.$store.commit('project/setFreeItems', data.content.items)
          for (let i = 0; i < result.length; i++) {
            this.$store.commit('project/setFreeData', result[i])
            if (result[i].rate != 100) {
              this.$store.commit('project/setFreeList', result[i])
            } else {
              this.$store.commit('project/setFreeListOut', result[i])
            }
          }
          console.log(data)
        } else {
          // 如果没有新数据
          this.$refs.scatterPro.forceUpdate()
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
.wapp
  height: 1000px
.pro-ul
  // height: 400px
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
