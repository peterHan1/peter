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
		'invest'  					: ['./src/page/invest/index.js'],
		'invest_detailSift' 		: ['./src/page/invest_detailSift/index.js'],
		'invest_detailScatter' 		: ['./src/page/invest_detailScatter/index.js'],
		'invest_detailBond' 		: ['./src/page/invest_detailBond/index.js'],
		'active_newuser' 			: ['./src/page/active_newuser/index.js'],
		'active_user'				: ['./src/page/active_user/index.js'],
		'uc'						: ['./src/page/uc/index.js'],
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
		'uc_points_gold'			: ['./src/page/uc_welfare/uc_points_gold/index.js'],
		'uc_invite'					: ['./src/page/uc_welfare/uc_invite/index.js'],
		'uc_coupon'					: ['./src/page/uc_welfare/uc_coupon/index.js'],
		'friends'					: ['./src/page/uc_welfare/friends/index.js'],
		'draw_present'					: ['./src/page/uc_welfare/draw_present/index.js'],
		'memberCenter'				: ['./src/page/operation/memberCenter/index.js'],
		'newcomer'					: ['./src/page/operation/newcomer/index.js']
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
		new HtmlWebpackPlugin(getHtmlConfig('active_user','激活存管存量用户')),
		new HtmlWebpackPlugin(getHtmlConfig('invest','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailSift','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailScatter','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detailBond','理财专区-详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_recharge','账户充值')),
		new HtmlWebpackPlugin(getHtmlConfig('uc','账户总览')),
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
		new HtmlWebpackPlugin(getHtmlConfig('uc_accountCenter','账户中心')),
		new HtmlWebpackPlugin(getHtmlConfig('calc','计算器')),
		new HtmlWebpackPlugin(getHtmlConfig('help','帮助中心')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_points_gold','积分和金币')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_invite','我的邀请')),
		new HtmlWebpackPlugin(getHtmlConfig('uc_coupon','我的优惠券')),
		new HtmlWebpackPlugin(getHtmlConfig('friends','邀请好友')),
		new HtmlWebpackPlugin(getHtmlConfig('draw_present','积分大抽奖')),
		new HtmlWebpackPlugin(getHtmlConfig('memberCenter','会员中心')),
		new HtmlWebpackPlugin(getHtmlConfig('newcomer','新手专区'))
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