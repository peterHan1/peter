$(function() {
	var dataBank = ['ICBC', 'CCB', 'BOC', 'ABC', 'BCM', 'PSBC', 'CMB', 'CITIC', 'SPDB', 'CIB', 'CMBC', 'CEB', 'PAB', 'HXB', 'BOB', 'WHB', 'CGB', 'JLSB', 'JZB', 'BOS', 'NBB', 'EEDSB', 'JSB', 'BJRCB', 'CQRCB', 'HSB', 'HFB', 'HZB', 'PZHSB', 'BOCD', 'NMGB', 'WHSB', 'HKB', 'WFCCB', 'JSNCB', 'CHAB', 'LWB', 'DZB', 'DWB', 'QSB', 'RZB', 'LSB', 'DYB', 'DYLSCZ', 'CJCCB', 'BOLY', 'GDNYB', 'BONC', 'BOXM', 'JZCB', 'JJCCB', 'TAB', 'BOLJ', 'HUBNX', 'BHRCB', 'HBNX', 'GSNX', 'SHXNX', 'QDCCB', 'CZCB', 'CBHB'];
	var dataBankFont = ['中国工商银行', '中国建设银行', '中国银行', '中国农业银行', '交通银行', '中国邮政储蓄银行', '招商银行', '中信银行', '浦东发展银行', '兴业银行', '中国民生银行', '中国光大银行', '平安银行', '华夏银行', '北京银行', '武汉农村商业银行', '广发银行', '吉林省农村信用社', '锦州银行', '上海银行', '宁波银行', '鄂尔多斯银行', '江苏银行', '北京农商银行', '重庆农村商业银行', '徽商银行', '恒丰银行', '杭州银行', '攀枝花市商业银行', '成都银行', '内蒙古农村信用社', '威海市商业银行', '汉口银行', '潍坊银行', '江苏•农村商业银行', '长安银行', '莱商银行', '德州银行', '东莞农村商业银行', '齐商银行', '日照银行', '临商银行', '东营银行', '东营莱商村镇银行', '江苏长江商业银行', '洛阳银行', '广东南粤银行', '南昌银行', '厦门银行', '晋中银行', '九江银行', '泰安市商业银行', '龙江银行', '湖北省农村信用社', '天津滨海农村商业银行', '河北省农村信用社', '甘肃省农村信用社', '陕西省农村信用社', '青岛银行', '浙江稠州商业银行', '渤海银行'];
	var dataBankXe = ['单笔1万  单日10万  单月20万', '建设银行', '222', '农业银行', 'BCM', 'PSBC', 'CMB', 'CITIC', 'SPDB', 'CIB', 'CMBC', 'CEB', 'PAB', 'HXB', 'BOB', 'WHB', 'CGB', 'JLSB', 'JZB', 'BOS', 'NBB', 'EEDSB', 'JSB', 'BJRCB', 'CQRCB', 'HSB', 'HFB', 'HZB', 'PZHSB', 'BOCD', 'NMGB', 'WHSB', 'HKB', 'WFCCB', 'JSNCB', 'CHAB', 'LWB', 'DZB', 'DWB', 'QSB', 'RZB', 'LSB', 'DYB', 'DYLSCZ', 'CJCCB', 'BOLY', 'GDNYB', 'BONC', 'BOXM', 'JZCB', 'JJCCB', 'TAB', 'BOLJ', 'HUBNX', 'BHRCB', 'HBNX', 'GSNX', 'SHXNX'];
	var ulEle = document.createElement('dl');
	$('#Bank').append(ulEle);
	for (var i = 0; i < dataBank.length; i++) {
		$('dl').append('<dd><b><i class="Bank ' + dataBank[i] + '"></i>' + dataBankFont[i] + '</b><b>（单笔1万  单日10万  单月20万）</b></dd>');
	}
	$('#Bank dd').eq(dataBank.length - 1).css('border-bottom', '0');
	$('#Bank_sel').on('click', function() {
		// alert(e.target.id)
		$('#Bank').show();

	});

	$('#Bank dd').on('click', function() {
		$('#Bank').hide();
		$('#Bank_sel').hide();
		$('#Bank_sel_hid').show();
		$('#Bank_sel_hid div').html($(this).find("b").html());
	});

	$('#Bank_sel_hid').on('click', function() {
		// alert(e.target.);
		// alert(12121)
		if($(this).hasClass("dis_color")){
			return false;
		}else{
			$('#Bank').show();
			$('#Bank_sel').hide();
		}
	});

	$(document).click(function(e) {
		// alert(e.target.id)
		if ((e.target.id != 'xx'))
			$('#Bank').hide();
	});

});