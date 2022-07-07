import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';

class MailBox extends Component{
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
						<h5 className="candidate_heading">Mailbox</h5>
						<div class="row shadow-lg mb-5 bg-white rounded custom-row">
							<ul className="menu-content form-inline mailbox-list-style text-center mb-0">
								<li className="favourite-para mailbox-nav-heading profile-active">
									NOTIFICATIONS
								</li>
								<li className="favourite-para mailbox-nav-heading" onClick={this.gotoInbox.bind(this)} >
									MESSAGES
								</li>
							</ul>
						</div>
						<h6 className="mark-as-all-read">MARK ALL AS READ</h6>
						<div className="row shadow-lg p-3 mb-5 bg-white mail-border custom-row unread-mail">
							<ul className="menu-content form-inline mailbox-list-style text-center mb-0 p-0">
								<li className="favourite-para p-0">
									<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
								</li>
								<li className="favourite-para p-0 pl-3">
									<h6 className="mail-name-content"><bold className="mail-name-user">Shivani Sharma</bold> applied for a job</h6>
									<p className="mb-0 text-left">2h</p>
								</li>
							</ul>
						</div>
						<div className="row shadow-lg p-3 mb-5 bg-white mail-border custom-row">
							<ul className="menu-content form-inline mailbox-list-style text-center mb-0 p-0">
								<li className="favourite-para p-0">
									<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
								</li>
								<li className="favourite-para p-0 pl-3">
									<h6 className="mail-name-content"><bold className="mail-name-user">Shivani Sharma</bold> applied for a job</h6>
									<p className="mb-0 text-left">2h</p>
								</li>
							</ul>
						</div>
						<div className="row shadow-lg p-3 mb-5 bg-white mail-border custom-row">
							<ul className="menu-content form-inline mailbox-list-style text-center mb-0 p-0">
								<li className="favourite-para p-0">
									<img src={ process.env.PUBLIC_URL + "/chat.png"} style={{width:"70%"}} className="resume_profile_image" alt="profile image" />
								</li>
								<li className="favourite-para p-0 pl-3">
									<h6 className="mail-name-content"><bold className="mail-name-user">Shivani Sharma</bold> applied for a job</h6>
									<p className="mb-0 text-left">2h</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				</>
			)
	}
}

export default MailBox;