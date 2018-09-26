<template>
	<div class="footerNav">
		<router-link to="/index" :class="{'index': navClass == 'index'}">
      <div class="iconfont"></div>
			<div>首页</div>
		</router-link>
		<router-link to="/">
			<div class="iconfont"></div>
      <div>项目</div>
		</router-link>
		<router-link to="/">
			<div class="iconfont"></div>
      <div>发现</div>
		</router-link>
		<router-link to="/">
			<div class="iconfont"></div>
      <div>我的</div>
		</router-link>
	</div>
</template>
<script>
export default {
  props: ['navClass'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .footerNav
    background-color: #fff
    height: 100px
    width: 100%
    border-top: 1px solid #cdcdcd
    position: fixed
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    z-index: 98
    display: flex
    a
      flex: 1
      color:#626262
      text-align: center
      box-sizing: border-box
      div:nth-child(1)
        height: 50px
        font-size: 20px
      div:nth-child(2)
        font-size: 30px
    .index
        color: #ff711c
</style>