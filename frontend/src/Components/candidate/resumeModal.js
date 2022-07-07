import React , { Component } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { message,Row,Col,Input } from "antd";
import { connect } from "react-redux";
import APIManager from "../../APIManager/index";

import { Modal, Button } from 'react-bootstrap';
let formButton=null;
const { TextArea } = Input;
class ResumeModal extends Component{
	constructor(){
		super();
		this.state = {
			formIsValid:false,
			fields: {},
			resume:'',
			resume_file:'',
			initialValues:{title:"",description:""}
		}
	}
	onChange = ( newFileList) =>{
  		this.setState({resume_file:newFileList,resume:newFileList.name})
  		// console.log(this.toBase64(newFileList))
  	}
	CandidateResumeUpload = (data) =>{
		let resume = this.state.resume_file;
		if(resume !== ""){
			let formdata = new FormData();
			formdata.append("candidateResume",resume,resume.name)
			formdata.append("title", data.title)
			formdata.append("description", data.description)
			APIManager.CandidateResume(formdata)
			.then((response) => {
				console.log(response.data.status)
				if (response.data.status === "success") {
					this.props.onHide()
					this.props.reloadPage()
					message.info(response.data.message);
					// window.location.reload();
					// console.log(response)
				}
			})
			.catch((err) =>{
				// this.props.onHide()
				message.error("Something went wrong.")
			}
			);
		}
		else{
			// this.props.onHide()
			message.error("Please Upload Resume file");
		}

	}
	onSubmit = (e, { setSubmitting }) =>{
  		setTimeout(() => {
            setSubmitting(false);
            this.CandidateResumeUpload(e);
        }, 500);
  	}
  	componentWillMount(){
  		// console.log(this.props.name)
  		let initialValues = {
			title: this.props.name,
			description: this.props.description 
		}
		this.setState({initialValues:initialValues})
  	}
	clickSubmitClick = () => {
  		formButton.click()
  	}

	render(){
		// console.log(this.state.initialValues)
		return(
	      <Formik
	        initialValues={this.state.initialValues}
	        onSubmit={this.onSubmit}
	        validationSchema={Yup.object().shape({
	          title: Yup.string().required("title is required."),
	          description: Yup.string().required("description is required."),
	          
	        })}
	      >
	        {(formikProps) => {
	          const {
	            values,
	            errors,
	            isSubmitting,
	            handleChange,
	            handleSubmit,
	          } = formikProps;
		return(
				<Modal {...this.props} animation={false} className="password-modal" aria-labelledby="contained-modal-title-vcenter">
			      	<div className="modal-header">
				      	<div className="modal-title h4" id="contained-modal-title-vcenter">
				      		Resume
				      	</div>
				      	<button type="button" onClick={this.props.onHide} className="close">
				      		<span aria-hidden="true"><img src={"./cancel-circle.png"} alt="cancel" /></span>

				      		<span className="sr-only">Close</span>
				      	</button>
			    	</div>
			      <Modal.Body className="show-grid">
			        <form onSubmit={formikProps.handleSubmit}>
	        			<Row>
							<label className="input_label_profile w-100">File</label>
								<label className="custom-file-label-1 resume-upload-card-1 m-0">
							    <input 
							    	type="file" 
							    	name="attachment"
							    	className="custom-file-input resume-upload-card-3"
							    	onChange={(event)=>{
												  this.onChange(event.target.files[0])
												}
	                  						} />
							    
							    
							    <i className="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;
							    { this.state.resume.length > 1 ? (
							    	<p className="name-of-resume-file">{this.state.resume}</p>):(
							    <p className="name-of-resume-file">UPLOAD RESUME</p>
							    )}
							    </label>
							    
							{errors.attachment && (
		                        <div style={{ color: "red", fontSize: "12px" }}>
		                          {errors.attachment}
		                        </div>
		                      )}
						</Row>
	        			<Row>
							<label className="input_label_profile">Title</label>
							<Input 
								type="text" 
								name="title"
								value={values.title}
								className="input-field-custom-type-1-left" 
								id="inputPassword" 
								onChange={handleChange}
								placeholder="Job title" required />
							{errors.title && (
		                        <div style={{ color: "red", fontSize: "12px" }}>
		                          {errors.title}
		                        </div>
		                    )}
						</Row>
						<Row>
							<label className="input_label_profile">Description</label>
							<TextArea 
								type="text" 
								name="description"
								value={values.description}
								className="input-font form-control profile-form-control" 
								id="inputPassword" 
								onChange={handleChange} 
								placeholder="Tell us about yourself" required >
							</TextArea>
							{errors.description && (
		                        <div style={{ color: "red", fontSize: "12px" }}>
		                          {errors.description}
		                        </div>
		                    )}
						</Row>
						<button style={{opacity:0}} type={"submit"} ref={(e) => { formButton = e }}>ADD </button>
			        </form>
			      </Modal.Body>
			      <Modal.Footer>
			      	<button type="button" onClick={this.clickSubmitClick} className="btn btn-dark bold-family btn-save-font cursor">Save Resume</button>
			      </Modal.Footer>
			    </Modal>
			)
		 }}
      </Formik>
		)
	}
}
export default ResumeModal;			