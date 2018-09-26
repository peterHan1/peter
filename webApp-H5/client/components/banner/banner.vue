<template>
  <swipe :auto="4000">
    <swipe-item v-for="(item,index) in bannerImg">
     <router-link  :to="item.bannerA">
       <img :src="item.imgUrl">
     </router-link>
    </swipe-item>
  </swipe>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui'

  export default {
    props: ['bannerImg'],
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>
<style lang="stylus" >
  .mint-swipe 
    overflow: hidden;
    position: relative;
    height: 300px;
    .mint-swipe-items-wrap
      position: relative
      overflow: hidden
      height: 100%
      div
        position: absolute
        -webkit-transform: translateX(-100%)
        transform: translateX(-100%)
        width: 100%
        height: 100%
        display: none
        a
          display: block
          height: 100%
          width: 100%
          img
            display: block
            width: 100%
            height: 100% 
      div.is-active
        display: block
        -webkit-transform: none
        transform: none
  .mint-swipe-indicators
    position: absolute
    bottom: 10px
    left: 50%
    -webkit-transform: translateX(-50%)
    transform: translateX(-50%)
    .mint-swipe-indicator
      width: 8px
      height: 8px
      display: inline-block
      border-radius: 100%
      background: red
      margin: 0 3px
    .mint-swipe-indicator.is-active
      background: blue
</style>