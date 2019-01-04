<v-count @Index="Index"></v-count>
出借标的详情页的收益计算器组件
@Index="Index"输出滑动刻度的下标，在父组件声明该方法，参数value即是刻度下标
Index (value) {
	this.showIndex = value
}
