import React, { Component } from 'react';
import './login.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import APIManager from '../../APIManager/index';
import { message } from 'antd';
import { connect } from 'react-redux';
import LoginCover from '../../Components/asset/login_cover.png';

class Login extends Component {
  goSignup() {
    this.props.history.push('/signup');
  }

  //handle login
  loginInApp = (data) => {
    var CryptoJS = require('crypto-js');
    const password = CryptoJS.AES.encrypt(
      JSON.stringify(data.password),
      'my-secret-key@123'
    ).toString();
    const credentials = {
      email: data.email,
      password: password,
    };

    APIManager.Login(data)
      .then((response) => {
        console.log(response);
        if (response.data.isSuccess) {
          //this.props.history.push("/profile");
          const authToken = response.data.token;
          const userType = response.data.data.user.user_type;
          console.log(userType);
          var ls = require('local-storage');
          const rand = Math.floor(1 + Math.random() * (100 - 1));
          ls.set('user_type2', rand);
          ls.set('token', authToken);
          ls.set('user_type', userType * rand * 99);
          if (userType === 1) {
            const candidateEmail = response.data.data.user.email;
            const firstName = response.data.data.user.can_detail.first_name;
            const lastName = response.data.data.user.can_detail.last_name;
            const fullName = `${firstName} ${lastName}`;
            this.props.history.push('/profile');
            ls.set('email', candidateEmail);
            ls.set('name', fullName);
            message.info(
              `Welcome ${
                firstName.charAt(0).toUpperCase() + firstName.slice(1)
              }`
            );
          } else if (userType === 2 || userType === 3) {
            console.log(response.data.data);
            const companyEmail = response.data.data.user.email;
            console.log('h1');
            const companyName =
              response.data.data.user.comp_detail.company_name;
            console.log('h2');
            ls.set('comapny_email', companyEmail);
            ls.set('comapny_name', companyName);
            console.log('h3');
            this.props.history.push('/edit/company/profile');
            message.info(
              `Welcome ${
                companyName.charAt(0).toUpperCase() + companyName.slice(1)
              }`
            );
          }
        }
      })

      .catch((err) =>
        message.error('Wrong Credentials or something went wrong.')
      );
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            this.loginInApp(values);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('email is required.'),
          password: Yup.string().required('password is required.'),
        })}
      >
        {(props) => {
          const {
            values,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <>
              <div className="row custom_row">
                <div className="col-sm-6 login-left text-left px-left-login px-top-login">
                  <div className="go-back ">
                    <img
                      className="cursor"
                      onClick={() => this.props.history.push('/')}
                      src={process.env.PUBLIC_URL + '/go-back-1.png'}
                    />
                  </div>
                  {/*<p className="go-back"><i class="fa fa-angle-left" aria-hidden="true"></i>&nbsp;&nbsp;Go back</p>*/}
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
                          fontWeight: 'bolder',
                          fontFamily: 'Gilroy Bold',
                          fontSize: 26,
                          paddingTop: 8,
                        }}
                      >
                        JobHunt
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
                    className="welcome_msg"
                  >
                    Welcome back !
                  </h6>
                  <p style={{ marginTop: 30, fontFamily: 'Gilroy medium' }}>
                    Log in to your JobHunt Account
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group login-form-group">
                      <label htmlFor="exampleInputEmail1">User name</label>
                      <input
                        type="email"
                        name="email"
                        className="input-font form-control login-form-control"
                        onChange={handleChange}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter username / Email ID"
                      />
                      {errors.email && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group login-form-group">
                      <label htmlFor="exampleInputEmail1">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="input-font form-control login-form-control"
                        onChange={handleChange}
                        id="exampleInputPassword1"
                        placeholder="Enter password"
                      />
                      {errors.password && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: '40px' }}
                    >
                      <label className="form-check-label form-check-label-3 cursor">
                        Forgot Password.
                      </label>
                    </div>
                    <div className="cent_button">
                      <button
                        type="submit"
                        className="btn btn-dark login-button-font"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <h6 className="login-tag">
                    Don't have an account? Create your account,{' '}
                    <small
                      className="cursor red-link"
                      onClick={this.goSignup.bind(this)}
                      style={{ color: '#B02318' }}
                    >
                      Signup
                    </small>{' '}
                    now.
                  </h6>
                </div>
                <div className={'login-container'}>
                  {/* <img
                    className="login_div_img_1"
                    src={process.env.PUBLIC_URL + '/campaign_creators@2x.png'}
                    alt="campaign"
                  /> */}
                  <img className="login_div_img_1" src={LoginCover} />
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    isloading: state.AuthReducer.isloading,
  };
};
export default connect(mapStateToProps)(Login);
