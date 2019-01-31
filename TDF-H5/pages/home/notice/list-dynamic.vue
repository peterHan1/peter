<template>
  <cube-scroll
    ref="contentScroll0"
    :data="content"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="right">
      <router-link
        v-for="item in items2"
        :key="item"
        to=""
        class="item">
        <img src="//www.51tuodao.com/upload/data/upfiles/images/2018-09/21/106102_article_new_1537493529289.png">
        <div>
          <p class="t">{{ item.title }}</p>
          <p class="d">{{ item.time }}</p>
          <p class="c">{{ item.explain }}</p>
        </div>
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
      items2: [
        {
          title: '蝉联第一！拓道金服8月合...',
          explain: '蝉联第一！拓道金服8月合规排行再居榜首！',
          time: '2018-09-21'
        },
        {
          title: '蝉联第一！拓道金服8月合...',
          explain: '蝉联第一！拓道金服8月合规排行再居榜首！',
          time: '2018-09-21'
        },
        {
          title: '蝉联第一！拓道金服8月合...',
          explain: '蝉联第一！拓道金服8月合规排行再居榜首！',
          time: '2018-09-21'
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
          typeId: 'media',
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
</style>
