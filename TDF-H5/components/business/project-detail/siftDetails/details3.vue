<template>
  <cube-scroll
    v-if="items.length>0"
    ref="joinScroll"
    :scrollEvents="['scroll']"
    :options="options"
    :data="items"
    @scroll="onScroll"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <p class="topTxt">{{ pullTxt }}</p>
    <div class="scatter_item">
      <ul
        id="borrow_record"
        class="borrow_record">
        <li
          v-for="(item,index) in items"
          :key="index">
          <div>{{ item.mobile }}</div>
          <div>
            <p>{{ item.amountFormat }}</p>
            <p>{{ item.addTimeFormat }}</p>
          </div>
        </li>
      </ul>
    </div>
  </cube-scroll>

  <data-status
    v-else
    status="null"
    statusTxt="暂无内容"/>

</template>
<script>
import { mapState } from 'vuex'
import { joinList } from '~/api/project'
let pageNum = 1
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: 'fsddfs'
        },
        // pullUpLoad: true
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载中',
            noMore: '没有更多数据了'
          }
        }
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  computed: {
    // items() {
    //   return this.$store.state.project.joinList
    // },
    ...mapState({
      items: state => state.project.joinList,
      pages: state => state.project.joinListPages
      // pageNum: state => state.project.joinListPageNum
    })
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
      pageNum = 1
      // setTimeout(() => {
      //   this.$emit('downFn')
      // }, 100)
    },
    onPullingUp() {
      pageNum++
      console.log(this.pages)
      console.log(`当前：${pageNum}`)
      console.log('\\\\\\\\\\\\')
      // yccVXW3ncug%3D
      // console.log(encodeURIComponent(this.$route.params.id))
      // // 更新数据
      setTimeout(async () => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          const { content } = await joinList(this.$axios, {
            desId: encodeURIComponent(this.$route.params.id),
            page: pageNum,
            item: 10
          })
          this.$store.commit('project/joinList', content)
        } else {
          // 如果没有新数据
          this.$refs.joinScroll.forceUpdate()
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
.scatter_item
  width: 100%
  background-color: $color-white
  .info_details
    width: 100%
    border-bottom: 20px solid $color-background
    padding: 24px 0 15px
    p
      line-height: 37px
      font-size: $fontsize-small-s
      padding: 0 30px
      margin-bottom: 12px
      display: flex
    span
      flex: 1
      i
        margin-right: 47px
        color: $color-gray3
      b
        color: $color-gray1
  .borrow_record
    margin-bottom: 100px
    border-bottom: 20px solid $color-background
    li
      margin: 0 30px
      height: 137px
      border-bottom: 1px solid $color-gray7
      font-size: $fontsize-medium
      color: $color-gray1
      display: flex
      justify-content: space-between
      align-items: center
      &:last-child
        border:none
      div:nth-child(2)
        text-align: right
      p
        line-height: 40px
      p:nth-child(2)
        font-size: $fontsize-small-sss
        color: $color-gray3
      span
        display: inline-block
        vertical-align: middle
        width: 60px
        height: 30px
        zoom: 0.5
// /deep/ .cube-pullup-wrapper
//   display: none
/deep/ .cube-pulldown-wrapper
  display: none
</style>
