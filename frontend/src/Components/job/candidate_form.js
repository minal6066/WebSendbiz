import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import * as Yup from "yup";
import { Row,Col,Input,Select,Upload,Spin} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import APIManager from "../../APIManager/index";
import { message } from "antd";
const { TextArea } = Input;
const { Option } = Select;
let formButton=null;

let initialValues = {
    name: "",
	experience: "",
	current_position: "",
	availability: "",
	price:"",
	information:""
  };

  class CandidateForm extends Component{
  	state = {
  		resume:"",
  		resumeOpt:[],
  		resumeList:""
  	}
  	componentDidMount(){
  		this.initialData();
  		this.resumeList();
  	}
  	resumeList = (pageNumber=1) =>{
      let options = [];
      APIManager.companyInfo().then(
        (resp) =>{
          console.log(resp.data.data.data.resumes)
          resp.data.data.data.resumes.map((data) => {
            // console.log(data)
            options.push(
              <Option key={data.name}>{data.title}</Option>
            )
          })
        // console.log(options)
        this.setState({resumeOpt:options})
        // setcompOptions(options)
        })
    }
  	initialData = () =>{
  		var ls = require('local-storage');
  		let data = ls.get('persist:root');
  		if(data !== undefined){
  			data = JSON.parse(data.AuthReducer)
  			let actual_data = data.user.data.data
  			console.log(actual_data)
  			const fname = actual_data.can_detail ? actual_data.can_detail.firstName:""
  			const lname = actual_data.can_detail ? actual_data.can_detail.lastName:""
  			if(actual_data.can_experience.length > 0){
  				actual_data.can_experience.map((data) =>{
  					if(data.isCurrentlyWorking === true){
  						initialValues.current_position = data.title
  					}
  				})
  			}
  			if(fname === ""){
  				initialValues.name =  lname
  			}
  			else{
  				initialValues.name = fname +" "+ lname
  			}
  			
  			
  		}

  	}
  	onSubmit =(e) =>{
  		// console.log(e)
  		if(this.state.resume ==="" && this.state.resumeList === "" ){
  			// console.log(e)
  			message.error("Please Upload Resume")
  		}
  		else{
  			e["applied_for_job"] = this.props.id
  			e["candidateResume"] = this.state.resume
  			e["resume"] = this.state.resumeList
  			e["current_company"] = ""
  			this.props.clickSubmit([e])
  			// let formdata = new FormData();
	  		// formdata.append("applied_for_job",this.props.id)
	  		// formdata.append("name",e.name)
	  		// formdata.append("experience", e.experience)
	  		// formdata.append("current_position",e.current_position)
	  		// formdata.append("current_company",e.current_company)
	  		// formdata.append("availability",e.availability)
	  		// formdata.append("price", e.price)
	  		// formdata.append("information",e.information)
	  		// formdata.append("candidateResume",this.state.resume,this.state.resume.name)
	  		// this.props.clickSubmit([formdata])
  		}
  		
  	}
  	clickSubmitClick = () =>{
  		console.log("hello")
  		formButton.click()
  	}
  	handleResumeListChange =(value) =>{
  		// console.log(value)
  		this.setState({resumeList:value})
  	}
  	onChange = (newFile) =>{
		this.setState({resume:newFile})
		// this.toBase64(newFile)
	}
  	render(){
  		return(
				  <Formik 
				  initialValues={initialValues} 
				  onSubmit={(values, { setSubmitting }) => {
		            setTimeout(() => {
		              setSubmitting(false);
		              // console.log(values, 'ddd');
		              this.onSubmit(values);
		            }, 500);
		          }} 
				  validationSchema={Yup.object().shape({
					name: Yup.string().required("name is required."),
					experience: Yup.string().required("experience is required."),
					current_position: Yup.string().required("current position is required"),
					availability: Yup.string().required("availability is required"),
					price: Yup.string().required("price is required"),
					information: Yup.string().required("information is required"),
				  })}
				  >
						{(formikProps) => {
							const {
				              values,
				              errors,
							  handleChange,
							  isSubmitting,
								handleBlur,
								handleSubmit,
								isValid,
				              touched,
				            } = formikProps;
				            return(
								<form onSubmit={formikProps.handleSubmit}>
								<Row>
									<label className="input_label_profile">Name</label>
									<Input 
									name="name" 
									value={values.name} 
									onChange={handleChange} 
									className="input-field-custom-type-1-left input-border" 
									placeholder="Enter name"/>
			                    	{errors.name && (
										<div style={{ color: "red", fontSize: "12px" }}>
										{errors.name}
										</div>
									)}
				            	</Row>
								<Row>
									<label className="input_label_profile">Experiance</label>
			                        <Input 
									type="number"
									name="experience" 
									value={values.experience} 
									onChange={handleChange} 
									className="input-field-custom-type-1-left input-border" 
									placeholder="Enter experience"/>
									{errors.experience && (
										<div style={{ color: "red", fontSize: "12px" }}>
										{errors.experience}
										</div>
									)}
				            	</Row>
				            	<Row>
				            		<label className="input_label_profile">Current possition</label>
									<Input 
									name="current_position" 
									value={values.current_position} 
									onChange={handleChange} 
									className="input-field-custom-type-1-left input-border" 
									placeholder="Enter position"/>
									{errors.current_position && (
										<div style={{ color: "red", fontSize: "12px" }}>
										{errors.current_position}
										</div>
									)}
				            	</Row>
				            	<Row>
				            		<Col span={12} className="form-padding-right">
				            			<label className="input_label_profile">Availability</label>
										<Input 
										name="availability" 
										value={values.availability} 
										onChange={handleChange} 
										className="input-field-custom-type-1-left input-border" 
										placeholder="Enter availability"/>
										{errors.availability && (
											<div style={{ color: "red", fontSize: "12px" }}>
											{errors.availability}
											</div>
										)}
					                </Col>
					                <Col span={12} className="form-padding-left">
					                    <label className="input_label_profile">Price</label>
										<Input 
										name="price" 
										value={values.price} 
										onChange={handleChange} 
										className="input-field-custom-type-1-left input-border" 
										placeholder="Enter price"/>
										{errors.price && (
											<div style={{ color: "red", fontSize: "12px" }}>
											{errors.price}
											</div>
										)}
					                </Col>
				            	</Row>
				            	<Row>
				            		<Col span={12}>
					                    <label className="input_label_profile">Resume</label>
					                        <Select 
					                        	name="resume1" 
					                        	onChange={this.handleResumeListChange}
					                        	placeholder="Select Resume"
					                        	className="p-0 input-field-custom-type-1-left input-border righ-modal-selector"
					                        >
					                        	{this.state.resumeOpt}
					                        </Select>
					                </Col>
					                <Col span={12}>
					                	<div style={{width:"100%",marginTop:50}}>
					                		<div className="col-sm-8">
												<label className="add-user-upload-image add-user-upload-image-2">
													<input accept="pdf/*" id="raised-button-file" type="file"
			                     					 onChange={(event)=>{
														  this.onChange(event.target.files[0])
														}
			                  						}
			                     				 />
			                     				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;UPLOAD RESUME</span>
			                     			</label>
										</div>
					                	</div>
					                </Col>
				            	</Row>
				            	<Row>
				            		<label className="input_label_profile">Information</label>
										<TextArea 
										name="information" 
										value={values.information} 
										onChange={handleChange} 
										className="input-field-custom-type-1-left input-border" 
										placeholder="Enter Information"></TextArea>
										{errors.information && (
											<div style={{ color: "red", fontSize: "12px" }}>
											{errors.information}
											</div>
										)}
				            	</Row>
				            	<button style={{opacity:0}} type={"submit"} ref={(e) => { formButton = e }}>ADD </button>
								</form>
						)}}
					</Formik>
  			)
  	}
  }
  export default CandidateForm;