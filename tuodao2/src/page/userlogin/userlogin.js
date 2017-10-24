var _inp                = require('util/yz.js');
var _regular            = require('util/regular.js');
$(function(){
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	// 引用滑动验证
	var results;
	var res;
	$("#slider2").slider({
		width: 342,
		height: 40,
		sliderBg: "#f2f2f2",
		color: "#9e9e9e",
		fontSize: 14,
		bgColor: "#58bd0d",
		textMsg: "请按住滑块，拖到最右边",
		successMsg: "验证通过",
		successColor: "#fff",
		time: 400,
		callback: function(result) {
			results=result;
			checkform();
		}
	});
	// 电话判断
	 _regular.checkPhoneOnkey({
	 	elm:"phoneNum",
	 	cls:"wrong_mess",
		callback: function(result) {
			res=result;
		}
	 });
	 _regular.checkPhoneOnBlur({
	 	elm:"phoneNum",
	 	cls:"wrong_mess",
		callback: function(result) {
			res=result;
		}
	 });
	$("#phoneNum").on("keyup",function(){
		checkform();
	});
	$("#phoneNum").on("blur",function(){
		checkform();
	});
	// 密码框效果
	$("#password").on("keyup",function(){
		checkform();
	});
	function checkform(){
		var password=$("#password").val();
		if (password!="" && res==true && results==true) {
				$(".login_btn").addClass("kd");
				$(".login_btn").on("mouseover",function(){
					$(this).addClass('color');
				});
				$(".login_btn").on("mouseleave",function(){
					$(this).removeClass('color');
				});
			}else{
				$(".login_btn").removeClass("kd");
				$(".login_btn").on("mouseover",function(){
					$(this).removeClass('color');
				});
		}
	}
	// 点击登录
	$(".login_btn").on("click",function(){
		if($(this).hasClass("kd")){
			_regular.checkPassword("password","wrong_mess_r");
		}else{
			return false;
		}
	});
	// 错号清空
	del(".phoneNum",".login_btn");
	del(".password",".login_btn");
	function del(name,el){
		$(name).on("focus",function(){
			if($(name).val()==""){
				$(this).siblings(".del").hide();
			}else{
				$(this).siblings(".del").show();
			}
		});
		$(name).on("blur",function(){
			setTimeout(function(){
				$(name).siblings(".del").hide();
			},300);
		});
		$(name).on("keyup",function(){
			if($(this).val()==""){
				$(this).siblings(".del").hide();
			}else{
				$(this).siblings(".del").show();
			}
		});
		$(".del").on("click", function() {
			$(this).siblings(name).val("");
			$(el).removeClass("kd");
			$(el).on("mouseover", function() {
				$(this).removeClass('color');
			});
		});
	}
	function stop(){
			$("input").addClass("jz");
			$("#phoneNum").attr("disabled","disabled");
			$("#phoneNum").css("background-color","#fffbf7");
			$("#password").attr("disabled","disabled");
			$("#password").css("background-color","#fffbf7");
	}
});