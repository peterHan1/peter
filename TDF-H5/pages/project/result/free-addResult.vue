<template>
  <div class="investResult">
    <td-header
      :returnUrl="false"
      title="出借结果"
      url="project"/>
    <result
      v-if="status===0"
      status="ok"
      resultTxt="加入成功！"/>
    <result
      v-else-if="status===2"
      status="no"
      resultTxt="加入失败！"/>
    <result
      v-else
      status="load"
      resultTxt="加入提交成功！"/>
    <div v-if="status===0">
      <div class="btnDiv success">
        <button @click="add">继续加入</button>
        <button @click="record">查看加入记录</button>
      </div>
      <div class="content">
        <ul>
          <li class="title">{{ freeName }}</li>
          <li>加入金额<span>{{ money }}元</span></li>
          <li>参考收益<span>{{ income }}元</span></li>
          <li v-if="type">{{ type }}<span>{{ jx }}%</span></li>
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
import { investFreeResult } from '~/api/project.js'
export default {
  data() {
    return {
      status: 2,
      type: '加息券',
      desId: 'GFB9qD5X%2FAs%3D',
      freeName: '省心投0151516',
      money: null,
      jx: '',
      income: null
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  mounted() {
    if (this.isLogin) {
      investFreeResult(this.$axios, this.$route.query.orderId).then(res => {
        this.status = res.content.status
        this.type = res.content.type
        this.desId = res.content.desId
        this.freeName = res.content.borrowName
        this.money = res.content.account
        this.jx = res.content.interest
        this.income = res.content.accountInterest
      })
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    add() {
      this.$router.push({ name: 'project' })
    },
    record() {
      this.$router.push({ name: 'project' })
    },
    goBack() {
      this.$router.push({ name: 'project' })
    },
    goDetails() {
      this.$router.push({
        path: `/project/free-details/${this.desId}`
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
    overflow height
    width 100%
    padding 60px 0 120px
    button
      width 440px
      height 74px
      font-size $fontsize-large-x
      line-height 74px
      border-radius 37px
      border 1px solid rgba(255,113,2,1)
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
