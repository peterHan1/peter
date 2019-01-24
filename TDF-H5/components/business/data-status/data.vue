<template>
  <div class="statusBox">
    <div 
      v-if="status === 'null'" 
      class="dataNull">
      <div class="statusIcon"/>
      <div class="statusTxt">{{ statusTxt }}</div>
    </div>
    <div 
      v-if="status === 'error'" 
      class="error-loading">
      <div class="statusIcon"/>
      <div class="statusTxt">{{ statusTxt }}</div>
    </div>
    <div 
      v-if="status === 'maintain'" 
      class="maintain">
      <div class="statusIcon"/>
      <div class="statusTxt">{{ statusTxt }}</div>
    </div>
    <div 
      v-if="status === 'network'" 
      class="noNetwork">
      <div class="statusIcon"/>
      <div class="statusTxt">{{ statusTxt }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-status',
  props: {
    status: {
      type: String,
      default: ''
    },
    statusTxt: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.statusBox
  text-align: center
  .statusIcon
    display: inline-block
    width: 320px
    height: 320px
  .statusTxt
    font-size: $fontsize-medium
    color: $color-gray2
    line-height: 40px
  .dataNull
    .statusIcon
      background: url(../../../assets/images/data-status/data-null.png) no-repeat
      background-size: 100% 100%
  .error-loading
    .statusIcon
      background: url(../../../assets/images/data-status/error-loading.png) no-repeat
      background-size: 100% 100%
  .maintain
    .statusIcon
      background: url(../../../assets/images/data-status/maintain.png) no-repeat
      background-size: 100% 100%
  .noNetwork
    .statusIcon
      background: url(../../../assets/images/data-status/no-network.png) no-repeat
      background-size: 100% 100%
</style>
