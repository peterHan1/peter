var _td = require('util/td.js');

var _cashfee={
	cashfee :  function(cashMoney,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/account/cash_fee'),
			data    : {
				cashMoney:cashMoney
			},
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_cashfee;