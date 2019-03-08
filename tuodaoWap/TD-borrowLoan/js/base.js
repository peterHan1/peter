re_size();
window.onresize = re_size;
function re_size(){
	var deviceWidth = document.documentElement.clientWidth;
	if(deviceWidth > 414) deviceWidth = 414;
	document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}

