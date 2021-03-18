import React from 'react';
// 导入路由相关文件
import { HashRouter, Link, Route, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
// @loadable/component方式动态导入组件
import Loadable from 'react-loadable';
import Loading from './components/subcomponents/Loading.jsx'; // 自己编写的组件
// React路由懒加载，参考：https://blog.csdn.net/weixin_43954090/article/details/108039568
const Register = Loadable({
	loader: () => import('./components/Register.jsx'),
	loading: Loading
});
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
					{/* 在Link或者NavLink中添加replace关键字，去掉浏览器控制台警告：
					Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack */}
					{/* 	<Link to="/login">登录</Link> */}
					<StyleLink to="/login" replace>
						登录
					</StyleLink>
					{/* 	<Link to="/register">注册</Link> */}
					<StyleLink to="/register" replace>
						注册
					</StyleLink>
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
