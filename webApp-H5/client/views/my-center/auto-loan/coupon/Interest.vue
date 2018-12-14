<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="interest" @selectFn="interestSelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      interest: {}
    }
  },
  mounted () {
    let vm = this
    vm.interest = {
      status: vm.typeTxt,
      list: [{label: '优先使用即将过去的加息券', value: 'A'}, {label: '优先使用年化大的加息券', value: 'B'}, {label: '手动选择加息券', value: 'C'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.interest.status)
    },
    interestSelectFn (data) {
      let txt = {
        'name': 'interest',
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
