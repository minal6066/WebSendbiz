import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';


class Inbox extends Component{
	gotoProfile(){
		this.props.history.push("/profile")
	}
	gotoCandidature(){
		this.props.history.push("/candidature")
	}
	gotoResume(){
		this.props.history.push("/resume")
	}
	gotoFavouriteJobs(){
		this.props.history.push("/favouritejobs")
	}
	gotoAppliedJobs(){
		this.props.history.push("/appliedjobs")
	}
	gotoMailbox(){
		this.props.history.push("/mailbox")
	}
	gotoStatistics(){
		this.props.history.push("/statistics")
	}
	gotoInbox(){
		this.props.history.push("/inbox")
	}
	render(){
		return(
				<>
				<div className="row row-top">
					
					<div className="col-sm-11">
						<h5 className="candidate_heading favouritejobsheading-2">Mailbox</h5>
						{/*<div className="row shadow-lg mb-4 bg-white rounded custom-row">
							<ul className="menu-content form-inline mailbox-list-style text-center mb-0">
								<li className="mailbox-para mailbox-nav-heading" onClick={this.gotoMailbox.bind(this)}>
									NOTIFICATIONS
								</li>
								<li className="mailbox-para profile-active mailbox-nav-heading" onClick={this.gotoInbox.bind(this)}>
									MESSAGES
								</li>
							</ul>
						</div>*/}
						
						<div className="row mb-4 mail-border custom-row">
							<div className="col-sm-6 pl-0">
								<div className="input-group mb-3 ">
									<div className="input-group-prepend">
										<span className="input-group-text search-field-label" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
									</div>
									<input type="search" className="form-control search-field search_field_height" placeholder=" Search for users" />
								</div>
								<div className="row custom-row mb-3 ">
									<div className="col-sm-6 p-0">
										<select className="form-control search_field_height">
											<option value="">Sort by</option>
											
										</select>
									</div>
									<div className="col-sm-6">
										
									</div>
								</div>
								<div className="overflow-class pl-2 pr-2">
									<div className="row shadow-lg p-3 mb-3 bg-white mail-border custom-row">
										<div className="col-sm-6 padding-inbox-head inbox-padding-bottom">
											<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
												<li style={{padding:0}}>
													<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
												</li>
												<li style={{padding:0}}>
													<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
													{/*<p className="chat-online-status mb-0">Online</p>*/}
												</li>
											</ul>
										</div>
										<div className="col-sm-6 hours-ago-inbox text-right">
											<p className="chat-online-status mb-0">3h ago</p>
										</div>
										<p className="chat-online-status last-msg-inbox mb-0">Analysis of foreign experience, as it is comm…</p>
									</div>
									<div className="row shadow-lg p-3 mb-3 bg-white mail-border custom-row">
										<div className="col-sm-6 padding-inbox-head inbox-padding-bottom">
											<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
												<li style={{padding:0}}>
													<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
												</li>
												<li style={{padding:0}}>
													<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
													<p className="chat-online-status mb-0">Online</p>
												</li>
											</ul>
										</div>
										<div className="col-sm-6 hours-ago-inbox text-right">
											<p className="chat-online-status mb-0">3h ago</p>
										</div>
										<p className="chat-online-status last-msg-inbox mb-0">Analysis of foreign experience, as it is comm… <span className="unread-new-msg">1</span></p>
									</div>
									<div className="row shadow-lg p-3 mb-3 bg-white mail-border custom-row">
										<div className="col-sm-6 padding-inbox-head inbox-padding-bottom">
											<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
												<li style={{padding:0}}>
													<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
												</li>
												<li style={{padding:0}}>
													<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
													<p className="chat-online-status mb-0">Online</p>
												</li>
											</ul>
										</div>
										<div className="col-sm-6 hours-ago-inbox text-right">
											<p className="chat-online-status mb-0">3h ago</p>
										</div>
										<p className="chat-online-status last-msg-inbox mb-0">Analysis of foreign experience, as it is comm… </p>
									</div>
									<div className="row shadow-lg p-3 mb-3 bg-white mail-border custom-row">
										<div className="col-sm-6 padding-inbox-head inbox-padding-bottom">
											<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
												<li style={{padding:0}}>
													<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
												</li>
												<li style={{padding:0}}>
													<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
													<p className="chat-online-status mb-0">Online</p>
												</li>
											</ul>
										</div>
										<div className="col-sm-6 hours-ago-inbox text-right">
											<p className="chat-online-status mb-0">3h ago</p>
										</div>
										<p className="chat-online-status last-msg-inbox mb-0">Analysis of foreign experience, as it is comm… <span className="unread-new-msg">1</span></p>
									</div>
								</div>
							</div>
							<div className="col-sm-6 bg-white p-0">
								<div className="row msg-box custom-row bg-white inbox-chat-screen-border-bottom inbox-padding-left-right">
									<div className="col-sm-6 padding-inbox-head">
										<ul className="menu-content form-inline mailbox-list-style mb-0 p-0">
											<li style={{padding:0}}>
												<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
											</li>
											<li style={{padding:0}}>
												<h6 className="msg-inbox-user mb-0">Donald Johnson</h6>
												<p className="chat-online-status mb-0">Online</p>
											</li>
										</ul>
									</div>
									<div className="col-sm-6 triple-dots-inbox text-right">
										<i className="fa fa-ellipsis-h"></i>
									</div>
								</div>
								<div className="row msg-box custom-row bg-white inbox-chat-screen-border-bottom msg-chat-full-screen inbox-padding-left-right">
									<div className="msg-screen">
										<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
									</div>
									<div className="msg-screen-2">
										<p className="msg-content-line-right">How are you doing in this situation mate ?</p>
									</div>
									<div className="msg-screen-2">
										<p className="msg-content-line-right">How are you doing in this situation mate ?</p>
									</div>
									<div className="msg-screen-2">
										<p className="msg-content-line-right">How are you doing in this situation mate ?</p>
									</div>
									<div className="msg-screen">
										<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
									</div><div className="msg-screen">
										<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
									</div><div className="msg-screen">
										<p className="msg-content-line-left">How are you doing in this situation mate ?</p>
									</div>
								</div>
								<div className="row msg-box custom-row bg-white inbox-chat-screen-border-bottom inbox-padding-left-right p-3">
									<div className="input-group">
										<input type="text" className="form-control search-field msg-enter-box search_field_height" placeholder="Type a message here…" />
										<div className="input-group-append chat-icon-border">
											{/*<span className="input-group-text"><img style={{width:"100%"}} src={ process.env.PUBLIC_URL + "/paper-clip.png"} /></span>*/}
											{/*<span className="input-group-text">$</span>*/}
											{/*<span className="input-group-text"><img style={{width:"100%"}} src={ process.env.PUBLIC_URL + "/msg_send.png"} /></span>*/}
											
											<span className="input-group-text chat-document-icon " style={{margin:"0rem .375rem 0 .375rem"}}><i className="fa fa-paperclip"></i></span>
											<span className="input-group-text chat-background chat-send-icon"><i className="fa fa-paper-plane"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</>
			)
	}
}

export default Inbox;