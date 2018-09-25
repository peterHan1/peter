<template>
  <div id="app">
    <Dialog></Dialog>
    <!-- <Banner></Banner> -->
    <!-- <div id="cover"></div>
    <Header></Header>
    <Demo></Demo>
    <Footer></Footer>
    <Floating></Floating> -->
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Floating from './layout/floating.vue'
import Demo from './views/demo/demo.vue'
import Banner from './components/banner/banner.vue'
import Dialog from './components/layer/dialog.vue'

export default {
  components: {
    Header,
    Footer,
    Demo,
    Floating,
    Banner,
    Dialog
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


