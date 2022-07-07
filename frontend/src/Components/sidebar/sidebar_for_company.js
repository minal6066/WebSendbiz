import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb,Row,Col,Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import './sidebar.css';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class SideNav extends Component{
	render(){
		let iscompany = false;
		let isbilling = false;
		let isstat = false;
		let isjobs = false;
		let isappliedCandi = false;
		let isresume = false;
		let isappliedJob = false;
		let isservice = false;
		let isproducts = false;
		let isnews = false;
		let isintereted = false;
		let isevents = false;
		let ismailbox = false;
		if(this.props.location.pathname==="/edit/company/profile"){
			iscompany = true;
		}else if(this.props.location.pathname==="/company/billing"){
			isbilling = true;
		}else if(this.props.location.pathname==="/company-statistics"){
			isstat = true;
		}else if(this.props.location.pathname==="/companyjoblist"){
			isjobs = true;
		}else if(this.props.location.pathname==="/AppliedCandidates"){
			isappliedCandi = true;
		}else if(this.props.location.pathname==="/Company_Resume"){
			isresume = true;
		}else if(this.props.location.pathname==="/applied-jobs"){
			isappliedJob = true;
		}else if(this.props.location.pathname==="/company-products"){
			isproducts = true;
		}else if(this.props.location.pathname==="/company-service"){
			isservice = true;
		}else if(this.props.location.pathname==="/company-news"){
			isnews = true;
		}else if(this.props.location.pathname==="/company-interested"){
			isintereted = true;
		}else if(this.props.location.pathname==="/company-events"){
			isevents = true;
		}else if(this.props.location.pathname==="/company-mailbox"){
			ismailbox = true;
		}
		return(
			<Row>
				<div className="nav-side-menu nav-side-height-company">
					<div className="menu-list">
						<h6 className="bold-family profile-head-font">Basic</h6>
						<ul id="menu-content" className="menu-content out">
							<NavLink to={"/edit/company/profile"}>
								
								{ iscompany ?
									<li className="sidebar-padding" >
										<img src={process.env.PUBLIC_URL + "/user-circle.png"} />&nbsp;&nbsp;Profile
									</li>
								:
									<li className="sidebar-padding" >
										<img src={process.env.PUBLIC_URL + "/user-circle-white.png"} />&nbsp;&nbsp;Profile
									</li>
								}
								
							</NavLink>
							{this.props.user_type ===2 ? (
								<NavLink to={"/company/billing"}>
								{ isbilling ?
									<li className="sidebar-padding" >
										<img src={process.env.PUBLIC_URL + "/billing-red.svg"} />&nbsp;&nbsp;Billing Overview
									</li>
								:
									<li className="sidebar-padding">
										<img src={process.env.PUBLIC_URL + "/billing.svg"} />&nbsp;&nbsp;Billing Overview
									</li>
								}
								</NavLink>
							):null}
							<NavLink  to={"/company-statistics"}>
							{ isstat ?
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/chart-pie-red.png"} />&nbsp;&nbsp;Statistics
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/chart-pie.png"} />&nbsp;&nbsp;Statistics
								</li>
							}
							</NavLink>
						</ul>
						<h6 className="margin-top-for-side-nav-head bold-family profile-head-font">Recruitment</h6>
						<ul id="menu-content" className="menu-content out">
							<NavLink to={"/companyjoblist"}>
							{ isjobs ?
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/briefcase-red.png"} />&nbsp;&nbsp;Jobs
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/briefcase.png"} />&nbsp;&nbsp;Jobs
								</li>
							}
							</NavLink>
							<NavLink to={"/AppliedCandidates"}>
							{ isappliedCandi ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/users-red-2.svg"} />&nbsp;&nbsp;Applied Candidates
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/users.svg"} />&nbsp;&nbsp;Applied Candidates
								</li>
							}
							</NavLink>
						</ul>
						<h6 className="margin-top-for-side-nav-head bold-family profile-head-font">Consulting</h6>
						<ul id="menu-content" className="menu-content out">
							<NavLink to={"/Company_Resume"}>
							{ isresume ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/page-content-red.png"} />&nbsp;&nbsp;Resume
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/page-content.png"} />&nbsp;&nbsp;Resume
								</li>
							}
							</NavLink>
							<NavLink to={"/Company_Applied_Job"}>
							{ isappliedJob ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/page-check-red.png"} />&nbsp;&nbsp;Applied Job
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/page-check.png"} />&nbsp;&nbsp;Applied Job
								</li>
							}
							</NavLink>
						</ul>
						<h6 className="margin-top-for-side-nav-head bold-family profile-head-font">Business</h6>
						<ul id="menu-content" className="menu-content out">
							<NavLink to={"/company/services"}>
							{ isservice ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/service-red.svg"} />&nbsp;&nbsp;Service
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/search.svg"} />&nbsp;&nbsp;Service
								</li>
							}
							</NavLink>
							<NavLink to={"/company/products"}>
							{ isproducts ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/laptop-red.svg"} />&nbsp;&nbsp;Product
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/laptop.svg"} />&nbsp;&nbsp;Product
								</li>
							}
							</NavLink>
							<NavLink to={"/company/news"}>
							{ isnews ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/newspaper-red.svg"} />&nbsp;&nbsp;News
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/newspaper.svg"} />&nbsp;&nbsp;News
								</li>
							}
							</NavLink>
							<NavLink to={"/company/interested"}>
							{ isintereted ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/bookmark-red.svg"} />&nbsp;&nbsp;Interested
								</li>
							:
								<li className="sidebar-padding">
									<img src={process.env.PUBLIC_URL + "/bookmark.svg"} />&nbsp;&nbsp;Interested
								</li>
							}
							</NavLink>
							<NavLink to={"/company/events"}>
							{ isevents ? 
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/events-red.svg"} />&nbsp;&nbsp;Events
								</li>
							:
								<li className="sidebar-padding" >
									<img src={process.env.PUBLIC_URL + "/events.svg"} />&nbsp;&nbsp;Events
								</li>
							}
							</NavLink>
						</ul>
						<h6 className="margin-top-for-side-nav-head bold-family profile-head-font">Contact</h6>
						<ul id="menu-content" className="menu-content out">
							<NavLink to={"/company-mailbox"}>
							{ ismailbox ?
								<li className="sidebar-padding" >
									<img  src={process.env.PUBLIC_URL + "/mailbox_red.png"} />&nbsp;&nbsp;Mailbox
								</li>
							:
								<li className="sidebar-padding" >
									<img  src={process.env.PUBLIC_URL + "/inbox.png"} />&nbsp;&nbsp;Mailbox
								</li>
							}
							</NavLink>
						</ul>
					</div>
				</div>
			</Row>
			
			)
	}
}

export default SideNav;