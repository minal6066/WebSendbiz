import React , { Component } from 'react';
import D from "../asset/Group 51.png"
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';
import { message,Row,Col } from "antd";
import APIManager from "../../APIManager/index";
import { Formik } from 'formik';
let formButton = null;
const { Option } = Select;

// const currencyDropdown = (
//   <Select defaultValue="$">
//     <Option value="$">$</Option>
//     <Option value="$">$</Option>
//     <Option value="$">$</Option>
//   </Select>
// );
class CandidatureSalary extends Component {
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
		}
	}
	handleClick = () =>{
		formButton.click();
	}
	
	render(){
		const data = this.props.data
		return(
			<>
			<Formik
		          initialValues={{
		            lastSalary: data.lastSalary ? data.lastSalary:"",
		            recieveFormat: data.recieveFormat ? data.recieveFormat:"",
		            minSalary: data.minSalary ? data.minSalary:"",
		            maxSalary: data.maxSalary ? data.maxSalary:"",
		          }}
		          onSubmit={(values, { setSubmitting }) => {
		            setTimeout(() => {
		              setSubmitting(false);
		              this.props.setData(values);
		            }, 500);
		          }}
		          validationSchema={Yup.object().shape({
		            // foundingYear:Yup.string().required("required"),
		            // companyInfo:Yup.string().required("required"),
		            // avgAge:Yup.string().required("required"),
		            // tags:Yup.string().required("required"),
		            //  companyCategory:Yup.string().required("required"),
		           // fruit: Yup.string().required('required'),
		          })}
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
							<label className="input_label_profile">Last Salary</label>
							<Input
		                        name="lastSalary"
		                        onChange={handleChange}
		                        value={values.lastSalary}
		                        className="input-field-custom-type-1-left"
		                        placeholder="Enter last salary"
		                      />
						</Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile">Recieve Format</label>
							<select
								defaultValue={values.recieveFormat}
								className="input-field-custom-type-1-left"
								placeholder="Select formate"
								onChange={handleChange}
								optionLabelProp="label"
								name="recieveFormat"
		                        >
		                          <option value="hourly" label="hourly">
		                            Hourly
		                          </option>
		                          <option value="daily" label="daily">
		                            Daily
		                          </option>
								  <option value="weekly" label="weekly">
									Weekly
		                          </option>
								  <option value="monthly" label="monthly">
		                            Monthly
		                          </option>
								  <option value="annualy" label="annualy">
		                            Annualy
		                          </option>
		                    </select>
						</Col>
						<Col span={12} className="form-padding-right">
							<label className="input_label_profile">Min Salary</label>
							<Input
		                        name="minSalary"
		                        onChange={handleChange}
		                        value={values.minSalary}
		                        className="input-field-custom-type-1-left"
		                        placeholder="Enter min salary"
		                      />
		                </Col>
						<Col span={12} className="form-padding-left">
							<label className="input_label_profile">Max Salary</label>
							<Input
		                        name="maxSalary"
		                        onChange={handleChange}
		                        value={values.maxSalary}
		                        className="input-field-custom-type-1-left"
		                        placeholder="Enter max salary"
		                      />
						</Col>
					</Row>
					<button
						style = {{opacity:0}}
						type={'submit'}
						ref={(e) => {
						formButton = e;
	                  }}
	                ></button>
				</form>
				);
	          	}}
			</Formik>
			</>
			)
	}
}

export default CandidatureSalary;
