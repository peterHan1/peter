<template>
  <cube-scroll
    ref="contentScroll0"
    :data="content"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="left">
      <router-link
        v-for="item in items1"
        :key="item"
        to=""
        class="item_notice">
        <div>
          <span>{{ item.title }}</span>
          <b>{{ item.time }}</b>
        </div>
        <section>{{ item.explain }}</section>
      </router-link>
    </div>
  </cube-scroll>
</template>
<script>
import { homeDynamic } from '../../../plugins/api.js'
let pageNum = 1
export default {
  data() {
    return {
      items1: [
        {
          title: '邀请加码，邀请人最高多得',
          explain: '邀请加码，邀请人最高多得1150元',
          time: '2018-11-01'
        },
        {
          title: '邀请加码，邀请人最高多得',
          explain: '邀请加码，邀请人最高多得1150元',
          time: '2018-11-01'
        },
        {
          title: '邀请加码，邀请人最高多得',
          explain: '邀请加码，邀请人最高多得1150元',
          time: '2018-11-01'
        }
      ],
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
      freeList: this.$store.state.project.freeList,
      invalidList: this.$store.state.project.invalidFreeList,
      pages: this.$store.state.project.pages,
      content: [],
      newArr: [3, 4, 5, 6, 7],
      pageNum: this.$store.state.project.pageNum
    }
  },
  methods: {
    onPullingDown() {
      console.log('下拉')
      // this.$store.commit('project/setFreeList', img)
      setTimeout(async () => {
        pageNum = 2
        const params = {
          typeId: 'gonggao ',
          page: 1,
          item: 10
        }
        let { data } = await homeDynamic(this.$axios, params)
        console.log(data.content.dataRows)

        this.freeList = []
        this.freeList = data.content.dataRows
        this.invalidList = []
        this.invalidList = [1, 2]
        this.content = []
        this.content = this.freeList.concat(this.invalidList)
        console.log(this.freeList)
        console.log(this.invalidList)
        // this.$refs.contentScroll0.forceUpdate()
        // this.$store.commit('project/setFreeList', img)
        // this.freeList.unshift(img[1])
        // this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
      }, 1000)
      // this.$refs.contentScroll0.forceUpdate()
    },
    onPullingUp() {
      // this.$store.commit('project/setPage', 1)
      pageNum++
      console.log(pageNum)
      console.log(this.pages)
      const params = {
        item: 10,
        page: pageNum
      }
      // // 更新数据
      setTimeout(async () => {
        let list = []
        let invalLists = []
        if (pageNum <= this.pages) {
          // 如果有新数据
          let { data } = await homeDynamic(this.$axios, params)
          let rs = data.content.dataRows
          for (let i = 0; i < rs.length; i++) {
            if (rs[i].rate != 100) {
              list.push(rs[i])
            } else {
              invalLists.push(rs[i])
            }
          }
          this.freeList = this.freeList.concat(list)
          this.invalidList = this.invalidList.concat(invalLists)
          this.content = this.freeList.concat(this.invalidList)
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
