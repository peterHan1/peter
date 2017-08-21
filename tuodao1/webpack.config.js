var webpack = require('webpack');
var path = require('path');
var env=process.env.NODE_ENV;
// 独立打包CSS文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 自动生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取HTML
var getHtmlConfig = function(name){
	return {
		template    : 'src/view/'+ name +'.html',
		filename    : 'view/'+ name +'.html',
		chunks      : ['common',name]
	};

};

var publicPath = 'http://72.127.2.42:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
	entry: {
		'common': ['./src/page/common/index.js',hotMiddlewareScript],
		'index': ['./src/page/index/index.js', hotMiddlewareScript,],
		'login': ['./src/page/login/index.js', hotMiddlewareScript],
		'paging': ['./src/page/paging/index.js', hotMiddlewareScript],
		'slider': ['./src/page/slider/index.js', hotMiddlewareScript],
		'return_money': ['./src/page/return_money/index.js', hotMiddlewareScript],
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
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		new HtmlWebpackPlugin(getHtmlConfig('paging')),
		new HtmlWebpackPlugin(getHtmlConfig('slider')),
		new HtmlWebpackPlugin(getHtmlConfig('return_money')),
		// new webpack.optimize.OccurenceOrderPlugin(), 
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

module.exports = devConfig;


