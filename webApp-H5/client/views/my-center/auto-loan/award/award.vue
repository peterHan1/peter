<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="award" @selectFn="awardSelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      award: {}
    }
  },
  mounted () {
    let vm = this
    vm.award = {
      status: vm.typeTxt,
      list: [{label: '全部', value: 'A'}, {label: '奖励', value: 'B'}, {label: '不奖励', value: 'C'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.award.status)
    },
    awardSelectFn (data) {
      let txt = {
        'name': 'award',
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
