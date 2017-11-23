<template>
	<div class="oper">
		<div class="oper_tab">
			<div class="oper_date" v-on:click="clickFn">
				<span class="date_year">{{showYear}}</span>
				<i class="iconfont">&#xe6a3;</i>
			</div>
			<div class="oper_year" v-show="isShows">
				<ul>
					<li v-for="year in years"  @click="selectedYear(year)" :class="{li_on: activeName == year}">
						<span>{{year}}</span>
						<i class="iconfont">&#xe6a3;</i>
					</li>
				</ul>
			</div>
		</div>
		<div class="dasahe" v-show="isShows"></div>
		<div class="oper_list">
			<ul>
				<li v-for="oper in operLista">
					<a href="http://g.eqxiu.com/s/vdR4rZpZ">
						<img src="../../../image/inform/m_10.png">
					</a>
				</li>
				<li>
					<a href="/info_law">
						<img src="../../../image/inform/sanji_2017.png">
					</a>
				</li>
				<li>
					<a href="">
						<img src="../../../image/inform/m_8.png">
					</a>
				</li>
				<li>
					<a href="">
						<img src="../../../image/inform/m_7.png">
					</a>
				</li>
				<li>
					<a href="">
						<img src="../../../image/inform/erji_2017.png">
					</a>
					</li>
				<li>
					<a href="">
						<img src="../../../image/inform/yiji_2017.png">
					</a>
				</li>
			</ul>
		</div>	
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				isShows: false,
				showYear: '2017年',
				years: ['2017年', '2016年'],
				activeName: '2017年',
				operLista: [
					{
						ull: '',
						src: require('../../../image/inform/m_10.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/sanji_2017.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/m_8.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/m_7.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/erji_2017.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/yiji_2017.png')
					}
				],
				operListb: [
					{
						ull: '',
						src: require('../../../image/inform/siji_2016.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/sanji_2016.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/erji_2016.png')
					},
					{
						ull: '',
						src: require('../../../image/inform/yiji_2016.png')
					}
				]
			}
		},
		methods: {
			clickFn: function () {
				if (this.isShows === true) {
					this.isShows = false
				} else {
					this.isShows = true
				}
			},
			selectedYear: function(gameName) {
				this.activeName = gameName
				this.showYear = gameName
				if (this.isShows === true) {
					this.isShows = false
				} else {
					this.isShows = true
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.oper
		max-width:414px
		margin:0 auto
		position: relative
		overflow:hidden
		i
			font-style:normal
		.oper_date
			width: 100%
			height:0.6rem
			position: absolute
			padding: 0 0.3rem
			line-height: 0.6rem
			font-size: 0.26rem
			color: #212a36
			overflow: hidden
			z-index: 99
			background-color:#f2f3f7
			box-sizing: border-box
			span
				float:left
			i
				float:right
		.oper_year
			width: 100%
			top:0.6rem
			padding: 0 0.3rem
			position: absolute
			background-color: $color-background-f
			box-sizing: border-box
			z-index: 99
			li
				width: 100%
				height: 0.8rem
				line-height: 0.8rem
				font-size:0.24rem
				color:#212a36
				span
					float:left
				i
					float:right
			.li_on
				color:#FF7400
		.oper_list
			padding: 0 0.3rem
			overflow: hidden
			padding-bottom: 0.4rem
			background-color:$color-background-f
			margin-top:0.6rem
			a
				display: block
				margin-top: 0.4rem
			img
				width: 6.9rem
				height: 2.5rem
		.dasahe
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			background-color: #000
			opacity: 0.5
			z-index: 9
</style>