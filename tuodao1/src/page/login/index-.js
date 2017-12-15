require('page/common/nav2/index.js');
require('./login.scss');
require('util/slider/index.js');

var _td = require('util/td.js');
var md5 = require('util/md5.js');
var _apiUser = require('api/user-api.js');
var _del = require('util/delButton.js');
var _hover = require('util/btnHover.js');

// 表单里的错误提示
var formError = {
	show: function(id, errMsg) {
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>' + errMsg + '</span></p>';
		if ($(id).parent().find('p').length <= 0) {
			return $(id).parent().append(el);
		}
	},
	hide: function() {
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$('p').remove();
	},
	allShow: function(errMsg) {
		$('.all-errinfo').html('<i class="iconfont">&#xe671;</i>' + errMsg);
	},
	allHide: function() {
		$('.all-errinfo').html('');
	}

};

// 登录页逻辑部分
var loginPage = {
	sliderRes: false,
	// 初始化
	init: function() {
		this.bindEvent();
		this.slider();

	},
	// 滑动模块初始化
	slider: function() {
		var _this = this;
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
				_this.sliderRes = result;
				// if(result)
				// _this.formValidate(result);
				_this.slider();
			}
		});
	},
	bindEvent: function() {
		var _this = this;
		// 获得焦点
		$('form div input').focus(function() {
			$('form div input').removeClass('focus-input');
			$(this).addClass('focus-input');
			formError.allHide();
		});
		$('form div input').blur(function() {
			$('form div input').removeClass('focus-input');
			// _this.blur();
		});
		$('form div input').hover(function() {
			$('input').removeClass('hover-input');
			$(this).addClass('hover-input');
		},function(){
			$('form div input').removeClass('hover-input');
		});

		$('form').submit(function() {
			_this.submit();
			return false;
		});

	},
	submit : function(){
		var formData = {
				mobile: $.trim($('#mobile').val()),
				loginPassword: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
				loginSource: 1
			};
			var validateResult = this.formValidate(formData);
			this.slider();
			console.log(this.sliderRes+"xxxx");
			if(validateResult.status){
				_apiUser.login(formData, function(res) {
					document.cookie='accessId='+escape(res.content.accessId);
					document.cookie='accessKey='+escape(res.content.accessKey);
					window.location.href = _td.getUrlParam('redirect') || './index.html';
				}, function(err) {
					// console.log(err);
					formError.allShow('用户名或密码输入有误！');
				});
			}else{
				formError.allShow(validateResult.msg);
			}
			return false;
	},
	// sliderValidate: function(){

	// },
	// 验证
	formValidate: function(formData) {
		// console.log(typeof formData);
		// console.log(formData);
		// console.log(this.sliderRes);
		this.slider();
		var _this = this;
		var result = {
			status : true,
			msg : ''
		};
		if(!_td.validate(formData.mobile,'mobile')){
			result.status = false;
			result.msg = '手机号输入不正确！';
			return result;
		}
		_apiUser.checkPhone(formData.mobile, function(res) {
				// console.log(res);
				if(!res.content){
					result.status = false;
					result.msg = '该手机号尚未注册拓道金服！请先<a href="register.html">注册</a>';
					return result;
				}else{
					if(!_td.validate(formData.loginPassword,'require')){
						result.status = false;
						result.msg = '请输入密码！';
						return result;
					}
					if(!_this.sliderRes){
						result.status = false;
						result.msg = '请按住滑块，拖到最右边';
						return result;
					}
				}
			},function(err){
				result.status = false;
				result.msg = '手机号输入不正确！';
				return result;
			});
		return result;
	}

};


$(function() {
	loginPage.init();
});