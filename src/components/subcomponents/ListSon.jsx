/**
 * ListSon子组件
 *
 */
import React from 'react';
// 不生效的原因：样式文件import ListSon from './ListSon.jsx';被打包到bundle.js文件中。配置：css解析的loader
const StyleFile = {
	sty: {
		fontSize: 24 + 'px',
		listStyle: 'none'
	}
};

export default function ListSon(props) {
	console.log(props);
	// 循环列表中的key在ListSon标签处声明
	return <li style={StyleFile.sty}>{props.name}</li>;
}
