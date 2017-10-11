var webpack       		= require('webpack');
var path          		= require('path');
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

var publicPath = 'http://192.168.1.108:3000/';
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
		'common'			: ['./src/page/common/index.js'],
		'index' 			: ['./src/page/index/index.js'],
		'login' 			: ['./src/page/login/index.js'],
		'return_money' 		: ['./src/page/return_money/index.js'],
		'register' 			: ['./src/page/register/index.js'],
		'userlogin' 		: ['./src/page/userlogin/index.js'],
		'setpassword' 		: ['./src/page/setpassword/index.js'],
		'setpay' 			: ['./src/page/setpay/index.js'],
		'invest'  			: ['./src/page/invest/index.js'],
		'invest_detail' 	: ['./src/page/invest_detail/index.js'],
		'active_newuser' 	: ['./src/page/active_newuser/index.js'],
		'active_user'		: ['./src/page/active_user/index.js'],

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
			page : __dirname + '/src/page'

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
		new HtmlWebpackPlugin(getHtmlConfig('return_money','回款日历')),
		new HtmlWebpackPlugin(getHtmlConfig('invest','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detail','理财专区-详情页'))
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