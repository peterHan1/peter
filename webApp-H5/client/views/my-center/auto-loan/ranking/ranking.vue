<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="ranking" @selectFn="radioSelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      ranking: {}
    }
  },
  mounted () {
    let vm = this
    vm.ranking = {
      status: vm.typeTxt,
      list: [{label: '不保留', value: 'A'}, {label: '保留', value: 'B'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.ranking.status)
    },
    radioSelectFn (data) {
      let txt = {
        'name': 'ranking',
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
