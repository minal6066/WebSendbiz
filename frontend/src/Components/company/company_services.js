import React , { Component } from 'react';
import Box from '../candidate/box.js';
import Footer from '../footer/footer.js';
import './company.css';
import axios from 'axios';
import { Spin } from 'antd';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import moment from 'moment';

export default function CompanyServices(props){
		return(
			<>
				<h6 className="about-company w-100">0 Services listed</h6>
				<div className="col-sm-8 p-0 text-left">
				{props.ser_data.map((value,index) => (
					<div className="row shadow-lg bg-white rounded custom-row card-border card-padding-margin" key={index}>
						<div className="col-sm-2 p-0 text-center">
							<img src={ process.env.PUBLIC_URL + "/rectangle.png"} alt="profile image" />
						</div>
						<div className="col-sm-8">
							<h3 className="company-profile-heading-1">{value.name}</h3>
							<p className="favourite-para-1"><p className="permanent m-0" style={{width:"130px"}}>TECHNOLOGY</p></p>
							<ul className="menu-content resume-ul form-inline text-center" style={{bottom:"unset"}}>
								<li style={{paddingRight:"10px"}} className="favourite-para-1">
									<i className="fa fa-map-marker resume-color" aria-hidden="true"></i>&nbsp;&nbsp;{value.location}
								</li>
								<li style={{paddingRight:"10px"}} className="favourite-para-1" >
									<img src={process.env.PUBLIC_URL + "/countdown.png"} style={{width:"10%"}} />&nbsp;&nbsp;{value.duration}
								</li>
								<li style={{paddingRight:"10px"}} className="favourite-para-1" >
									<i className="fa fa-clock-o resume-color" aria-hidden="true"></i>&nbsp;&nbsp;Posted 2 days ago
								</li>
							</ul>
						</div>
						<div className="col-sm-2 text-right">
							{/*<p className="resume-last-days">Last updated on 5 July</p>*/}
							<p className="sponsered">SPONSERED</p>
						</div>
					</div>
				))}	
				</div>
			</>
			)
}

