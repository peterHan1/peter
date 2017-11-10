var _trade = require('api/trade-api.js');
var _td = require('util/td.js');
$(function() {
	var dataBank = [];
	var dataBankFont = [];
	var dataBankXe = [];
	var headerData = {
		accessId: _td.getAccess('accessId'),
		accessKey: _td.getAccess('accessKey')
	};
	_trade.bankList(headerData,function(res) {
		for (var j = 0; j < res.content.length; j++) {
			dataBank.push(res.content[j].paymentCode);
			dataBankFont.push(res.content[j].name);
			dataBankXe.push(res.content[j].limitOneTime);
		}
		var ulEle = document.createElement('ul');
		$('#Bank').append(ulEle);
		for (var i = 0; i < dataBank.length; i++) {
			$('#Bank ul').append('<li><b><i class="Bank ' + dataBank[i] + '" bank="' + dataBank[i] + '"></i><em>' + dataBankFont[i] + '</em></b><b>（' + dataBankXe[i] + '）</b></li>');
		}
		$('#Bank li').eq(dataBank.length - 1).css('border-bottom', '0');
		$('#Bank_sel').on('click', function() {
			$('#Bank').show();

		});
		$('#Bank li').on('click', function() {
			$('#Bank').hide();
			$('#Bank_sel').hide();
			$('#Bank_sel_hid').show();
			$('#Bank_sel_hid div').html($(this).find("b").html());
		});
		$('#Bank_sel_hid').on('click', function() {
			if ($(this).hasClass("dis")) {
				return false;
			} else {
				$('#Bank').show();
				$('#Bank_sel').hide();
			}
		});

		$(document).click(function(e) {
			if ((e.target.id != 'xx'))
				$('#Bank').hide();
		});
	});
});