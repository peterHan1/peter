$(function(){
	//认证
	$(".ca_affirm").on("click",function(){
		 layer.open({
				type: 1, 
				title:"",
				skin:'uc_error',
				content:'<div class="error_top"><P></P><p>正在获取CA认证</p></div>',
				scrollbar: false,
				closeBtn: 0,
				area: ['5.4rem', 'auto']
			}); 
	})
	var name = $(".inp_name").val();
	var fsz = $(".inp_fsz").val();
	var phone =  $(".inp_phone").val();
//	编辑
	$(".compile").on('click',function(){
		$(".top_tilte").html("修改基本信息");
 		$(".add_cont_bot,.re_list,.compile").hide();
 		$(".name_sub,.cancel,.name_btn").show();
 		$(".inp_name,.inp_phone").removeAttr('readOnly');
 		$(".inp_sfz").css("color","#999");
 	});
 	
 	
 	$(".inp_name,.inp_phone").on('keyup',function(){
 		var names = $(".inp_name").val();
 		var phones = $(".inp_phone").val();
		if((names != name && names != "") || (phones != phone && phones != "" && phones.length == 11)){
			$(".name_btn input").addClass("name_sub")
		}else{
			$(".name_btn input").removeClass("name_sub")			
		}
		
	});

//	编辑姓名提交
	$(document).on("click",".name_sub",function(){
		console.log(666)
	});
	//更换银行卡提交
	$(document).on("click",".bank_sub",function(){
		
	});
	
	$(".cancel").on('click',function(){
		$(".top_tilte").html("借款人信息");
		$(".inp_name").val(name);
		$(".inp_phone").val(phone);
 		$(".add_cont_bot,.add_cont_top,.re_list,.compile,.ul_top").show();
 		$(".name_sub,.bank_btn,.cancel,.bank_ul,.name_btn").hide();
 		$(".inp_name,.inp_phone").attr("readOnly", true); 			
 		$(".name_sub").removeClass("basic_sub");
 		$(".inp_sfz").css("color","#333");
 		$(".bank_ul input").val("");
 	});
 	//更换银行
 	$(".ch_bank").on("click",function(){
 		$(".top_tilte").html("更换银行卡");
 		$(".add_cont_top,.re_list,.ul_top").hide();
 		$(".bank_btn,.cancel,.bank_ul").show();
 	});
// 	选择银行
	$(".bank_name").on("click",function(){
		$('.select_bank').load('../../src/bank/select_bank.html');
		$(".borrowers").css("marginLeft","-100%");	
	})
//	点击返回左滑
	$(document).on('click','.bank_return',function(){
		$(".borrowers").css("marginLeft","0");	
		
	});
//	选择后左滑
	$(document).on("click","#bank_ul li",function(){
		var bank_name = $(this).attr('name');
		var bankName = $(this).find('h4').html();
		$(this).addClass("bank_on");
		$(".bank_name").val(bankName);
		$(".borrowers").css("marginLeft","0");	
		isval();
	});

	$('.bank_ul li').bind('input propertychange', function() {
		
		isval()
	});
//	内容不为空 提交按钮颜色更换
	function isval(){
		console.log(666)
		var name = $(".bank_name").val();
		var province = $(".province").val();
		var city = $(".city").val();
		var bank_code = $(".bank_code").val();
		var subbranch = $(".subbranch").val();
		if(name != "" && province != "" && city != "" && bank_code != "" && subbranch != "" ){
			$(".bank_btn input").addClass("bank_sub");
		}else{
			$(".bank_btn input").removeClass("bank_sub");
			
		}
	};
 
})