<template>
  <div class="list">
    <ul>
      <li 
        v-for="(item,index) in voucherArr" 
        :key="index" 
        @click="selectFn(index)">
        <div>
          <p> <b>{{ item.value }}</b> 元</p>
          <p>有效期：{{ item.time }}</p>
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
</template>

<script>
export default {
  props: {
    disId: {
      type: String,
      default: ''
    },
    disType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      voucherIndex: null,
      voucherArr: [
        {
          value: '100',
          txt: '100元抵用券',
          time: '2016.6.6-2016.6.12',
          id: '1'
        },
        {
          value: '200',
          txt: '200元抵用券',
          time: '2016.6.6-2016.6.12',
          id: '2'
        },
        {
          value: '300',
          txt: '300元抵用券',
          time: '2016.6.6-2016.6.12',
          id: '3'
        },
        {
          value: '400',
          txt: '400元抵用券',
          time: '2016.6.6-2016.6.12',
          id: '4'
        },
        {
          value: '500',
          txt: '500元抵用券',
          time: '2016.6.6-2016.6.12',
          id: '5'
        }
      ],
      voucherTxt: null,
      voucherId: null
    }
  },
  mounted() {
    let vm = this
    if (vm.disType === 'Voucher') {
      const index = vm.voucherArr.findIndex(voucher => voucher.id === vm.disId)
      vm.voucherIndex = index
      vm.voucherTxt = vm.voucherArr[index].txt
      vm.voucherId = vm.voucherArr[index].id
    }
  },
  methods: {
    selectFn(i) {
      let vm = this
      vm.voucherTxt = vm.voucherArr[i].txt
      vm.voucherId = vm.voucherArr[i].id
      vm.voucherIndex = i
      vm.$emit('listFn', vm.voucherTxt, vm.voucherId, 'Voucher')
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
</style>
