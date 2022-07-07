import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'; // used when validating with a pre-built solution
import { Modal, Button } from 'react-bootstrap';
import { message, Spin, Alert } from 'antd';
import closebtn from '../asset/cancel-circle.png';
import APIManager from '../../APIManager/index';
import { DatePicker, Space } from 'antd';
import NumberFormat from 'react-number-format';

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
      expMonth: '',
      expYear: '',
      showAlert: false,
    };
  }

  onSubmit = (e, { setSubmitting }) => {
    this.setState({ e: '' });
    // console.log(e)
    setTimeout(() => {
      setSubmitting(false);
      this.addNewCard(e);
    }, 500);
  };

  clickSubmitClick = () => {
    formButton.click();
  };
  //for add new card
  addNewCard = (data) => {
    console.log(data);
    const params = {
      card: data.card_num,
      card_holder_name: data.card_holder_name,
      cvc: data.cvc,
      expMonth: this.state.expMonth,
      expYear: this.state.expYear,
    };
    console.log(params);
    this.setState({ isLoading: true });
    APIManager.AddNewCard(params)
      .then((resp) => {
        if (resp.data.isSuccess) {
          this.setState({
            isLoading: false,
            showAlert: true,
            alertMessage: resp.data.message,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          showAlert: true,
          alertMessage: error.response.data.message,
        });
      });
  };
  handleMonth = (date, dateString) => {
    console.log(dateString);
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    this.setState({ expMonth: month, expYear: year });
  };
  handleSubmit = (data) => {
    console.log(data);
  };
  render() {
    console.log(this.props);
    return (
      <Modal
        {...this.props}
        animation={false}
        className="password-modal"
        aria-labelledby="contained-modal-title-vcenter"
        style={{ height: '98vh' }}
      >
        <div className="modal-header">
          <div className="modal-title h4" id="contained-modal-title-vcenter">
            Add New Card
          </div>
          <button type="button" onClick={this.props.onHide} className="close">
            <span aria-hidden="true">
              <img src={closebtn} alt="cancel" />
            </span>

            <span className="sr-only">Close</span>
          </button>
        </div>
        <Modal.Body className="show-grid">
          {this.state.showAlert && (
            <Alert
              message={this.state.alertMessage}
              type="warning"
              closable
              onClose={() =>
                this.setState({ showAlert: false, alertMessage: '' })
              }
            />
          )}
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
              card_num: '',
              card_holder_name: '',
              // valid_date: '',
              cvc: '',
            }}
            onSubmit={this.onSubmit}
            validationSchema={Yup.object().shape({
              card_num: Yup.string().required('Please enter your card number.'),
              card_holder_name: Yup.string().required(
                'Please enter your name.'
              ),
              cvc: Yup.string().required('Please enter your cvv.'),
              //  valid_date: Yup.string().required('Please enter valid date'),
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
                    <div className="col-12">
                      <div className="form-group">
                        <label
                          className="input_label_profile"
                          htmlFor="inputOldPassword"
                        >
                          Card Number
                        </label>
                        <NumberFormat
                          className="input-font form-control border profile-form-control"
                          format="#### #### #### ####"
                          mask="_"
                          placeholder="Enter Card Number"
                          name="card_num"
                          onChange={handleChange}
                        />
                        {errors.card_num && (
                          <div
                            className="errormsgs"
                            style={{ color: 'red', fontSize: '12px' }}
                          >
                            {errors.card_num}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label
                        className="input_label_profile"
                        htmlFor="inputPassword"
                      >
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="input-font form-control border profile-form-control"
                        name="card_holder_name"
                        onChange={handleChange}
                        placeholder="Enter name on the card."
                      />
                      {errors.card_holder_name && (
                        <div
                          className="errormsgs"
                          style={{ color: 'red', fontSize: '12px' }}
                        >
                          {errors.card_holder_name}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="form-group m-0">
                        <label
                          className="input_label_profile"
                          htmlFor="inputConfirmPassword"
                        >
                          Valid through month and year
                        </label>
                        <div className={'d-flex'}>
                          <div className={'w-100'}>
                            <DatePicker
                              onChange={this.handleMonth}
                              picker="month"
                              className="input-font form-control border profile-form-control"
                              placeholder={'Select expire month and year'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group m-0 w-50">
                        <label
                          className="input_label_profile"
                          htmlFor="inputConfirmPassword"
                        >
                          CVV
                        </label>
                        <NumberFormat
                          className="input-font form-control border profile-form-control"
                          mask="_"
                          placeholder="Enter CVV"
                          name="cvc"
                          onChange={handleChange}
                          maxLength={'3'}
                        />
                        {errors.cvc && (
                          <div
                            className="errormsgs"
                            style={{ color: 'red', fontSize: '12px' }}
                          >
                            {errors.cvc}
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
            Add Card
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default PopupModal;
