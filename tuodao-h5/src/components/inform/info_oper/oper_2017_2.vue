<template>
	<div class="oper">
		<div class="oper_title"></div>
		<div class="abo">
			<span class="abo_bg"></span>
		</div>
		<div class="trend">
			<span class="trend_bg"></span>
		</div>
		<div class="datas">
			<span class="datas_bg"></span>
		</div>
		<div class="invest">
			<span class="invest_bg"></span>
		</div>
		<div class="deadline">
			<span class="deadline_bg"></span>
		</div>
		<div class="statistics">
			<span class="statistics_bg"></span>
		</div>
		<div class="ranking">
			<span class="ranking_people"></span>
			<span class="ranking_city"></span>
		</div>
		<div class="invest_way">
			<span class="way_bg"></span>
		</div>
		<div class="ratio">
			<span class="ratio_bg"></span>
		</div>
		<div class="constellation">
			<span class="cons_bg"></span>
		</div>
		<div class="welfare">
			<span class="welfare_title"></span>
			<span class="w_1"></span>
			<span class="w_2"></span>
			<span class="w_3"></span>
			<span class="w_4"></span>
			<span class="w_5"></span>
			<span class="w_6"></span>
			<span class="w_7"></span>
		</div>
		<div class="incident">
			<span class="incident_bg"></span>
		</div>
		<div class="footer">
			<span class="footer_bg"></span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.oper
		max-width:414px
		margin:0 auto
		overflow:hidden
		background-color: #2257bf
		div 
			width: 100%
			background-color: #1d4fb1
			border-bottom: 4px solid #2758b9
			text-align: center
			span
				display: inline-block
				margin-top: 0.85rem
		.oper_title
			height: 3.7rem
			background: url(../../../image/oper/oper_2017_2/img1.png) no-repeat
			background-size: 100% 100%
			border: none
		.abo
			height: 4.73rem
			.abo_bg
				width: 6.5rem
				height: 2.98rem
				background: url(../../../image/oper/oper_2017_2/img2.png) no-repeat
				background-size: 100% 100%
		.trend
			height: 5.55rem
			.trend_bg
				width: 6.86rem
				height: 3.75rem
				background: url(../../../image/oper/oper_2017_2/img3.png) no-repeat
				background-size: 100% 100%
		.datas
			height: 7.03rem
			.datas_bg
				width: 6.62rem
				height: 5.36rem
				background: url(../../../image/oper/oper_2017_2/img4.png) no-repeat
				background-size: 100% 100%
		.invest
			height: 4.96rem
			.invest_bg
				width: 6.49rem
				height: 3.32rem
				background: url(../../../image/oper/oper_2017_2/img5.png) no-repeat
				background-size: 100% 100%
		.deadline
			height: 5.53rem
			.deadline_bg
				width: 6.69rem
				height: 3.89rem
				background: url(../../../image/oper/oper_2017_2/img6.png) no-repeat
				background-size: 100% 100%
		.statistics
			height: 8.23rem
			.statistics_bg
				width: 6.12rem
				height: 6.57rem
				background: url(../../../image/oper/oper_2017_2/img7.png) no-repeat
				background-size: 100% 100%
		.ranking
			height: 11.9rem
			.ranking_people
				width: 6.5rem
				height: 5.31rem
				margin-top: 0.82rem
				background: url(../../../image/oper/oper_2017_2/img8.png) no-repeat
				background-size: 100% 100%
			.ranking_city
				width: 6.49rem
				height: 4.22rem
				margin-top: 0.55rem
				background: url(../../../image/oper/oper_2017_2/img9.png) no-repeat
				background-size: 100% 100%
		.invest_way
			height: 4.96rem
			.way_bg
				width: 6.47rem
				height: 3.35rem
				margin-top: 0.8rem
				background: url(../../../image/oper/oper_2017_2/img10.png) no-repeat
				background-size: 100% 100%
		.ratio
			height: 8.79rem
			.ratio_bg
				width: 6.59rem
				height: 7.15rem
				background: url(../../../image/oper/oper_2017_2/img11.png) no-repeat
				background-size: 100% 100%
		.constellation
			height: 7.2rem
			.cons_bg
				width: 4.41rem
				height: 5.57rem
				margin-top: 0.8rem
				background: url(../../../image/oper/oper_2017_2/img12.png) no-repeat
				background-size: 100% 100%
		.welfare
			height: 25.18rem
			width: 78%
			padding: 0 11%
			overflow: hidden
		.welfare 
			span
				margin-top: 0.3rem
				float: left
			.welfare_title
				width: 2.55rem
				height: 0.52rem
				margin: 0.83rem 27% 0 28%
				background: url(../../../image/oper/oper_2017_2/w_title.png) no-repeat
				background-size: 100% 100%
			.w_1
				width: 5.79rem
				height: 2.95rem
				margin-top: 0.6rem
				background: url(../../../image/oper/oper_2017_2/w_1.png) no-repeat
				background-size: 100% 100%
			.w_2
				width: 5.78rem
				height: 2.95rem
				background: url(../../../image/oper/oper_2017_2/w_2.png) no-repeat
				background-size: 100% 100%
			.w_3
				width: 5.78rem
				height: 2.95rem
				background: url(../../../image/oper/oper_2017_2/w_3.png) no-repeat
				background-size: 100% 100%
			.w_4
				width: 5.78rem
				height: 2.95rem
				background: url(../../../image/oper/oper_2017_2/w_4.png) no-repeat
				background-size: 100% 100%
			.w_5
				width: 5.78rem
				height: 2.94rem
				background: url(../../../image/oper/oper_2017_2/w_5.png) no-repeat
				background-size: 100% 100%
			.w_6
				width: 5.78rem
				height: 2.94rem
				background: url(../../../image/oper/oper_2017_2/w_6.png) no-repeat
				background-size: 100% 100%
			.w_7
				width: 5.78rem
				height: 2.94rem
				background: url(../../../image/oper/oper_2017_2/w_7.png) no-repeat
				background-size: 100% 100%
		.incident
			height: 7.81rem
			border: none
			.incident_bg
				width: 6.49rem
				height: 6.18rem
				margin-top: 0.82rem
				background: url(../../../image/oper/oper_2017_2/img13.png) no-repeat
				background-size: 100% 100%
		.footer
			height: 4.55rem
			background-color: #2257bf
			.footer_bg
				width: 4.13rem
				height: 2.54rem
				margin-top: 0.82rem
				background: url(../../../image/oper/oper_2017_2/footer.png) no-repeat
				background-size: 100% 100%
</style>