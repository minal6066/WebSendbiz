import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import { Row,Col,Input} from 'antd';
import UserIcon  from '../asset/rectangle@3x.jpg';
import Axios from '../axios/axios_setup';
import './create-user.css'
let formButton=null;

const initialValues = {
	Title: "",
	Link: ""
  };
class CreateLink extends Component{

	state={
		uploadedImage:UserIcon
	}
  	onSubmit =(e) =>{
  		console.log(e)
  		this.props.setdata(e)

  	}
  	clickSubmitClick = () =>{
  		formButton.click()
  	}
  	
	render(){
		// console.log(this.state.uploadedImage)
		return(
				<Formik initialValues={initialValues} onSubmit={this.onSubmit} >
					{(formikProps) => {
						const {
						  values,
						  errors,
						  handleChange,
						  handleBlur,
						  touched,
						} = formikProps;
						return(
							<form onSubmit={formikProps.handleSubmit}>
								<Row style={{marginTop:40}}>
									<div style={{width:"100%",height:85}}>
										<p className="input-label-field-custom-type-1">Title</p>
										<input name="Title" value={values.title} onChange={handleChange} 
										className="input-field-custom-type-1-left input-border" placeholder="Enter Title"></input>
									</div>
								</Row>
								<Row style={{marginTop:40}}>
									<div style={{width:"100%",height:85}}>
										<p className="input-label-field-custom-type-1">Link</p>
										<input name="Link" value={values.link} onChange={handleChange} 
										className="input-field-custom-type-1-left input-border" placeholder="Enter Link"></input>
									</div>
								</Row>
								<button style={{opacity:0}} type={"submit"} ref={(e) => { formButton =e }}>ADD </button>         
							</form>
						)}}
					</Formik>
			)
	}
  }
  export default CreateLink;