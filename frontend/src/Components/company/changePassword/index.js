import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'; // used when validating with a pre-built solution
import { Modal, Button } from 'react-bootstrap';
import { message, Spin, Alert } from 'antd';
import closebtn from '../../asset/cancel-circle.png';
import APIManager from '../../../APIManager/index';

let formButton = null;
class PopupModal extends Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
      fields: {},
      isLoading: false,
      alert: false,
      alertMessage: '',
    };
  }

  onSubmit = (e, { setSubmitting }) => {
    // console.log(e)
    setTimeout(() => {
      setSubmitting(false);
      this.changePassword(e);
    }, 500);
  };

  clickSubmitClick = () => {
    formButton.click();
  };
  //for changing password
  changePassword = (data) => {
    const params = {
      currentPassword: data.OldPassword,
      password: data.NewPassword,
      confirmPassword: data.ConfirmPassword,
    };
    this.setState({ isLoading: true });
    APIManager.changePasswordforCompany(params)
      .then((response) => {
        if (response.data.isSuccess) {
          this.setState({
            isLoading: false,
            alert: true,
            alertMessage: 'Password is changed.',
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          alert: true,
          alertMessage: error.response.data.message,
        });
      });
  };
  render() {
    console.log(this.props);
    return (
      <Modal
        {...this.props}
        animation={false}
        className="password-modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="modal-header">
          <div className="modal-title h4" id="contained-modal-title-vcenter">
            Change Password
          </div>
          <button type="button" onClick={this.props.onHide} className="close">
            <span aria-hidden="true">
              <img src={closebtn} alt="cancel" />
            </span>

            <span className="sr-only">Close</span>
          </button>
        </div>
        <Modal.Body className="show-grid">
          {this.state.isLoading ? (
            <div className={'d-flex justify-content-center'}>
              <Spin />
            </div>
          ) : (
            ''
          )}
          {this.state.alert && (
            <Alert
              description={this.state.alertMessage}
              type="error"
              closable
              onClose={() => this.setState({ alert: false, alertMessage: '' })}
            />
          )}
          <Formik
            initialValues={{
              OldPassword: '',
              NewPassword: '',
              ConfirmPassword: '',
            }}
            onSubmit={this.onSubmit}
            validationSchema={Yup.object().shape({
              OldPassword: Yup.string().required(
                'Current password is required.'
              ),
              NewPassword: Yup.string().required('password is required.'),
              ConfirmPassword: Yup.string()
                .required('confirm password is required.')
                .oneOf([Yup.ref('NewPassword'), null], 'Passwords must match'),
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
                <form onSubmit={formikProps.handleSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group m-0">
                        <label
                          className="input_label_profile"
                          htmlFor="inputOldPassword"
                        >
                          Old Password
                        </label>
                        <input
                          type="password"
                          className="input-font form-control border profile-form-control"
                          name="OldPassword"
                          id="inputOldPassword"
                          onChange={handleChange}
                          placeholder="enter old password"
                        />
                        {errors.OldPassword && (
                          <div
                            className="errormsgs"
                            style={{ color: 'red', fontSize: '12px' }}
                          >
                            {errors.OldPassword}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group m-0">
                        <label
                          className="input_label_profile"
                          htmlFor="inputPassword"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          className="input-font form-control border profile-form-control"
                          id="inputPassword"
                          name="NewPassword"
                          onChange={handleChange}
                          placeholder="enter new password"
                        />
                        {errors.NewPassword && (
                          <div
                            className="errormsgs"
                            style={{ color: 'red', fontSize: '12px' }}
                          >
                            {errors.NewPassword}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group m-0">
                        <label
                          className="input_label_profile"
                          htmlFor="inputConfirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="input-font form-control border profile-form-control"
                          id="inputConfirmPassword"
                          name="ConfirmPassword"
                          onChange={handleChange}
                          placeholder="Re-enter new password"
                        />
                        {errors.ConfirmPassword && (
                          <div
                            className="errormsgs"
                            style={{ color: 'red', fontSize: '12px' }}
                          >
                            {errors.ConfirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      style={{ opacity: 0 }}
                      type={'submit'}
                      ref={(e) => {
                        formButton = e;
                      }}
                    >
                      ADD{' '}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={this.clickSubmitClick}
            className="btn btn-dark bold-family btn-save-font cursor"
          >
            Save Password
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default PopupModal;
