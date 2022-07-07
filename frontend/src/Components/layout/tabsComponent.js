import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Radio } from 'antd';
import './tabsComponent.css';

const { TabPane } = Tabs;

class AllTabs extends Component{
	render(){
		// console.log(this.props)
		// const data = [{tabname:"Company INFO",comp:"<p>Hello</p>"},{tabname:"SOCIAL",comp:"<p>Hello</p>"},{tabname:"CONTACT INFO",comp:"<p>Hello</p>"}]
		const data = this.props.company_tabs
		return(
			<Tabs className={this.props.class} defaultActiveKey="1" type="card" style={{ marginBottom: 32 }}>
			{ data.map((value,index) => (
				<TabPane tab={value.tabname} key={index+1}>
					{value.comp}
				</TabPane>
			))}
			</Tabs>
			)
	}
}

export default AllTabs;