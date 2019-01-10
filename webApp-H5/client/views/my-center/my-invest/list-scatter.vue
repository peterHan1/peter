<template>
<div>
  <div class="listTab">
    <span :class="tabCom === 'ScatterOn'?'on':''" >
      <b @click="tabFn('ScatterOn')">出借中</b>
    </span>
    <span :class="tabCom === 'ScatterYet'?'on':''" >
      <b @click="tabFn('ScatterYet')">已回款</b>
    </span>
  </div>
  <div :is="tabCom"></div>
</div>  
</template>

<script>
  import ScatterOn from './list-scatter-on.vue'
  import ScatterYet from './list-scatter-yet.vue'

  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        tabCom: 'ScatterOn'
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
      ScatterOn,
      ScatterYet
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
