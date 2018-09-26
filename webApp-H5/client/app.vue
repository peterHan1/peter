<template>
  <div id="app">
    <router-view/>
    <!-- <div id="cover"></div>
    <Header></Header>
    <Demo></Demo>
    <Footer></Footer> -->
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Demo from './views/demo/demo.vue'

export default {
  components: {
    Header,
    Footer,
    Demo
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


