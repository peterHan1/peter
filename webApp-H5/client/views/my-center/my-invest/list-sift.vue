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
  <div :is="tabCom"></div>
</div>  
</template>

<script>
  import SiftOn from './list-sift-on.vue'
  import SiftYet from './list-sift-yet.vue'

  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        tabCom: 'SiftOn'
      }
    },
    mounted () {
    },
    methods: {
      tabFn (txt) {
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
  background-color: #fff
  span
    flex: 1
    text-align: center
    font-size: 32px
    color: #999
    line-height: 88px
    b
      display: inline-block
      position: relative
  .on
    color: #FF7102
    b:after
      content: ''
      display: block
      width: 60px
      height: 6px
      background-color: #FF7102
      position: absolute
      bottom: 0
      left: 50%
      transform: translateX(-50%)
      border-radius: 10px
</style>
