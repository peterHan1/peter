<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="repay" @selectFn="repaySelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      repay: {}
    }
  },
  mounted () {
    let vm = this
    vm.repay = {
      status: vm.typeTxt,
      list: [{label: '全部', value: 'A'}, {label: '先息后本', value: 'B'}, {label: '等额本息', value: 'C'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.repay.status)
    },
    repaySelectFn (data) {
      let txt = {
        'name': 'repay',
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
