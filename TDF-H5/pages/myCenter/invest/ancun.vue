<template>
  <div class="box">
    <td-header title="安存保全" />
    <div class="ancun">
      <iframe 
        src="https://www.51cunzheng.com/searchResult?r=1365950621049499648412" 
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
    return {}
  },
  mounted() {
    console.log(this.$route.query.tenderId)
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
