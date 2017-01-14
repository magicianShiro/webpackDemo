

const path = require('path')

const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
	entry: [
		'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname,'./src/js/app.js')
	],
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.js"
	},
	// 配置eslint
	eslint: {
		configFile: './.eslintrc.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "eslint-loader",
				exclude: /node_module/
			}
		],
		loaders: [
			// 处理js
			{
				test: /\.jsx?$/,
				loader: 'babel'
			},
			// 处理css
			{
				test: /\.css$/,
				loader: "style!css"
			},
			// 处理saaa文件
			{
				test: /\.scss$/,
				loader: "style!css!sass"
			},
			// 处理图片
			{
				test: /\.(png|jpg)$/,
				loader: 'url'
			},
			// 处理字体
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url'
            }
		]
	},
	plugins: [
		new OpenBrowserPlugin({ 
			url: 'http://localhost:8080/', 
			browser: 'chrome'
		})
	]
}