import React , { Component } from 'react';
import Box from '../candidate/box.js';
import Footer from '../footer/footer.js';
import './company.css';
import axios from 'axios';
import { Spin } from 'antd';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import moment from 'moment';

export default function CompanyEvents(props){
		return(
			<>
				<h6 className="about-company w-100">{props.events_data.length} News Articles</h6>
				<div className="col-sm-8 p-0 text-left">
				{props.events_data.map((data,index)=>(
					<div class="row bg-white rounded custom-row card-border card-padding-margin">
						<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
							<li style={{padding:0}}>
								<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
							</li>
							<li style={{padding:0}}>
								<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
								<p className="chat-online-status mb-0">2 hrs ago</p>
							</li>
						</ul>
						<p className="company_event_heading-1">Company Awards 2k20 in California</p>
						<img src={process.env.PUBLIC_URL + "/company_event_1.png"} style={{width:"100%"}} />
						<ul className="menu-content resume-ul form-inline text-center" style={{bottom:"unset"}}>
							<li style={{padding:0}}></li>
							<li style={{padding:0}}></li>
							<li style={{padding:0}}></li>
						</ul>
						<p className="company_event_heading-2">Comments (4)</p>
						<div className="row msg-box custom-row bg-white inbox-chat-screen-border-bottom msg-chat-full-screen inbox-padding-left-right">
							<div className="msg-screen">
								<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
									<li style={{padding:0}}>
										<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
									</li>
									<li style={{padding:0}}>
										<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
										<p className="chat-online-status mb-0">2 hrs ago</p>
									</li>
								</ul>
								<p className="event-msg-content-line-left">How are you doing in this situation mate ?</p>
							</div>
							<div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div>
							<div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div>
							<div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div>
							<div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div><div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div><div className="msg-screen">
								<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
							</div>
						</div>
						<div className="row w-100 msg-box custom-row bg-white inbox-chat-screen-border-bottom inbox-padding-left-right p-3">
							<div class="input-group">
								<input type="text" className="form-control search-field msg-enter-box company-form-control" placeholder="Comments here" />
								<div class="input-group-append chat-icon-border">
									<span class="input-group-text chat-background chat-send-icon border-none"><i class="fa fa-paper-plane"></i></span>
								</div>
							</div>
						</div>
					</div>
				))}
		    		
				</div>       		
			</>
			)
	}
