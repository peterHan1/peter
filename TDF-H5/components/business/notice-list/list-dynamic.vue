<template>
  <cube-scroll
    v-if="data.length > 0"
    ref="contentScroll0"
    :data="data"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="right">
      <a
        v-for="(item, index) in data"
        :key="index"
        :href="item.url"
        class="item">
        <img :src="item.litpic">
        <div>
          <p class="t">{{ item.limitName }}</p>
          <p class="d">{{ item.time }}</p>
          <p class="c">{{ item.name }}</p>
        </div>
      </a>
    </div>
  </cube-scroll>
  <div 
    v-else 
    class="data-status">
    <data-status
      status="null"
      statusTxt="暂无动态数据"/>
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
      data: state => state.home.dynamicData,
      pages: state => state.home.dynamicPages,
      item: state => state.home.dynamicItem
    })
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(async () => {
        pageNum = 1
        const params = {
          typeId: 'media',
          page: 1,
          item: this.item
        }
        let data = await homeNoticeDynamic(this.$axios, params)
        // for (let i = 0; i < data.content.dataRows.length; i++) {
        //   data.content.dataRows[i].url =
        //     'http://72.127.2.140:9090' + data.content.dataRows[i].url
        // }
        this.$store.commit('home/setDynamicNull')
        data.content.dataRows.map(o => {
          this.$store.commit('home/setDynamicData', o)
        })
        this.$store.commit('home/setDynamicPages', data.content.pages)
      }, 1000)
    },
    // 上拉加载
    onPullingUp() {
      pageNum++
      const params = {
        typeId: 'media',
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
            this.$store.commit('home/setDynamicData', o)
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
  .right
    overflow: hidden
    background: $color-background
    .item
      background: $color-white
      width: 100%
      display: block
      overflow: hidden
      padding: 3.125%
      box-sizing: border-box
      margin-top: 30px
      img
        width: 200px
        height: 200px
        vertical-align: middle
        display: inline-block
        margin-right: 50px
        float: left
      div
        width: 64%
        float: left
        .t
          font-size: $fontsize-large-x
          padding-top: 1px
          color: $color-gray1
        .d
          font-size: $fontsize-small-sss
          color: #777
          margin: 15px 0 25px 0
        .c
          font-size: $fontsize-medium
          color: #a3a3a3
          line-height: 40px
          white-space: initial
  .data-status
    margin-top 200px
</style>
