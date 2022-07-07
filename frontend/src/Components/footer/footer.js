import React , { Component } from 'react';
import './footer.css';
import { Link, NavLink } from 'react-router-dom';
class Footer extends Component{
	render(){
		return(
			<>
			<div className="row custom-row footer-main-class-1 pt-5 mt-5 p-0">
				<div className="col-4 footer-col-4-1 text-center pt-4">
					<h3>JobHunt</h3>
				</div>
				<div className="col-8">
					<ul className="list-style-footer-main">
						<li>
							<ul className="list-style-footer">
								<NavLink to={'/about-us'} style={{padding: 0}}>
								<li>
									<h6 className="first-footer-heading">ABOUT US</h6>
								</li>
								</NavLink>
								<NavLink to={'/price'} style={{padding: 0}}>
								<li>
									<p className="footer-heading-all">Price</p>
								</li>
								</NavLink>
								<li>
									<p className="footer-heading-all">Demo</p>
								</li>
								<li>
									<p className="footer-heading-all">Jobs</p>
								</li>
								<li>
									<p className="footer-heading-all">Blogs</p>
								</li>
								<NavLink to={'/terms-and-conditions'} style={{padding: 0}}>
								<li>
									<p className="footer-heading-all">TnC</p>
								</li>
								</NavLink>
								<NavLink to={'/privacy-policy'} style={{padding: 0}}>
								<li>
									<p className="footer-heading-all">Privacy Policy</p>
								</li>
								</NavLink>
								<NavLink to={'/gdpr-policy'} style={{padding: 0}}>
								<li>
									<p className="footer-heading-all">GDPR Policy</p>
								</li>
								</NavLink>
							</ul>
						</li>
						<li>
							<ul className="list-style-footer">
								<li>
									<h6 className="first-footer-heading">PRODUCT</h6>
								</li>
								<NavLink to={'/why_choose'} style={{padding: 0}}>
									<li>
										<p className="footer-heading-all">Why Choose us?</p>
									</li>
								</NavLink>
								<NavLink to={'/features'} style={{padding: 0}}>
									<li>
										<p className="footer-heading-all">Features</p>
									</li>
								</NavLink>
								
								<li>
									<p className="footer-heading-all">Solutions</p>
								</li>
								<li>
									<p className="footer-heading-all">For companies</p>
								</li>
								<li>
									<p className="footer-heading-all">Candidate</p>
								</li>
								
							</ul>
						</li>
						<li>
							<ul className="list-style-footer">
								<li>
									<h6 className="first-footer-heading">SUPPORT</h6>
								</li>
								<li>
									<p className="footer-heading-all">Video</p>
								</li>
								<li>
									<p className="footer-heading-all">FAQ’s</p>
								</li>
								<li>
									<p className="footer-heading-all">Contact Us</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			</>
			)
	}
}

export default Footer;