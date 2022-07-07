import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import axios from 'axios';
import PopupModal from './passwordmodel.js';
import 'antd/dist/antd.css';
import { Tabs,Select,Input,Row,Col,Form } from 'antd';
import { MapKey } from '../../Shared/imageUrlPath'
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { message } from "antd";
import { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';
import APIManager from "../../APIManager/index";
import HELPERS from "../../APIManager/helper";
import GoogleSearch from './googlesearch'
const { Option } = Select;
let formButton = null;



class ProfileForm extends Component {
	constructor(props){
		super(props);
		this.formRef=React.createRef();
		this.state = {
			candidatecategory : [],
			candidatecontract : "",
			candidesired_location : [],
			candidateskills : [],
			current_location: "",
			lat:"",
			long:"",
			profile_photo:""
			
		}
	}
	componentDidMount(){
		console.log(this.props.data.data.data.can_contact)
		if(this.props.data.data.data.can_contact !== null){
			this.setState({
				lat: this.props.data.data.data.can_detail.location ? 
				this.props.data.data.data.can_detail.location.latitude :"",
				long: this.props.data.data.data.can_detail.location ? 
				this.props.data.data.data.can_detail.location.longitude :"",
				current_location: this.props.data.data.data.can_detail.currentLocation
			})
			if(this.props.data.data.data.can_detail.profile !== ""){
				this.setState({
					profile_photo : this.props.data.data.data.can_detail.profile
				})
			}
		}
		// this.handleCurrentLocation()	
	}
	takecurrentLocation = (value) =>{
		console.log(value)
		this.setState({current_location:value})
	}
	takeLatLong =(lat,long) =>{
		console.log(lat,long)
		this.setState({
			lat:lat,
			long: long
		})
	}
	finalSubmit = (data) =>{
		console.log(data,"==========")
		let formated_data = data
		formated_data["currentLocation"] = this.state.current_location
		if(this.props.image ===""){
			formated_data["candidateProfilePhoto"] = this.state.profile_photo
		}
		else{
			formated_data["candidateProfilePhoto"] = this.props.image
		}

		console.log(formated_data)
		// let ct = this.state.candidatecategory
		// let cc = this.state.candidatecontract
		// let cd = this.state.candidesired_location
		// let cs = this.state.candidateskills
		// data["current_location"] = this.state.current_location
		// data["contract"] = cc
		// // console.log(cl)
		// if(ct.length !== 0){
  //           this.setState({
  //             candidatecategory: ct.concat(data["category"])
  //           })
  //           let array = this.state.candidatecategory
  //           const uniqueNames = array.filter((val,id,array) => array.indexOf(val) == id);
  //           data["category"] = uniqueNames
  //       }
  //       // if(cc.length !== 0){
  //       //     this.setState({
  //       //       candidatecontract: cc.concat(data["contract"])
  //       //     })
  //       //     let array = this.state.candidatecontract
  //       //     const uniqueNames = array.filter((val,id,array) => array.indexOf(val) == id);
  //       //     data["contract"] = uniqueNames
  //       // }
  //       if(cd.length !== 0){
  //           this.setState({
  //             candidesired_location: cd.concat(data["desired_location"])
  //           })
  //           let array = this.state.candidesired_location
  //           const uniqueNames = array.filter((val,id,array) => array.indexOf(val) == id);
  //           data["desired_location"] = uniqueNames
  //       }
  //       if(cs.length !== 0){
  //           this.setState({
  //             candidateskills: cs.concat(data["skills"])
  //           })
  //           let array = this.state.candidateskills
  //           const uniqueNames = array.filter((val,id,array) => array.indexOf(val) == id);
  //           data["skills"] = uniqueNames
  //       }
		// let category = data["category"].join(',');
		// let contract = data["contract"]
		// let desired_location = data["desired_location"].join(',');
		// let skills = data["skills"].join(',');
		// // console.log(data);
		// let formdata = new FormData();
		// if(this.props.isImage){
		// 	console.log(this.props.image)
		// 	formdata.append("candidateProfilePhoto", this.props.image, this.props.image.name)
		// }

		// // formdata.append("firstName",data.first_name)
		// // formdata.append("lastName",data.last_name)
		// // formdata.append("jobCategory",category)
		// // formdata.append("occupation",data.occupation)
		// // formdata.append("availability",data.availability)
		// // formdata.append("currentLocation",data.current_location)
		// // formdata.append("desiredLocation",desired_location)
		// // formdata.append("contract",contract)
		// // formdata.append("hobbies",data.hobbies)
		// // formdata.append("skills",skills)
		// // formdata.append("description",data.bio)
		// // formdata.append("email",data.email)
		// // formdata.append("latitude",this.state.lat)
		// // formdata.append("longitude",this.state.long)
		// // // console.log(formdata)
		APIManager.candidateInfoSubmit(formated_data)
	      .then((response) => {
	      	console.log(response)
	        if (response.data.status === "success") {
	        	// this.props.onHide()
	          	message.info("Data saved successfully");
	          // console.log(response)
	        }
	      })
	      .catch((err) =>
	        message.error("Something went wrong.")
	      );
	}
	// getcurrentLocation = () =>{
	// 	var ls = require('local-storage');
	// 	let lat = ls.get('lat');
	// 	let long = ls.get('long')
	// 	HELPERS.getLocation(lat,long).then((response)=>{
	// 		console.log("response",response);
	// 		let location = response.data.results[9].formatted_address;
	// 		this.setState({current_location:location})
	// 	})
	// 	// console.log(location_name)
	// }
	handledClick = () =>{
		// console.log(this.formRef.current)
		this.formRef.current.submit();
	}
	handleCategoryChange = (data) =>{
		console.log(data)
		this.setState({candidatecategory:data})
	}
	handleContractChange = (data) =>{
		this.setState({candidatecontract:data})
	}
	handleSkillChange = (data) =>{
		this.setState({candidateskills:data})
	}
	handleLocationChange = (data) =>{
		this.setState({candidesired_location:data})
	}
	
	render(){
		console.log(this.state.lat)
		const can_data = this.props.data.data.data.can_detail;
		const current_location = can_data.currentLocation;
		return(
			<Row className="candidate-form-padding">
				{/*<Formik
		          initialValues={{
		            first_name: can_data.firstName,
		            last_name: can_data.lastName,
		            email: can_data.email,
		            category: can_data.jobCategory.filter(el => { return el != null && el != '';}),
		            occupation: can_data.occupation,
		            availability: can_data.availability,
		            current_location: can_data.currentLocation,
		            desired_location: can_data.desiredLocation.filter(el => { return el != null && el != '';}),
		            contract: can_data.contract,
		            hobbies:can_data.hobbies,
		            skills:can_data.skills.filter(el => { return el != null && el != '';}),
		            bio:can_data.description
		          }}
		          onSubmit={(values, { setSubmitting }) => {
		            setTimeout(() => {
		              setSubmitting(false);
		              // console.log(values, 'ddd');
		              this.finalSubmit(values);
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
            	return (*/}
						<Form 
							initialValues={{
								firstName: can_data.firstName,
								lastName: can_data.lastName,
								email: can_data.email,
								jobCategory: can_data.jobCategory.filter(el => { return el != null && el != '';}),
								occupation: can_data.occupation,
								availability: can_data.availability,
								current_location: can_data.currentLocation,
								desiredLocation: can_data.desiredLocation.filter(el => { return el != null && el != '';}),
								contract: can_data.contract,
								hobbies:can_data.hobbies,
								skills:can_data.skills.filter(el => { return el != null && el != '';}),
								description:can_data.description
							}}
							ref={this.formRef}
							onFinish={this.finalSubmit}
							className="w-100">
							<Row>
								<Col span={12} className="form-padding-right">
										<label className="input_label_profile">First Name</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name='firstName'>
											<Input type="text" 
											className="input-field-custom-type-1-left w-100"
											name="firstName"
											placeholder="Enter first name"/>
										</Form.Item>
								</Col>
								<Col span={12} className="form-padding-left">
										<label className="input_label_profile">Last Name</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name='lastName'>
											<Input type="text" 
												className="input-field-custom-type-1-left w-100"
												name="lastName"
												placeholder="Enter last name" />
										</Form.Item>
								</Col>
								<Col span={12} className="form-padding-right">
									<label className="input_label_profile">Email ID</label>
									<Form.Item
										style={{width:'100%',margin:0}}
										rules={[{required:true,message:'Required field'}]}
										name="email">
										<Input type="email" 
											className="input-field-custom-type-1-left w-100"
											name="email"
											readOnly
											placeholder="Enter email" />
									</Form.Item>
								</Col>
								<Col span={12} className="form-padding-left">
										<label className="input_label_profile">Job Category</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name="jobCategory">
											<Select
												mode="multiple"
												removeIcon={<img style={{width:14,height:14}} src={process.env.PUBLIC_URL + "/cancel.png"} />}
												className="input-label-field-custom-select-type-2"
												placeholder="Select job category"
												// onChange={this.handleCategoryChange}
												optionLabelProp="label"
												name="jobCategory"
						                        >
						                          <Option value="Service" label="Service">
						                            Service
						                          </Option>
						                          <Option value="Technical" label="Technical">
						                            Technical
						                          </Option>
						                    </Select>
						                </Form.Item>
								</Col>
								<Col span={12} className="form-padding-right">
										<label className="input_label_profile">Occupation</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name="occupation">
											<Input type="text" 
												className="input-field-custom-type-1-left w-100" 
												// value={values.occupation} 
												// onChange={handleChange}
												name="occupation" 
												id="exampleInputOccupation1"
												placeholder="Enter occupation"/>
										</Form.Item>
								</Col>
								<Col span={12} className="form-padding-left">
										<label className="input_label_profile">Availibity</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name="availability">
										<Select
					                          className="input-label-field-custom-select-type-4"
					                          placeholder="Select company availability"
					                          // onChange={handleChange}
					                          optionLabelProp="label"
					                          name="availability"
					                        >
					                          <Option value="immediately" label="immediately">
					                            immediately
					                          </Option>
					                          <Option value="within a week" label="within a week">
					                            within a week
					                          </Option>
					                          <Option value="within a month" label="within a month">
					                            within a month
					                          </Option>
					                          <Option value="between 1 - 3 months" label="between 1 - 3 months">
					                            between 1 - 3 months
					                          </Option>
					                          <Option value="more than 3 months" label="more than 3 months">
					                            more than 3 months
					                          </Option>
					                          <Option value="not available" label="not available">
					                            not available
					                          </Option>
					                    </Select>
					                </Form.Item>
										{/*<input type="text" className="input-font form-control profile-form-control" value={this.state.fields["availability"] || ""} 
										onChange={this.handleChange.bind(this, "availability")} id="exampleInputTitle1" 
										aria-describedby="titleHelp" placeholder="Enter availability" required />*/}
								</Col>
								<Col span={12} className="form-padding-right">
										<label className="input_label_profile" htmlFor="exampleInputDesiredLocation1">Cureent location</label>
										<GoogleSearch 
											className="input-field-custom-type-1-left w-100"
											location={current_location} 
											takecurrentLocation={this.takecurrentLocation} 
											takeLatLong={this.takeLatLong} />
								</Col>
								<Col span={12} className="form-padding-left">
										<label className="input_label_profile" htmlFor="exampleInputDesiredLocation1">Contract</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											rules={[{required:true,message:'Required field'}]}
											name="contract">
											<Select
												className="input-label-field-custom-select-type-4"
												placeholder="Select contract"
												// onChange={handleChange}
												optionLabelProp="label"
												name="contract"
						                        >
													<Option value="PERMANENT" label="PERMANENT">
						                            Permanent
						                          </Option>
						                          <Option value="FULL TIME" label="FULL TIME">
						                            Full Time
						                          </Option>
						                          <Option value="PART TIME" label="PART TIME">
						                            Part Time
						                          </Option>
						                          <Option value="TEMPORARY" label="TEMPORARY">
						                            Temporary
						                          </Option>
						                          <Option value="COMMISSION" label="COMMISSION">
						                            Commission
						                          </Option>
						                          <Option value="APPRENTICESHIP" label="APPRENTICESHIP">
						                            Apprenticeship
						                          </Option>
						                          <Option value="INTERNSHIP" label="INTERNSHIP">
						                            Internship
						                          </Option>
						                          <Option value="VOLUNTEER" label="VOLUNTEER">
													Volunteer
						                          </Option>
						                    </Select>
					                </Form.Item>
								</Col>
								<Col span={12} className="form-padding-right">
										<label className="input_label_profile">Desired Location</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											name="desired_location">
											<Select
												mode="multiple"
												removeIcon={<img style={{width:14,height:14}} src={process.env.PUBLIC_URL + "/cancel.png"} />}
												// defaultValue={values.desired_location}
												className="input-label-field-custom-select-type-profile-2 type-profile-2"
												placeholder="Select location"
												// onChange={this.handleLocationChange}
												optionLabelProp="label"
												name="desiredLocation"
						                        >
						                          <Option value="Gurrugram" label="Gurrugram">
						                            Gurrugram
						                          </Option>
						                          <Option value="Delhi" label="Delhi">
						                            Delhi
						                          </Option>
						                    </Select>
						                </Form.Item>
								</Col>
								<Col span={12} className="form-padding-left">
										<label className="input_label_profile">Hobbies</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											name="hobbies">
											<Input type="text" 
												className="input-field-custom-type-1-left w-100" 
												// value={values.hobbies}
												name="hobbies"
												// onChange={handleChange}
												placeholder="Enter hobbies"/>
											</Form.Item>
								</Col>
								<Col span={12} className="form-padding-right">
										<label className="input_label_profile" htmlFor="exampleInputSkills1">Skills</label>
										<Form.Item
											style={{width:'100%',margin:0}}
											name="skills">
											<Select
												mode="tags"
												removeIcon={<img style={{width:14,height:14}} src={process.env.PUBLIC_URL + "/cancel.png"} />}
												// defaultValue={values.skills}
												className="input-label-field-custom-select-type-profile-2 type-profile-2"
												placeholder="Select skills"
												// onChange={this.handleSkillChange}
												optionLabelProp="label"
												name="skills"
						                        >
						                    </Select>
						                </Form.Item>
								</Col>
							</Row>
							<Row>
								<label className="input_label_profile" htmlFor="exampleInputBio1">Bio</label>
								<Form.Item
									style={{width:'100%',margin:0}}
									name="description">
									<textarea className="input-font form-control profile-form-control" 
									 name="description" rows="5" id="exampleInputBio1"></textarea>
								</Form.Item>
							</Row>
							<button
			                    style={{ opacity: 0 }}
			                    htmlType='submit'
			                  >hhhhhh</button>
						</Form>
					{/*});
	          	}}
	        </Formik>*/}
			</Row>
			)
	}
}
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCq_buWKq5SczlpLmaxxpgQD7zZTNGGXL4'
// })(ProfileForm);
export default ProfileForm;