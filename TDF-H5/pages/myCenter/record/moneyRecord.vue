<template>
  <div class="recode">
    <td-header title="资金记录"/>
    <div class="recodeTop">
      <span>类型/时间</span>
      <span>金额(元)/状态</span>
    </div>
    <cube-scroll
      v-if="this.$store.state.myCenter.moneyList.length > 0"
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul>
        <li 
          v-for="(item,index) in this.$store.state.myCenter.moneyList" 
          :key="index">
          <p>
            <span>{{ item.type }}</span>
            <span>{{ item.money }}</span>
          </p>
          <p>
            <span>{{ item.addtime }}</span>
            <span>成功</span>
          </p>
        </li>
      </ul>
    </cube-scroll>
    <div 
      v-else
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无资金记录"/>
    </div>
  </div>
</template>

<script>
import { getAccountLogById } from '~/plugins/api.js'

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
    const params = { item: this.item, page: this.page }
    this.$store.dispatch('myCenter/getMoneyRecord', params)
  },
  methods: {
    onPullingDown() {
      this.page = 1
      setTimeout(async () => {
        let params = { item: this.item, page: this.page }
        let { data } = await getAccountLogById(this.$axios, params)
        this.$store.commit('myCenter/setMoneyNull')
        let list = data.content.dataRows
        for (let i = 0; i < list.length; i++) {
          this.$store.commit('myCenter/setMonetList', list[i])
        }
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      this.page++
      let params = { item: this.item, page: this.page }
      setTimeout(() => {
        this.$store.dispatch('myCenter/getMoneyRecord', params)
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
    padding: 0 30px 
    line-height: 88px
    background-color: $color-white
    font-size: $fontsize-large-x
    color: $color-gray2
    display: flex
    justify-content: space-between
  ul
    margin-top: 20px
    padding: 0 30px
    background-color: $color-white
    li
      border-bottom:1px solid $color-gray5
      p
        display: flex
        justify-content: space-between
      p:nth-child(1)
        line-height: 40px
        color: $color-gray1
        font-size: $fontsize-medium
        padding-top: 20px
        span:nth-child(2)
          color: $color-primary
      p:nth-child(2)
        font-size: $fontsize-small-ss
        line-height: 33px
        color: $color-gray2
        padding: 10px 0 20px
    li:last-child
      border: none
  .data-status
    position: fixed
    left: 0
    right: 0
    top: 40%
    transform: translateY(-50%)    
</style>
