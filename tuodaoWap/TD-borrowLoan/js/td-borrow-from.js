$(function(){
		// 提交申请
		$(document).on("click",".sub_bth",function(){
			//错误信息提示
			layer.msg('请正确填写信息')
			//重复提交申请
			layer.open({
			  	type: 1,
				title:false,
			  	closeBtn:0,
				skin:"borrowYet",
				content:$(".borrowYet").html(),
			})
		})
		var city_picker = new mui.PopPicker({layer:2});
		city_picker.setData(init_city_picker);
		$("#city").on("click", function(){
			setTimeout(function(){
				city_picker.show(function(items){
					$(".city").html((items[0] || {}).text + " " + (items[1] || {}).text + " ");
					$(".citys").val((items[0] || {}).text + " " + (items[1] || {}).text + " ");
					inp_val();
				});
			},200);
		});
		var countTime = 60;
		var timer = '';
		$(".getCode").on("click",function(){
			if(countTime != 60){
				return false;
			}
			clearInterval(timer);
			if($(".imgCode_inp").val() === ''){
				layer.msg('请输入图片验证码')
			}else{
				timer = setInterval(() => {
	              countTime--;
	              if (countTime <= 0) {
	              	$(".getCode").html('获取').removeClass("countDown");
	                countTime = 60;
	                clearInterval(timer);
	              }else{
	              	$(".getCode").html(countTime+'s').addClass("countDown");
	              };
	            }, 1000);
			}

		});
		$(document).on("click",".closeFn",function(){
			layer.closeAll();
		})
		$('.idCode_inp').blur(function(){
			if(!idCodeFn($(this).val())){
				layer.msg('请正确填写信息')
			}
		});
		$('.phone_inp').blur(function(){
			if(!phoneFn($(this).val())){
				layer.msg('请正确填写信息')
			}
		});
		$('input').keyup(function() {  
		    inp_val();
		}); 
		function inp_val(){
			var name = $(".name_inp").val();
			var idCode = $(".idCode_inp").val();
			var phone = $(".phone_inp").val();
			var imgCode = $(".imgCode_inp").val();
			var phoneCode = $(".phoneCode_inp").val();
			var city = $(".citys").val();
			console.log(city)
			if(name != "" && phoneFn(phone) && idCodeFn(idCode) && imgCode != "" && phoneCode != "" && city){
				$(".btn").addClass("sub_bth");
			}else{
				$(".btn").removeClass("sub_bth");
			}
		};
		function phoneFn(phone){
			// 手机号验证
			var phoneReg = /^1[345678]\d{9}$/;
			if(!phoneReg.test(phone)) {
				return false;
			}else{
				return true;
			}
		}
		function idCodeFn(id){
			// 身份证验证
			var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			if(!idcardReg.test(id)) {
				return false;
			}else{
				return true;
			}
		}
	})