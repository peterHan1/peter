<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="coupon" @selectFn="couponSelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      coupon: {}
    }
  },
  mounted () {
    let vm = this
    vm.coupon = {
      status: vm.typeTxt,
      list: [{label: '不使用', value: 'A'}, {label: '加息券', value: 'B'}, {label: '抵用券', value: 'C'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.coupon.status)
    },
    couponSelectFn (data) {
      let txt = {
        'name': 'coupon',
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
