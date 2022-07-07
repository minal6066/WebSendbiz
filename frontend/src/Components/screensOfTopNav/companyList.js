import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Input, Pagination, Spin, Select, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CompanyListCard from './cardForCompany';
import Header from '../header/header';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './topNav.css';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
import CustomCompanyMap from '../app_status/company_map';
import HeaderLocation from '../headerLocation/headerLocation';
import {RootUrl} from '../../Shared/imageUrlPath';
const { Option } = Select;

let cancel;
class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingValue: '',
      current_location: '',
      lat: '',
      long: '',
      options: [],
    };
  }
  componentDidMount() {
    // APIManager.comanyList();
    // console.log(this.props.location)
    if (
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      console.log(this.props.location.state);
      this.setState({
        searchingValue: this.props.location.state.comp_name,
        current_location: this.props.location.state.location,
      });
    }
  }
  takecurrentLocation = (value) => {
    this.setState({ current_location: value });
  };
  handlePressEnter =(event) =>{
    console.log(event.target.value)
    this.setState({
      searchingValue: event.target.value,
    });
  }
  takeLatLong = (lat, long) => {
    console.log(lat, long);
    this.setState({
      lat: lat,
      long: long,
    });
  };
  handleSearch = (value) => {
    let search = value.toLowerCase();
    let options = [];
    this.search(search)
  };

  search = async (search) => {
        const CancelToken = axios.CancelToken;
        // console.log("cancel value:", cancel)
        if (cancel) {
          cancel(); // cancel request
        }
        const { data } = await axios.get(
          `${
            RootUrl.basePath
          }sug-company-list?fields=comp_info.comp_name,comp_id,comp_info.bus_name&page=${1}&search=${search}`,
          {
            cancelToken: new CancelToken(function executor(c) {
              cancel = c;
            }),
          }
        );
         let options = [];
         data.data.map((data) => {
          console.log(data);
          options.push({
            label: data.comp_info ? data.comp_info.comp_name : '',
            value: data.comp_info ? data.comp_info.comp_name : '',
            key: data._id,
          });
        });
         this.setState({options})
   }

  getSuggetion = (value) => {
    console.log(value);
  };
  handleChange = (value) => {
    this.setState({
      searchingValue: value,
    });
    // console.log(e);
  };
  render() {
    let markers = [];
    console.log(this.state.options, 'lllllllll');
    if (
      this.props.companyList !== null &&
      this.props.companyList !== undefined
    ) {
      this.props.companyList.data.map((val) => {
        markers = markers.concat(val);
      });
    }
    const loading = this.props.isloading;
    return (
      <div>
        <Header />
        <Row>
          <Col span={24}>
            <div className="job-top-nav-bar pl-0 pr-0">
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
                          onPressEnter={this.handlePressEnter}
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
                        value={this.state.current_location}
                        className="company-joblist-input jobListingcls-1 padding-in-job-search"
                        takecurrentLocation={this.takecurrentLocation}
                        takeLatLong={this.takeLatLong}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="row m-0" style={{ paddingTop: 15 }}>
          <div className="col-sm-7 col-xs-7 col-md-7 p-0">
            <p className="jobs-count-on-jobs m-0">{`Companies`}</p>
            <CompanyListCard searchingValue={this.state.searchingValue} />
          </div>
          {/* <div className="col-sm-6 col-xs-6 col-md-6 p-0">
            <CustomCompanyMap renderfrom="company" markers={markers} />
          </div> */}
        </div>

        <Footer />
      </div>
    );
  }
}
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDY_nsLb_KbTMZ2-vTSY3YKzJYvn-BShGU',
// })(Companies);
const mapStateToProps = (state) => {
  return {
    companyList: state.jobManagementReducer.companyList,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(Companies);
