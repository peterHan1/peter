<template>
  <cube-scroll
    :scrollEvents="['scroll','scroll-end']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div
      class="scatter_item">
      <ul
        id="borrow_record"
        class="borrow_record">
        <li
          v-for="(item,index) in items"
          :key="index">
          <div>{{ item.username }}</div>
          <div>
            <p>{{ item.accountTender }}</p>
            <p>{{ item.addtime }}</p>
          </div>
        </li>
      </ul>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  created() {
    console.log(this.items)
  },
  computed: {
    items() {
      return this.$store.state.project.scatterDetail.dataRows
    }
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
      // .most
      //   background: url(~/assets/images/invest/most.png) no-repeat center
      // .first
      //   background: url(~/assets/images/invest/first.png) no-repeat
      // .less
      //   background: url(~/assets/images/invest/less.png) no-repeat
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none
</style>
