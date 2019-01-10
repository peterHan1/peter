<template>
  <div>
    <div class="listTab">
      <span :class="tabCom === 'SiftOn'?'on':''" >
        <b @click="tabFn('SiftOn')">加入中</b>
      </span>
      <span :class="tabCom === 'SiftYet'?'on':''" >
        <b @click="tabFn('SiftYet')">已满额</b>
      </span>
    </div>
    <div :is="tabCom"/>
  </div>  
</template>

<script>
import SiftOn from './list-sift-on.vue'
import SiftYet from './list-sift-yet.vue'

export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      tabCom: 'SiftOn'
    }
  },
  mounted() {},
  methods: {
    tabFn(txt) {
      this.tabCom = txt
    }
  },
  components: {
    SiftOn,
    SiftYet
  }
}
</script>

<style lang="stylus" scoped>
.listTab
  display: flex
  background-color: $color-white
  span
    flex: 1
    text-align: center
    font-size: $fontsize-large-xx
    color: $color-gray3
    line-height: 88px
    b
      display: inline-block
      position: relative
  .on
    color: $color-primary 
    b:after
      content: ''
      display: block
      width: 60px
      height: 6px
      background-color: $color-primary 
      position: absolute
      bottom: 0
      left: 50%
      transform: translateX(-50%)
      border-radius: 10px
</style>
