$(function(){
	// input框交互效果
	verify();
	function verify() {
			$("input").on("focus", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
					return false;
				}
				$("input").removeClass("border-color");
				$(this).addClass("border-color");
			});
			$("input").on("blur", function() {
				$(this).removeClass("border-color");
			});
			$("input").on("mouseover", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
					return false;
				}
				$(this).css("border-color", "#707070");
			});
			$("input").on("mouseleave", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
					return false;
				}
				$(this).css("border-color", "#DDDDDD");
			});
		}
	// 电话判断
	var status;
	$("#phoneNum").on("keyup",function(){
			$(this).css("border-color","#ff7400");
			$("#phoneNum_del").show();
			var flag=true;
			var phone=$(this).val();
			if(phone.length==11){
				if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
					$(".til").show();
					$(".til_wz").text("手机号必须由11位数字组成");
					$(this).addClass("red");
					status=false;
				}else{
					if(flag==true){
						$(".til").hide();
						$(this).removeClass("red");
						status=true;
					}else{
						$(".til").show();
						$(".til_wz").text("该手机号尚未注册拓道金服，请先注册");
						status=false;
					}
				}
			}
			check();
	});
	$("#phoneNum").on("blur",function(){
		$(".til").hide();
		setTimeout(function(){
			$("#phoneNum_del").hide();
		},200);
		var flag=true;
			var phone=$(this).val();
				if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
					$(".til").show();
					$(this).addClass("red");
					$(".til_wz").text("手机号必须由11位数字组成");
					status=false;
				}else{
					if(flag==true){
						$(".til").hide();
						$(this).removeClass("red");
						status=true;
					}else{
						$(".til").show();
						$(".til_wz").text("该手机号尚未注册拓道金服，请先注册");
						status=false;
					}
				}
	});
	$("#phoneNum").on("focus",function(){
		if($(this).val()==""){
			return false;
		}
		$("#phoneNum_del").show();
	});
	$("#phoneNum_del").on("click",function(){
		$("#phoneNum").val("");
		$("#phoneNum").css("border-color","#dddddd");
		$(this).hide();
		$(".til").hide();
	});
	// 密码框效果
	$("#password").on("keyup",function(){
		if($(this).val()==""){
			$("#password_del").hide();
		}else{
			$("#password_del").show();
		}
	});
	var pas;
	$("#password").on("blur",function(){
		setTimeout(function(){
			$("#password_del").hide();
		},200);
		var data="123";
		$(this).css("border-color","#dddddd");
		$(this).on("focus",function(){
			$(this).css("border-color","#ff7400");
		});
		if($(this).val()!==data){
			$(".psd_til").show();
			$(this).addClass("red");
			pas=false;
		}else{
			$(".psd_til").hide();
			$(this).removeClass("red");
			pas=true;
		}
		check();
	});
	$("#password").on("focus",function(){
		if($(this).val()!=""){
			$("#password_del").show();
		}else{
			$("#password_del").hide();
		}
	});
	$("#password_del").on("click",function(){
		$("#password").val("");
		$("#password").css("border-color","#dddddd");
		$(this).hide();
	});
	// 引用滑动验证
	var result;
	$("#slider2").slider({
		width: 358,
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
			result=result;
			if (result == true && pas==true && status==true) {
					$(".login_btn").addClass("kd");
				}else{
					$(".login_btn").removeClass("kd");
			}
		}
	});
	function check(){
		console.log("密码"+pas);
		console.log("手机"+status);
		console.log("结果"+result);
		if (pas==true && status==true) {
				$(".login_btn").addClass("kd");
			}else{
				$(".login_btn").removeClass("kd");
		}
	}
	function stop(){
			$("input").addClass("jz");
			$("#phoneNum").attr("disabled","disabled");
			$("#phoneNum").css("background-color","#fffbf7");
			$("#password").attr("disabled","disabled");
			$("#password").css("background-color","#fffbf7");
	}
});