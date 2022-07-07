import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col } from 'antd';
import Cancel from '../../asset/cancel_svg.svg'
// import './editCompanyModal.css'
import APIManager from "../../../APIManager/index";
import { message } from "antd";
// const CompanyModal = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
class MediaModal extends Component{
	state={
		uploadedImage:"",
		image_name:"",
		allimage:[]
	}
	onChange = ( newFileList) =>{
  		console.log(newFileList.name);
  		this.setState({image_name:newFileList.name})
  		this.setState(previousState => ({
		    allimage: [...previousState.allimage, newFileList]
		}));
  	}
  	removeImage = (image) =>{
  		console.log(image)
  		let images = this.state.allimage;
  		images.splice(image, 1);
  		this.setState({images});
  		// let images = this.state.allimage;
  		// for(let i=0; i.length > 0; i++){
  		// 	if(images.name === image){

  		// 	}
  		// }
  	}
	handleOk = () => {
		// this.setState({isModalVisible:false});
		this.props.uploadFiles(this.state.allimage)
		// this.props.isClose()
	};

	handleCancel = () => {
		// this.setState({isModalVisible:false});
		this.props.isClose()
	};
	uploadFiles = (data) => {
		console.log(data)
		let formdata = new FormData();
		if(data.length > 0){
			for(let i = 0; i < data.length; i++){
				formdata.append("image",data[i], data[i].name)
			}
			const prod_id = this.props.prod_id
			APIManager.uploadProductMedia(prod_id,formdata)
		      .then((response) => {
		      	console.log(response)
		        if (response.data.status === "success") {
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

		console.log(this.state.allimage)
		return(
			<>	
			{ this.props.isOpen ?
				<>
				{/* <Button type="primary" onClick={this.showModal}>
			        Open Modal
			    </Button> */}
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
			        	<label className="add-user-upload-image">
								<input accept="image/*" id="raised-button-file" multiple type="file"
             					 onChange={(event)=>{
									  this.onChange(event.target.files[0])
									}
          						}
           						name="image"
             				 />
             				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;SELECT IMAGE</span>
             			</label>
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
  
export default MediaModal;