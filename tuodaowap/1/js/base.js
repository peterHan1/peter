re_size();
window.onresize = re_size;
// document.write('<script>window.onresize = re_size;</script>')
function re_size(){
	var deviceWidth = document.documentElement.clientWidth;
	if(deviceWidth > 414) deviceWidth = 414;
	document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}