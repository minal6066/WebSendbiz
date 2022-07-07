import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator'; // used when validating with a self-implemented approach
import * as Yup from 'yup'; // used when validating with a pre-built solution
import { message } from 'antd';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import Candidatesignup from './candidate_signup.js';
import Companysignup from './company_signup.js';
import { withRouter } from 'react-router';
import LoginCover from '../../Components/asset/login_cover.png';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: false,
      CompanyName: '',
      CompanyID: '',
      CompanyAddress: '',
      CompanyEmail: '',
      CompanyCity: '',
      CompanyZip: '',
      Password: '',
      button_value: true,
      signup_by: 'Candidate',
      CandidateFirstName: '',
      CandidateLastName: '',
      fields: {},
      errors: {},
      ConfirmPassword: '',
      CandidateEmail: '',
      password1validation: false,
      password2validation: false,
      termsandcondition: false,
      formIsValid: true,
    };
  }
  gotoLogin() {
    this.props.history.push('/');
  }
  onSubmit = (e, { setSubmitting }) => {
    console.log(e);
    setTimeout(() => {
      setSubmitting(false);
      this.CandidateResumeUpload(e);
    }, 500);
  };

  // console.log(this.state.fields)
  switchCompany(data) {
    // console.log(data,this.state.CompanyPassword)
    if (data === 'company') {
      this.setState({ person: true, signup_by: 'Company', button_value: true });
    } else if (data === 'candidate') {
      this.setState({
        person: false,
        signup_by: 'Candidate',
        button_value: true,
      });
    }
  }
  render() {
    const indeterminate = true;
    return (
      <>
        <div className="row custom_row">
          <div className="col-sm-6 login-left text-left px-left-login px-top-login">
            <div
              className="go-back"
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              <img
                className="cursor"
                src={process.env.PUBLIC_URL + '/go-back-1.png'}
                alt=""
              />
            </div>
            <ul className="sigunp-logo-with-name">
              <li>
                <img
                  className="w-100"
                  src={process.env.PUBLIC_URL + '/db_login.png'}
                  alt="logo"
                />
              </li>
              <li style={{ paddingLeft: 10 }}>
                <h5
                  style={{
                    fontFamily: 'Gilroy Bold',
                    fontSize: 26,
                    paddingTop: 8,
                  }}
                >
                  JOBHUNT
                </h5>
              </li>
            </ul>
            <h6
              style={{
                fontSize: 26,
                fontWeight: 'bolder',
                marginTop: 30,
                fontFamily: 'Gilroy Bold',
              }}
              className="welcome_msg mb-signup-1"
            >
              Welcome !
            </h6>
            <p>Enter the following details to create Account</p>
            <div className="row mb-signup-1 youare">
              <p className="w-100 you_are_cls">You are</p>
              <div className="col-6 pl-0">
                <div className="form-check form-check-inline">
                  {/*<input className="form-check-input signup-button-input" type="radio" onClick={this.switchCompany.bind(this,"company")} name="inlineRadioOptions" defaultChecked id="inlineRadio1" value="2" />
											<label className="form-check-label" htmlFor="inlineRadio1">Company</label>*/}
                  {this.state.person ? (
                    <img
                      onClick={this.switchCompany.bind(this, 'company')}
                      style={{ width: '100%' }}
                      src={process.env.PUBLIC_URL + '/company.png'}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.switchCompany.bind(this, 'company')}
                      style={{ width: '100%' }}
                      src={process.env.PUBLIC_URL + '/company-white.png'}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-check form-check-inline">
                  {/*<input className="form-check-input" type="radio" name="inlineRadioOptions" onClick={this.switchCompany.bind(this,"candidate")} id="inlineRadio1" value="1" />
											<label className="form-check-label" htmlFor="inlineRadio2">Candidate</label>*/}
                  {this.state.person ? (
                    <img
                      onClick={this.switchCompany.bind(this, 'candidate')}
                      style={{ width: '100%' }}
                      src={process.env.PUBLIC_URL + '/people-white.png'}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.switchCompany.bind(this, 'candidate')}
                      style={{ width: '100%' }}
                      src={process.env.PUBLIC_URL + '/people.png'}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            {this.state.person ? (
              <Companysignup signup_type={2} />
            ) : (
              <Candidatesignup signup_type={1} />
            )}
            <h6 className="login-tag">
              Already have an account?{' '}
              <small
                className="cursor red-link"
                onClick={() => this.props.history.push('/login')}
                style={{ color: '#B02318' }}
              >
                Login
              </small>{' '}
              to your account.
            </h6>
          </div>
          <div className="login-container">
            <img className="login_div_img_1" src={LoginCover} alt="campaign" />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ AuthReducer: { user } }) => ({ user });
export default connect(mapStateToProps)(Signup);
