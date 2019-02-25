<template>
  <div class="deposit">
    <td-header 
      :returnUrl="false"
      title="激活存管账户" 
      url="/myCenter/center"/>
    <div class="txt">为保障您的资金安全，请先激活银行存管账户，激活账户绑定的银 行卡作为提现、充值唯一银行卡。</div>
    <ul>
      <li>
        <div v-if="nameVal">{{ nameVal }}</div>
        <input
          v-else
          v-model="name"
          type="text"
          placeholder="请输入真实姓名">
      </li>
      <li>
        <div v-if="fszVal">{{ fszVal }}</div>
        <input 
          v-else
          v-model="sfz" 
          type="text" 
          placeholder="请输入身份证号码">
      </li>
    </ul>
    <div 
      v-if="openDeposit != 1" 
      class="sub_btn">
      <td-button
        v-if="nameVal && fszVal"
        value="确定"
        @btnFn="sunBtn"
      />
      <td-button
        v-else
        :disabled="name != '' && sfz.length === 18 ?false:true"
        value="确定"
        @btnFn="sunBtn"
      />
    </div>
    <div 
      v-else
      class="sub_btn">
      <td-button
        :disabled="true"
        value="确定"
      />
    </div>
  </div>
</template>

<script>
import { openAccount } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store }) {
    if (app.store.state.isLogin) {
      await app.store.dispatch('myCenter/getUser')
      this.nameVal = app.store.state.myCenter.realName
      this.fszVal = app.store.state.myCenter.idCard
    }
  },
  data() {
    return {
      nameVal: this.$store.state.myCenter.realName,
      fszVal: this.$store.state.myCenter.idCard,
      name: '',
      sfz: '',
      openDeposit: this.$store.state.openDepository
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    sunBtn() {
      const params = {
        realName: this.nameVal ? this.nameVal : this.name,
        idCard: this.fszVal ? this.fszVal : this.sfz,
        returnUrl: this.$store.state.returnPath + 'xwDeposit/result'
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      if (params.realName != '' && params.idCard != '') {
        openAccount(this.$axios, params).then(res => {
          if (res.code === 100000) {
            let nonce = res.content.nonce
            this.$router.push({
              name: 'xwDeposit-transit',
              params: {
                sign: nonce
              }
            })
          } else {
            this.$Msg(res.message, 2000)
          }
        })
      }
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .deposit
    padding-top: 88px
    .txt
      font-size: $fontsize-small-ss
      color: $color-gray2
      padding: 20px 30px
      line-height: 36px
    ul
      background-color: $color-white
      li
        border-bottom: 1px solid $color-gray5
        height: 100px
        padding: 0 30px
        display: flex
        div
          flex: 1
          line-height: 100px
          color: $color-gray3
        input
          flex: 1
          height: 98px
          caret-color: $color-primary
          font-size: $fontsize-medium
          color: $color-gray1
          background-color: $color-white
      li:last-child
        border: none
    .sub_btn
      margin-top: 55px
      padding: 0 30px 
</style>
