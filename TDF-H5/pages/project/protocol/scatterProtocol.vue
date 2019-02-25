<template>
  <div class="protocalBox">
    <td-header title="借款协议"/>
    <p class="site">合同签订地：杭州市西湖区</p>
    <Scatter/>
  </div> 
</template>
<script>
import Scatter from '~/components/business/protocol/src/scatter'

export default {
  data() {
    return {}
  },
  components: {
    Scatter
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: $color-white
  padding-top: 88px
  .site
    font-size: $fontsize-small-ss
    color: $color-gray2
    line-height: 50px
    padding: 0 30px
</style>
