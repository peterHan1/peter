var _regular = {
	// keyup的时候 验证手机号码格式以及唯一性
	checkPhoneOnkey: function(data) {
		var _this = this;
		this.callback = {
			callback: function() {}
		};
		$("." + data.elm).on("keyup", function() {
			// 可以余额
			var in_money = data.balance;
			// 可投金额
			var bal_money = data.invest;
			var inp = $(this);
			var val = $(this).val();
			var apen = $(this).parent();
			_this.import_money(inp,apen,val,in_money,bal_money);
			data.callback(inp);
			console.log(val);
		});
	},
	// blur的时候 验证手机号码格式以及唯一性
	checkPhoneOnBlur: function(data) {
		this.callback = {
			callback: function() {}
		};
	},
	// 判断输入金额
	import_money : function(inp,apen,money,in_money,bal_money){
		if(money != "" && money != 0 && money < 100   && bal_money < 500){
			this.input_mess(inp,true,apen,"不得低于起投金额100元！");
			return false;
		}else if(money != "" && money != 0  && money < 500 && bal_money >= 500){
			this.input_mess(inp,true,apen,"不得低于起投金额500元！");
			return false;
		}else if(money != "" && money != 0  && money > bal_money){
			this.input_mess(inp,true,apen,"您输入的金额大于当前剩余可投金额！");
			return false;
		}else if(money != "" && money != 0  && money > in_money){
			this.input_mess(inp,true,apen,"余额不足");
			return false;
		}else if(money != "" && money != 0  && money > 500000){
			this.input_mess(inp,true,apen,"单笔限额为500,000元！");
			return false;
		}else{
			this.input_mess(inp,false,apen,"");
		}
	},
	// input状态错误提示
	input_mess : function(inp,boole,apen,str){
		var txts = '<span class="in_span"><i class="iconfont">&#xe671;</i>'+ str +'</span>';
		if(boole == true){
			if($(".in_span").length<=0){
				console.log('haha');
				apen.addClass('bor_col');
				apen.append(txts);
				inp.css("color","red");
			}else{
				$(".in_span").remove();
				apen.append(txts);
				console.log('xixi');
			}
		}else if(boole == false){
			apen.removeClass("bor_col");
			$(".in_span").remove();
			inp.css("color","#333");

		}
	}
};
module.exports = _regular;