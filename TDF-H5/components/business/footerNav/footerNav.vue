<template>
  <div class="footerNav">
    <router-link
      :class="{'on': navClass == 'td'}"
      to="/" >
      <i
        class="iconfont">
        <b v-if="navClass === 'td'" >&#xe6d2;</b>
        <b v-else>&#xe6d6;</b>
      </i>
      <p>首页</p>
    </router-link>
    <router-link
      :class="{'on': navClass == 'project'}"
      to="/project">
      <i
        class="iconfont">
        <b v-if="navClass === 'project'" >&#xe6d4;</b>
        <b v-else>&#xe6d8;</b>
      </i>
      <p>项目</p>
    </router-link>
    <router-link
      :class="{'on': navClass == 'myCenter'}"
      to="/myCenter/center">
      <i
        class="iconfont">
        <b v-if="navClass === 'myCenter'" >&#xe6d3;</b>
        <b v-else>&#xe6d7;</b>
      </i>
      <p>我的</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'td-footer',
  props: {
    navClass: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.footerNav
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background-color: $color-white
  height: 93px
  border-top: 1px solid $color-gray7
  display: flex
  z-index: 9
  padding-top: 10px
  align-items: center
  a
    flex: 1
    text-align: center
    i
      font-size: $fontsize-large-xxxxxxx
      color: $color-gray8
      line-height: 40px
    p
      font-size: $fontsize-small-ssss
      color: $color-gray8
  .on
    i,p
      color: $color-primary
</style>
