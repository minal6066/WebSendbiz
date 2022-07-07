import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import axios from 'axios';
import PopupModal from './passwordmodel.js';
import ProfileForm from './candidate_profile_form.js';
import userIcon from '../asset/user.svg';
import { connect } from 'react-redux'
import { Spin,Row,Col } from 'antd';
import APIManager from '../../APIManager';

class ProfilePhoto extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalShow:false,
			formIsValid:false,
			uploadedImage: userIcon,
			upload_image:"",
			upload_image_name:"",
			isImageUpload:false,
			uploadUrl:"",
			img_type:"",
			fileName:""
			
		}
		this.infoElement = React.createRef();
	}
	generateS3Url = (e) => {
		const file = e
		this.setState({
			testFile: file,
		});
		let img_type = file.type
		this.setState({
			img_type: img_type
		})
		const uploadParams = {
			files: [
				{
					requestType: 'CandidateProfile',
					contentType: img_type,
				},
			],
		};
		APIManager.preSignedUrl(uploadParams).then((resp) => {
			if (resp.status === 200) {
				resp.data.map((data) => {
					return this.setState({
						uploadUrl: data.url,
						fileName: data.fileName,
					});
				});
				this.uploadOnS3(file);
			}
		});
	}
	uploadOnS3 = (file) =>{
		fetch(this.state.uploadUrl, {
	      method: 'PUT',
	      mode: 'cors',
	      body: file,
	    })
		.then((resp) => { 
			console.log(resp, 'llll')
			this.props.imageChange(this.state.fileName)
		})
		.catch((err) => console.log(err));
	}
	toBase64 = (file) =>{
		// console.log(file)
		const upload_image_name = file.name
	    const reader = new FileReader();
	    reader.onload = () => {
			if(reader.readyState ===2){
				this.setState({uploadedImage:reader.result,upload_image_name})
			}
		}

		reader.readAsDataURL(file);
	};
	onChange = (newFile) =>{
		console.log(newFile)
		this.setState({upload_image:newFile,isImageUpload:true})
		this.toBase64(newFile)
		this.generateS3Url(newFile)
		
	}
	componentWillMount(){
		let uploadedImage = this.props.uploadedImage
		console.log(uploadedImage)
		this.setState({uploadedImage:uploadedImage})

	}
	render(){
		let uploadedImage = this.state.uploadedImage
		var ls = require('local-storage');
	    const displayPicture = this.state.uploadedImage
	    ls.set('displayPicture', displayPicture);
		return(
			<>
				<Row align="middle">
					<p className="w-100">image</p>
						<Col span={12}>
							<img src={ uploadedImage } className="profile_image" alt="profile image" />
						</Col>
						<Col span={12}>
							<label className="add-user-upload-image add-user-upload-image-2">
								<input accept="image/*" id="raised-button-file" multiple type="file"
             					 onChange={(event)=>{
									  this.onChange(event.target.files[0])
									}
          						}
           						name="image"
	             				 />
	             				 <span><img src={process.env.PUBLIC_URL + "/upload.svg"} />&nbsp;&nbsp;UPLOAD IMAGE</span>
	             			</label>
						</Col>
				</Row>
			</>
			)
	}
}

export default (ProfilePhoto);