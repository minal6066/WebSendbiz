import React, { Component } from 'react';
import { Row, Col, Input, Pagination, Select, AutoComplete } from 'antd';
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons';
import '../topNav.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import NewsListingCard from './NewsListingCard';
import CustomCompanyMap from '../../app_status/company_map';
import HeaderLocation from '../../headerLocation/headerLocation';
import SelectCompany from '../selectCompany';
const { Search } = Input;
const { Option } = Select;

export default class NewsListing extends Component {
  state = {
    searchingValue: '',
    current_location: '',
    lat: '',
    long: '',
    company: '',
  };

  // componentDidMount() {
  //   APIManager.GetCompanyServices();
  // }
  handleChange = (value) => {
    this.setState({ searchingValue: value });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    APIManager.allNewsListSuggestions(search)
      .then((resp) => {
        // console.log(resp.data.data,"===========")
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
  handleCompanyChange = (value) => {
    this.setState({
      company: value,
    });
  };
  takecurrentLocation = (value) => {
    this.setState({ current_location: value });
  };
  takeLatLong = (lat, long) => {
    this.setState({
      lat: lat,
      long: long,
    });
  };
  NewsDetailRender = (e, data) => {
    console.log('function running....', this.props);
    this.props.history.push({
      pathname: '/news/detail',
      event_obj: data,
    });
  };

  render() {
    return (
      <div>
        <Row className="s-search-bar" justify="space-between">
          <Col span={2}></Col>
          <Col span={10}>
            <Row gutter={16}>
              <Col span={13} className="remove-search-line">
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
                    prefix={<SearchOutlined className="landing-icons-2" />}
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
                  value={this.state.current_location}
                  className="company-joblist-input jobListingcls-1 padding-in-job-search"
                  takecurrentLocation={this.takecurrentLocation}
                  takeLatLong={this.takeLatLong}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} justify="end">
              <Col lg={8} sm={8}>
                <SelectCompany handleCompanyChange={this.handleCompanyChange} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row
          className="apply-job-news-bottom"
          style={{ paddingTop: 35, paddingBottom: 30 }}
        >
          <p className="apply-job-news-bottom-para-2">News</p>
        </Row>
        <Row
          justify="space-around"
          style={{ paddingLeft: '7%', paddingRight: '7%' }}
        >
          <NewsListingCard
            searchingValue={this.state.searchingValue}
            company_name={this.state.company}
            location={this.state.current_location}
            NewsDetailRender={(e, data) => this.NewsDetailRender(e, data)}
          />
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
