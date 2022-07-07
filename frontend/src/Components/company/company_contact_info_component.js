import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Formik } from 'formik';
import { Row, Col, Input } from 'antd';
import CustomMap from '../candidate/map';
import GoogleSearch from '../candidate/googlesearch';
const { TextArea } = Input;

let formButton = null;

const initialValues = {
  Phone_Number: '',
  Landline_Number: '',
  Email_ID: '',
  Website: '',
  Address_Line_1: '',
  Address_Line_2: '',
  City: '',
  State: '',
  Country: '',
  Zip_Code: '',
};
class ContactInfo extends Component {
  state = {
    current_location: '',
    lat: '',
    long: '',
  };
  componentDidMount() {
    // var ls = require('local-storage');
    // let lat = ls.get('lat')
    // let lng = ls.get('long')
    // this.setState({
    //     lat:lat,
    //     long:lng
    // })
    if (this.props.initialdata !== null) {
      this.setState({
        current_location: this.props.initialdata.sub_address,
        lat: this.props.initialdata.latitude,
        long: this.props.initialdata.longitude,
      });
    }
  }
  onSubmit = (e) => {
    // console.log(e)
    e['latitude'] = this.state.lat;
    e['longitude'] = this.state.long;
    e['sub_address'] = this.state.current_location;
    console.log(e);
    this.props.setdata(e);
  };
  contactInfoSubmit = () => {
    // console.log("profile created")
    formButton.click();
  };
  takecurrentLocation = (value) => {
    this.setState({ current_location: value });
  };
  takeLatLong = (lat, long) => {
    console.log(lat, long);
    this.setState({
      lat: lat,
      long: long,
    });
  };
  render() {
    console.log(this.state.lat);
    const d = this.props.initialdata;
    let data = {};
    data['address'] = d.address ? d.address : '';
    data['city'] = d.city ? d.city : '';
    data['country'] = d.country ? d.country : '';
    data['email'] = d.email ? d.email : '';
    data['land_no'] = d.land_no ? d.land_no : '';
    data['phone_no'] = d.phone_no ? d.phone_no : '';
    data['state'] = d.state ? d.state : '';
    data['website'] = d.website ? d.website : '';
    data['zip_code'] = d.zip_code ? d.zip_code : '';
    data['sub_address'] = d.sub_address ? d.sub_address : '';
    return (
      <>
        <Formik
          initialValues={{
            phone_no: data.phone_no,
            land_no: data.land_no,
            email: data.email,
            website: data.website,
            address: data.address,
            sub_address: data.sub_address,
            city: data.city,
            state: data.state,
            country: data.country,
            zip_code: data.zip_code,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              this.onSubmit(values);
            }, 500);
          }}
        >
          {(formikProps) => {
            const {
              values,
              errors,
              handleChange,
              handleBlur,
              touched,
            } = formikProps;
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <Row>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">Phone Number</label>
                    <Input
                      type="number"
                      name="phone_no"
                      value={values.phone_no}
                      onChange={handleChange}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">
                      Landline Number
                    </label>
                    <Input
                      type="number"
                      name="land_no"
                      value={values.land_no}
                      className="input-field-custom-type-1-left"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">Email ID</label>
                    <Input
                      name="email"
                      value={values.email}
                      className="input-field-custom-type-1-left"
                      readOnly
                    />
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">Website</label>
                    <Input
                      className="input-field-custom-type-1-left"
                      value={values.website}
                      name="website"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">
                      Address Line 1
                    </label>
                    <Input
                      onChange={handleChange}
                      name="address"
                      value={values.address}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">
                      Address Line 2
                    </label>
                    <GoogleSearch
                      className="input-field-custom-type-1-left"
                      location={values.sub_address}
                      takecurrentLocation={this.takecurrentLocation}
                      takeLatLong={this.takeLatLong}
                    />
                  </Col>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">City</label>
                    <Input
                      onChange={handleChange}
                      name="city"
                      value={values.city}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">State</label>
                    <Input
                      onChange={handleChange}
                      name="state"
                      value={values.state}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                  <Col span={12} className="form-padding-right">
                    <label className="input_label_profile">Country</label>
                    <Input
                      onChange={handleChange}
                      name="country"
                      value={values.country}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                  <Col span={12} className="form-padding-left">
                    <label className="input_label_profile">Zip Code</label>
                    <Input
                      onChange={handleChange}
                      type="number"
                      name="zip_code"
                      value={values.zip_code}
                      className="input-field-custom-type-1-left"
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                  <CustomMap lat={this.state.lat} long={this.state.long} />
                </Row>
                <button
                  style={{ opacity: 0 }}
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
    );
  }
}

export default ContactInfo;
