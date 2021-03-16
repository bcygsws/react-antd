/**
 * webpack.config.js 配置文件
 *
 */
const path = require('path');
// htmlWebpackPlugin的两个作用：1.在内存中托管一份html文件。2.将打包好的bundle.js追加到</body>结束标签之前的位置
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于清除上一次打包在dist目录中的所有文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	// 模式
	mode: 'production',
	entry: {
		// 入口文件
		app: './src/main.js'
	},
	output: {
		// 打包的文件一定要使用绝对路径
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]=[hash:8].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		// webpack4版本中，清除打包文件的插件CleanWebpackPlugin不用传入参数([])。但是在引入时，需要在实例上加一个对象
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			// 将jsx文件转换为ES5 的js文件
			{
				test: /\.js|jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};
