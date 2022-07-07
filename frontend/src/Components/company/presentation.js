import React , { Component } from 'react';

export default function Presentation(props) {
  return(
  	<div className="col-sm-8 bg-white p-3 card-border text-left about-company-left-padding">
		<h6 className="about-company">About the company</h6>
		<p className="about-company-para">
			{props.data.comp_info.comp_info}
		</p>
	</div>
  )
}
