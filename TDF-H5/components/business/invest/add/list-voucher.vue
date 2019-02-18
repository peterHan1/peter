<template>
  <div
    v-if="voucherArr.length > 0"
    class="list">
    <ul>
      <li 
        v-for="(item,index) in voucherArr" 
        :key="index" 
        @click="selectFn(index)">
        <div>
          <p> <b>{{ item.value }}</b> 元</p>
          <p>{{ item.time }}</p>
        </div>
        <span 
          v-if="voucherIndex == index" 
          class="iconfont on">&#xe6f8;</span>
        <span 
          v-else 
          class="iconfont">&#xe6f9;</span>
      </li>
    </ul>
  </div>
  <div 
    v-else 
    class="data-status">
    <data-status
      status="null"
      statusTxt="暂无抵用券"/>
  </div>
</template>

<script>
import { commenParams } from '~/api/config.js'
import { investCoupon } from '~/api/home.js'
export default {
  props: {
    disId: {
      type: String,
      default: ''
    },
    disType: {
      type: String,
      default: ''
    },
    money: {
      type: String,
      default: ''
    },
    period: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      voucherIndex: null,
      voucherArr: [],
      intereNumber: null,
      voucherId: null
    }
  },
  computed: {
    parmas() {
      return {
        money: this.money,
        // money: '100000',
        type: 'pt',
        period: this.period
      }
    },
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  mounted() {
    if (this.isLogin) {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      investCoupon(this.$axios).then(res => {
        console.log(res)
        let arrData = []
        for (let i = 0; i < res.content.dataRows.length; i++) {
          if (res.content.dataRows[i].type === 'dk') {
            arrData.push(res.content.dataRows[i])
          }
        }
        this.voucherArr = arrData.map(o => {
          return {
            value: o.amount,
            txt: o.amount + '元抵用券',
            time: o.invalidDate,
            voucherId: o.voucherId,
            id: ''
          }
        })
        for (let i = 0; i < this.voucherArr.length; i++) {
          this.voucherArr[i].id = String(i + 1)
        }
        let vm = this
        if (vm.disType === 'Voucher') {
          const index = vm.voucherArr.findIndex(
            voucher => voucher.id === vm.disId
          )
          vm.voucherIndex = index
          vm.intereNumber = vm.voucherArr[index].value
          vm.voucherId = vm.voucherArr[index].voucherId
          vm.id = vm.voucherArr[index].id
        }
      })
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    selectFn(i) {
      let vm = this
      vm.intereNumber = vm.voucherArr[i].value
      vm.voucherId = vm.voucherArr[i].voucherId
      vm.id = vm.voucherArr[i].id
      vm.voucherIndex = i
      vm.$emit('listFn', vm.intereNumber, vm.id, vm.voucherId, 'dk')
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.list
  position: absolute
  top: 166px
  left: 0
  right: 0
  bottom: 0
  overflow: auto
  ul
    padding: 10px 30px 30px
    li
      border-bottom: 1px solid $color-gray5
      padding: 28px 0
      display: flex
      align-items: center
      div
        display: inline-block
        font-size: $fontsize-small-ss
        color: $color-gray3
        flex: 1
        text-align: left
        p:nth-child(1)
          color: $color-gray1
          padding-bottom: 10px
          b
            font-size: $fontsize-large-xxxxxx
            line-height: 58px
      span
        display: inline-block
        color: $color-gray3
        flex: 1
        text-align: right
        font-size: $fontsize-large-xxxxxxx
      .on
        color: $color-primary
    li:last-child
      border: none
.data-status
  margin-top 200px
</style>
