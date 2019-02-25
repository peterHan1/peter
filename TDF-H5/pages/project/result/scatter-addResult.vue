<template>
  <div class="investResult">
    <td-header
      :returnUrl="false" 
      :url="projectDetialUrl"
      title="出借结果" />
    <result
      v-if="status===0"
      status="ok"
      resultTxt="出借成功！"/>
    <result
      v-else-if="status===2"
      status="no"
      resultTxt="出借失败！"/>
    <result
      v-else
      status="load"
      resultTxt="出借处理中！"/>
    <div v-if="status===0">
      <div class="btnDiv success">
        <button @click="goBack">继续出借</button>
        <button @click="record">查看出借记录</button>
      </div>
      <div class="content">
        <ul>
          <li class="title">{{ scatterName }}</li>
          <li>加入金额<span>{{ money }}元</span></li>
          <li>参考收益<span>{{ income }}元</span></li>
          <li v-if="type === 'jx'">已使用加息券<span>{{ interest }}%</span></li>
          <li v-if="type === 'dk'">已使用抵用券<span>{{ voucherAmount }}元</span></li>
        </ul>
      </div>
    </div>
    <div v-else-if="status === 2">
      <div class="btnDiv other">
        <button @click="goDetails">返回</button>
      </div>
    </div>
    <div v-else>
      <div class="btnDiv other">
        <button @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { investScatterResult } from '~/api/project.js'
export default {
  data() {
    return {
      status: null,
      type: '',
      desId: '',
      scatterName: null,
      money: null,
      voucherAmount: null,
      interest: null,
      income: null,
      projectDetialUrl: '/project'
    }
  },
  mounted() {
    investScatterResult(this.$axios, this.$route.query.orderNo).then(res => {
      console.log(res)
      this.status = res.content.status
      this.type = res.content.voucherType
      this.desId = res.content.desId
      this.scatterName = res.content.borrowName
      this.money = res.content.account
      this.interest = res.content.interest
      this.voucherAmount = res.content.voucherAmount
      this.income = res.content.accountInterest
      if (this.status == 2) {
        this.projectDetialUrl = `/project/scatter-details/${this.desId}`
      } else {
        this.projectDetialUrl = '/project?name=散标区'
      }
    })
  },
  methods: {
    record() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({ name: 'myCenter-invest-myInvest' })
    },
    goBack() {
      this.$router.push({
        name: 'project',
        query: { name: '散标区' }
      })
    },
    goDetails() {
      this.$router.push({
        path: `/project/scatter-details/${this.desId}`
      })
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.investResult
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  padding-top 233px
  background $color-white
  .btnDiv
    text-align center
    overflow hidden
    width 100%
    padding 60px 0 120px
    button
      width 440px
      height 74px
      font-size $fontsize-large-x
      line-height 74px
      border-radius 37px
      border-1px($color-primary, 37px)
      color #FF7102
      text-align center
      background $color-white
  .success
    button
      width 260px
      &:first-child
          background linear-gradient(140deg,rgba(252,141,38,1) 0%,rgba(248,123,60,1) 100%)
          color $color-white
          margin-right 40px
          border: none
  .content
    border-top 20px solid $color-background
    ul li
      font-size $fontsize-small-ss
      padding 0 30px 0 37px
      width 100%
      overflow hidden
      color $color-gray2
      height 80px
      line-height 80px
      border-bottom 1px solid $color-background
      &:first-child
        font-size $fontsize-medium
        color $color-gray1
      span
        float right
        color $color-gray1
</style>
