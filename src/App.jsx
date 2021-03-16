import React from 'react';
// 导入路由相关文件
import { HashRouter, Link, Route, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
// 定义样式
import styled from 'styled-components';
/* 书写样式 */
const StyleLink = styled(Link)`
	text-decoration: none;
	font-size: 14px;
	color: red;
	margin-right: 20px;
`;
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<div>
					{/* 	<Link to="/login">登录</Link> */}
					<StyleLink to="/login">登录</StyleLink>
					{/* 	<Link to="/register">注册</Link> */}
					<StyleLink to="/register">注册</StyleLink>
					{/* 路由分为：a.包容性路由。例子：/login 可以匹配到 / ,也可以匹配到/login/3 b.排他性路由：/login只能匹配/login; 在每个Route中添加exact,
          才能达到<Switch></Switch>的效果。Switch的作用只能匹配到Switch标签中的一个精确路由 */}
					{/* 添加路径重定向 */}
					<Redirect path="/" to="/login"></Redirect>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
				</div>
			</HashRouter>
		);
	}
}
