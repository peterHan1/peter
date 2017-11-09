var _trade = require('api/trade-api.js');
var dataBank=[];
_trade.bankList(function(res) {
	for(var j=0;j<res.content.length;j++){
		dataBank.push(res.content[j].paymentCode);
	}
	var ulEle = document.createElement('ul');
	$('.bank_select').append(ulEle);
	for (var i = 0; i < dataBank.length; i++) {
		$('.bank_select ul').append('<li><i class="Bank ' + dataBank[i] + '" bank="' + dataBank[i] + '"></i></li>');
	}
});