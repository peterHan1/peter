<template>
	<div class="max_width">
		<div class="inform">
			<router-link tag="div" class="a-item" v-for="info in informList" :to="{ path: info.url }">
				<img :src=info.src>
		 	</router-link>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
  export default {
  	data () {
  		return {
  			informList: [
  				{
  					url: 'info_about',
  					src: require('../../image/inform/inform1.png')
  				},
  				{
  					url: 'platfrom',
  					src: require('../../image/inform/inform2.png')
  				},
  				{
  					url: 'info_oper',
  					src: require('../../image/inform/inform3.png')
  				},
  				{
  					url: 'info_law',
  					src: require('../../image/inform/inform4.png')
  				},
  				{
  					url: 'info_risk',
  					src: require('../../image/inform/inform5.png')
  				},
  				{
  					url: 'info_safety',
  					src: require('../../image/inform/inform6.png')
  				},
  				{
  					url: 'info_knowus',
  					src: require('../../image/inform/inform7.png')
  				}
  			]
  		}
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .max_width
    max-width: 414px
    margin: 0 auto
    .inform
    	margin: 0 4%
    	padding-top:0.16rem
		.a-item
			img
				height:1.2rem
				margin-top: 0.2rem
</style>