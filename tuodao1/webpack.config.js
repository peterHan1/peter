var webpack = require('webpack');
var path 	= require('path');
var env 	= process.env.NODE_ENV;
// 独立打包CSS文件
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
// 自动生成HTML
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

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





var publicPath = 'http://192.168.10.101:3000/';

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
	entry: {
		'common': ['./src/page/common/index.js',hotMiddlewareScript],
		'index': ['./src/page/index/index.js', hotMiddlewareScript,],
		'login': ['./src/page/login/index.js', hotMiddlewareScript],
		'return_money': ['./src/page/return_money/index.js', hotMiddlewareScript],
		'register': ['./src/page/register/index.js', hotMiddlewareScript],
		'userlogin': ['./src/page/userlogin/index.js', hotMiddlewareScript],
		'setpassword': ['./src/page/setpassword/index.js', hotMiddlewareScript],
		'setpay': ['./src/page/setpay/index.js', hotMiddlewareScript],
		'invest': ['./src/page/invest/index.js', hotMiddlewareScript],
		'invest_detail': ['./src/page/invest_detail/index.js', hotMiddlewareScript],
		'active_newuser': ['./src/page/active_newuser/index.js', hotMiddlewareScript],
		'active_user': ['./src/page/active_user/index.js', hotMiddlewareScript],

	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: publicPath
	},

	module: {
		preLoaders: [{
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
		},
		{
			test: /\.(gif|png|jpg)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
		},
		{
			test: /\.(woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/iconfont/[name].[ext]'
		}

		]

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
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoEmitOnErrorsPlugin()
		new webpack.DefinePlugin({
        	'env': {
        		NODE_ENV: '"+env+"'
        	}
		}),
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		// css单独打包
		new ExtractTextPlugin('css/[name].css'),
		// HTML文件处理

		new HtmlWebpackPlugin(getHtmlConfig('register','注册页')),
		new HtmlWebpackPlugin(getHtmlConfig('userlogin','登录页')),
		new HtmlWebpackPlugin(getHtmlConfig('setpassword','忘记密码')),
		new HtmlWebpackPlugin(getHtmlConfig('setpay','忘记支付密码')),
		new HtmlWebpackPlugin(getHtmlConfig('active_newuser','激活存管新用户')),
		new HtmlWebpackPlugin(getHtmlConfig('active_user','激活存管存量用户')),
		// new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin(getHtmlConfig('return_money','回款日历')),
		new HtmlWebpackPlugin(getHtmlConfig('invest','理财专区')),
		new HtmlWebpackPlugin(getHtmlConfig('invest_detail','理财专区-详情页')),



		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

module.exports = devConfig;