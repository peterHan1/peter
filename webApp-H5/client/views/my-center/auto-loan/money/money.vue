<template>
  <Layer @shade-close="shadeClose()">
    <div class="layerPop">
      <radio :options="scatte" @selectFn="moneySelectFn"></radio>
    </div>
  </Layer>
</template>
<script>
export default {
  props: ['typeTxt'],
  data () {
    return {
      scatte: {}
    }
  },
  mounted () {
    let vm = this
    vm.scatte = {
      status: vm.typeTxt,
      list: [{label: '打散', value: 'A'}, {label: '不打散', value: 'B'}]
    }
  },
  methods: {
    shadeClose () {
      this.$emit('autoTypeFn', this.scatte.status)
    },
    moneySelectFn (data) {
      let txt = {
        'name': 'money',
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
