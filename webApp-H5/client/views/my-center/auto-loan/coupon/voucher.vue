<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="voucher" @selectFn="voucherSelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      voucher: {}
    }
  },
  mounted () {
    let vm = this
    vm.voucher = {
      status: vm.typeTxt,
      list: [{label: '优先使用即将过去的抵用券', value: 'A'}, {label: '优先使用金额较大的抵用券', value: 'B'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.voucher.status)
    },
    voucherSelectFn (data) {
      let txt = {
        'name': 'voucher',
        'val': data
      }
      this.$emit('autoTypeFn', txt)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .layerPop
    padding: 20px 0
</style>
