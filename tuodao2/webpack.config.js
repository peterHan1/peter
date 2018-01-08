var webpack       		= require('webpack');
var path          		= require('path');
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
var HtmlWebpackPlugin 	= require('html-webpack-plugin');
var localPath = require('./testlocal.js');
var publicPath = localPath.localPath;
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.NODE_ENV || 'dev';
var IETEST 				= process.env.IETEST || 'nie';

// 获取HTML
var getHtmlConfig = function(name,title){
	return {
		template    : 'src/view/'+ name +'.html',
		filename    : 'view/'+ name +'.html',
		title       : title,
		inject      : true,
		hash        : true,
		chunks      : ['common',name]
	};

};

// webpack config
var config = {
	entry: {
		'common'					: ['./src/page/common/index.js'],
		'index' 					: ['./src/page/index/index.js'],
		'login' 					: ['./src/page/login/index.js'],
		'register' 					: ['./src/page/register/index.js'],
		'userlogin' 				: ['./src/page/userlogin/index.js'],
		'setpassword' 				: ['./src/page/setpassword/index.js'],
		'setpay' 					: ['./src/page/setpay/index.js'],
		'investSift'  				: ['./src/page/investSift/index.js'],
		'investScatter'  			: ['./src/page/investScatter/index.js'],
		'investBond'  				: ['./src/page/investBond/index.js'],
		'invest_detailSift' 		: ['./src/page/invest_detailSift/index.js'],
		'invest_detailScatter' 		: ['./src/page/invest_detailScatter/index.js'],
		'invest_detailBond' 		: ['./src/page/invest_detailBond/index.js'],
		'active_newuser' 			: ['./src/page/active_newuser/index.js'],
		'uc'						: ['./src/page/uc/index.js'],
		'uc_oldList'				: ['./src/page/uc_old/old_list/index.js'],
		'uc_oldDetail'				: ['./src/page/uc_old/old_detail/index.js'],
		'uc_recharge'				: ['./src/page/uc_moneyMange/uc_recharge/index.js'],
		'uc_cash'					: ['./src/page/uc_moneyMange/uc_cash/index.js'],
		'uc_moneyRecord'			: ['./src/page/uc_moneyMange/uc_moneyRecord/index.js'],
		'uc_messageCenter'			: ['./src/page/uc_messageCenter/index.js'],
		'uc_invest_sift'			: ['./src/page/uc_invest/uc_invest_sift/index.js'],
		'uc_invest_siftDetails'		: ['./src/page/uc_invest/uc_invest_siftDetails/index.js'],
		'uc_accountCenter'			: ['./src/page/uc_accountCenter/index.js'],
		'uc_invest_scatter'			: ['./src/page/uc_invest/uc_invest_scatter/index.js'],
		'uc_invest_scatterDetails'	: ['./src/page/uc_invest/uc_invest_scatterDetails/index.js'],
		'uc_invest_bond'			: ['./src/page/uc_invest/uc_invest_bond/index.js'],
		'uc_invest_bondDetails'		: ['./src/page/uc_invest/uc_invest_bondDetails/index.js'],
		'uc_invest_auto'			: ['./src/page/uc_invest/uc_invest_auto/index.js'],
		'uc_invest_autoDetails'		: ['./src/page/uc_invest/uc_invest_autoDetails/index.js'],
		'uc_invest_return'			: ['./src/page/uc_invest/uc_invest_return/index.js'],
		'calc'						: ['./src/page/calc/index.js'],
		'help'						: ['./src/page/help/index.js'],
		'encyclopedia'			 	: ['./src/page/encyclopedia/index.js'],
		'encyclopedia_detail'		: ['./src/page/encyclopedia_detail/index.js'],
		'uc_points_gold'			: ['./src/page/uc_welfare/uc_points_gold/index.js'],
		'uc_invite'					: ['./src/page/uc_welfare/uc_invite/index.js'],
		'uc_coupon'					: ['./src/page/uc_welfare/uc_coupon/index.js'],
		'friends'					: ['./src/page/uc_welfare/friends/index.js'],
		'draw_present'				: ['./src/page/activities/index.js'],
		'memberCenter'				: ['./src/page/operation/memberCenter/index.js'],
		'newcomer'					: ['./src/page/operation/newcomer/index.js'],
		'new_guide'					: ['./src/page/operation/new_guide/index.js'],
		'news'						: ['./src/page/news/index.js'],
		'news_detail'				: ['./src/page/news_detail/index.js'],
		'Info_contact'				: ['./src/page/Info_contact/index.js'],
		'Info_join'					: ['./src/page/Info_join/index.js'],
		'Info_entity'				: ['./src/page/Info_entity/index.js'],
		'Info_aboutTd'				: ['./src/page/Info_aboutTd/index.js'],
		'Info_platData'				: ['./src/page/Info_platData/index.js'],
		'Info_lawfile'				: ['./src/page/Info_lawfile/index.js'],
		'Info_dangerMange'			: ['./src/page/Info_dangerMange/index.js'],
		'Info_financial'			: ['./src/page/Info_financial/index.js'],
		'report_month_8'			: ['./src/page/reports/index.js'],
		'report_month_7'			: ['./src/page/reports/index.js'],
		'report_month_10'			: ['./src/page/reports/index.js'],
		'report_month_11'			: ['./src/page/reports/index.js'],
		'report_season_1'			: ['./src/page/reports/index.js'],
		'report_season_2'			: ['./src/page/reports/index.js'],
		'report_season_3'			: ['./src/page/reports/index.js'],
		'report_2016_season1'		: ['./src/page/reports/index.js'],
		'report_2016_season2'		: ['./src/page/reports/index.js'],
		'report_2016_season3'		: ['./src/page/report3/index.js'],
		'legalFile'					: ['./src/page/legalFile/index.js'],
		'legal_jd'					: ['./src/page/legalFile/index.js'],
		'legal_ba'					: ['./src/page/legalFile/index.js'],
		'legal_cg'					: ['./src/page/legalFile/index.js'],
		'legal_pl'					: ['./src/page/legalFile/index.js'],
		'legal_dx'					: ['./src/page/legalFile/index.js'],
		'legal_cj'					: ['./src/page/legalFile/index.js'],
		'legal_fx'					: ['./src/page/legalFile/index.js'],
		'legal_gf'					: ['./src/page/legalFile/index.js'],
		'legal_kz'					: ['./src/page/legalFile/index.js'],
		'legal_bl'					: ['./src/page/legalFile/index.js'],
		'legal_ff'					: ['./src/page/legalFile/index.js'],
		'legal_sl'					: ['./src/page/legalFile/index.js'],
		'legal_mj'					: ['./src/page/legalFile/index.js'],
		'transferAgreement'			: ['./src/page/agreement_trans/index.js'],
		'borrowAgreement'			: ['./src/page/agreement_borrow/index.js'],
		'authorization'				: ['./src/page/agreement_author/index.js']

	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: publicPath
	},

	module: {
		// preLoaders: [{
		// 	test: /\.js$/,
		// 	loader: 'eslint-loader',
		// 	exclude: /node_modules/
		// }],
		loaders: [{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
		},
		{
			test: /\.(gif|png|jpg)\??.*$/,
			loader: 'url-loader?limit=8192&name=resource/[name].[ext]'
		},
		{
			test: /\.(woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/iconfont/[name].[ext]'
		},
		{
			test: /\.string$/,
			loader: 'html-loader',
			query : {
				minimize : true,
				removeAttributeQuotes : false
			}
		}]

	},
	// externals:{
	// 	'jquery' : 'window.jQuery'
	// },
	resolve:{
		alias : {
			util : __dirname + '/src/util',
			page : __dirname + '/src/page',
			api : __dirname + '/src/api'

		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'env' 		: '"+WEBPACK_ENV+"',
			'testie' 	: '"+TESTIE+"'
		}),
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		// css单独打包
		new ExtractTextPlugin('css/[name].css'),
		// HTML文件处理
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
		new HtmlWebpackPlugin(getHtmlConfig('register','注册页')),
		new HtmlWebpackPlugin(getHtmlConfig('userlogin','登录页')),
		new HtmlWebpackPlugin(getHtmlConfig('setpassword','忘记密码')),
		new HtmlWebpackPlugin(getHtmlConfig('setpay','忘记支付密码')),
		new HtmlWebpackPlugin(getHtmlConfig('active_newuser','激活存管新用户')),
		new HtmlWebpackPlugin(getHtmlConfig('investSift','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('investScatter','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('investBond','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailSift','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailScatter','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailBond','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_recharge','账户充值')),
		new HtmlWebpackPlugin(getHtmlConfig('uc','账户总览')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_oldList','老账户列表')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_oldDetail','老账户详情')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_cash','账户提现')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_moneyRecord','资金记录')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_messageCenter','资金记录')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_sift','精选计划')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_siftDetails','精选计划详情')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_scatter','散标项目')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_scatterDetails','散标项目详情')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_bond','债权转让')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_bondDetails','债权转让详情')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_auto','自动投标')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_autoDetails','自动投标')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invest_return','回款日历')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_messageCenter','消息中心')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_accountCenter','账户设置')),
		new HtmlWebpackPlugin(getHtmlConfig('calc','计算器')),
		new HtmlWebpackPlugin(getHtmlConfig('help','帮助中心')),
		new HtmlWebpackPlugin(getHtmlConfig('encyclopedia','理财百科')),
		new HtmlWebpackPlugin(getHtmlConfig('encyclopedia_detail','理财百科详情')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_points_gold','积分和金币')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invite','我的邀请')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_coupon','我的优惠券')),
		new HtmlWebpackPlugin(getHtmlConfig('friends','邀请好友')),
		new HtmlWebpackPlugin(getHtmlConfig('draw_present','积分大抽奖')),
		new HtmlWebpackPlugin(getHtmlConfig('memberCenter','会员中心')),
		new HtmlWebpackPlugin(getHtmlConfig('newcomer','新手专区')),
		new HtmlWebpackPlugin(getHtmlConfig('new_guide','新手指南')),
		new HtmlWebpackPlugin(getHtmlConfig('news','新闻公告')),
		new HtmlWebpackPlugin(getHtmlConfig('news_detail','新闻公告详情')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_contact','联系我们')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_join','加入我们')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_entity','合作门店')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_aboutTd','关于拓道')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_platData','平台数据')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_lawfile','法律文件')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_dangerMange','风险管理')),
		new HtmlWebpackPlugin(getHtmlConfig('Info_financial','理财百科')),
		new HtmlWebpackPlugin(getHtmlConfig('report_month_8','八月份运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_month_7','七月份运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_month_10','十月份运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_month_11','十一月份运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_season_1','2017年第一季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_season_2','2017年第二季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_season_3','2017年第三季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_2016_season1','2016年第一季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_2016_season2','2016年第二季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('report_2016_season3','2016年第三季度运营报告')),
		new HtmlWebpackPlugin(getHtmlConfig('legalFile','互联网信息服务管理办法（2011修订）')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_jd','网络借贷信息中介机构业务活动管理暂行办法')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_ba','网络借贷信息中介机构备案登记管理指引')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_cg','网络借贷资金存管业务指引')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_pl','网络借贷信息中介机构业务活动信息披露指引')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_dx','电信和互联网用户个人信息保护规定工业和信息化部令第24号')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_cj','关于促进互联网金融健康发展的指导意见')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_fx','关于印发《P2P网络借贷风险专项整治工作实施方案》的通知')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_gf','工业和信息化部令（第20号）')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_kz','工商办字〔2016〕 61号')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_bl','关于办理非法集资刑事案件适用法律若干问题的意见')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_ff','最高人民法院关于非法集资刑事案件性质认定问题的通知')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_sl','最高人民法院关于审理非法集资刑事案件具体应用法律若干问题的解释')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_mj','最高人民法院关于审理民间借贷案件适用法律若干问题的规定')),
		new HtmlWebpackPlugin(getHtmlConfig('legal_bl','关于办理非法集资刑事案件适用法律若干问题的意见')),
		new HtmlWebpackPlugin(getHtmlConfig('transferAgreement','转让协议')),
		new HtmlWebpackPlugin(getHtmlConfig('borrowAgreement','借款协议')),
		new HtmlWebpackPlugin(getHtmlConfig('authorization','授权委托书'))

	]
};


if('dev' === WEBPACK_ENV){
	if('ie' !== IETEST){
		for (var property in config.entry) {
			config.entry[property].push(hotMiddlewareScript);
		};
		config.plugins.push(new webpack.HotModuleReplacementPlugin(),new webpack.NoErrorsPlugin());
	}
}
module.exports = config;