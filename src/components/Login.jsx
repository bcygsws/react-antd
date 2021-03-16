import React from 'react';
import List from './subcomponents/List.jsx';
export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<p>这是登录组件</p>
				{/* 引入子组件List */}
				<List></List>
			</div>
		);
	}
}
