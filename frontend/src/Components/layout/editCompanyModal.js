import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Upload, message } from 'antd';
import Cancel from '../asset/cancel_svg.svg'
import './editCompanyModal.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import APIManager from "../../APIManager/index";
import UploadMediaFiles from './uploadMediaFiles';
import { dispatchAction } from '../../Redux/Store/index';
import {backgroundUploadMedia} from '../../Redux/Actions/uploadMediaAction'
// const CompanyModal = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
class CompanyModal extends Component{
	state={
		uploadedImage:"",
		image_name:"",
		allimage:[],
		loading: false,
		uploadPercentage: []
	}
	getAllImages = (images) =>{
		this.setState({
			loading:false,
			allimage: images
		})
  	}

  	testPost=()=>{
  		console.log('posting image..')
  	}
  	uploadTestImage = (file) =>{
  		// console.log(file)
  		setTimeout(this.testPost, 2000)
  	}
  	removeImage = (image) =>{
  		console.log(image)
  		let images = this.state.allimage;
  		images.splice(image, 1);
  		this.setState({images});
  	}
	handleOk = () => {
		// this.setState({isModalVisible:false});
		if(this.state.allimage.length > 0){
			let back_status = {"back_status":true,"images":this.state.allimage}
			dispatchAction(backgroundUploadMedia(back_status))
		}
		
		// this.props.isClose()
	};
	beforeUpload =(file)=> {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	handleCancel = () => {
		// this.setState({isModalVisible:false});
		this.props.isClose()
	};
	uploadFiles = (data) => {
		console.log(data)
		let formdata = new FormData();
		const options = {
          onUploadProgress :(progressEvent) =>{
            const {loaded,total} = progressEvent;
            let percent  = Math.floor( (loaded * 100) / total )
            console.log( `${loaded}kb of ${total}kb | ${percent}%` );
            if(percent < 100){
            	const newUploadPercentage = [...this.state.uploadPercentage]
            	newUploadPercentage.push(percent)
              this.setState({uploadPercentage:newUploadPercentage})
            }
          }
      	}
		if(data.length > 0){
			for(let i = 0; i < data.length; i++){
				formdata.append("image",data[i], data[i].name)
			}
			APIManager.companyMediaSubmit(formdata,options)
		      .then((response) => {
		      	console.log(response)
		        if (response.data.status === "success") {
		        	// this.props.onHide()
		          	message.info("Data saved successfully");
		          	this.props.isClose()
		        }
		      })
		      .catch((err) =>
		        message.error("Something went wrong.")
		      );
		}
		
	}
	render(){
		const loading = true;
		const uploadButton = (
	      <div>
	        {loading ? <LoadingOutlined /> : null}
	      </div>
	    );
		console.log(this.state.allimage)
		return(
			<>	
			{ this.props.isOpen ?
				<>
				<Button type="primary" onClick={this.showModal}>
			        Open Modal
			    </Button>
				<Modal
			        title="Upload Media"
			        visible={this.props.isOpen}
			        onOk={this.handleOk}
			        className="upload-media-modal"
			        onCancel={this.handleCancel}
			        width={600}
			        cancelButtonProps={{ style: { display: 'none' } }}
			        okText="Upload files"
			        closeIcon={<img src={Cancel} />}
			        
			    >
			    <Row>
			    	<Col span={15}>
			        	<p className="company_modal_media-1">Drag the media fies to upload</p>
			        </Col>
			        <Col span={9}>
			        	{/*<label className="add-user-upload-image">
								<input accept="image/*" id="raised-button-file" multiple type="file"
             					 onChange={(event)=>{
									  this.onChange(event.target.files[0])
									}
          						}
           						name="image"
             				 />
             				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;UPLOAD IMAGE</span>
             			</label>*/}
             			
					     <UploadMediaFiles getAllImages = {this.getAllImages}/>
			        </Col>
			    </Row>
			    <Row>
			    { this.state.allimage.map((val,index)=>{
			    	if(index%2==0){
						return(
							<Col span={12} className="media-photo-name-tag-div" key={index}>
								<Row className="media-photo-name-tag-1">
									<Col span={18}>
										<p className="media-photo-name-tag">
					        				{val.name}
					        			</p>
									</Col>
									<Col span={6}>
										<img 
											src={process.env.PUBLIC_URL + "/cancel.png"}
											onClick={(e) =>{this.removeImage(index)}} />
									</Col>
								</Row>
					        </Col>
							)
					}else{
						return(
							<Col span={12} className="media-photo-name-tag-div" key={index}>
								<Row className="media-photo-name-tag-1">
									<Col span={18}>
										<p className="media-photo-name-tag">
					        				{val.name}
					        			</p>
									</Col>
									<Col span={6}>
										<img 
											src={process.env.PUBLIC_URL + "/cancel.png"}
											onClick={(e) =>{this.removeImage(index)}} />
									</Col>
								</Row>
					        </Col>
							)
					}
			    })}
			    	
			    </Row>
			      </Modal>
			    </>
			  	:null}
			</>
			)
	}
}
  
export default CompanyModal;