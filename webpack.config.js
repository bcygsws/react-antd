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
// 单独抽取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js代码插件 ugly adj. 丑陋的、难看的，uglify v.丑化、混淆。这里取“混淆”之意
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
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
		new CleanWebpackPlugin(),
		// 抽取css文件
		new MiniCssExtractPlugin({
			// 抽取文件打包后，仍然叠加的是dist路径，同时name指得是在entry节点中声明的主入口文件的键 app
			filename: 'css/[name].css'
		}),
		// 参考文档：
		// https://www.cssnano.cn/docs/introduction#cssnano-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F
		// https://www.jianshu.com/p/dd9afa5c4d0f
		// cssnano是一个缩减器(使用各种方式减少css文件的体积)
		// cssnano压缩css文件
		new OptimizeCssAssetsWebpackPlugin({
			// 默认是全部的css文件都要压缩，也可以指定部分类型文件
			assetNameRegExp: /\.(sa|sc|le|c)ss$/,
			// 指定一个优化css的处理器
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				presets: [
					'default',
					{
						discardComments: { removeAll: true }, // 对注释的处理
						normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
					}
				]
			},
			canPrint: true //是否打印编译过程中的日志
		})
	],
	optimization: {
		minimize: true, // a.缺省状态下，默认值为true，表示打开压缩
		splitChunks: {
			// b.声明文件的载入方式，all:无论是动态文件还是非动态文件，都将分离。页面首次载入时，会分离所有的包
			chunks: 'all',
			// c.文件最小可以被打包体积，单位b 。1000>a.js+b.js+c.js时，它们不会分开，而是打包成一个文件
			// minSize:1000
			// d. maxSize:0 尝试将大小大于0 b的文件拆分，拆分后最小值为minSize
			maxSize: 0,
			// 打包分隔符。比如a.js b.js c.js打包成一个文件，则打包文件名是a~b~c.js
			automaticNameDelimiter: '~',
			// 按需加载时最多的并行请求数量
			maxAsyncRequests: 5,
			// 最多初始化请求数量
			maxInitialRequests: 3,
			cacheGroups: {
				vendors: {
					// 项目基本框架
					chunks: 'all',
					test: /(react|react-dom|react-router-dom|react-loadable)/,
					priority: 100,
					name: 'vendors'
				},
				// 异步加载公共包、组件
				'async-common': {
					chunks: 'async',
					minChunks: 1, // 最少引入的次数
					priority: 80,
					name: 'async-common'
				}
			}
		},
		minimizer: [
			// 压缩css文件，只有mode为production时生效
			new OptimizeCssAssetsWebpackPlugin(),
			// 压缩js代码
			new UglifyjsWebpackPlugin()
		]
	},
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
				include: path.resolve('src/css'),
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader, // 等价于{ loader: 'style-loader' }
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						// 配置sourceMap启用，才能解析less和sass的相对路径。同时，需要安装依赖需要的resolve-url-loader加载器，虽然不需要显式配置
						options: {
							sourceMap: true
						}
					},
					{ loader: 'postcss-loader' }
				]
			},
			// 解析sass样式代码
			{
				test: /\.(sass|scss)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }, { loader: 'postcss-loader' }]
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
							// 只有设定的limit值大于图片的真实大小时，图片文件才会转换成base64格式，图片真实大小9782 b
							limit: 9781,
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
	},
	// 参考文档：https://www.freesion.com/article/8666500682/
	// 去掉浏览器控制台警告：DevTools failed to load SourceMap: Could not load content for webpack:///node_modules/react-router-dom/esm/react-router-dom.js.map: HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
	devtool: 'inline-source-map'
};
