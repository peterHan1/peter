var webpack = require('webpack');
var path = require('path');
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
    }
    
}



var productionConfig = {
    entry: {
        'common': ['./src/page/common/index.js'], 
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },

   module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            }
        ]
        
    },
    plugins: [
        
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        
    ]
};

module.exports = productionConfig;
