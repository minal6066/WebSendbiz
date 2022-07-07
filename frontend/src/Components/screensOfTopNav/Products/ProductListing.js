import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Pagination,
  Select,
  AutoComplete,
  message,
} from 'antd';
import { SearchOutlined, EnvironmentFilled } from '@ant-design/icons';
import '../topNav.css';
import Box from '../../candidate/box';
import Footer from '../../footer/footer';
import './ProductListing.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { MapContainer } from '../GoogleMap';
import ServiceListingCard from './ProductListingCard';
import CustomCompanyMap from '../../app_status/company_map';
import HeaderLocation from '../../headerLocation/headerLocation';
import SelectCompany from '../selectCompany';
import SelectCategory from './selectProductCategory';

const { Search } = Input;
const { Option } = Select;

export default class ServiceListing extends Component {
  state = {
    searchQuery: '',
    current_location: '',
    lat: '',
    long: '',
    category: [],
    company: '',
    price: '',
    compOptions: [],
    options: [],
  };

  componentDidMount() {
    if (
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      this.setState({
        searchQuery: this.props.location.state.prod_name,
        current_location: this.props.location.state.location,
      });
    }
  }
  handleSelect = (val, value) => {
    console.log('on select', val, value);
    this.setState({ searchQuery: val });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    APIManager.allProductsSuggestions(search)
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
  ProductDetailRender = (e, data) => {
    // console.log("function running....",this.props)
    // this.props.history.push({
    //     pathname:'/services/detail',
    //     service_obj:data
    // })
    this.props.history.push({
      pathname: '/products/detail',
      state: data,
    });
  };

  handlePriceChange = (value) => {
    this.setState({
      price: value,
    });
  };
  handleCategoryChange = (value) => {
    this.setState({
      category: value,
    });
  };
  handleCompanyChange = (value) => {
    // console.log(value)
    this.setState({
      company: value,
    });
  };
  takecurrentLocation = (value) => {
    this.setState({ current_location: value });
  };
  takeLatLong = (lat, long) => {
    // console.log(lat,long)
    this.setState({
      lat: lat,
      long: long,
    });
  };

  render() {
    let markers = [];
    // console.log(this.state.company)
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
                  // onChange={this.handleChange}
                  onSearch={this.handleSearch}
                  className="header-input-fields"
                  onSelect={this.handleSelect}
                >
                  <Input
                    style={{ width: '300px' }}
                    className="ls-outline"
                    prefix={<SearchOutlined className="landing-icons-2" />}
                    placeholder="Search"
                  />
                </AutoComplete>
                {/*<Search
                  placeholder="Search for a product"
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
                {/* <Select
                  placeholder="Category"
                  style={{ float: 'right' }}
                  onChange={this.handleCategoryChange}
                  className="s-search-select"
                >
                  <Option value="paris">Paris</Option>
                  <Option value="new-york">New York</Option>
                </Select> */}
                <SelectCategory handleCategoryChange={this.handleCategoryChange} />
              </Col>
              <Col lg={8} sm={8}>
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
              company={this.state.company}
              category={this.state.category}
              price={this.state.price}
              location={this.state.current_location}
              ProductDetailRender={(e, data) =>
                this.ProductDetailRender(e, data)
              }
            />
          </Col>
          {/* <Col span={12}>
            <CustomCompanyMap renderfrom="products" markers={markers} />
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
