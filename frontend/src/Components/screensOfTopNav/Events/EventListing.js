import React, { Component } from 'react';
import { Row, Col, Input, Pagination, Select, AutoComplete } from 'antd';
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons';
import '../topNav.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import EventListingCard from './EventListingCard';
import CustomCompanyMap from '../../app_status/company_map';
import SelectCompany from '../selectCompany';
import HeaderLocation from '../../headerLocation/headerLocation';

const { Search } = Input;
const { Option } = Select;

export default class EventListing extends Component {
  state = {
    searchQuery: '',
    company: '',
    date: '',
    current_location: '',
    lat: '',
    long: '',
  };

  componentDidMount() {
    if (
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      this.setState({
        searchQuery: this.props.location.state.event_name,
        current_location: this.props.location.state.location,
      });
    }
  }
  handleChange = (value) => {
    this.setState({ searchQuery: value });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    APIManager.allEventsSuggestions(search)
      .then((resp) => {
        // console.log(resp.data.data,"===========")
        resp.data.data.map((data) => {
          options.push({
            label: data ? data.name : '',
            value: data ? data.name : '',
            key: data._id,
          });
        });
        console.log(options);
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
  handleCompanyChange = (value) => {
    this.setState({
      company: value,
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
  handleDateChange = (value) => {
    this.setState({
      date: value,
    });
  };
  EventDetailRender = (e, data) => {
    console.log('function running....', this.props);
    this.props.history.push({
      pathname: '/events/detail',
      event_obj: data,
    });
  };

  render() {
    let markers = [];
    return (
      <div>
        <Row className="s-search-bar" justify="space-between">
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <AutoComplete
                  name="Search for an Event"
                  options={this.state.options}
                  defaultValue={this.state.searchingValue}
                  onSelect={this.handleChange}
                  onSearch={this.handleSearch}
                  className="header-input-fields"
                >
                  <Input
                    style={{ width: '300px' }}
                    className="ls-outline"
                    prefix={<SearchOutlined className="landing-icons-2" />}
                    placeholder="Search"
                  />
                </AutoComplete>
                {/*<Search
                  placeholder="Search for an Event"
                  prefix={<SearchOutlined />}
                  className="s-search-inp"
                  onChange={this.handleChange}
                  value={this.state.searchQuery}
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
            <Row gutter={16} justify="end">
              <Col lg={5} sm={8}>
                <Select
                  placeholder="Date"
                  style={{ float: 'right' }}
                  className="s-search-select"
                  onChange={this.handleDateChange}
                >
                  <Option value="-created">Start to End</Option>
                  <Option value="created">End to Start</Option>
                </Select>
              </Col>
              <Col lg={7} sm={8}>
                <SelectCompany handleCompanyChange={this.handleCompanyChange} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <EventListingCard
              searchQuery={this.state.searchQuery}
              company={this.state.company}
              date={this.state.date}
              EventDetailRender={(e, data) => this.EventDetailRender(e, data)}
            />
          </Col>
          {/* <Col span={12}>
            <CustomCompanyMap renderfrom="events" markers={markers} />
          </Col> */}
        </Row>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     jobdata: state.jobManagementReducer.jobdata,
//     isloading: state.jobManagementReducer.isloading,
//   };
// };
// export default connect(mapStateToProps)(Job);
