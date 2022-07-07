import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import { Modal, Button } from 'react-bootstrap';
import ResumeModal from './resumeModal.js';
import { connect } from 'react-redux';
import { message, Spin,Row,Col } from "antd";
import APIManager from '../../APIManager';
import moment from 'moment';
import userIcon from '../asset/rectangle@3x.jpg';

class Resume extends Component{
	constructor(props){
		super(props);
		this.state = {
			showMessage: '',
			modalShow:false,
			uploadedImage: userIcon,
			name:"",
			description:""
		}
	}
	
	componentDidMount(){
		APIManager.companyInfo();
	}
	deleteResume =(id) =>{
		console.log(id)
		APIManager.deleteCandidateResume(id)
		.then((response) => {
			console.log(response)
			if (response.data.status === "success") {
				message.info("Resume deleted successfully");
				window.location.reload();
			}
		})
		.catch((err) =>
			message.error("Something went wrong.")
		);
	}

	handleClose = () => {
		this.setState({
			modalShow:false
		})
	}
	reloadPage = () =>{
		APIManager.companyInfo();
	}
	handleUpdate = (name,description) =>{
		this.setState({modalShow:true,name:name,description:description})
	}
	handleShow = (e) => {
		this.setState({showMessage:true})
	}
	render(){
		const {showMessage} = this.state;
		let loader = this.props.isloading
		let uploadedImage = this.state.uploadedImage
		let resumes = []
		if(!loader){
			console.log(this.props.data.data)
			if(this.props.data.data.data.can_detail.profile !== ""){
				let url = "https://sendbizbucket.s3.eu-west-3.amazonaws.com/"
				uploadedImage = url+this.props.data.data.data.can_detail.profile
			}
			resumes = this.props.data.data.data.resumes
		}
		
		return(
				<>
				{ this.state.modalShow ? (
					<ResumeModal show={this.state.modalShow} 
						name={this.state.name} description={this.state.description} 
						onHide={this.handleClose} reloadPage={this.reloadPage} />
				):null }
				
				<>
						<Row className="padding-bootom-for-profile">
							<Col span={12}>
								<h6 className="candidate_heading">Resume</h6>
							</Col>
							<Col span={12} className="text-right">
								<button type="button" onClick={()=> this.setState({modalShow:true})} 
								className="btn btn-dark bold-family btn-save-font cursor">Add New</button>
							
								<div className="custom-file  view-profile">
									<label className="custom-file-label-2">View public profile</label>
								</div>
							</Col>
						</Row>
						{ loader ? (<Spin />):(
							<>
							{ resumes.length === 0 ? (
								<Row className="w-100 text-center">
				                   No data found
				                </Row>
							):(
							<>
							{ resumes.map((val,index) =>(
								<div className="row mb-3 bg-white rounded custom-row" key={index}>
									<div className="col-sm-2 text-center resume-photo-padding candidate-resume-card-1">
										<img src={ uploadedImage } className="resume_profile_image resume-photo-radius" alt="profile image" />
									</div>
									<div className="col-sm-7 candidate-resume-card-2">
										<h3 className="resume-heading">{val.title}</h3>
										<p className="resume-para">{val.description}</p>
									</div>
									<div className="col-sm-3 candidate-resume-card-3">
										<p className="resume-last-days">Last updated on {moment(val.uploadedAt).format('DD MMM YY')}</p>
										<ul className="resume-ul form-inline right-resume-ul">
											<li style={{paddingRight:"10px"}} className="text-center">
												<a className="p-0" href={"https://sendbizbucket.s3.eu-west-3.amazonaws.com/" + val.name}>
													<img style={{width:"35%"}} src={process.env.PUBLIC_URL + "/group-18@3x.png"} />
												</a>
											</li>
											<li className="resume-color text-center" onClick = {() => this.handleUpdate(val.title,val.description)} style={{paddingRight:"15px"}}><i className="fa fa-pencil" aria-hidden="true"></i></li>
											<li className="resume-color text-center" onClick={() => this.deleteResume(val._id)}><i className="fa fa-trash" aria-hidden="true"></i></li>
										</ul>
									</div>
								</div>
							))}
							</>
							)}
							</>
						) }
				</>
				</>
			)
	}
}

const mapStateToProps = (state) => ({
    data: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading
})

export default connect(mapStateToProps)(Resume);