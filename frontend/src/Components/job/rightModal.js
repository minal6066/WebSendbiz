import React , { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import { Formik } from "formik";
import { Row,Col,Input,Select,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
    information:null
    
  };
class RightModal extends Component{
	constructor(props) {
		super(props);
		
	}
	handleOk = () => {
		// document.body.style.overflow = "auto"
		this.props.onSubmit()
		// console.log("hello")
		// this.props.isClose()
	};
	handleCancel = () => {
		// document.body.style.overflow = "auto"
		this.props.isClose()
	};
	// componentDidMount(){
	// 	document.body.style.overflow = "hidden"
	// }

	render(){

		return(
			<div>
			{ this.props.isOpen ?
				<Modal
					title={ this.props.title }
					visible={this.props.isOpen}
					onOk={this.handleOk}
					cancelButtonProps={{ style: { display: 'none' } }}
					closeIcon={<img src={Cancel} />}
					onCancel={this.handleCancel}
					className={"right-modal " + this.props.className}
					maskClosable={false}
					footer={[
						<Button key="submit" type="primary" className="right-modal-button" onClick={this.handleOk}>
						Submit
						</Button>,
					]}
					>
					{this.props.component}
				</Modal>
				:null}
			</div>
			)
	}
}

export default RightModal;