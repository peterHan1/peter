安装项目依赖
npm install

回款日历：
	在需要“回款日历”页面的js中引入date_time.js，在js的time_list和time_day两个函数中拼接字符串（参考return_money.html）;

日历插件：
	在需要“日历”页面的js中引入laydate.js和laydate.scss，在当前页面中写点击事件调用（参考return_money.html）；

分页插件：
	分页插件引入相应的js，css文件之后，调用方法;
	$(".zxf_pagediv").createPage({
		pageNum: 10,//总页数
		current: 1,//当前页
		shownum: 5,//每页显示条数
		backfun: function(e) {
			console.log(e.current);//回调函数
		}
	});

滑动插件：
	滑动插件引入相应的js,css文件之后，调用方法;
	$("#slider2").slider({
	width: 340,// 宽
	height: 40,// 高
	sliderBg: "#BCBCBC",滑块背景颜色
	color: "#ffffff",//文字颜色
	fontSize: 14,
	bgColor: "#FFCC99",//背景颜色
	textMsg: "请按住滑块，拖到最右边 >>",//提示文字
	successMsg: "验证通过",//验证成功提示文字
	successColor: "#FF6600",//滑块验证成功提示文字颜色
	time: 400,//返回时间
	callback: function(result) {
		console.log(result);//回调函数
	}
});

验证码插件：
	security文件夹下面为验证码插件，引入相应的文件之后，需拷贝对应的html结构。调用函数传两个参数。具体用法参考注册页面，重置密码页面。
	_yzm.check("demo", "border");

input框交互样式插件
	yz.js为input框交互样式插件，加载相应文件之后，调用函数传入参数“input”
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");

input框错误提示插件
	regular.js为input框错误提示插件。加载相应文件之后，不同验证调用不同方法，调用方法依次传入input框类名和样式类名，需要回调函数的可加入回调函数。
	 _regular.checkPhoneOnkey({
	 	elm:"phoneNum",
	 	cls:"wrong_mess",
		callback: function(result) {
			res=result;
		}
	 });
其中，验证密码正确性调用方法为，其余的与上面相同。
_regular.checkPassword("password","wrong_mess_r");

上，右，下三个位置类名写在layout.scss里面，具体位置注释有写，传入类名即可。