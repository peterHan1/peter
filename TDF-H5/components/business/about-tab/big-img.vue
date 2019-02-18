<template>
  <div 
    class="bigImgBox">
    <cube-slide 
      ref="slide" 
      :data="items" 
      :auto-play="false">
      <cube-slide-item 
        v-for="(item, index) in items" 
        :key="index" 
        @click.native="clickHandler()">
        <img :src="item.image">
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
import imgActive1 from '~/assets/images/inform/certificate/certificate01.jpg'
import imgActive2 from '~/assets/images/inform/certificate/certificate02.jpg'
import imgActive3 from '~/assets/images/inform/certificate/certificate03.jpg'
import imgActive4 from '~/assets/images/inform/certificate/certificate04.jpg'
import imgActive5 from '~/assets/images/inform/certificate/certificate05.jpg'
import imgActive6 from '~/assets/images/inform/certificate/certificate06.jpg'
import imgActive7 from '~/assets/images/inform/certificate/certificate07.jpg'
import imgActive8 from '~/assets/images/inform/certificate/certificate08.jpg'
import imgActive9 from '~/assets/images/inform/certificate/certificate09.jpg'
export default {
  data() {
    return {
      items: [
        {
          image: imgActive1
        },
        {
          image: imgActive2
        },
        {
          image: imgActive3
        },
        {
          image: imgActive4
        },
        {
          image: imgActive5
        },
        {
          image: imgActive6
        },
        {
          image: imgActive7
        },
        {
          image: imgActive8
        },
        {
          image: imgActive9
        }
      ]
    }
  },
  methods: {
    clickHandler() {
      this.$emit('imgMin')
    }
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.bigImgBox
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999999
  img
    height: 100%
    width: 100%
</style>
