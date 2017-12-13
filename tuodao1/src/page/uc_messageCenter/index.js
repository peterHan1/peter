require('page/common/uc-menu/index.js');
require("./uc_messageCenter.scss");
require('util/paging/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');


var _td = require('util/td.js');
var _operate = require('api/operate-api.js');
var messages = require('./uc_message.string');
var _page = require('util/paging/index.js');

var headerData = {
		'accessId' :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	};

var messageCenter = {
	init: function() {
		this.toggle();
		this.readButton();
		this.messageList();
	},
	// 消息列表点击展开关闭
	toggle: function() {
		var index=0;
		$(document).on("click", ".message_main ul li",function() {
			index++;
			var count = $(".message_top .count i").html();
			if ($(this).find("dt").hasClass('color')) {
				count = count - 1;
				$(".message_top .count i").html(count);
			}
			if (index%2!=0) {
				$(this).find("i").html("&#xe69c;");
			} else {
				$(this).find("i").html("&#xe69a;");
			}
			$(this).find("dd").toggle();
			$(this).find("dt").removeClass("color");
			if ($(".message_main ul li dt").hasClass('color')) {
				return false;
			} else {
				$(".message_top .btn").addClass("jy");
			}
		});
	},
	// 全部标为已读按钮
	readButton: function() {
		$(".message_top .btn").on("click", function() {
			_operate.allRead(headerData,function(res){
				$(".message_main li dt").removeClass("color");
				$(this).removeClass("color");
				$(this).addClass("jy");
				$(".message_top .count i").html("0");
			});
		});
	},
	messageList: function() {
		var _this = this;
		_operate.getMailLogs(headerData,1,10,function(res){
			for (var i = 0; i <= res.content.list.length - 1; i++) {
				var ifRead = res.content.list[i].ifRead;
			}
			messagesHtml = _td.renderHtml(messages, {
				list: res.content.list,
			});
			$('.message_main ul').html(messagesHtml);
			_this.addColor();
			_page.paging('pageList', res.content.total, 10, function(e) {
				_operate.getMailLogs(headerData, e.current, 10, function(res) {
					messagesHtml = _td.renderHtml(messages, {
						list: res.content.list,
					});
					$('.message_main ul').html(messagesHtml);
					_this.addColor();
				});
			});
		});
		_operate.getMailLogsCountNoRead(headerData,function(res){
			$('.message_top .count i').html(res.content);
		});
	},
	addColor: function(){
		$(".message_main ul li dt").each(function() {
			var font = $(this).attr("ifRead");
			console.log(font);
			if (font == 1) {
				$(this).attr("class", "color");
			}
		});
	}
};
$(function() {
	messageCenter.init();
});