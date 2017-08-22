require('./jquery.slider.scss');
require('./jquery.slider.min.js');
$("#slider2").slider({
	width: 340,
	height: 40,
	sliderBg: "#BCBCBC",
	color: "#ffffff",
	fontSize: 14,
	bgColor: "#FFCC99",
	textMsg: "请按住滑块，拖到最右边 >>",
	successMsg: "验证通过",
	successColor: "#FF6600",
	time: 400,
	callback: function(result) {
		console.log(result);
	}
});