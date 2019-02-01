<template>
  <div>
    <cube-scroll
      v-if="this.$store.state.dynamicData.length > 0"
      ref="contentScroll0"
      :data="this.$store.state.dynamicData"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="right">
        <router-link
          v-for="(item, index) in this.$store.state.dynamicData"
          :key="index"
          :to="item.url"
          class="item">
          <img :src="item.litpic">
          <div>
            <p class="t">{{ item.limitName }}</p>
            <p class="d">{{ item.time }}</p>
            <p class="c">{{ item.name }}</p>
          </div>
        </router-link>
      </div>
    </cube-scroll>
    <div 
      v-else 
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无动态数据"/>
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
      pages: this.$store.state.dynamicPages
    }
  },
  mounted() {
    console.log(this.$store.state.dynamicData)
  },
  methods: {
    // 下拉刷新
    onPullingDown() {
      setTimeout(async () => {
        pageNum = 1
        const params = {
          typeId: 'media',
          page: 1,
          item: this.$store.state.dynamicItem
        }
        let { data } = await homeNoticeDynamic(this.$axios, params)
        this.$store.commit('setDynamicNull')
        data.content.dataRows.map(o => {
          this.$store.commit('setDynamicData', o)
        })
        this.$store.commit('setDynamicPages', data.content.pages)
      }, 1000)
    },
    // 上拉加载
    onPullingUp() {
      pageNum++
      const params = {
        typeId: 'media',
        page: pageNum,
        item: this.$store.state.dynamicItem
      }
      // // 更新数据
      setTimeout(() => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          this.$store.dispatch('getDynamicList', params)
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
      margin-top: 0.3rem
      img
        width: 2rem
        height: 2rem
        vertical-align: middle
        display: inline-block
        margin-right: 0.5rem
        float: left
      div
        width: 64%
        float: left
        .t
          font-size: $fontsize-large-x
          padding-top: 0.1rem
          color: $color-gray1
        .d
          font-size: $fontsize-small-sss
          color: #777
          margin: .15rem 0 .25rem 0
        .c
          font-size: $fontsize-medium
          color: #a3a3a3
          line-height: 0.4rem
          white-space: initial
  .data-status
    margin-top 100px
</style>
