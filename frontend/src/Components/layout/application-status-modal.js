import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import './editCompanyModal.css'
import APIManager from "../../APIManager/index";
import { message } from "antd";


// const CompanyModal = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
class ApplicationStatus extends Component{
	state={
		uploadedImage:"",
		image_name:"",
		status_name:"",
		allimage:["received","review","pending","scheduled","waiting","hired","rejected"]
	}
	
	handleOk = () => {
		// this.setState({isModalVisible:false});
		this.uploadFiles(this.state.allimage)
		// this.props.isClose()
	};

	handleCancel = () => {
		// this.setState({isModalVisible:false});
		this.props.isClose()
	};
	addAppStatus = (job_id) =>{
		if(this.state.status_name !== ""){
			let data = {
				"status": this.state.status_name
			}
			APIManager.changeApplyJobStatus(job_id,data)
			.then((response) => {
				console.log(response)
				if (response.data.status === "success") {
					message.info("Status saved successfully");
				}
			})
			.catch((err) =>
				message.error("Something went wrong.")
			);
		}
	}
	checkIndex = (index) =>{
		return index === ''
	}
	rejectProfile = () =>{
		this.setState({status_name:"rejected"})
	}
	handelChange = (data) => {
		console.log(data)
		let index = this.state.allimage.findIndex((val) => val === data);
		let last_length = this.state.allimage.length
		console.log(index,last_length)
		if(index < last_length-1){
			this.setState({status_name:this.state.allimage[index+1]})
			console.log(this.state.allimage[index+1])
		}
	}
	render(){
		// console.log(this.state.allimage)
		return(
			<>	
			{ this.props.isOpen ?
				<>
				<Modal
			        title="Application Status"
			        visible={this.props.isOpen}
			        onOk={this.handleOk}
			        className="application_status"
			        onCancel={this.handleCancel}
			        width={600}
			        cancelButtonProps={{ style: { display: 'none' } }}
			        okText="SAVE"
			        onOk = {()=>this.addAppStatus(this.props.job_id)}
			        closeIcon={<img src={Cancel} />}
			        
			    >
			    <Row>
			    	<Col span={24}>
			        	<p className="company_modal_media-1">You have Application recieved For {this.props.name}</p>
			        </Col>
			    </Row>
			    <Row>
			    	<Col span={15}>
			    		<p>Update Application Status</p>
			    		{ this.state.status_name !== "" ? (
			    			<>
			    				<img className="w-100" src={process.env.PUBLIC_URL + "/"+ this.state.status_name +".png"} />
			    				<p className="application-modal-status-1 text-center" onClick={() =>{this.handelChange(this.state.status_name)}}>next status</p>
			    			</>
			    		):(
			    			<>
			    			<img className="w-100" src={process.env.PUBLIC_URL + "/"+ this.props.status +".png"} />
			    			<p className="application-modal-status-1 text-center" onClick={() =>{this.handelChange(this.props.status)}}>next status</p>
			    			</>
			    		)}
			    		
			    		
			    	</Col>
			        <Col span={9}>
			        	<button className="application-modal-status-2" onClick={this.rejectProfile}>Reject</button>
			        </Col>
			    </Row>
			      </Modal>
			    </>
			  	:null}
			</>
			)
	}
}
  
export default ApplicationStatus;