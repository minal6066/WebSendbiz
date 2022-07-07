import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import { Row,Col,Input,Select,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CompanyForm from './company_form.js';
import CandidateForm from './candidate_form.js';
import APIManager from "../../APIManager/index";
import HELPERS from '../../APIManager/helper';
import { message } from "antd";
import './rightModal.css'
const { TextArea } = Input;
const { Option } = Select;
let formButton=null;

const initialValues = {
    name:"",
    experience: "",
    current_position: "",
    availability: null,
    price:null,
    profile_link:null,
    resume:null,
    information:null,
    
    
  };
class ApplyJobModal extends Component{
	constructor(props) {
		super(props);
		this.submitElement = React.createRef();
	}
	handleOk = () => {
		this.submitElement.current.clickSubmitClick()
	};
	handleCancel = () => {
		// document.body.style.overflow = "auto"
		this.props.isClose()
	};
	clickSubmit = (data) =>{
		console.log(data)
		this.props.uploaded(true)
		this.props.isClose()
		data.map((val) => {
			let formdata = HELPERS.converToFormData(val)
			console.log(formdata)
			APIManager.applyForJob(formdata)
			.then((response) => {
				console.log(response)
				if (response.data.isSuccess) {
					// this.props.refreshPage()
					// this.props.isClose()
					// message.info("Apply for job successfully");
					// this.props.isClose()
					console.log(response)
				}
			})
			.catch((err) =>
				message.error("Something went wrong.")
			);
		});
		this.props.uploaded(false)
	}
	// componentDidMount(){
	// 	document.body.style.overflow = "hidden"
	// }


	render(){
		let user_type = JSON.parse(localStorage.getItem('user_type') || false);
	    const user_type2 = JSON.parse(localStorage.getItem('user_type2') || false);
	    let type_of_user = HELPERS.isNumber(user_type)
	    let type_of_user2 = HELPERS.isNumber(user_type2)
    	user_type = user_type/(user_type2*99)
		return(
			<div>
				{ this.props.isOpen ?
					<Modal
						title={ this.props.title }
						visible={this.props.isOpen}
						onOk={this.handleOk}
						destroyOnClose={true}
						cancelButtonProps={{ style: { display: 'none' } }}
						closeIcon={<img src={Cancel} />}
						onCancel={this.handleCancel}
						className={"right-modal " + this.props.className}
						maskClosable={true}
						footer={[
							<Button 
								key="submit" 
								type="primary"
								style={{"height":"45px"}}
								className="btn btn-dark bold-family btn-save-font cursor" 
								onClick={this.handleOk}>
							Submit
							</Button>,
						]}
						>
						{ user_type === 1 ?(
							<CandidateForm ref={this.submitElement} 
								id={this.props.id} 
								clickSubmit={this.clickSubmit}/>
						):(
							<CompanyForm ref={this.submitElement} 
								id={this.props.id}
								comp_name = {this.props.comp_name}
								clickSubmit={this.clickSubmit}/>
						)}
					</Modal>
				:null}
			</div>
			)
	}
}

export default ApplyJobModal;