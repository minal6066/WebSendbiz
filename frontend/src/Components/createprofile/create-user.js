import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Alert } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import { Row, Col, Input, Select, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserIcon from '../asset/rectangle@3x.jpg';
import { message } from "antd";
import APIManager from "../../APIManager/index";
import * as Yup from 'yup';
import cardDefaultPic from '../../Components/asset/user.svg';
import './create-user.css'
const { TextArea } = Input;
const { Option } = Select;
let formButton = null;

const initialValues = {
	image: UserIcon,
	job_title: "",
	first_name: "",
	last_name: "",
	email_id: "",
	permissions: "",
	monthly_fee: "",
	password: "",
	phone: "",

};
class AddUser extends Component {

	state = {
		uploadedImage: cardDefaultPic,
		isImage: false,
		image: "",
		alert: false,
		alertMessage: "",
	}

	toBase64 = (file) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ uploadedImage: reader.result })
			}
		}
		reader.readAsDataURL(file);
	};


	onChange = (newFileList) => {
		this.setState({ isImage: true, image: newFileList })
		this.toBase64(newFileList)
	}
	clickSubmitClick = () => {
		formButton.click()
	}
	createUser = (data) => {
		console.log(data)
		let formdata = new FormData();
		formdata.append("first_name", data.first_name)
		formdata.append("last_name", data.last_name)
		formdata.append("email", data.email_id)
		formdata.append("title", data.job_title)
		formdata.append("permission", data.permissions)
		formdata.append("fee", data.monthly_fee)
		formdata.append("password", data.password)
		formdata.append("phone", data.phone)
		if (this.state.isImage) {
			formdata.append("subUserImage", this.state.image, this.state.image.name)
		}
		APIManager.createSubUser(formdata)
			.then((response) => {
				// console.log(response)
				if (response.data.status === "success") {
					this.props.isClose()
					this.props.refreshPage()
					message.info("Data saved successfully");

				}
			})
			.catch((error) =>
				this.setState({
					alert: true,
				    alertMessage: error.response.data.message,
				})
			);

	}
	selectOnchange = (value) => {
		// console.log(value)
		initialValues.monthly_fee = value
		// console.log(initialValues)
	}
	handleChangePermissions = (value) => {
		initialValues.permissions = value
	}
	render() {
		console.log(this.props)
		return (
			<Formik initialValues={initialValues}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setSubmitting(false);
						// console.log(values)
						this.createUser(values);
					}, 500);
				}}
				validationSchema={Yup.object().shape({
					job_title: Yup.string().required('job title is required.'),
					first_name: Yup.string().required('first name is required.'),
					last_name: Yup.string().required('last name is required.'),
					email_id: Yup.string().email().required('email is required.'),
					password: Yup.string().required("password is required").min(6, 'password length must be 6 digit.'),
					phone: Yup.number().required("phone no is required"),
				})} >
				{(formikProps) => {
					const {
						values,
						errors,
						handleChange,
						handleBlur,
						touched,
					} = formikProps;
					return (
						<form onSubmit={formikProps.handleSubmit}>
							<Row style={{ paddingBottom: 25 }}>
								<div style={{ width: "100%", height: 85 }}>
									<p className="input-label-field-custom-type-1">Image</p>
									<Avatar size={92} icon={<img src={this.state.uploadedImage} />} />&nbsp;&nbsp;
										<label className="add-user-upload-image">
										<input accept="image/*" id="raised-button-file" multiple type="file"
											onChange={(event) => {
												this.onChange(event.target.files[0])
											}
											}
											name="image"
										/>
										<span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;UPLOAD IMAGE</span>
									</label>
								</div>
							</Row>
							<Row style={{ marginTop: 40 }}>
								<label className="input_label_profile">Job Title</label>
								<input
									name="job_title"
									onChange={handleChange}
									className="input-field-custom-type-1-left input-border"
									placeholder="Enter Job Title" />
								{errors.job_title && (
									<div style={{ color: 'red', fontSize: '12px' }}>
										{errors.job_title}
									</div>
								)}
							</Row>
							<Row>
								<Col span={12} className="form-padding-right">
									<label className="input_label_profile">First Name</label>
									<input
										name="first_name"
										onChange={handleChange}
										className="input-field-custom-type-1-left input-border"
										placeholder="Enter First Name" />
									{errors.first_name && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.first_name}
										</div>
									)}
								</Col>
								<Col span={12} className="form-padding-left">
									<label className="input_label_profile">Last Name</label>
									<input
										name="last_name"
										onChange={handleChange}
										className="input-field-custom-type-1-left input-border"
										placeholder="Enter Last Name" />
									{errors.last_name && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.last_name}
										</div>
									)}
								</Col>
								<Col span={12} className="form-padding-right">
									<label className="input_label_profile">Email id</label>
									<input
										name="email_id"
										onChange={handleChange}
										className="input-field-custom-type-1-left input-border"
										placeholder="Enter Email ID" />
									{errors.email_id && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.email_id}
										</div>
									)}
								</Col>
								<Col span={12} className="form-padding-left">
									<label className="input_label_profile">Permissions</label>
									<select
										name="permissions"
										onChange={handleChange}
										placeholder="Select User"
										className="input-field-custom-type-1-left input-border"
									>
										<option value="">Select User</option>
										<option value="Supper User">Supper User</option>
										<option value="Admin">Admin</option>
									</select>
									{errors.permissions && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.permissions}
										</div>
									)}
								</Col>
								{/* <Col span={12} className="form-padding-right">
										<label className="input_label_profile">Monthly Fee</label>
										<select 
											name="monthly_fee" 
											onChange={handleChange}
											placeholder="Select Fee"
											className="input-field-custom-type-1-left input-border"
										>
											<option value="">Select Fee</option>
											<option value="15">$ 15</option>
											<option value="16">$ 16</option>
											<option value="17">$ 17</option>
										</select>
										{errors.monthly_fee && (
					                        <div style={{ color: 'red', fontSize: '12px' }}>
					                          {errors.monthly_fee}
					                        </div>
					                    )}
									</Col> */}
								<Col span={12} className="form-padding-left">
									<label className="input_label_profile">Password</label>
									<input
										name="password"
										type="password"
										onChange={handleChange}
										className="input-field-custom-type-1-left input-border"
										placeholder="Enter Password" />
									{errors.password && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.password}
										</div>
									)}
								</Col>
								<Col span={12} className="form-padding-right">
									<label className="input_label_profile">Phone Number</label>
									<input
										type="number"
										name="phone"
										onChange={handleChange}
										className="input-field-custom-type-1-left input-border"
										placeholder="Enter Phone No"
										maxLength="15" />
									{errors.phone && (
										<div style={{ color: 'red', fontSize: '12px' }}>
											{errors.phone}
										</div>
									)}
								</Col>
							</Row>
							{this.state.alert ?
								<Alert
									description={this.state.alertMessage}
									type="error"
									closable
									onClose={() => { this.setState({ alert: false, alertMessage: "" }) }}
								/> : ""
							}

							<button style={{ opacity: 0 }} type={"submit"} ref={(e) => { formButton = e }}>ADD </button>
						</form>
					)
				}}
			</Formik>
		)
	}
}
export default AddUser;