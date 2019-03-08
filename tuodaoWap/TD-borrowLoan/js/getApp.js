$(function(){
	//判断页面是否在app中打开,去除title TDJF暂定字符串
	if (navigator.userAgent.indexOf("TDJF") != -1) {
		$(".tilte").hide();
		$(".banner").removeClass("isApp"); 
		$(".borrowBox").removeClass("borrowBoxApp"); 
		$(".borrowFrom").removeClass("isApp");
	}
})	
