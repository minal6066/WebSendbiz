import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, DatePicker, Space } from 'antd';
import moment from 'moment';
import { Formik } from 'formik';
import { withFormik, Form as FormikForm, Field as FormikField } from 'formik';
import { Row, Col, Input, Form } from 'antd';
import './edit_company_profile.css';
import * as Yup from 'yup';
import { Select } from 'antd';
import { connect } from 'react-redux';
const { TextArea } = Input;
const FormItem = Form.Item;
let formButton = null;
const { Option } = Select;

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCategory: [],
      companyTags: [],
      founding_year: '2021',
    };
  }
  onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      // console.log(values,this.state.companyCategory)
      if (this.state.companyCategory.length !== 0) {
        this.setState({
          companyCategory: this.state.companyCategory.concat(
            values['comp_category']
          ),
        });
        let array = this.state.companyCategory;
        const uniqueNames = array.filter(
          (val, id, array) => array.indexOf(val) == id
        );
        values['comp_category'] = uniqueNames;
      }
      if (this.state.companyTags.length !== 0) {
        this.setState({
          companyTags: this.state.companyTags.concat(values['tags']),
        });
        let array = this.state.companyCategory;
        const uniqueNames = array.filter(
          (val, id, array) => array.indexOf(val) == id
        );
        values['tags'] = uniqueNames;
      }
      values['founding_year'] = this.state.founding_year;

      this.props.setdata(values);
    }, 500);
  };
  clickformButton = () => {
    formButton.click();
  };
  handleSelectChange = (value) => {
    // console.log(value);
    this.setState({ companyCategory: value });
  };
  handleSelectTags = (value) => {
    // console.log(value);
    this.setState({ companyTags: value });
  };
  handleFoundingChange = (date, dateString) => {
    // console.log(dateString)
    this.setState({ founding_year: dateString });
  };
  render() {
    const comp_data = this.props.initialdata;
    console.log(comp_data);
    let data = {};
    data['company_id'] = comp_data ? comp_data.company_id : '';
    data['comp_name'] = comp_data ? comp_data.comp_name : '';
    data['bus_name'] = comp_data ? comp_data.bus_name : '';
    data['noOf_emp'] = comp_data ? comp_data.noOf_emp : '';
    data['comp_info'] = comp_data ? comp_data.comp_info : '';
    data['comp_category'] = comp_data ? comp_data.comp_category : [];
    data['age'] = comp_data ? comp_data.age : '';
    data['tags'] = comp_data ? comp_data.tags : [];
    // let founding_year = comp_data ? comp_data.founding_year:new Date().getFullYear()
    let founding_year = comp_data ? comp_data.founding_year : '';
    founding_year = founding_year ? founding_year : new Date().getFullYear();
    console.log(founding_year ? founding_year : '');
    return (
      <>
        <Formik
          initialValues={{
            company_id: data.company_id,
            comp_name: data.comp_name,
            bus_name: data.bus_name,
            noOf_emp: data.noOf_emp,
            comp_info: data.comp_info,
            comp_category: data.comp_category.filter((el) => {
              return el != null && el != '';
            }),
            age: data.age,
            tags: data.tags.filter((el) => {
              return el != null && el != '';
            }),

            //fruit: '',
          }}
          onSubmit={this.onSubmit}
          validationSchema={Yup.object().shape({
            company_id: Yup.string().required('required.'),
            comp_name: Yup.string().required('required'),
            bus_name: Yup.string().required('required'),
            noOf_emp: Yup.string().required('required'),
            comp_info: Yup.string().required('required'),
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
                    <label className="input_label_profile">Company ID</label>
                    <Input
                      name="company_id"
                      onChange={handleChange}
                      value={values.company_id}
                      className="input-field-custom-type-1-left"
                      disabled
                      style={{backgroundColor : '#ffffff'}}
                    />
                    {errors.company_id && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.company_id}
                      </div>
                    )}
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">Company Name</label>
                    <Input
                      name="comp_name"
                      value={values.comp_name}
                      className="input-field-custom-type-1-left"
                      onChange={handleChange}
                      disabled
                      style={{backgroundColor : '#ffffff'}}
                    />
                    {errors.comp_name && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.comp_name}
                      </div>
                    )}
                  </Col>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">Business Name</label>
                    <Input
                      name="bus_name"
                      value={values.bus_name}
                      onChange={handleChange}
                      className="input-field-custom-type-1-left"
                    />
                    {errors.bus_name && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.bus_name}
                      </div>
                    )}
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">
                      Company Category
                    </label>
                    <Select
                      mode="multiple"
                      defaultValue={values.comp_category}
                      removeIcon={
                        <img
                          style={{ width: 14, height: 14 }}
                          src={process.env.PUBLIC_URL + '/cancel.png'}
                        alt=""
                        />
                      }
                      className="input-label-field-custom-select-type-2"
                      placeholder="Select company category"
                      onChange={this.handleSelectChange}
                      optionLabelProp="label"
                      name="comp_category"
                    >
                      <Option value="Service" label="Service">
                        Service
                      </Option>
                      <Option value="Technical" label="Technical">
                        Technical
                      </Option>
                    </Select>
                    {errors.comp_category && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.comp_category}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className="form-padding-left-3">
                    <label className="input_label_profile">
                      No. of Employees
                    </label>
                    <Input
                      type="number"
                      onChange={handleChange}
                      name="noOf_emp"
                      value={values.noOf_emp}
                      className="input-field-custom-type-1-left"
                    />
                    {errors.noOf_emp && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.noOf_emp}
                      </div>
                    )}
                  </Col>
                  <Col
                    span={8}
                    className="form-padding-left-3 form-padding-left-2"
                  >
                    <label className="input_label_profile">Founding Year</label>
                    <DatePicker
                      onChange={this.handleFoundingChange}
                      name="founding_year"
                      size="large"
                      suffixIcon={
                        <img
                          src={process.env.PUBLIC_URL + '/calendar-date.svg'}
                          alt=""
                        />
                      }
                      className="w-100 input-field-custom-type-1-left"
                      defaultValue={moment(founding_year, 'YYYY')}
                      format={'YYYY'}
                      picker="year"
                    />
                  </Col>
                  <Col span={8} className="form-padding-left-2">
                    <label className="input_label_profile">Avg Age</label>
                    <Input
                      type="number"
                      onChange={handleChange}
                      name="age"
                      value={values.age}
                      className="input-field-custom-type-1-left"
                    />
                    {errors.age && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.age}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">Tags</label>
                    <Select
                      style={{ width: '100%' }}
                      mode="tags"
                      removeIcon={
                        <img
                          style={{ width: 14, height: 14 }}
                          src={process.env.PUBLIC_URL + '/cancel.png'}
                          alt=""
                        />
                      }
                      className="input-field-custom-select-1-right"
                      placeholder="Select company tags"
                      onChange={this.handleSelectTags}
                      optionLabelProp="label"
                      defaultValue={values.tags}
                      name="tags"
                    >
                      <Option value="ITES" label="ITES">
                        ITES
                      </Option>
                      <Option value="BPO" label="BPO">
                        BPO
                      </Option>
                    </Select>
                    {errors.tags && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.tags}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="text-area-padding">
                    <label className="input_label_profile">
                      Company Information
                    </label>
                    <TextArea
                      name="comp_info"
                      className="input-font form-control profile-form-control"
                      value={values.comp_info}
                      onChange={handleChange}
                      rows="5"
                    ></TextArea>
                    {errors.comp_info && (
                      <div style={{ color: 'red', fontSize: '12px' }}>
                        {errors.comp_info}
                      </div>
                    )}
                  </Col>
                </Row>

                <button
                  style={{ opacity: 0 }}
                  type={'submit'}
                  ref={(e) => {
                    formButton = e;
                  }}
                >
                  ghfghfgh
                </button>
              </form>
            );
          }}
        </Formik>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.AuthReducer.user,
//     infodata: state.companyInfoReducer.data,
//     isloading: state.companyInfoReducer.isloading,
//   };
// }
// const connectedComponent = connect(mapStateToProps)(CompanyInfo);
// export default React.forwardRef((props, ref) =>
//   <connectedComponent {...props} ref={ref} />
// );
// export default connect(mapStateToProps)(CompanyInfo);
export default CompanyInfo;
