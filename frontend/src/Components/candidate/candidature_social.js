import React , { Component } from 'react';
import D from "../asset/Group 51.png"
import SocialModal from './socialModal.js';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { message,Row,Col,Input } from "antd";
import APIManager from "../../APIManager/index";
import { Formik } from 'formik';
let formButton = null;
const { Option } = Select;
let initialValues = {
	Linkedin: "",
	Facebook: "",
	Instagram: "",
	Twitter: "",
	Youtube:"",
	Printerest:""
}
class CandidatureSocial extends Component {
	constructor(props){
		super(props);
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
			initialdata: {},
			initialLength:'',
			isOpen:false,
			modalShow:false,
			linktitle:"",
			link:"",
		}
	}
	// componentDidMount(){
	// 	this.getProfileDetail()
	// }
	handleClick = () =>{
		formButton.click();
	}
	makeSocialLinkDynamic=(data)=>{
        console.log(data)
        let allSocialLinkData=[];
        let social1=[];
        let social2=[];
        if(Object.keys(data).length!=0){
            for(let i=0;i<Object.keys(data).length;i++){
                allSocialLinkData.push({
                    name:Object.keys(data)[i],
                    link:data[Object.keys(data)[i]],
                })
            console.log(allSocialLinkData)
            this.setState({socialLinkData:allSocialLinkData})
            }
        }
    }
    formateData = (data) =>{
    	// console.log(data)
        let allSocialLinkData=[];
        let social1=[];
        let social2=[];
        if(Object.keys(data).length!=0){
            for(let i=0;i<Object.keys(data).length;i++){
                allSocialLinkData.push({
                    name:Object.keys(data)[i],
                    link:data[Object.keys(data)[i]],
                })
            }
            // console.log(allSocialLinkData)
            this.props.setData(allSocialLinkData)
        }
    }
    setformdata = (data) => {
        console.log(data)
        let social_Link_data=this.state.socialLinkData;
        let social_Links = this.state.social_Links
        let len = social_Link_data.length
        if(data.tag.length > 0 && data.link.length){
            social_Link_data.push({
                name:"",
                link:""
            })

            initialValues[data.tag] = data.link

            social_Link_data[len].name = data.tag
            social_Link_data[len].link = data.link
        }
        console.log(social_Link_data)
        this.setState({modalShow:false,social_Link_data})
    }
    componentWillMount(){
        let data = this.props.data
        if(data.length > 0){
            let initialdata = {}
            for(let i=0; i<data.length; i++){
                initialdata[data[i].name] = data[i].link
            }
            this.makeSocialLinkDynamic(initialdata)
            initialValues = initialdata
        }
        else{
            this.makeSocialLinkDynamic(initialValues)
        }
        
    }
	addSocialLink=()=>{
		this.setState({modalShow:true});
		let socialData=this.state.socialLinkData;
		socialData.push({
			name:"",
			link:""
		})
		// initialValues[data.Title] = data.Link
		this.setState({
			socialLinkData:socialData,
			indexOfModal:socialData.length-1
		})
	}
	
	closeModal=()=>{
		if(this.state.socialLinkData[this.state.indexOfModal].tag=="" ||this.state.socialLinkData[this.state.indexOfModal].link==""){
			this.state.socialLinkData.splice(this.state.indexOfModal,1)
		}
		this.setState({modalShow:false})
	}
	
	render(){
		// console.log(this.state.socialLinkData,initialValues)
		return(
			<>
			{ this.state.modalShow ? (
				<SocialModal show={this.state.modalShow} 
					onHide={this.closeModal} setdata={this.setformdata} 
					ref={ this.linkElement } 
				/>
			):""}
			
			<Formik
		          initialValues={initialValues}
		          onSubmit={(values, { setSubmitting }) => {
		            setTimeout(() => {
		              setSubmitting(false);
		              this.formateData(values);
		            }, 500);
		          }}
		        >
		          {(formikProps) => {
		            const {
		              values,
		              errors,
		              handleChange,
		              handleSubmit,
		              setFieldValue,
		              setFieldTouched,
		            } = formikProps;
            	return (
				<form onSubmit={formikProps.handleSubmit}>
					<Row>
						<Col span={12} className="form-padding-right">
							{this.state.socialLinkData.map((val,index)=>{
								if(index%2==0){
									return(<div className="form-group m-0" key={index}>
									<label className="input_label_profile">{val.name}</label> 
									<Input type="text" 
										className="input-field-custom-type-1-left"
										value={values[val.name]}
										name={val.name}
										onChange={handleChange}
										placeholder={val.name}/>
								</div>)
								}
							})}
						</Col>
						<Col span={12} className="form-padding-left">
							{this.state.socialLinkData.map((val,index)=>{
									if(index%2==1){
										return(
											<div className="form-group m-0" key={index}>
												<label className="input_label_profile">{val.name}</label> 
												<Input type="text"
													className="input-field-custom-type-1-left" 
													value={values[val.name]}
													name={val.name}
													onChange={handleChange} 
													placeholder={val.name} />
											</div>)
									}
							})}
						</Col>
						<div className="custom-file input_label_profile">
							<label onClick={this.addSocialLink}className="custom-file-label-2" htmlFor="inputGroupFile01"><i className="fa fa-paperclip"></i>&nbsp;&nbsp;
							Add another link</label>
						</div>
					</Row>
					<button style={{opacity:0}} 
						type={"submit"} ref={(e) => { formButton = e }} >
					</button>
				</form>
				);
	          	}}
			</Formik>
			</>
			)
	}
}

export default CandidatureSocial;
