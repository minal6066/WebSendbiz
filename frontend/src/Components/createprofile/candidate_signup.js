import React , { Component } from 'react';
import './signup.css';
import axios from 'axios';
import APIManager from "../../APIManager/index";
import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution
import { message } from "antd";
import { connect } from "react-redux";
import { Checkbox } from 'antd';
import {withRouter}from "react-router-dom";

class Candidatesignup extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			password1validation:false,
			password2validation:false,
			termsandcondition:false,
			formIsValid:true
			
		}
	}
	onSubmit =(e, { setSubmitting }) =>{
  		// console.log(e)
  		setTimeout(() => {
            setSubmitting(false);
            this.finalSubmit(e);
        }, 500);
  	}
	finalSubmit(data){
		const signupCredentials={
			"email": data.email,
			"password": data.password,
			"confirm_password": data.confirm_password,
			"user_type":this.props.signup_type,
			"can_detail":{
				'first_name':data.first_name,
				'last_name':data.last_name,
			}
		}

		APIManager.Signup(signupCredentials)
			.then((response) => {
				if(response.data.isSuccess){
					const authToken = response.data.token;
					const userType = response.data.data.user.user_type;
					var ls = require('local-storage');
					ls.set('token', authToken);
					ls.set('user_type', userType);
					console.log(response.data.data)
					const candidateEmail = response.data.data.user.email;
					const firstName = response.data.data.candidate.can_detail.first_name;
					const lastName = response.data.data.candidate.can_detail.last_name;
					console.log(response.data)
					const fullName = `${firstName} ${lastName}`;
					ls.set('email', candidateEmail);
					ls.set('name', fullName);
					message.info("User added successfully");
					this.props.history.push('/profile');
				}
				else{
					message.info(response.data.message);
				}
		})
		.catch((err,response) =>{
			console.log(err,response)
			message.error("Wrong Credentials or something went wrong.")
		}
		
		);	
	}
	
	
	render() {
		console.log(this.props.signup_type)
		return (
		  <Formik
			initialValues={{ 
				email: "", 
				password: "", 
				confirm_password:"", 
				first_name: "", 
				last_name: "",
				password:"",
				confirm_password:"",
				termsandcondition: false
			}}
			onSubmit={this.onSubmit}
			validationSchema={Yup.object().shape({
			  email: Yup.string().email().required("email is required."),
			  password: Yup.string().required("password is required."),
			  confirm_password: Yup.string().required("confirm password is required.").oneOf([Yup.ref('password'), null], 'Passwords must match'),
			  first_name: Yup.string().required("first name is required"),
			  last_name: Yup.string().required("last name is required"),
			  termsandcondition: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
			  
			})}
		  >
			{(formikProps) => {
			  const {
				values,
				touched,
				errors,
				dirty,
				isSubmitting,
				handleChange,
				handleBlur,
				handleSubmit,
				isValid,
			  } = formikProps;
			  return (
				<>
					<form onSubmit={formikProps.handleSubmit}>
						<div className="form-group mb-signup-1">
							<label className="you_are_cls" htmlFor="exampleInputFullName">First Name</label>
							<input 
							type="text" 
							name="first_name"
							className="form-control input-font login-form-control"   
							onChange={handleChange}
							id="CandidateFirstName" 
							placeholder="Enter first name" 
							/>
							{errors.first_name && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.first_name}
								</div>
							)}
						</div>
						<div className="form-group mb-signup-1">
							<label className="you_are_cls" htmlFor="exampleInputLastName">Last Name</label>
							<input type="text"
							 name="last_name"
							className="form-control input-font login-form-control"  
							onChange={handleChange}
							id="exampleInputLastName" aria-describedby="fullnameHelp" 
							placeholder="Enter last name" required />
							{errors.last_name && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.last_name}
								</div>
							)}
						</div>
						<div className="form-group mb-signup-1">
							<label className="you_are_cls" htmlFor="exampleInputEmail1">Email ID</label>
							<input 
							type="email"
							name="email" 
							className="form-control input-font login-form-control" 
							onChange={handleChange}
							id="exampleInputEmail1" 
							aria-describedby="email1Help" 
							placeholder="Enter Email ID" 
							/>
							{errors.email && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.email}
								</div>
							)}
						</div>
						<div className="form-group mb-signup-1">
							<label className="you_are_cls" htmlFor="exampleInputPeoplePassword">Password</label>
							<input type="password"
							name="password" 
							className="form-control input-font login-form-control" 
							onChange={handleChange} 
							id="exampleInputPeoplePassword" 
							aria-describedby="password1Help" 
							placeholder="Enter your password" 
							minLength="8" 
							/>
							{errors.password && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.password}
								</div>
							)}
								{/*<span className="help-block"></span>*/}
						</div>
						<div className="form-group mb-signup-1">
							<label className="you_are_cls" htmlFor="confirmPassword">Confirm Password</label>
							<input type="password" 
							name="confirm_password" 
							className="form-control input-font login-form-control" 
							id="confirmPassword" placeholder="Re-Enter your password" 
							onChange={handleChange} />
							{errors.confirm_password && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.confirm_password}
								</div>
							)}
						</div>
						<div className="form-check mb-signup-1" style={{paddingLeft:"0"}}>
							<Checkbox name="termsandcondition" checked={values.termsandcondition} onChange={handleChange} value={values.termsandcondition}>
								<label className="input_label_profile form-check-label-2" htmlFor="exampleCheck1">
									&nbsp;&nbsp;I have read and accepted the terms and conditions published by JobHunt.com. &nbsp;&nbsp;
									<small className="cursor terms-link" >Read all</small>
								</label>
							</Checkbox>
							
							{errors.termsandcondition && (
								<div style={{ color: "red", fontSize: "12px" }}>
								{errors.termsandcondition}
								</div>
							)}
						</div>
						<div className="cent_button">
							<button type="submit" className="btn btn-dark login-button-font">Next</button>
						</div>
					</form>
				</>
			  );
			}}
		  </Formik>
		);
	  }
	
}
const mapStateToProps = ({ AuthReducer: { user } }) => ({ user });
export default withRouter(connect(mapStateToProps)(Candidatesignup));