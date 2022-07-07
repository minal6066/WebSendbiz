import React, { Component } from 'react';
import D from '../asset/Group 51.png';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select, Row, Col, Input } from 'antd';
import { message, Checkbox, DatePicker } from 'antd';
import APIManager from '../../APIManager/index';
import { Formik } from 'formik';
import moment from 'moment';
let formButton = null;
const { Option } = Select;
const { TextArea } = Input;
class CandidatureExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary_active: 'candidature-active',
      social_active: '',
      qualification_active: '',
      exp_active: '',
      contact_active: '',
      tab_name: 'Profile',
      // ===========================================================Experience=============================
      allExperiences: [],
      title: '',
      company: '',
      employmentType: '',
      location: '',
      experience_from: '',
      experience_to: '',
      isCurrentlyWorking: false,
      show_currently_working: true,
      edit_experience: false,
      description: '',
      disabled: false,
      edit_data_index: '',
    };
  }
  componentWillMount() {
    let data = this.props.data;
    console.log(data);
    let cd = [];
    data.map((n) => {
      let fso = {};
      fso['company'] = n.degree;
      fso['from'] = n.from;
      fso['isCurrentlyWorking'] = n.isCurrentlyWorking;
      fso['to'] = n.to;
      fso['location'] = n.location;
      fso['title'] = n.title;
      fso['employmentType'] = n.employmentType;
      fso['description'] = n.description;
      cd.push(fso);
      if (n.isCurrentlyWorking) {
        this.setState({ show_currently_working: false });
      }
    });
    this.setState({ allExperiences: cd });
  }
  handleClick = () => {
    console.log(this.state.allExperiences);
    this.addAnotherExp();
    this.props.setData(this.state.allExperiences);
  };
  handleFromDate = (date, dateString) => {
    this.setState({ experience_from: dateString });
  };
  handleToDate = (date, dateString) => {
    // console.log(dateString)
    this.setState({ experience_to: dateString });
  };
  disabledDate = (current) => {
    // console.log(current)
    let customDate = this.state.qualification_from;
    return current < moment(customDate, 'DD MMMM YYYY');
  };
  handleCurrentlyWorking = (checkedValue) => {
    if (checkedValue.target.checked) {
      this.setState({
        isCurrentlyWorking: checkedValue.target.checked,
        disabled: true,
      });
    } else {
      this.setState({
        isCurrentlyWorking: checkedValue.target.checked,
        disabled: false,
        experience_to: '',
      });
    }
  };
  handleEditExperience = (index) => {
    // console.log(index)
    let allExp = this.state.allExperiences;
    // console.log(allExp[index])
    let edit_data_index = index;
    let title = this.state.title;
    title = allExp[index].title;
    let company = this.state.company;
    company = allExp[index].company;
    let employmentType = this.state.employmentType;
    employmentType = allExp[index].employmentType;
    let location = this.state.location;
    location = allExp[index].location;
    let experience_from = this.state.experience_from;
    experience_from = allExp[index].from;
    let experience_to = this.state.experience_to;
    experience_to = allExp[index].to;
    let isCurrentlyWorking = this.state.isCurrentlyWorking;
    isCurrentlyWorking = allExp[index].isCurrentlyWorking;
    let bio = this.state.bio;
    bio = allExp[index].description;
    // console.log(isCurrentlyWorking,this.state.show_currently_working)
    if (isCurrentlyWorking && !this.state.show_currently_working) {
      this.setState({ show_currently_working: true });
    } else {
      this.setState({ show_currently_working: false });
    }
    this.setState({
      title,
      company,
      employmentType,
      location,
      experience_from,
      experience_to,
      isCurrentlyWorking,
      bio,
      edit_experience: true,
      edit_data_index: edit_data_index,
    });
  };
  addEditExperience = (index) => {
    let allExp = this.state.allExperiences;
    allExp[index].title = this.state.title;
    allExp[index].company = this.state.company;
    allExp[index].employmentType = this.state.employmentType;
    allExp[index].location = this.state.location;
    allExp[index].from = this.state.experience_from;
    allExp[index].to = this.state.experience_to;
    allExp[index].isCurrentlyWorking = this.state.isCurrentlyWorking;
    allExp[index].description = this.state.bio;
    this.setState({
      allExperiences: allExp,
      title: '',
      company: '',
      employmentType: '',
      location: '',
      experience_from: '',
      experience_to: '',
      isCurrentlyWorking: false,
      bio: '',
      edit_experience: false,
    });
  };
  addAnotherExp = () => {
    let allExp = this.state.allExperiences;
    allExp.push({
      title: this.state.title,
      company: this.state.company,
      employmentType: this.state.employmentType,
      location: this.state.location,
      from: this.state.experience_from,
      to: this.state.experience_to,
      isCurrentlyWorking: this.state.isCurrentlyWorking,
      description: this.state.bio,
    });
    if (
      allExp[allExp.length - 1].title === '' ||
      allExp[allExp.length - 1].company === '' ||
      allExp[allExp.length - 1].employmentType === '' ||
      allExp[allExp.length - 1].location === '' ||
      allExp[allExp.length - 1].experience_from === '' ||
      allExp[allExp.length - 1].experience_to === '' ||
      allExp[allExp.length - 1].bio === ''
    ) {
      allExp.splice(allExp.length - 1, 1);
    } else {
      this.setState({
        allExperiences: allExp,
        title: '',
        company: '',
        employmentType: '',
        location: '',
        experience_from: '',
        experience_to: '',
        isCurrentlyWorking: false,
        bio: '',
      });
    }
  };
  render() {
    // console.log(this.state.allExperiences)
    return (
      <>
        <form>
          {this.state.allExperiences.length != 0 ? (
            <Row>
              {this.state.allExperiences.map((val, index) => {
                if (index % 2 == 0) {
                  return (
                    <Col
                      span={12}
                      key={index}
                      className="card-bottom-padding-qualification form-padding-right"
                    >
                      <Row className="bg-white qualification-card">
                        <Col span={5}>
                          <img src={D} className="qualification-card-icon" />
                        </Col>
                        <Col span={18} className="qualification-card-icon-data">
                          <p className="degree_name_cls_1">{val.title} </p>
                          <p className="degree_name_cls_2">
                            {moment(val.from).format('DD MMMM YYYY')} to{' '}
                            {moment(val.to).format('DD MMMM YYYY')}
                          </p>
                        </Col>
                        <Col span={1}>
                          <img
                            onClick={() => this.handleEditExperience(index)}
                            src={process.env.PUBLIC_URL + '/edit.png'}
                          />
                        </Col>
                      </Row>
                    </Col>
                  );
                } else {
                  return (
                    <Col
                      span={12}
                      key={index}
                      className="card-bottom-padding-qualification form-padding-right"
                    >
                      <Row className="bg-white qualification-card">
                        <Col span={5}>
                          <img src={D} className="qualification-card-icon" />
                        </Col>
                        <Col span={18} className="qualification-card-icon-data">
                          <p className="degree_name_cls_1">{val.title} </p>
                          <p className="degree_name_cls_2">
                            {moment(val.from).format('DD MMMM YYYY')} to{' '}
                            {moment(val.to).format('DD MMMM YYYY')}
                          </p>
                        </Col>
                        <Col span={1}>
                          <img
                            onClick={() => this.handleEditExperience(index)}
                            src={process.env.PUBLIC_URL + '/edit.png'}
                          />
                        </Col>
                      </Row>
                    </Col>
                  );
                }
              })}
            </Row>
          ) : null}
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Title</label>
              <Input
                type="text"
                className="input-field-custom-type-1-left"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                placeholder=""
              />
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Employment Type</label>
              <select
                className="input-field-custom-type-1-left"
                value={this.state.employmentType}
                onChange={(e) =>
                  this.setState({ employmentType: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Permanent">Permanent</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Temporary">Temporary</option>
                <option value="Commission">Commission</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Internship">Internship</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Freelance">Freelance</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </Col>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Company</label>
              <Input
                type="text"
                className="input-field-custom-type-1-left"
                value={this.state.company}
                onChange={(e) => this.setState({ company: e.target.value })}
                placeholder=""
              />
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Location</label>
              <Input
                type="text"
                className="input-field-custom-type-1-left"
                value={this.state.location}
                onChange={(e) => this.setState({ location: e.target.value })}
                placeholder=""
              />
            </Col>
          </Row>
          <Row>
            <Col span={8} className="form-padding-right">
              <label className="input_label_profile">From</label>
              <DatePicker
                onChange={this.handleFromDate}
                name="experience_from"
                size="large"
                suffixIcon={
                  <img src={process.env.PUBLIC_URL + '/calendar-date.svg'} />
                }
                className="w-100 input-field-custom-type-1-left"
                value={
                  this.state.experience_from
                    ? moment(this.state.experience_from)
                    : undefined
                }
                format={'DD MMMM YYYY'}
                picker="date"
              />
              {/*<Input 
								type="date" 
								className="input-field-custom-type-1-left" 
								value={this.state.experience_from} 
								onChange={e => this.setState({experience_from:e.target.value})} 
								placeholder=""/>*/}
            </Col>
            <Col span={8} className="form-padding-left">
              <label className="input_label_profile">To</label>
              <DatePicker
                className="w-100 input-field-custom-type-1-left disabled-bg"
                value={
                  this.state.experience_to
                    ? moment(this.state.experience_to)
                    : undefined
                }
                onChange={this.handleToDate}
                disabledDate={this.disabledDate}
                disabled={this.state.disabled}
                suffixIcon={
                  <img src={process.env.PUBLIC_URL + '/calendar-date.svg'} />
                }
                picker="date"
                format={'DD MMMM YYYY'}
              />
              {/*<input 
								type="date" 
								className="input-font form-control profile-form-control" 
								value={this.state.experience_to} 
								onChange={e => this.setState({experience_to:e.target.value})} 
								placeholder=""/>*/}
            </Col>
            <Col
              span={8}
              className="form-padding-left checkbox-padding-candidate"
            >
              {this.state.show_currently_working ? (
                <Checkbox
                  className="input_label_profile"
                  checked={this.state.isCurrentlyWorking}
                  onChange={this.handleCurrentlyWorking}
                >
                  Currently working here
                </Checkbox>
              ) : null}

              {/*<input type="checkbox" className="form-check-input" value={this.state.currently_working} onClick={e => this.setState({currently_working:e.target.checked})} id="exampleCheck1" />
								<label className="input_label_profile" htmlFor="exampleCheck1">Currently working here</label>*/}
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-area-padding">
              <label className="input_label_profile">Description</label>
              <TextArea
                name="bio"
                className="input-font form-control profile-form-control"
                value={this.state.bio}
                onChange={(e) => this.setState({ bio: e.target.value })}
                rows="5"
              ></TextArea>
            </Col>
            <div className="custom-file input_label_profile">
              {this.state.edit_experience ? (
                <label
                  onClick={() =>
                    this.addEditExperience(this.state.edit_data_index)
                  }
                  className="custom-file-label-2 m-0"
                >
                  <img
                    src={process.env.PUBLIC_URL + '/add-circle.png'}
                    style={{ width: '8%' }}
                  />
                  &nbsp;&nbsp; Save experience
                </label>
              ) : (
                <label
                  onClick={this.addAnotherExp}
                  className="custom-file-label-2 m-0"
                >
                  <img
                    src={process.env.PUBLIC_URL + '/add-circle.png'}
                    style={{ width: '8%' }}
                  />
                  &nbsp;&nbsp; Add another experience
                </label>
              )}
            </div>
          </Row>
          {/*<div className="form-group m-0" style={{width:'100%',padding:"0 15px"}}>
						<label className="input_label_profile" htmlFor="exampleInputBio1">Description</label>
						<textarea className="input-font form-control profile-form-control" value={this.state.bio} onChange={e => this.setState({bio:e.target.value})} rows="5" id="exampleInputBio1"></textarea>
					</div>*/}
        </form>
      </>
    );
  }
}

export default CandidatureExperience;
