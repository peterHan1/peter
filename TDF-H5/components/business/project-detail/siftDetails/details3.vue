<template>
  <cube-scroll
    ref="contentScroll0"
    :data="data"
    :options="options"
    @scroll="onScroll"
    @pulling-up="onPullingUp"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div
      class="free_record">
      <ul class="borrow_record">
        <li
          v-for="(item,index) in data"
          :key="index">
          <div>{{ item.mobile }}</div>
          <div>
            <p>{{ item.joinMoney }}</p>
            <p>{{ item.addTimeFormat }}</p>
          </div>
        </li>
      </ul>
    </div>
  </cube-scroll>
</template>
<script>
import { mapState } from 'vuex'
import { joinList } from '~/api/project'
// console.log(this.pageNum)
// let pageNum =
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            // more: '加载中',
            noMore: '没有更多数据了'
          }
        }
        // pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  computed: {
    // data() {
    //   return this.$store.state.project.joinList
    // },
    // pages() {
    //   return this.$store.state.project.joinListPages
    // }
    ...mapState({
      data: state => state.project.joinList,
      pages: state => state.project.joinListPages,
      pageNum: state => state.project.joinListPageNum
    })
  },
  mounted() {
    console.log('=====')
    console.log(this.data)
  },
  methods: {
    onScroll(pos) {
      if (pos.y > 20) {
        this.pullTxt = '松手，返回标的信息'
        this.pullY = pos.y
      } else {
        this.pullTxt = '下拉释放，返回标的信息'
        this.pullY = pos.y
      }
    },
    onPullingDown() {
      setTimeout(() => {
        this.$emit('downFn')
      }, 100)
    },
    onPullingUp() {
      this.$store.commit('project/changePageNum')
      console.log(this.pageNum + 'xxxxxxx')
      console.log(this.pages)
      // console.log('\\\\\\\\\\\\')
      // // 更新数据
      if (this.pageNum == 0) {
        this.$refs.contentScroll0.refresh()
      }
      setTimeout(async () => {
        if (this.pageNum < this.pages) {
          // 如果有新数据
          const { content } = await joinList(this.$axios, {
            desId: encodeURIComponent(this.$route.params.id),
            page: this.pageNum,
            item: 10
          })
          if (content != undefined) {
            this.$store.commit('project/joinList', content)
          }
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
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.free_record
  background-color: $color-white
  .borrow_record
    margin-bottom: 30px
    li
      overflow: hidden
      margin: 0 .3rem
      border-bottom: 1px solid $color-gray7
      font-size: $fontsize-medium
      &:last-child
        border-bottom: none
      div:nth-child(1)
        float: left
        height: 1.37rem
        line-height: 1.37rem
      div:nth-child(2)
        float: right
      div p:nth-child(1)
        font-size: $fontsize-medium
        color: $color-gray1
        margin-top: 0.3rem
        line-height: 0.4rem
        text-align: right
      div p:nth-child(2)
        font-size: $fontsize-small-sss
        color: $color-gray3
        line-height: 0.3rem
        margin-top: 0.08rem
// /deep/ .cube-pullup-wrapper
//   display: none
/deep/ .cube-pulldown-wrapper
  display: none
</style>
