import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator'; // used when validating with a self-implemented approach
import * as Yup from 'yup'; // used when validating with a pre-built solution
import { message } from 'antd';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import APIManager from '../../APIManager/index';
import { withRouter } from 'react-router-dom';

Yup.addMethod(Yup.string, 'customValidator', function () {
  console.log('hell');
  return null;
});

class Companysignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1validation: false,
      password2validation: false,
      termsandcondition: false,
      formIsValid: true,
      ExistId: false,
      companyId: '',
    };
  }
  onSubmit = (e, { setSubmitting }) => {
    if (!this.state.ExistId && this.state.companyId) {
      console.log('INside submit');
      setTimeout(() => {
        setSubmitting(false);
        this.finalSubmit(e);
      }, 500);
    } else {
      message.error('Please enter a valid Company ID');
    }
  };

  customHandleChange = (event) => {
    let searchValue = event.target.value;
    console.log(searchValue, '...........');
    APIManager.checkCompanyId(searchValue).then((response) => {
      console.log(response.data.isSuccess);
      if (response.data.isSuccess) {
        this.setState({
          ExistId: false,
          companyId: event.target.value,
        });
      } else {
        this.setState({
          ExistId: true,
        });
      }
    });
  };

  finalSubmit(data) {
    data['user_type'] = this.props.signup_type;
    data['comp_id'] = this.state.companyId;
    data['comp_detail'] = { company_name: data['comp_detail'] };
    APIManager.Signup(data)
      .then((response) => {
        if (response.data.isSuccess) {
          const authToken = response.data.token;
          const userType = response.data.data.user.user_type;
          var ls = require('local-storage');
          ls.set('token', authToken);
          ls.set('user_type', userType);

          const companyEmail = response.data.data.user.email;
          const companyName = response.data.data.user.comp_detail.company_name;
          console.log(response.data.data.user.email);
          ls.set('comapny_email', companyEmail);
          ls.set('comapny_name', companyName);
          message.info('User added successfully');
          this.props.history.push('/edit/company/profile');
        } else {
          message.info(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('Wrong Credentials or something went wrong.');
      });
  }

  render() {
    console.log(this.props.signup_type);
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirm_password: '',
          address: '',
          city: '',
          zip_code: '',
          comp_detail: '',
          password: '',
          confirm_password: '',
          termsandcondition: false,
        }}
        onSubmit={this.onSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('email is required.'),
          password: Yup.string().required('password is required.'),
          confirm_password: Yup.string()
            .required('confirm password is required.')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
          city: Yup.string().required('city name is required'),
          zip_code: Yup.string().required('zip code is required'),
          address: Yup.string().required('address is required'),
          comp_detail: Yup.string().required('Company name is required'),
          termsandcondition: Yup.bool().oneOf(
            [true],
            'Accept Terms & Conditions is required'
          ),
        })}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          } = formikProps;
          return (
            <>
              <form onSubmit={formikProps.handleSubmit}>
                <div className="form-group row mb-signup-1">
                  <div className="col-6 pr-0">
                    <label
                      className="you_are_cls"
                      htmlFor="exampleInputCompanyName"
                    >
                      Name Of Company
                    </label>
                    <input
                      type="text"
                      name="comp_detail"
                      onChange={handleChange}
                      className="form-control input-font login-form-control gapp"
                      id="exampleInputCompanyName"
                      aria-describedby="nameHelp"
                      placeholder="Enter company name"
                      required
                    />

                    {errors.comp_detail && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.comp_detail}
                      </div>
                    )}
                  </div>
                  <div className="col-6 pl-0">
                    <label className="you_are_cls" htmlFor="exampleInputID">
                      Official Company ID
                    </label>
                    <input
                      type="text"
                      onChange={this.customHandleChange}
                      name="company_id"
                      className="form-control input-font login-form-control"
                      id="exampleInputID"
                      aria-describedby="nameHelp"
                      placeholder="Enter company ID"
                      required
                    />
                    {this.state.ExistId && (
                      <p style={{ color: 'red', fontSize: '0.8rem' }}>
                        This id already exist.
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group mb-signup-1">
                  <label className="you_are_cls" htmlFor="exampleInputAddress">
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="address"
                    className="form-control input-font login-form-control"
                    id="exampleInputAddres"
                    aria-describedby="addressHelp"
                    placeholder="Enter address"
                    required
                  />
                  {errors.address && (
                    <div style={{ color: 'red', fontSize: '12px' }}>
                      {errors.address}
                    </div>
                  )}
                </div>
                <div className="form-group row mb-signup-1">
                  <div className="col-6 pr-0">
                    <label className="you_are_cls" htmlFor="exampleInputCity">
                      City
                    </label>
                    <input
                      className="form-control input-font login-form-control gapp"
                      type="text"
                      onChange={handleChange}
                      name="city"
                      id="exampleInputCity"
                      placeholder="Enter city name"
                    />
                    {errors.city && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="col-6 pl-0">
                    <label className="you_are_cls" htmlFor="exampleInputCode">
                      Zip Code
                    </label>
                    <input
                      className="form-control input-font login-form-control"
                      type="text"
                      name="zip_code"
                      onChange={handleChange}
                      id="exampleInputCode"
                      placeholder="Enter zip Code"
                    />
                    {errors.zip_code && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.zip_code}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-signup-1">
                  <label className="you_are_cls" htmlFor="exampleInputEmail">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="form-control input-font login-form-control"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email ID"
                  />
                  {errors.email && (
                    <div style={{ color: 'red', fontSize: '12px' }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group mb-signup-1">
                  <label
                    className="you_are_cls"
                    htmlFor="exampleInputPeoplePassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control input-font login-form-control"
                    onChange={handleChange}
                    id="exampleInputPeoplePassword"
                    aria-describedby="password1Help"
                    placeholder="Enter your password"
                    minLength="8"
                  />
                  {errors.password && (
                    <div style={{ color: 'red', fontSize: '12px' }}>
                      {errors.password}
                    </div>
                  )}
                  {/*<span className="help-block"></span>*/}
                </div>
                <div className="form-group mb-signup-1">
                  <label className="you_are_cls" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control input-font login-form-control"
                    id="confirmPassword"
                    placeholder="Re-Enter your password"
                    onChange={handleChange}
                  />
                  {errors.confirm_password && (
                    <div style={{ color: 'red', fontSize: '12px' }}>
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
                <div
                  className="form-check mb-signup-1"
                  style={{ paddingLeft: '0' }}
                >
                  <Checkbox
                    name="termsandcondition"
                    checked={values.termsandcondition}
                    onChange={handleChange}
                    value={values.termsandcondition}
                  >
                    <label
                      className="input_label_profile form-check-label-2"
                      htmlFor="exampleCheck1"
                    >
                      &nbsp;&nbsp;I have read and accepted the terms and
                      conditions published by JobHunt.com. &nbsp;&nbsp;
                      <small className="cursor terms-link">Read all</small>
                    </label>
                  </Checkbox>
                  {errors.termsandcondition && (
                    <div style={{ color: 'red', fontSize: '12px' }}>
                      {errors.termsandcondition}
                    </div>
                  )}
                </div>
                <div className="cent_button">
                  <button
                    type="submit"
                    className="btn btn-dark login-button-font"
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    );
  }
}
const mapStateToProps = ({ AuthReducer: { user } }) => ({ user });
export default withRouter(connect(mapStateToProps)(Companysignup));
