<time-select @dateValue="getDateValue" :date-show="dateShow" @on-close="dateShow = false"></time-select>
点击确定按钮时获取选中的时间
getDateValue(value) {
	this.time = value
}
dateShow：控制城市选择组件的显示隐藏

暂时还缺少滑动时的惯性效果