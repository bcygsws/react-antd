/**
 * webpack.config.js 配置文件
 * 参考：https://www.ucloud.cn/yun/54021.html
 *
 */
const path = require('path');
// 起别名，指定路径
const resolve = dir => path.resolve(__dirname, dir);
// htmlWebpackPlugin的两个作用：1.在内存中托管一份html文件。2.将打包好的bundle.js追加到</body>结束标签之前的位置
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于清除上一次打包在dist目录中的所有文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	// 模式
	mode: 'development',
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
			// 解析css样式代码,后缀名为css的样式文件，一般为第三方库的样式文件。自己新建的样式文件， 一般使用less 和 scss,不宜使用css
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// // 解析less样式代码
			// {
			// 	test: /\.less$/,
			// 	use: [
			// 		{ loader: 'style-loader' },
			// 		{ loader: 'css-loader' },
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				//  Replace Autoprefixer browsers option to Browserslist config.
			// 				// Use browserslist key in package.json or .browserslistrc file.
			// 				plugins: [require('autoprefixer')({ overrideBrowserslist: ['last 5 version'] })]
			// 			}
			// 		},
			// 		{ loader: 'less-loader' }
			// 	]
			// },
			// // 解析sass样式代码
			// {
			// 	test: /\.(sass|scss)$/,
			// 	use: [
			// 		{ loader: 'style-loader' },
			// 		{ loader: 'css-loader' },
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				plugins: [require('autoprefixer')({ overrideBrowserslist: ['last 5 version'] })]
			// 			}
			// 		}
			// 	]
			// },
			/*  在项目根路径下，抽象一个postcss.config.js文件，来配置自动加前缀需要的操作 */
			// 解析less样式代码
			{
				test: /\.less$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'less-loader' }]
			},
			// 解析sass样式代码
			{
				test: /\.(sass|scss)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }]
			},
			// 解析图片文件
			{
				test: /\.(jpg|bmp|png|gif|svg)$/,
				use: [
					{
						// 一般说来，使用了url-loader 需要同时安装file-loader和url-loader
						/* 
					虽然此处url-loader没有显式地依赖于file-loader，但是实际上内部是需要的。因为当文件大小大于limit时，就会调用file-loader，就会报错
					*/
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							// 只有设定的limit值大于图片的真实大小时，图片文件才会转换成base64格式，图片真实大小12288 b
							limit: 9800,
							outputPath: './images',
							publicPath: '../images'
						}
					}
				],
				exclude: /node_modules/
			},
			// 解析字体文件
			{
				test: /\.(woff|woff2|svg|eot|ttf)$/,
				use: 'url-loader',
				exclude: /node_modules/
			},
			// 将jsx文件转换为ES5 的js文件
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		// 设置别名
		alias: {}
	}
};
