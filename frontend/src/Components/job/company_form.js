import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Row,Col,Input,Select,Upload,Avatar } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import { UploadOutlined } from '@ant-design/icons';
import UserIcon  from '../asset/rectangle@3x.jpg';
import { message } from "antd";
const { TextArea } = Input;
const { Option } = Select;
let formButton=null;



 class CompanyForm extends Component{
 	formRef=React.createRef();
 	state={
		uploadedImage:UserIcon,
		photo:"",
		photo_name:"UPLOAD IMAGE",
		allCandidate:[],
		resume:"",
		resume_name:"UPLOAD RESUME",
		change_index: '',
		editcandidate: false,
		comp_name:"",
		initialValues : {
							name:"",
							experience: "",
							current_position: "",
							current_company: "",
							availability: "",
							price:"",
							information:""

						}
	}
	componentDidMount(){
		this.initialData()
	}
	initialData = () =>{
  		var ls = require('local-storage');
  		let data = ls.get('persist:root');
  		if(data !== undefined){
  			data = JSON.parse(data.AuthReducer)
  			let actual_data = data.user.data.data
  			console.log(actual_data.comp_info.comp_name)
  			const comp_name = actual_data.comp_info.comp_name
  			let initialValues = this.state.initialValues
  			initialValues.current_company = comp_name
  			this.setState({
  				initialValues: initialValues
  			})
  			this.formRef.current.setFieldsValue(initialValues)
  		}

  	}
	clickSubmitClick = () =>{
		console.log("hello")
  		this.props.clickSubmit(this.state.allCandidate)
  	}
  	onChange = ( newFileList) =>{
  		console.log(newFileList);
  		this.setState({photo:newFileList,photo_name:newFileList.name})
  	}
  	onChangeResume = ( newFileList) =>{
  		// const values = this.formRef.current.getFieldsValue();
  		// console.log("values on button click:",values);
  		// this.formRef.current.resetFields();
		this.setState({resume:newFileList,resume_name:newFileList.name})
  	}
  	editAnotherCandidate = (index) =>{
  		// console.log(index)
  		let all = this.state.allCandidate;
  		let initialValues = {...all[index]}
		console.log(all[index].candidateResume)
		this.setState({
			change_index:index,
			editcandidate:true,
			initialValues: initialValues,
			resume:all[index].candidateResume,
			resume_name:all[index].candidateResume.name
		})
		this.formRef.current.setFieldsValue(initialValues)
		if(all[index].candidatePhoto){
			this.setState({
				photo:all[index].candidatePhoto,
				photo_name:all[index].candidatePhoto.name
			})
		}
  	}
  	addEditAnotherCandi = (values) =>{
  		let all = this.state.allCandidate;
  		const index = this.state.change_index
  		all[index] = values
  		
  	}
  	addAnotherCandidate=(values)=>{
  		console.log(values)
  		let all = this.state.allCandidate;
  		const index = this.state.change_index
  		if(index !==""){
  			all[index] = values
  			this.setState({
	  			allCandidate:all,
	  			resume:"",
	  			resume_name:"UPLOAD RESUME",
	  			photo:"",photo_name:'UPLOAD IMAGE',
	  			change_index:"",
	  			editcandidate:false
	  		})
  		}
  		else{
			if(this.state.resume !== ""){
				if(values.name){
					values['candidateResume'] = this.state.resume;
					if(this.state.photo !== ""){
						values['candidatePhoto'] = this.state.photo;
					}
					// console.log(values)
					values["applied_for_job"] = this.props.id
					let data = values
					all.push(data)
					this.setState({
						allCandidate:all,
						resume:"",
						resume_name:"UPLOAD RESUME",
						photo:"",photo_name:'UPLOAD IMAGE'
					})
					this.formRef.current.resetFields();
				}
			}
			else{
				message.error("Please Upload Resume")
				// this.formRef.current.resetFields();
			}
		}
		console.log(this.state.allCandidate)

		
	}
  	render(){
  		console.log(this.state.initialValues)
  		let initialValues = this.state.initialValues
  		// initialValues.current_company = this.state.comp_name
  		console.log(initialValues)
  		return(
  				<>
  				{this.state.allCandidate.length!=0 ? (
  				<>
  				<ul className="company_form_1">
  				{this.state.allCandidate.map((val,index)=>(
	  					<li
	  						onClick={() => this.editAnotherCandidate(index)}
	  						key={index}>
	  						<span className="m-0 applied-candidate-name">{val.name}</span>
	  						<span className="apply-job-candidate-remove">
	  							<img src={process.env.PUBLIC_URL + "/remove-candidate.png"}/>
	  						</span>
	  					</li>
	  			))}
	  			</ul>
  				</>
  				):null}

				<Form 
					initialValues = {initialValues}
					ref={this.formRef} 
					onFinish={this.addAnotherCandidate}>
					<Row style={{marginTop:40,paddingBottom:25}}>
						<Col span={15}>
							<div style={{width:"100%",height:85}}>
								<p className="input-label-field-custom-type-1">Image</p>
								<Avatar size={92} icon={<img src={this.state.uploadedImage} />} />&nbsp;&nbsp;
								<label className="add-user-upload-image">
									<input accept="image/*" id="raised-button-file" multiple type="file"
		         					 onChange={(event)=>{
										  this.onChange(event.target.files[0])
										}
		      						}
		       						name="image"
		         				 />
		         				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;{this.state.photo_name}</span>
		         			</label>
						</div>
						</Col>
						<Col span={9} className="text-right">
							<div style={{width:"100%",height:85}}>
									<label className="add-user-upload-image add-user-upload-image-2">
										<input accept="pdf/*" id="raised-button-file" type="file"
                     					 onChange={(event)=>{
											  this.onChangeResume(event.target.files[0])
											}
                  						}
                     				 />
                     				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;{this.state.resume_name}</span>
	                     			</label>
					        </div>
						</Col>
					</Row>
					<Row style={{marginTop:40}}>
	                    <label className="input_label_profile">Name</label>
	                    <Form.Item 
	                    	style={{width:'100%',margin:0}} 
	                    	rules={[{required:true,message:'Required field'}]} 
	                    	name='name'>
	                        <Input name="name" 
	                        	// value={values.name} 
	                        	// onChange={e => this.setState({name:e.target.value})} 
	                        	className="input-field-custom-type-1-left input-border" 
	                        	placeholder="Enter name" />
		                    </Form.Item>
	            	</Row>
					<Row>
						<label className="input_label_profile">Experience</label>
						<Form.Item 
							style={{width:'100%',margin:0}} 
							rules={[{required:true,message:'Required field'}]} 
							name="experience">
	                        <Input 
	                        	type="number" 
	                        	// value={values.experience}
	                        	//  value={this.state.experience} 
	                        	// onChange={e => this.setState({experience:e.target.value})} 
	                        	className="input-field-custom-type-1-left input-border" 
	                        	placeholder="Enter experiance"/>
						</Form.Item>

	            	</Row>
	            	<Row>
	            		<Col span={12} className="form-padding-right">
	            			<label className="input_label_profile">Current position</label>
	            			<Form.Item 
	            				style={{width:'100%',margin:0}} 
	            				rules={[{required:true,message:'Required field'}]} 
	            				name="current_position" >
		                        <Input 
		                        	
		                        	// value={values.current_position} 
		                        	// onChange={e => this.setState({current_position:e.target.value})} 
		                        	className="input-field-custom-type-1-left input-border" 
		                        	placeholder="Enter position"/>
	            			</Form.Item>

		                </Col>
	                    <Col span={12} className="form-padding-left">
	                    	<label className="input_label_profile">Current Company</label>
	                    	<Form.Item 
	                    		style={{width:'100%',margin:0}} 
	                    		rules={[{required:true,message:'Required field'}]} 
	                    		name='current_company'>
	                        {/*<Select 
	                        	// name="current_company" 
	                        	// value={values.current_company} 
	                        	// onChange={e => this.setState({current_company:e})} 
	                        	// defaultValue=""
		                        className="input-field-custom-type-1-left input-border righ-modal-selector p-0"
		                        >
		                        	<Option value="">Select Company</Option>
		                        	<Option value="Sandbiz">Sandbiz</Option>
		                        	<Option value="Createbytes">Createbytes</Option>
		                        	<Option value="Createbytes1">Createbytes1</Option>
		                        </Select>*/}
		                        <Input 
	                        	// name="availability" 
	                        	// value={comp_name} 
	                        	// onChange={e => this.setState({availability:e.target.value})} 
	                        	className="input-field-custom-type-1-left input-border" 
	                        	placeholder=""/>
	            			</Form.Item>
	                   	</Col>
	                   	<Col span={12} className="form-padding-right">
	            			<label className="input_label_profile">Availability</label>
	            			<Form.Item style={{width:'100%',margin:0}} rules={[{required:true,message:'Required field'}]} name='availability'>
	                        <Input 
	                        	// name="availability" 
	                        	// value={this.state.availability} 
	                        	// onChange={e => this.setState({availability:e.target.value})} 
	                        	className="input-field-custom-type-1-left input-border" 
	                        	placeholder="Enter availability"/>
	            			</Form.Item>
		                </Col>
		                <Col span={12} className="form-padding-left">
		                	<label className="input_label_profile">Price</label>
		                	<Form.Item style={{width:'100%',margin:0}} rules={[{required:true,message:'Required field'}]} name='price'>
	                        	<Input 
		                        	// name="price" 
		                        	// value={this.state.price} 
		                        	// onChange={e => this.setState({price:e.target.value})} 
		                        	className="input-field-custom-type-1-left input-border" 
		                        	placeholder="Enter price" />
	            			</Form.Item>
		                </Col>
	            	</Row>
	            	<Row>
	            		<label className="input_label_profile">Information</label>
	            		<Form.Item style={{width:'100%',margin:0}} rules={[{required:true,message:'Required field'}]} name='information'>
                        <TextArea 
                        	// name="information" 
                        	// value={this.state.information} 
                        	// onChange={e => this.setState({information:e.target.value})} 
                        	className="input-field-custom-type-1-left input-border" 
                        	placeholder="Enter Information"></TextArea>
	            		</Form.Item>
	            	</Row>
	            	{ this.state.editcandidate ? (
	            		<Button htmlType='submit' className="add_candidate_data_button" onClick={this.addEditAnotherCandi}>Save Candidate</Button>
	            	):(
	            		<Button htmlType='submit' className="add_candidate_data_button" onClick={this.addAnotherCandidate}>Add Candidate</Button>
	            	)}
					
				</Form>
				</>
  			)
  	}
  }
  export default CompanyForm;