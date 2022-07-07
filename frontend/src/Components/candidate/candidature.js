import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import Popup from "./socialPopup"
import Axios from '../axios/axios_setup';
import axios from 'axios'
import D from "../asset/Group 51.png"
import AllTabs from '../layout/tabsComponent';
import SocialModal from './socialModal.js';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import CandidatureSalary from './candidature_salary';
import CandidatureSocial from './candidature_social';
import CandidatureQualification from './candidature_qualification';
import CandidatureExperience from './candidature_experience';
import CandidatureContact from './candidature_contact';
import { connect } from 'react-redux';
import { message,Row,Col } from "antd";
import APIManager from '../../APIManager';
import HELPERS from "../../APIManager/helper";

class Candidature extends Component {
	constructor(props){
		super(props);
		this.salaryElement = React.createRef();
		this.socialElement = React.createRef();
		this.qualificationElement = React.createRef();
		this.experienceElement = React.createRef();
		this.contactElement = React.createRef();
		this.state = {
			salary_active : 'candidature-active',
			social_active : '',
			qualification_active : '',
			exp_active : '',
			contact_active : '',
			tab_name:'Profile',
			// ==========================================================Qualifications=======================
			allQualification:[],
			degree: '',
			institute: '',
			university: '',
			qulification_from:'',
			qulification_to:'',
			// ==========================================================Salary================================
			last_salary: 0,
			min_salary: 0,
			max_salary: 0,
			recieved_format: '',
			// ===========================================================Experience=============================
			allExperiences:[],
			title: '',
			company: '',
			employment_type: '',
			location: '',
			experience_from: '',
			experience_to: '',
			currently_working: false,
			bio: '',
			// ===========================================================Social================================
			linkedin: '',
			facebook: '',
			instagram: '',
			twitter: '',
			pinterest: '',
			youtube: '',
			indexOfModal:'',
			// =========================================================Contact Info============================
			phone_number : '',
			landline_number : '',
			address_line1 : '',
			address_line2 : '',
			city : '',
			state : '',
			zip_code : '',
			latitude : '',
			longitude : '',
			//===========================================================social Info===============
			social_Links:{},
			socialLinkData:[],
			initialLength:'',
			isOpen:false,
			modalShow:false,
			linktitle:"",
			link:"",
			form_data_1 :"",
			form_data_2 :"",
			form_data_3 :"",
			form_data_4 :"",
			form_data_5 :"",
		}
	}

	makeSocialLinkDynamic=()=>{
		// console.log(this.state.social_Links)
		let allSocialLinkData=[];
		let social1=[];
		let social2=[];
		if(Object.keys(this.state.social_Links).length!=0){
			for(let i=0;i<Object.keys(this.state.social_Links).length;i++){
				allSocialLinkData.push({
					Title:Object.keys(this.state.social_Links)[i],
					Link:this.state.social_Links[Object.keys(this.state.social_Links)[i]],
					
				})
			this.setState({socialLinkData:allSocialLinkData,initialLength:allSocialLinkData.length})
			}
		}
	}
			

	

