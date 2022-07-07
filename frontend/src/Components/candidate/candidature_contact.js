import React , { Component } from 'react';
import D from "../asset/Group 51.png"
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select,Row,Col,Input } from 'antd';
import { message } from "antd";
import APIManager from "../../APIManager/index";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Formik } from 'formik';
import CustomMap from './map.js';
let formButton = null;
const { Option } = Select;

class CandidatureContact extends Component {
	constructor(props){
		super(props);
	}
	handleClick = () =>{
		console.log("hello")
		formButton.click();
	}
	render(){
		const data = this.props.data
		let lat =this.props.data.location ? this.props.data.location.latitude:""
		let long = this.props.data.location ? this.props.data.location.longitude:""
		console.log(data)
		return(
			<>
			<Formik
		          initialValues={{
					phoneNumber: data.phoneNumber ? data.phoneNumber:"",
					landlineNumber: data.landlineNumber ? data.landlineNumber :"",
					addressOne: data.addressOne ? data.addressOne:"",
					addressTwo: data.addressTwo ? data.addressTwo:"",
					city:data.city ? data.city:"",
					state:data.state ? data.state:"",
					zipCode:data.zipCode ? data.zipCode:"",
					country:data.country ? data.country:""
				}}
		          onSubmit={(values, { setSubmitting }) => {
		            setTimeout(() => {
		              setSubmitting(false);
		              this.props.setData(values);
		            }, 500);
		          }}
		          validationSchema={Yup.object().shape({
		            // foundingYear:Yup.string().required("required"),
		            // companyInfo:Yup.string().required("required"),
		            // avgAge:Yup.string().required("required"),
		            // tags:Yup.string().required("required"),
		            //  companyCategory:Yup.string().required("required"),
		           // fruit: Yup.string().required('required'),
		          })}
		        >
		          {(formikProps) => {
		            const {
		              values,
		              errors,
		              handleChange,
		              handleSubmit,
		              setFieldValue,
		              setFieldTouched,
		            } = formikProps;
            	return (
				<form onSubmit={formikProps.handleSubmit}>
					<Row>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Phone Number</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={values.phoneNumber}
							name="phoneNumber" 
							onChange={handleChange} placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile">Landline Number</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={values.landlineNumber}
							name="landlineNumber"
							onChange={handleChange} placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Address Line 1</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={values.addressOne}
							name="addressOne"
							onChange={handleChange} placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile" htmlFor="exampleInputLastName1">Address Line 2</label>
							<Input type="text" 
								className="input-field-custom-type-1-left" 
								value={values.addressTwo}
								name="addressTwo"
								onChange={handleChange} placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">City</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={values.city}
							name="city"
							onChange={handleChange}
							placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile">State</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={values.state}
							name="state" 
							onChange={handleChange} 
							placeholder=""/>
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Country</label>
							<Input type="text" 
							value={values.country}
							name="country"
							onChange={handleChange}
							className="input-field-custom-type-1-left" 
							placeholder="" />
						</Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile">Zip Code</label>
							<Input type="number" 
							className="input-field-custom-type-1-left" 
							name="zipCode"
							value={values.zipCode}
							onChange={handleChange} 
							placeholder=""/>
						</Col>
          			</Row>
					<button
						style = {{opacity:0}}
						type={'submit'}
						ref={(e) => {
						formButton = e;
						}}
					></button>
				</form>
				);
	          	}}
			</Formik>
			<CustomMap lat={lat} long={long} />
			</>

			)
	}
}
export default CandidatureContact;