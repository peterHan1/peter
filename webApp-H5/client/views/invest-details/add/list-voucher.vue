<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in voucherArr" :key="index" @click="selectFn(index)">
        <div>
          <p> <b>{{item.value}}</b> 元</p>
          <p>有效期：{{item.time}}</p>
        </div>
        <span class="iconfont on" v-if="voucherIndex == index">&#xe6c4;</span>
        <span class="iconfont" v-else>&#xe6c3;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['disId', 'disType'],
  data () {
    return {
      voucherIndex: null,
      voucherArr: [
        {
          'value': '100',
          'txt': '100元抵用券',
          'time': '2016.6.6-2016.6.12',
          'id': '1'
        },
        {
          'value': '200',
          'txt': '200元抵用券',
          'time': '2016.6.6-2016.6.12',
          'id': '2'
        },
        {
          'value': '300',
          'txt': '300元抵用券',
          'time': '2016.6.6-2016.6.12',
          'id': '3'
        },
        {
          'value': '400',
          'txt': '400元抵用券',
          'time': '2016.6.6-2016.6.12',
          'id': '4'
        },
        {
          'value': '500',
          'txt': '500元抵用券',
          'time': '2016.6.6-2016.6.12',
          'id': '5'
        }
      ],
      voucherTxt: null,
      voucherId: null
    }
  },
  mounted () {
    let vm = this
    if (vm.disType === 'Voucher') {
      const index = vm.voucherArr.findIndex(voucher => voucher.id === vm.disId)
      vm.voucherIndex = index
      vm.voucherTxt = vm.voucherArr[index].txt
      vm.voucherId = vm.voucherArr[index].id
    }
  },
  methods: {
    selectFn (i) {
      let vm = this
      vm.voucherTxt = vm.voucherArr[i].txt
      vm.voucherId = vm.voucherArr[i].id
      vm.voucherIndex = i
      vm.$emit('listFn', vm.voucherTxt, vm.voucherId, 'Voucher')
    }
  },
  components: {
  }
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
      border-bottom: 1px solid #e8e8e8
      padding: 28px 0
      display: flex
      align-items: center
      div
        display: inline-block
        font-size: 24px
        color: #999
        flex: 1
        text-align: left
        p:nth-child(1)
          color: #333
          padding-bottom: 5px
          b
            font-size: 48px
      span
        display: inline-block
        color: #999
        flex: 1
        text-align: right
      .on
        color: #F97C3C
    li:last-child
      border: none
</style>
