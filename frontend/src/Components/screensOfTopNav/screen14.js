import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Pagination,
  Select,
  DatePicker,
  AutoComplete,
  message,
} from 'antd';
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons';
import Card from './cardForJob';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './topNav.css';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import Axios from '../axios/axios_setup';
import './screenOfTopNav.css';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Header from '../header/header';
import GoogleMap, { MapContainer } from './GoogleMap';
import HeaderLocation from '../headerLocation/headerLocation';

import CustomCompanyMap from '../app_status/company_map';
const { Option } = Select;
class Job extends Component {
  constructor(props) {
    super(props);
    this.jobTypeElement = React.createRef();
    this.state = {
      searchingValue: '',
      job_type: '',
      sector: '',
      posted_on: '',
      experience: '',
      current_location: '',
      lat: '',
      long: '',
    };
  }
  componentDidMount() {
    APIManager.jobList();
    if (
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      this.setState({
        searchingValue: this.props.location.state.job_name,
        current_location: this.props.location.state.location,
      });
    }
  }
  //handle searching value
  handleChange = (value) => {
    console.log(value);
    this.setState({
      searchingValue: value,
    });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    APIManager.jobListSuggestions(search)
      .then((resp) => {
        resp.data.data.map((data) => {
          options.push({
            label: data ? data.title : '',
            value: data ? data.title : '',
            key: data._id,
          });
        });
        this.setState({
          options: options.filter(
            (v, i, a) => a.findIndex((t) => t.label === v.label) === i
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleJobType = (e) => {
    this.setState({
      job_type: e,
    });
    console.log(this.jobTypeElement);
    // this.jobTypeElement.current.loadMoreData(e)
  };
  handleSectorSort = (e) => {
    this.setState({
      sector: e,
    });
  };
  handlePostedOn = (date, dateString) => {
    this.setState({
      posted_on: dateString,
    });
  };
  handleExperience = (e) => {
    this.setState({
      experience: e,
    });
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
    let markers = [];
    console.log(
      this.props.data ? this.props.data : '',
      'sss',
      'props for google map',
      this.props
    );
    const isLoading = this.props.isloading ? this.props.isloading : '';
    let job_markers = [];
    if (this.props.jobdata !== null && this.props.jobdata !== undefined) {
      job_markers = this.props.jobdata.data;
    }
    console.log(markers, 'fdjgdfjg');
    return (
      <div>
        <Header />
        <Row>
          <Col span={24}>
            <div className="job-top-nav-bar pl-0 pr-0">
              {isLoading && (
                <div className="d-flex justify-content-center">
                  <Spin />
                </div>
              )}
              <Row className="s-search-bar" justify="space-between">
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <AutoComplete
                        name="search"
                        options={this.state.options}
                        defaultValue={this.state.searchingValue}
                        onSelect={this.handleChange}
                        onSearch={this.handleSearch}
                        className="header-input-fields"
                      >
                        <Input
                          style={{ width: '300px' }}
                          className="ls-outline"
                          prefix={
                            <SearchOutlined className="landing-icons-2" />
                          }
                          placeholder="Search"
                        />
                      </AutoComplete>
                      {/*<Input
                        style={{ height: 40, width: '100%' }}
                        className={'company-joblist-input jobListingcls-1'}
                        prefix={<SearchOutlined />}
                        type="text"
                        placeholder="Search for keywords"
                        value={this.state.searchingValue}
                        onChange={this.handleChange}
                      />*/}
                    </Col>
                    <Col lg={6} sm={10}>
                      <HeaderLocation
                        envclass="landing-icons landing-select-icon2"
                        className="company-joblist-input jobListingcls-1 padding-in-job-search"
                        takecurrentLocation={this.takecurrentLocation}
                        takeLatLong={this.takeLatLong}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={12} justify="end">
                    <Col lg={5} sm={8}>
                      <Select
                        placeholder="Sector"
                        style={{ float: 'right' }}
                        className="s-search-select"
                        onChange={this.handleSectorSort}
                      >
                        <Option value="IT">IT</Option>
                        <Option value="Sales">Sales</Option>
                      </Select>
                    </Col>
                    <Col lg={5} sm={8}>
                      <Select
                        placeholder="Type"
                        style={{ float: 'right' }}
                        className="s-search-select"
                        onChange={this.handleJobType}
                      >
                        <Option value="permanent">Permanent</Option>
                        <Option value="temporary">Temporary</Option>
                        <Option value="contract">Contract</Option>
                        <Option value="commission">Commission</Option>
                        <Option value="apprenticeship">Apprenticeship</Option>
                        <Option value="internship">Internship</Option>
                        <Option value="volunteer">Volunteer</Option>
                        <Option value="full time">Full Time</Option>
                        <Option value="part time">Part Time</Option>
                      </Select>
                    </Col>
                    <Col lg={5} sm={8}>
                      <DatePicker
                        onChange={this.handlePostedOn}
                        placeholder="Posted On"
                        className="s-search-select padding-in-job-datepicker"
                      />
                    </Col>
                    <Col lg={5} sm={8}>
                      <Select
                        placeholder="Experience"
                        style={{ float: 'right' }}
                        className="s-search-select"
                        onChange={this.handleExperience}
                      >
                        <Option value="Not Applicable">Not Applicable</Option>
                        <Option value="Internship">Internship</Option>
                        <Option value="Apprenticeship">Apprenticeship</Option>
                        <Option value="Entry level">Entry level</Option>
                        <Option value="Associate">Associate</Option>
                        <Option value="Mid-Senior level">
                          Mid-Senior level{' '}
                        </Option>
                        <Option value="Director">Director</Option>
                        <Option value="Executive">Executive</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="row m-0" style={{ paddingTop: 15 }}>
          <div className="col-sm-7 col-xs-7 col-md-7 p-0">
            <p className="jobs-count-on-jobs m-0">Jobs found</p>
            <Card
              searchingValue={this.state.searchingValue}
              job_type={this.state.job_type}
              sector={this.state.sector}
              experience={this.state.experience}
              posted_on={this.state.posted_on}
              ref={this.jobTypeElement}
            />
          </div>
          {/* <div className="col-sm-6 col-xs-6 col-md-6 p-0">
            <CustomCompanyMap renderfrom="jobs" markers={job_markers} />
          </div> */}
        </div>

        <Footer />
      </div>
    );
  }
}
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDY_nsLb_KbTMZ2-vTSY3YKzJYvn-BShGU',
// })(Job);
const mapStateToProps = (state) => {
  return {
    jobdata: state.jobManagementReducer.jobdata,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(Job);
