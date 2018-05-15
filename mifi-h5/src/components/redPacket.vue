<template>
  <div class="packet">
    <div class="shade"></div>
    <div class="packetBg"></div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped lang="less">
  .packet{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    .shade{
      background: #000;
      opacity: 0.3;
      z-index: 98;
      width: 100%;
      height: 100%;
    }
    .packetBg{
      width: 90%;
      height: 60%;
      position: fixed;
      background: url(../assets/img/packet_bg.png) no-repeat;
      background-size: 100% 100%;
      top: 60%;
      left: 50%;
      z-index: 10;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>

