

const path = require('path')
const webpack = require('webpack')

// 删除文件夹的插件
const CleanPlugin = require('clean-webpack-plugin')
// 自动生成index.html页面的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽取css的第三方插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// 定义两个css
let cssExtractor = new ExtractTextPlugin("app.css")
let helloExtractor = new ExtractTextPlugin("hello.css")

module.exports = {
	entry: {
		app: path.resolve(__dirname,'./src/js/app.js'),
		vendors: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			// 处理js
			{
				test: /\.jsx?$/,
				loader: 'babel',
				// 加了.babelrc文件后,就不用加这个了
				// query: {
				// 	presets: ['es2015', 'react']
				// }
			},
			// 处理css
			{
				test: /\.css$/,
				// 不想分离的情况下这么写
				// loader: "style!css"
				// 分离的情况下这么写
				loader: cssExtractor.extract("style-loader", "css-loader")
			},
			// 处理saaa文件
			{
				test: /\.scss$/,
				// loader: "style!css!sass"
				loader: helloExtractor.extract("style-loader", "css-loader!sass-loader")
			},
			// 处理图片
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url?limit=25000&name=images/[name].[ext]'
			},
			// 处理字体
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url?limit=50000&name=fonts/[name].[ext]'
            }
		]
	},
	plugins: [
		// 构建之前先删除dist目录下的文件夹
		new CleanPlugin(['dist']),
		// 分离第三方应用插件,name属性会自动指向entry中vendros属性
		// filename属性中的文件会自动构建到output中的path属性下面
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'vendors.js'
		}),
		// 用webpack压缩代码, 可以忽略代码中的警告
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		// 可以新建多个抽离样式的文件,这样就可以有多个css文件
		// new ExtractTextPlugin("app.css"),
		// new ExtractTextPlugin("hello.css"),
		cssExtractor,
		helloExtractor,

		// 让生成dist时根据模板生成一个html文件
		new HtmlWebpackPlugin({
			template: './src/template.html',
			htmlWebpackPlugin: {
				files: {
					"css": ["hello.css", "app.css"],
					"js": ["vendors.js", "bundle.js"]
				}
			},
			// 效果不大,情怀至上
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),
		// 定义生产环境
		new webpack.DefinePlugin({
			//  去掉react中的警告,react会自动判断
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
}