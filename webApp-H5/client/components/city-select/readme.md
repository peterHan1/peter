<city-select @cityValue="getCityValue" :city-show="cityShow" @on-close="cityShow = false"></city-select>
点击确定按钮时获取选中的城市名
getCityValue(value) {
	this.city = value
}
cityShow：控制城市选择组件的显示隐藏

暂时还缺少滑动时的惯性效果