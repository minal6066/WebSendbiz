import React , { Component } from 'react';
import PopupModal from './passwordmodel.js';
import ProfileForm from './candidate_profile_form.js';
import userIcon from '../asset/user.svg';
import { connect } from 'react-redux'
import { Spin,Row, Col } from 'antd';
import APIManager from '../../APIManager';
import ProfilePhoto from './candidate_profile'
import HELPERS from "../../APIManager/helper";
// import { geolocated } from "react-geolocated";

class Profile extends Component {
	infoElement = React.createRef();
	constructor(props){
		super(props);
		this.state = {
			modalShow:false,
			formIsValid:false,
			uploadedImage: userIcon,
			upload_image:"",
			upload_image_name:"",
			isImageUpload:false,
			current_location:""
		}
		// this.infoElement = React.createRef();
	}
	componentDidMount(){
		// console.log(this.props.coords)
		HELPERS.getLatLong()
		this.getcurrentLocation()
		APIManager.companyInfo();
		// this.getLatLong()
	}
	handleProfileSubmit = () => {
		console.log(this.infoElement.current)
		this.infoElement.current.handledClick()
	}
	getcurrentLocation = () =>{
		var ls = require('local-storage');
		let lat = ls.get('lat');
		let long = ls.get('long')
		HELPERS.getLocation(lat,long).then((response)=>{
			console.log("response",response);
			if(response.data.results.length > 0){
				let location = response.data.results[9].formatted_address;
				this.setState({current_location:location})
			}
			
		})
		// console.log(location_name)
	}
	handleChangePassword = (e) =>{
		this.setState({modalShow:true})
	}
	imageData = (newFile) =>{
		console.log(newFile)
		this.setState({upload_image:newFile,isImageUpload:true})
	}
	render(){
		let {modalShow} = this.state.modalShow;
		let loader = true
		let uploadedImage = this.state.uploadedImage
		let data = {};

			loader = this.props.isloading
			data = this.props.infodata
			if(!loader){
				console.log(data.data.data._id)
				if(data.data.data.can_detail.profile !== ""){
					let url = data.data.data.can_detail.profile
					uploadedImage = "https://sendbizbucket.s3.eu-west-3.amazonaws.com/"+url
				}
			}
			
		return(
			<>
			{ loader ? (
				<Spin />
			):(
			<>
				{ this.state.modalShow ? (
					<PopupModal show={this.state.modalShow} onHide={() => this.setState({modalShow:false})} />
				):null }
				
				<Row>
					<Col span={12}>
						<h6 className="candidate_heading">Profile</h6>
					</Col>
					<Col span={12} className="text-right">
						<button type="button" onClick={this.handleProfileSubmit} 
						className="btn btn-dark bold-family btn-save-font cursor">Save</button>
					</Col>
				</Row>
				<Row span={24} justify="space-between" align="middle">
						<Col span={8}>
							<ProfilePhoto imageChange={this.imageData} uploadedImage={uploadedImage} />
						</Col>
						<Col span={16} align="right">
							<ul className="sigunp-logo-with-name" style={{display:"inline-flex"}}>
								<li>
									<button className="edit-password edit-password-active" onClick={()=> this.setState({modalShow:true})}>
										Change Password
									</button>
								</li>
								<li style={{paddingLeft:15}}>
									<button className="edit-password">Import from LinkedIn</button>
								</li>
							</ul>
							<div className="custom-file view-profile">
								<label className="custom-file-label-2"
								onClick={()=>
									this.props.history.push({
										pathname: '/visit-profile',
									})
								}>
									View public profile
								</label>
							</div>
						</Col>
				</Row>
				<ProfileForm ref={this.infoElement} location={this.state.current_location} isImage={this.state.isImageUpload} image={ this.state.upload_image } image_name={this.state.upload_image_name} data={data} />
				
			</>
			)}
			</>
			)
	}
}
const mapStateToProps = (state) => ({                    
    data: state.AuthReducer.user,
    infodata: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading,
    authloading: state.AuthReducer.isloading,
})
// const geolocator = () => ({
// 	positionOptions: {
// 		enableHighAccuracy: false,
// 	},
// 	userDecisionTimeout: 5000,
// })
export default connect(mapStateToProps)(Profile);