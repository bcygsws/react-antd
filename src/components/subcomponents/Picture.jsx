// 导入组件生命周期需要的包
import React from 'react';
// 别名中配置了绝对路径，src中的图片才能正常显示，别名中最好以@开头，比如 @img
import logo from '../../images/logo.png';
export default function Picture(props) {
	// 或者使用对象
	return <img src={logo} />;
}
