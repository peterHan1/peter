<template>
  <div class="protocalBox">
    <Header :navLeftTxt="'icon'">网络借贷禁止说明</Header>
    <Ban></Ban>
  </div> 
</template>
<script>
import Ban from './ban.vue'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    Ban
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: #fff
  padding: 88px 0 30px
</style>

