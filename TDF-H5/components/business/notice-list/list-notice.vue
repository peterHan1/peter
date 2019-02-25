<template>
  <cube-scroll
    v-if="data.length > 0"
    ref="contentScroll0"
    :data="data"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="left">
      <a
        v-for="(item, index) in data"
        :key="index"
        :href="item.url"
        class="item_notice">
        <div>
          <span>{{ item.limitName }}</span>
          <b>{{ item.time }}</b>
        </div>
        <section>{{ item.name }}</section>
      </a>
    </div>
  </cube-scroll>
  <div 
    v-else 
    class="data-status">
    <data-status
      status="null"
      statusTxt="暂无公告数据"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { homeNoticeDynamic } from '~/api/home.js'
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
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.home.noticeData,
      pages: state => state.home.noticePages,
      item: state => state.home.noticeItem
    })
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(async () => {
        pageNum = 1
        const params = {
          typeId: 'gonggao',
          page: 1,
          item: this.item
        }
        let data = await homeNoticeDynamic(this.$axios, params)
        // for (let i = 0; i < data.content.dataRows.length; i++) {
        //   data.content.dataRows[i].url =
        //     'http://72.127.2.140:9090' + data.content.dataRows[i].url
        // }
        this.$store.commit('home/setNoticeNull')
        data.content.dataRows.map(o => {
          this.$store.commit('home/setNoticeData', o)
        })
        this.$store.commit('home/setNoticePages', data.content.pages)
      }, 1000)
    },
    // 上拉加载
    onPullingUp() {
      pageNum++
      const params = {
        typeId: 'gonggao',
        page: pageNum,
        item: this.item
      }
      // // 更新数据
      setTimeout(async () => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          let data = await homeNoticeDynamic(this.$axios, params)
          // for (let i = 0; i < data.content.dataRows.length; i++) {
          //   data.content.dataRows[i].url =
          //     'http://72.127.2.140:9090' + data.content.dataRows[i].url
          // }
          data.content.dataRows.map(o => {
            this.$store.commit('home/setNoticeData', o)
          })
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
      margin-top: 30px
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
        margin-top: 30px
  .data-status
    margin-top 200px
</style>
