<template>
  <div class="protocalBox">
    <td-header title="网络借贷禁止说明"/>
    <Ban/>
  </div> 
</template>
<script>
import Ban from './src/ban.vue'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {
    Ban
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: $color-white 
  padding: 88px 0 30px
</style>
