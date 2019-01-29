<template>
  <div class="myInvest">
    <td-header title="债权明细"/>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="titleTxt">
        <span>{{ name }}</span>
        <b v-if="status === 1">额度已满</b>
        <b v-else>加入中</b>
      </div>
      <ul>
        <li 
          v-for="(item,index) in list" 
          :key="index">
          <p>
            <span>{{ item.productName }}</span>
            <span>{{ item.statusName }}</span>
          </p>
          <p>
            <span>加入金额:<b>{{ item.tenderMoney }}</b>元</span>
            <span>加入时间:{{ item.addTime }}</span>
          </p>
          <div>
            <router-link to="" >查看协议</router-link>
            <router-link to="" >查看项目</router-link>
          </div>
        </li>
        <li>
          <p>
            <span>宝马X6抵押续贷标</span>
            <span>募集中</span>
          </p>
          <p>
            <span>加入金额:<b>50000.00</b>元</span>
            <span>加入时间:2018-12-22</span>
          </p>
          <div>
            <router-link to="" >查看协议</router-link>
            <router-link to="" >查看项目</router-link>
          </div>
        </li>
        <li>
          <p>
            <span>宝马X6抵押续贷标</span>
            <span>已还款</span>
          </p>
          <p>
            <span>加入金额:<b>50000.00</b>元</span>
            <span>加入时间:2018-12-22</span>
          </p>
          <div>
            <router-link to="" >查看协议</router-link>
            <router-link to="" >查看项目</router-link>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import { joinTenderList } from '~/plugins/api.js'

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
      status: '',
      list: '',
      name: '',
      tenderId: '',
      item: 12,
      page: 1
    }
  },
  mounted() {
    this.tenderId = this.$route.query.tenderId
    this.name = this.$route.query.name
    this.status = this.$route.query.status
    const params = {
      tenderId: this.tenderId,
      item: this.item,
      page: this.page
    }
    joinTenderList(this.$axios, params).then(res => {
      console.log(res)
    })
  },
  methods: {
    onPullingDown() {
      console.log(1111111)
      // this.page = 1
      // setTimeout(async () => {
      //   let params = { item: this.item, page: this.page }
      //   let { data } = await getAccountLogById(this.$axios, params)
      //   this.$store.commit('myCenter/setMoneyNull')
      //   let list = data.content.dataRows
      //   for (let i = 0; i < list.length; i++) {
      //     this.$store.commit('myCenter/setMonetList', list[i])
      //   }
      //   this.$refs.contentScroll.forceUpdate()
      // }, 1000)
    },
    onPullingUp() {
      console.log(2222222222)
      // this.page++
      // let params = { item: this.item, page: this.page }
      // setTimeout(() => {
      //   this.$store.dispatch('myCenter/getMoneyRecord', params)
      //   this.$refs.contentScroll.forceUpdate()
      // }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.myInvest
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 88px
  .titleTxt
    line-height: 90px
    font-size: $fontsize-large-xx
    overflow: hidden
    padding: 0 30px
    span
      color: $color-gray1
      float: left
    b
      color: $color-gray3
      float: right
  li
    background-color: $color-white
    margin-bottom: 20px
    padding: 0 30px
    p
      overflow: hidden
      span:nth-child(2)
        float: right
    p:nth-child(1)
      font-size: $fontsize-medium
      color: $color-gray1
      line-height: 40px
      padding: 30px 0 16px
    p:nth-child(2)
      line-height: 33px
      padding-bottom: 27px
      span
        font-size: $fontsize-small-ss
        color: $color-gray2
        b
          color: $color-primary
          font-size: $fontsize-large-xx
    div
      height: 80px
      border-top: 1px solid #E8E8E8
      display: flex
      align-items: center
      a
        flex: 1
        color: $color-primary
        font-size: $fontsize-small-ss
      a:nth-child(2)
        text-align: right
</style>
