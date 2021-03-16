module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				//通过require 或者 import 直接导入core-js包，或者在webpack配置文件的entry入口处直接配置@babel/polyfill都是全局引入，会污染词法环境，
				// 同时造成入口包体积变大。polyfill通过core-js实现按需引入，需要配置useBuiltIns和corejs选项，同时需要安装运行依赖core-js@3
				// Babel 会在你使用到 ES2015+ 新特性时，自动添加 babel-polyfill 的引用，并且是 partial(不完全的、局部的) 级别的引用。按我的理解按需引入
				// use 使用 Built 构建 Ins 会自动添加@babel/polyfill
				useBuiltIns: 'usage',
				// https://blog.csdn.net/wmiaopas/article/details/107010291
				// 安装core-js用于让浏览器兼容ES6语法
				corejs: {
					version: 3 //3是core.js版本号
				},
				targets: {
					// 指定兼容到哪个版本的浏览器
					chrome: '60',
					ie: '10',
					safari: '10'
				}
			}
		]
	],
	plugins: ['@babel/plugin-transform-runtime']
};
