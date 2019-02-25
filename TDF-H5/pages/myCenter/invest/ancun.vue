<template>
  <div class="box">
    <td-header title="安存保全" />
    <div class="ancun">
      <iframe 
        :src="ancunurl" 
        height="100%"
        width="100%"
        frameborder="0" 
        scrolling="auto"/>
    </div>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      ancunurl: this.$route.query.ancunUrl
    }
  }
}
</script>
<style lang="stylus" scoped>
.box
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 0
  padding-top: 88px
  .ancun
    position:absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
</style>
