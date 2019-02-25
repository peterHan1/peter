<template>
  <div class="audit">
    <div class="bigImgBox">
      <td-header title="审计报告"/>
      <div class="title">{{ showIndex+1 }}&nbsp;/&nbsp;{{ maxIndex }}</div>
      <cube-slide 
        ref="slide" 
        :data="items"
        :auto-play="false"
        class="slide"
        @change="changes">
        <cube-slide-item 
          v-for="(item, index) in items"
          :key="index"
          class="slide">
          <img :src="item.image">
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      showIndex: 0,
      maxIndex: 0
    }
  },
  methods: {
    changes(index) {
      this.showIndex = index
    }
  },
  mounted() {
    this.maxIndex = this.items.length
  }
}
</script>
<style lang="stylus" scoped>
  .bigImgBox
    background-color:#000
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 999999
    padding:168px 0 80px
    .title
      width: 100%
      height: 80px
      line-height: 80px
      color: #fff
      font-size: $fontsize-large-x
      text-align: center
      background-color: transparent
      position: absolute
      left: 0
      top:88px
    .slide
      height: 100%
      width: 100%
      white-space: nowrap
      position relative
    img
      position: absolute
      display: block
      height: auto
      width: 100%
      vertical-align: middle
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      max-height: 100%
      max-width: 100%
</style>
