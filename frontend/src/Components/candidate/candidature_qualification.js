import React , { Component } from 'react';
import D from "../asset/Group 51.png"
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { message,Row, Col, Input, DatePicker, Form, Button, Checkbox } from "antd";
import APIManager from "../../APIManager/index";
import moment from 'moment';
import { Formik } from 'formik';
let formButton = null;
const { Option } = Select;
class CandidatureQualification extends Component {
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
			from:'',
			to:'',
			qualification_from: '',
			qualification_to: '',
			disabled: true,
			edit_qualification: false,
			edit_data_index: ""
			
		}
	}
	componentDidMount(){
        let data = this.props.data
        // console.log(data)
		let cd = []
		data.map((n) =>{
			let fso = {}
			fso["degree"] = n.degree
			fso["from"] = n.from
			fso["institute"] = n.institute
			fso["to"] = n.to
			fso["university"] = n.university
			cd.push(fso)
		})
        this.setState({allQualification:cd})
    }
    handleFromDate = (date, dateString) => {
    	// console.log(dateString)
    	this.setState({qualification_from:dateString,disabled:false})
    }
    handleToDate = (date, dateString) =>{
    	// console.log(dateString)
    	this.setState({qualification_to:dateString})
    }
    handleEditQualification =(index) =>{
    	// console.log("edit data:",this.state.allQualification[index])
    	let edit_data = this.state.allQualification[index]
    	// console.log(edit_data,"data taken:")
    	let edit_data_index = index
    	let degree = this.state.degree
    	degree = edit_data.degree
    	let qualification_from = this.state.qualification_from
    	qualification_from = edit_data.from
    	let qualification_to = this.state.qualification_to
    	qualification_to = edit_data.to
    	let institute = this.state.university
    	institute = edit_data.institute
    	let university = this.state.university
    	university = edit_data.university
    	// console.log("date fields:", qualification_from,qualification_to);
    	this.setState({
    		degree,
    		qualification_from,
    		qualification_to,
    		institute,
    		university,
    		edit_qualification: true,
    		edit_data_index: edit_data_index
    	})
    }
    disabledDate = (current) =>{
    	// console.log(current)
    	let customDate = this.state.qualification_from
    	return current < moment(customDate, "DD MMMM YYYY");
    }
	handleClick = () =>{
		// console.log(this.state.allQualification)
		this.addAnotherQualification()
		this.props.setData(this.state.allQualification)
	}
	addEditQualification = (index) =>{
		// console.log(index)
		let newQualifiucation = this.state.allQualification;
		newQualifiucation[index].degree = this.state.degree
		newQualifiucation[index].institute=this.state.institute
		newQualifiucation[index].university=this.state.university
		newQualifiucation[index].from=this.state.qualification_from
		newQualifiucation[index].to=this.state.qualification_to
		this.setState({allQualification:newQualifiucation})
		this.setState({
			degree:"",
			institute:"",
			university:"",
			qualification_from:"",
			qualification_to:"",
			edit_qualification:false
		})
	}
	addAnotherQualification=()=>{
		let newQualifiucation = this.state.allQualification;
		newQualifiucation.push({
			degree:this.state.degree,
			institute:this.state.institute,
			university:this.state.university,
			from:this.state.qualification_from,
			to:this.state.qualification_to
		})
		if(newQualifiucation[newQualifiucation.length-1].degree==="" ||
			newQualifiucation[newQualifiucation.length-1].university==="" ||
			newQualifiucation[newQualifiucation.length-1].institute==="" ||
			newQualifiucation[newQualifiucation.length-1].qualification_from==="" ||
			newQualifiucation[newQualifiucation.length-1].qualification_to==="")
		{
			newQualifiucation.splice(newQualifiucation.length-1,1)
			
		}
		else{
			this.setState({
				allQualification:newQualifiucation,
				degree:"",
				institute:"",
				university:"",
				qualification_from:"",
				qualification_to:""
			})
		}
		
	}
	render(){
		return(
			<>
				<form>
					{this.state.allQualification.length!=0 ? 
					<Row className="">
						{this.state.allQualification.map((val,index)=>{
							if(index%2==0){
								return(
									<Col span={12} key={index} className="card-bottom-padding-qualification form-padding-right">
										<Row className="bg-white qualification-card">
											<Col span={5}>
												<img src={D} className="qualification-card-icon" />
											</Col>
											<Col span={18} className="qualification-card-icon-data">
												<p className="degree_name_cls_1">{val.degree} </p>
												<p className="degree_name_cls_2">{moment(val.from).format('DD MMMM YYYY')} - {moment(val.to).format('DD MMMM YYYY')}</p>
											</Col>
											<Col span={1}>
												<img onClick={() => this.handleEditQualification(index)} src={process.env.PUBLIC_URL + "/edit.png"} />
											</Col>
										</Row>
									</Col>
								)
							}else{
								return(
									<Col span={12} key={index} className="card-bottom-padding-qualification form-padding-left">
										<Row className="bg-white qualification-card">
											<Col span={5}>
												<img src={D} className="qualification-card-icon" />
											</Col>
											<Col span={18} className="qualification-card-icon-data">
												<p className="degree_name_cls_1">{val.degree} </p>
												<p className="degree_name_cls_2">{moment(val.from).format('DD MMMM YYYY')} - {moment(val.to).format('DD MMMM YYYY')}</p>
											</Col>
											<Col span={1}>
												<img onClick={() => this.handleEditQualification(index)} src={process.env.PUBLIC_URL + "/edit.png"} />
											</Col>
										</Row>
									</Col>
								)
							}
							
						})}
					</Row>
					:null}
					<Row>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Degree</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={this.state.degree} 
							onChange={e => this.setState({degree:e.target.value})} 
							placeholder="Enter degree name" />
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Institute</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={this.state.institute} 
							onChange={e => this.setState({institute:e.target.value})} 
							placeholder="Enter institute name"/>
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">University</label>
							<Input type="text" 
							className="input-field-custom-type-1-left" 
							value={this.state.university} 
							onChange={e => this.setState({university:e.target.value})}
							placeholder="Enter university name"/>
						</Col>
						<Col span={12} className="form-padding-left">
							
						</Col>
						<Col span={8} className="form-padding-right">
							<label className="input_label_profile">From</label>
							<DatePicker 
		                      onChange={this.handleFromDate}
		                      name="qulification_from"
		                      size="large"
		                      suffixIcon={<img src={process.env.PUBLIC_URL + "/calendar-date.svg"} />} 
		                      className="w-100 input-field-custom-type-1-left"
		                      value={this.state.qualification_from ? moment(this.state.qualification_from) : undefined } 
		                      format={"DD MMMM YYYY"}
		                      picker="date" />
						</Col>
						<Col span={8} className="form-padding-left">
							<label className="input_label_profile">To</label>
							<DatePicker 
							className="w-100 input-field-custom-type-1-left disabled-bg" 
							value={this.state.qualification_to ? (moment(this.state.qualification_to)) : undefined}
							onChange={this.handleToDate}
							disabledDate = {this.disabledDate}
							disabled = {this.state.disabled}
							suffixIcon={<img src={process.env.PUBLIC_URL + "/calendar-date.svg"} />} 
							picker="date"
							format={"DD MMMM YYYY"}/>
						</Col>
					</Row>
					<div className="custom-file input_label_profile">
						{ this.state.edit_qualification ? (
							<label  onClick={() => this.addEditQualification(this.state.edit_data_index)} className="custom-file-label-2 m-0">
								<img src={process.env.PUBLIC_URL + "/add-circle.png"} style={{width:"8%"}} />&nbsp;&nbsp;
							Save qualification</label>
						):(
							<label  onClick={this.addAnotherQualification} className="custom-file-label-2 m-0">
								<img src={process.env.PUBLIC_URL + "/add-circle.png"} style={{width:"8%"}} />&nbsp;&nbsp;
							Add another qualification</label>
						)}
					</div>
				</form>
			</>
			)
	}
}

export default CandidatureQualification;
