<template>
  <div class="recode">
    <td-header title="提现记录"/>
    <div class="recodeTop">
      <span>提现金额(元)/类型</span>
      <span>状态/时间</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="content.length">
        <li 
          v-for="(item,index) in content" 
          :key="index">
          <div>
            <p>{{ item.total }} <b v-if="item.fee">(含{{ item.fee }}元手续费)</b> </p>
            <p v-if="item.withdrawType === 'URGENT'">快速到账</p>
            <p v-else-if="item.withdrawType === 'NORMAL'">普通到账</p>
          </div>
          <div>
            <p>{{ item.status }}</p>
            <p>{{ item.addtime }}</p>
          </div>
        </li>
      </ul>
      <div 
        v-else 
        class="data-status">
        <data-status
          status="null"
          statusTxt="暂无提现记录"/>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { getCashById } from '~/plugins/api.js'

export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      },
      content: [],
      page: 1,
      item: 12
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        item: this.item
      }
      getCashById(this.$axios, params).then(res => {
        let list = res.data.content.dataRows
        for (let i in list) {
          this.content.push(list[i])
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.content = []
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      this.page++
      setTimeout(() => {
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.recode
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 188px
  .recodeTop
    position: absolute
    top: 88px
    left: 0
    right: 0
    line-height: 100px
    padding: 0 30px 
    font-size: 28px
    color: $color-gray2
    background-color: $color-background
    display: flex
    align-items: center
    span
      flex: 1
    span:nth-child(2)
      text-align: right
  ul
    background-color: #fff
    li
      height: 140px
      padding: 0 30px
      border-bottom:1px solid $color-gray5
      display: flex
      align-items: center
      div
        flex: 1
        text-align: left
        p:nth-child(1)
          font-size: $fontsize-large-xxx
          color: $color-gray1
          b
            font-size: $fontsize-small-ss
        p:nth-child(2)
          font-size: $fontsize-medium
          color: $color-gray3
          line-height: 40px
          margin-top: 10px
      div:nth-child(2)
        text-align: right
        p:nth-child(1)
          font-size: $fontsize-large-x
    li:last-child
      border: none
  .data-status
    position: fixed
    left: 0
    right: 0
    top: 40%
    transform: translateY(-50%)  
</style>
