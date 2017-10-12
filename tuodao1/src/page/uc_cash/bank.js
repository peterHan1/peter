var dataBank = ['ICBC', 'CCB', 'BOC', 'ABC', 'BCM', 'PSBC', 'CMB', 'CITIC', 'SPDB', 'CIB', 'CMBC', 'CEB', 'PAB', 'HXB', 'BOB', 'WHB', 'CGB', 'JLSB', 'JZB', 'BOS', 'NBB', 'EEDSB', 'JSB', 'BJRCB', 'CQRCB', 'HSB', 'HFB', 'HZB', 'PZHSB', 'BOCD', 'NMGB', 'WHSB', 'HKB', 'WFCCB', 'JSNCB', 'CHAB', 'LWB', 'DZB', 'DWB', 'QSB', 'RZB', 'LSB', 'DYB', 'DYLSCZ', 'CJCCB', 'BOLY', 'GDNYB', 'BONC', 'BOXM', 'JZCB', 'JJCCB', 'TAB', 'BOLJ', 'HUBNX', 'BHRCB', 'HBNX', 'GSNX', 'SHXNX', 'QDCCB', 'CZCB', 'CBHB'];
var ulEle = document.createElement('ul');
	$('.bank_select').append(ulEle);
	for (var i = 0; i < dataBank.length; i++) {
		$('.bank_select ul').append('<li><i class="Bank ' + dataBank[i] + '"></i></li>');
	}