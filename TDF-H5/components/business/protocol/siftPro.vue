<template>
  <div class="protocalBox">
    <td-header title="省心投授权委托书"/>
    <Sift/>
  </div> 
</template>
<script>
import Sift from './src/sift.vue'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {
    Sift
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: $color-white
  padding-top: 88px
</style>
