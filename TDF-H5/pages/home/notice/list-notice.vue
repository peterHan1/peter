<template>
  <div>
    <cube-scroll
      v-if="this.$store.state.noticeData.length > 0"
      ref="contentScroll0"
      :data="this.$store.state.noticeData"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="left">
        <router-link
          v-for="(item, index) in this.$store.state.noticeData"
          :key="index"
          :to="item.url"
          class="item_notice">
          <div>
            <span>{{ item.limitName }}</span>
            <b>{{ item.time }}</b>
          </div>
          <section>{{ item.name }}</section>
        </router-link>
      </div>
    </cube-scroll>
    <div 
      v-else 
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无公告数据"/>
    </div>
  </div>
</template>
<script>
import { homeNoticeDynamic } from '../../../plugins/api.js'
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
            more: '上拉加载更多',
            noMore: '没有更多数据了'
          }
        },
        scrollbar: true
      },
      pages: this.$store.state.noticePages
    }
  },
  mounted() {
    // console.log(this.$store.state.dynamicData)
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(async () => {
        pageNum = 1
        const params = {
          typeId: 'gonggao',
          page: 1,
          item: this.$store.state.dynamicItem
        }
        let { data } = await homeNoticeDynamic(this.$axios, params)
        console.log(data)
        this.$store.commit('setNoticeNull')
        data.content.dataRows.map(o => {
          this.$store.commit('setNoticeData', o)
        })
        this.$store.commit('setNoticePages', data.content.pages)
      }, 1000)
    },
    // 上拉加载
    onPullingUp() {
      pageNum++
      const params = {
        typeId: 'gonggao',
        page: pageNum,
        item: this.$store.state.noticeItem
      }
      // // 更新数据
      setTimeout(() => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          this.$store.dispatch('getNoticeList', params)
        } else {
          // 如果没有新数据
          this.$refs.contentScroll0.forceUpdate()
        }
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .left
    overflow: hidden
    background: $color-background
    .item_notice
      background: $color-white
      width: 100%
      display: block
      padding: 3.125%
      box-sizing: border-box
      margin-top: 0.3rem
      div
        span
          width: 68%
          font-size: $fontsize-large-x
          color: $color-gray1
          display: inline-block
        b
          display: inline-block
          width: 30%
          text-align: right
          font-size: $fontsize-small-sss
          font-weight: normal
          color: #777
      section
        width: 100%
        overflow: hidden
        font-size: $fontsize-small-ss
        color: #a3a3a3
        color: #a3a3a3
        margin-top: 0.3rem
</style>
