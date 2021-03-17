module.exports = {
	plugins: [
		// 兼容浏览器，添加前缀
		// 获取的autoprefixer实例调用一下，传入了两个参数
		require('autoprefixer')({
			overrideBrowserslist: [
				'Android 4.1',
				'iOS 7.1',
				'Chrome > 31',
				'ff > 31',
				'ie >= 8'
				//'last 10 versions', // 所有主流浏览器最近10版本用], grid: true })]
			],
			// 涉及css属性值为grid时，自动添加浏览器前缀，类似 flex:grid
			// grid: true
			flex: true
		})
	]
};
/* 
于配置中制定grid为true,也就是grid特性添加ie前缀，经过编译后变成：
.main{
display: -ms-grid;
dislay: grid;
}

*/
