<template>
  <div class="recode">
    <td-header title="充值记录"/>
    <div 
      v-if="list.length > 0" 
      class="recodeTop">
      <span>充值金额(元)/时间</span>
      <span>状态</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="list.length > 0">
        <li 
          v-for="(item,index) in list" 
          :key="index">
          <div>
            <p>{{ item.money }}</p>
            <p>{{ item.bank }} {{ item.bankCard }}</p>
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
          statusTxt="暂无充值记录"/>
      </div>
    </cube-scroll>
    
  </div>
</template>

<script>
import { rechargeRecord } from '~/plugins/api.js'

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
      page: 1,
      item: 12,
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        page: this.page,
        item: this.item
      }
      rechargeRecord(this.$axios, params).then(res => {
        let list = res.data.content.dataRows
        for (let i in list) {
          this.list.push(list[i])
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.list = []
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
    font-size: $fontsize-medium
    color: $color-gray2
    background-color: $color-background
    display: flex
    span
      flex: 1
    span:nth-child(2)
      text-align: right
  ul
    background-color: $color-white
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
