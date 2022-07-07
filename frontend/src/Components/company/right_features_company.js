import React , { Component } from 'react';

export default function RightFeature(){
	return(
		<div className="col-sm-3 custom-col-3 p-0 left-card-margin-padding card-border">
			<div className="bg-white p-3">
				<div className="row custom_row">
					<div className="col-8 side-navbar-heading-company-1 pl-0">Featured Jobs</div>
					<div className="col-4 p-0 side-navbar-heading-company-2">View All&nbsp;&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></div>
				</div>
				<ul className="icons-listing p-0">
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
				</ul>
			</div>
			<div className="bg-white p-3 mt-4">
				<div className="row custom_row">
					<div className="col-8 side-navbar-heading-company-1 pl-0">Featured Services</div>
					<div className="col-4 side-navbar-heading-company-2">View All&nbsp;&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></div>
				</div>
				<ul className="icons-listing p-0">
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
				</ul>
			</div>

			<div className="bg-white p-3 mt-4">
				<div className="row custom_row">
					<div className="col-8 side-navbar-heading-company-1 pl-0">Featured Products</div>
					<div className="col-4 side-navbar-heading-company-2">View All&nbsp;&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></div>
				</div>
				<ul className="icons-listing p-0">
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
					<li>
						<img src={process.env.PUBLIC_URL + "/feature_jobs.png"} className="feature_jobs_company" alt="feature jobs" />
						<p className="partner-text mb-0">
							<span className="partner-text-span-1">Marketing Services</span>
							<span className="partner-text-span-2">July 11, 2020</span>
						</p>
					</li>
				</ul>
			</div>
		</div>
		)
}