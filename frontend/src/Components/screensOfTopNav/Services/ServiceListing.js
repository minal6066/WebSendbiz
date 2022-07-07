import React, { Component } from 'react';
import { Row, Col, Input, Pagination, Select, AutoComplete } from 'antd';
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons';
import '../topNav.css';
import Box from '../../candidate/box';
import Footer from '../../footer/footer';
import './ServiceListing.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { MapContainer } from '../GoogleMap';
import ServiceListingCard from './ServiceListingCard';
import CustomCompanyMap from '../../app_status/company_map';
import HeaderLocation from '../../headerLocation/headerLocation';
import SelectCompany from '../selectCompany';
import SelectCategory from './selectServiceCategory';

const { Search } = Input;
const { Option } = Select;

export default class ServiceListing extends Component {
  state = {
    searchQuery: '',
    lat: '',
    long: '',
    current_location: '',
    company_name: '',
    category: [],
    price: '',
    options: [],
  };

  componentDidMount() {
    if (
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      this.setState({
        searchQuery: this.props.location.state.ser_name,
        current_location: this.props.location.state.location,
      });
    }
  }
  takecurrentLocation = (value) => {
    console.log(value);
    this.setState({ current_location: value });
  };
  takeLatLong = (lat, long) => {
    console.log(lat, long);
    this.setState({
      lat: lat,
      long: long,
    });
  };
  handleChange = (value) => {
    this.setState({ searchQuery: value });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    APIManager.allServicesSuggestions(search)
      .then((resp) => {
        // console.log(resp.data.data,"===========")
        resp.data.data.map((data) => {
          options.push({
            label: data ? data.name : '',
            value: data ? data.name : '',
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
    console.log(value);
    this.setState({
      company_name: value,
    });
  };
  handleCategoryChange = (value) => {
    console.log(value,"====");
    this.setState({
      category: value
    });
    // this.setState(prevState => ({
    //   arrayvar: [...prevState.arrayvar, newelement]
    // }))
  };
  handlePriceChange = (value) => {
    this.setState({
      price: value,
    });
  };
  ServiceDetailRender = (e, data) => {
    console.log('function running....', this.props);
    // this.props.history.push({
    //     pathname:'/services/detail',
    //     service_obj:data
    // })
    this.props.history.push({
      pathname: '/services/detail',
      service_obj: data,
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
    console.log(this.state.category)
    let markers = [];
    return (
      <div>
        <Row className="s-search-bar" justify="space-between">
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <AutoComplete
                  name="search"
                  options={this.state.options}
                  defaultValue={this.state.searchQuery}
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
                  placeholder="Search for a service"
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
              <Col lg={7} sm={8}>
                {/*<Select
                  placeholder="Category"
                  style={{ float: 'right', width: '100%' }}
                  className="s-search-select"
                  onChange={this.handleCategoryChange}
                >
                  <Option value="paris">Paris</Option>
                  <Option value="new-york">New York</Option>
                  <Option value="paris1">Paris1</Option>
                  <Option value="paris2">Paris2</Option>
                </Select>*/}
                <SelectCategory handleCategoryChange = {this.handleCategoryChange} />
              </Col>
              <Col lg={7} sm={8}>
                <SelectCompany handleCompanyChange={this.handleCompanyChange} />
              </Col>
              <Col lg={5} sm={8}>
                <Select
                  placeholder="Price"
                  style={{ float: 'right' }}
                  className="s-search-select"
                  onChange={this.handlePriceChange}
                >
                  <Option value="price.amount">Low to High</Option>
                  <Option value="-price.amount">High to Low</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <ServiceListingCard
              searchQuery={this.state.searchQuery}
              city_name={this.state.current_location}
              comapny_name={this.state.company_name}
              category={this.state.category}
              price={this.state.price}
              ServiceDetailRender={(e, data) =>
                this.ServiceDetailRender(e, data)
              }
            />
          </Col>
          {/* <Col span={12}>
            <CustomCompanyMap renderfrom="service" markers={markers} />
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
