$(function(){
	// 文本框效果
	$("#phoneNum").on("keyup",function(){
		if($(this).val()!=""){
			$(this).css("border-color","#ff7400");
			$("#phoneNum_del").show();
		}else{
			$(this).css("border-color","#dddddd");
		}
	});
	$("#phoneNum").on("blur",function(){
		var flag=true;
		var phone=$(this).val();
		$(this).css("border-color","#dddddd");
		$(this).on("focus",function(){
			$(this).css("border-color","#ff7400");
		});
		if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
			$(".til").show();
			$(this).addClass("red");
		}else{
			if(flag==true){
				$(".til").hide();
				$(this).removeClass("red");
				$("#password").removeAttr('readonly');
			}else{
				$(".til").text("该手机号尚未注册拓道金服，请先注册");
			}
		}
	});
	$("#phoneNum_del").on("click",function(){
		$("#phoneNum").val("");
		$("#phoneNum").css("border-color","#dddddd");
		$(this).hide();
	});
	// 密码框效果
	$("#password").on("keyup",function(){
		if($(this).val()!=""){
			$(this).css("border-color","#ff7400");
			$("#password_del").show();
		}else{
			$(this).css("border-color","#dddddd");
		}
	});

	$("#password").on("blur",function(){
		var data="123";
		$(this).css("border-color","#dddddd");
		$(this).on("focus",function(){
			$(this).css("border-color","#ff7400");
		});
		if($(this).val()!==data){
			$(".psd_til").show();
			$(this).addClass("red");
		}else{
			$(".psd_til").hide();
			$(this).removeClass("red");
		}
	});
	$("#password_del").on("click",function(){
		$("#password").val("");
		$("#password").css("border-color","#dddddd");
		$(this).hide();
	});
	// 引用滑动验证
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
			if (result == true && $(".phoneNum").val() != "" && $("#password").val()!=="") {
				$(".login_btn").addClass("kd");
			}else{
				$(".login_btn").removeClass("kd");
			}
		}
	});
});