	componentDidMount(){
		// // this.getLinkedDetail()
		// await this.getProfileDetail()
		APIManager.companyInfo();
		HELPERS.getLatLong()
		// console.log(this.socialElement.current)
		this.makeSocialLinkDynamic()
	}
	handleSubmit = () =>{
		this.salaryElement.current.handleClick()
		// console.log(this.socialElement.current)
		if(this.socialElement.current !== null){
			this.socialElement.current.handleClick()
		}
		if(this.qualificationElement.current !== null){
			this.qualificationElement.current.handleClick()
		}
		if(this.experienceElement.current !== null){
			this.experienceElement.current.handleClick()
		}
		if(this.contactElement.current !== null){
			this.contactElement.current.handleClick()
		}
		
		setTimeout(() => {
              this.patchData();
        }, 5000);
	}
	patchData = () =>{
		// console.log(this.state.form_data_4)
		let can_data = this.props.infodata.data.data
		let data = {}
		data["can_salary"] = this.state.form_data_1
		if(this.state.form_data_2 !== ""){
			data["can_social"] = this.state.form_data_2
		}
		else{
			let s = can_data.can_social
			let fs = []
			s.map((n) =>{
				let fso = {}
				fso["name"] = n.name
				fso["link"] = n.link
				fs.push(fso)
			})
			data["can_social"] = fs
			
		}
		if(this.state.form_data_3 !== ""){
			data["can_qualification"] = this.state.form_data_3
		}
		else{
			let d = can_data.can_qualification
			let cd = []
			d.map((n) =>{
				let fso = {}
				fso["degree"] = n.degree
				fso["from"] = n.from
				fso["institute"] = n.institute
				fso["to"] = n.to
				fso["university"] = n.university
				cd.push(fso)
			})
			data["can_qualification"] = cd
		}
		if(this.state.form_data_4 !== ""){
			data["can_experience"] = this.state.form_data_4
			console.log(this.state.form_data_4)
		}
		else{
			let ce = can_data.can_experience
			let cd = []
			ce.map((n) =>{
				let fso = {}
				fso["company"] = n.degree
				fso["from"] = n.from
				fso["isCurrentlyWorking"] = n.isCurrentlyWorking
				fso["to"] = n.to
				fso["location"] = n.location
				fso["title"] = n.title
				fso["description"] = n.description
				fso["employmentType"] = n.employmentType
				cd.push(fso)
			})
			data["can_experience"] = cd
		}
		if(this.state.form_data_5 !== ""){
			data["can_contact"] = this.state.form_data_5
		}
		else{
			data["can_contact"] = can_data.can_contact
		}
		console.log(data)
		APIManager.candidatureSubmit(data)
	      .then((response) => {
	      	console.log(response)
	        if (response.data.status === "success") {
	        	// this.props.onHide()
	          	message.info("Data saved successfully");
	          // console.log(response)
	        }
	      })
	      .catch((err) =>
	        message.error("Something went wrong.")
	      );

	}
	setDataSalary = (data) =>{
		this.setState({form_data_1:data})
	}
	setDataSocial = (data) =>{
		this.setState({form_data_2:data})
	}
	setDataQualification = (data) =>{
		this.setState({form_data_3:data})
	}
	setDataExperience = (data) =>{
		this.setState({form_data_4:data})
	}
	setDataContact =(data) =>{
		this.setState({form_data_5:data})
	}
	render(){
		const loader = this.props.isloading
		let tabs = []
		if(loader){
			tabs = []
		}
		else{
			console.log(this.props.infodata.data.data)
			let data = this.props.infodata.data.data
			tabs = [
					{ tabname:"Salary",comp:<CandidatureSalary setData={this.setDataSalary} ref={this.salaryElement} data={data.can_salary} /> },
					{ tabname:"Social",comp:<CandidatureSocial setData={this.setDataSocial} ref={this.socialElement} data={data.can_social} /> },
					{ tabname:"Qualification",comp:<CandidatureQualification setData={this.setDataQualification} ref={this.qualificationElement} data={data.can_qualification} /> },
					{ tabname:"Experience",comp:<CandidatureExperience setData={this.setDataExperience} ref={this.experienceElement} data={data.can_experience} /> },
					{ tabname:"Contact Info",comp:<CandidatureContact setData={this.setDataContact} ref={ this.contactElement } data={data.can_contact} /> }
				]
		}
		// console.log(tabs)
		return(
			<>
			{ loader ? "":(
			<Row>
				<Col span={12}>
					<h6 className="candidate_heading">Profile</h6>
				</Col>
				<Col span={12} className="text-right">
					<button type="button" onClick={this.handleSubmit} className="btn btn-dark bold-family btn-save-font cursor">Save</button>
				</Col>
				<AllTabs company_tabs={tabs} class={"company_profile_main_tabs"} />
			</Row>
			)}
			{/*{this.state.isOpen ? <Popup open={this.state.isOpen} close={this.closeModal } addDataDomain={this.addLinkTitle} addDataLink={this.addLink} index={this.state.indexOfModal}/>:null}*/}
			</>
			)
	}
}

const mapStateToProps = (state) => ({                    
    data: state.AuthReducer.user,
    infodata: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading,
})

export default connect(mapStateToProps)(Candidature);
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAhy69dsYt70wYVncRdQJqQd67FBg7r3k0'
// })(Candidature);