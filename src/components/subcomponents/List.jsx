import React from 'react';
// 引入List的子组件ListSon
import ListSon from './ListSon.jsx';
export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [
				{ name: '张三', id: 1 },
				{ name: '李四', id: 2 },
				{ name: '王五', id: 3 },
				{ name: '李丹', id: 4 }
			]
		};
	}
	render() {
		{
			/* 通过父组件向子组件传值的方式，将列表抽象为 */
		}
		{
			/* return (
			<div>
				<ul>
					{this.state.list.map(item => {
						return <li key={item.id}>{item.name}</li>;
					})}
				</ul>
			</div>
		); */
		}
		return (
			<div>
				<ul>
					{this.state.list.map(item => {
						return <ListSon {...item} key={item.id}></ListSon>;
					})}
				</ul>
			</div>
		);
	}
}
