import React from 'react';
// 导入Picture子组件
import Picture from './subcomponents/Picture.jsx';
export default class Register extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<p>这是注册组件</p>
				<Picture></Picture>
			</div>
		);
	}
}
