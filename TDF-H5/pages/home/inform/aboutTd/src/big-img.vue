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
export default {
  data() {
    return {
      items: [
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
        },
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
        },
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
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
