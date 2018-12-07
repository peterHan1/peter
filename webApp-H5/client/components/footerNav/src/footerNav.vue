<template>
	<div class="footerNav">
		<router-link to="/index" :class="{'on': navClass == 'index'}">
      <div class="indexIcon"></div>
			<div>首页</div>
		</router-link>
		<router-link to="/">
			<div class="projectIcon"></div>
      <div>项目</div>
		</router-link>
		<router-link to="/">
			<div class="findIcon"></div>
      <div>发现</div>
		</router-link>
		<router-link to="/myCenter" :class="{'on': navClass == 'myCenter'}">
			<div class="myCenterIcon"></div>
      <div>我的</div>
		</router-link>
	</div>
</template>
<script>
export default {
  name: 'FooterNav',
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
    height: 92px
    width: 100%
    border-top: 1px solid #E0E0E0
    position: fixed
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    z-index: 98
    display: flex
    box-sizing: border-box
    a
      flex: 1
      color: #626262
      text-align: center
      box-sizing: border-box
      div:nth-child(1)
        margin: 5px auto 0
        height: 52px
        width: 52px
      div:nth-child(2)
        font-size: 20px
      div.indexIcon
        background: url(../../../assets/images/index/indexBg.png) no-repeat
        background-size: 100% 100%
      div.projectIcon
        background: url(../../../assets/images/index/projectBg.png) no-repeat
        background-size: 100% 100%
      div.findIcon
        background: url(../../../assets/images/index/findBg.png) no-repeat
        background-size: 100% 100%
      div.myCenterIcon
        background: url(../../../assets/images/index/myCenterBg.png) no-repeat
        background-size: 100% 100%
    .on
      color: #ff711c
      div.indexIcon
        background: url(../../../assets/images/index/on_indexBg.png) no-repeat
        background-size: 100% 100%
      div.projectIcon
        background: url(../../../assets/images/index/on_projectBg.png) no-repeat
        background-size: 100% 100%
      div.findIcon
        background: url(../../../assets/images/index/on_findBg.png) no-repeat
        background-size: 100% 100%
      div.myCenterIcon
        background: url(../../../assets/images/index/on_myCenterBg.png) no-repeat
        background-size: 100% 100%
</style>
