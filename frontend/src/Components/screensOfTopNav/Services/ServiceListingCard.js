import React, { Component } from 'react';
import { Row, Col, Input, Select, Card, Tag, message } from 'antd';
import Pagination from 'react-js-pagination';
import {
  EnvironmentFilled,
  ClockCircleOutlined,
  DollarCircleFilled,
  EyeFilled,
  LikeFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import './ServiceListing.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { MapContainer } from '../GoogleMap';
import { withRouter } from 'react-router-dom';
import { ImageUrl } from '../../../Shared/imageUrlPath';

const { Search } = Input;
const { Option } = Select;

const CompanyServicesData = [
  {
    comp_id: '1',
    name: 'design',
    duration: '6 Months',
    location: 'California',
    price: 45.99,
    period: 'Daily',
    price_plan: 'NA',
    experience: '10 years',
    category: ['LifeStyle'],
    delivery_time: '10 days',
    brochure: 'file',
    short_desc:
      'JobHunt is a platform that allows blah blah blah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
    full_desc: 'Enter Details',
    isActive: true, // true=Active, false=Deleted
  },
  {
    comp_id: '2',
    name: 'Developement',
    duration: '6 Months',
    location: 'Paris',
    price: 85,
    period: 'Daily',
    price_plan: 'NA',
    experience: '10 years',
    category: ['LifeStyle', 'Service'],
    delivery_time: '10 days',
    brochure: 'file',
    short_desc:
      'JobHunt is a platform that allows blah blah blah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    full_desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    isActive: true, // true=Active, false=Deleted
  },
  {
    comp_id: '3',
    name: 'Design',
    duration: '6 Months',
    location: 'Burnswil County, North Carolina, US',
    price: 53,
    period: 'Weekly',
    price_plan: 'NA',
    experience: '1 year',
    category: ['LifeStyle', 'Service'],
    delivery_time: '15 days',
    brochure: 'file',
    short_desc: 'JobHunt is a platform that allows blah blah blah',
    full_desc: 'Enter Details',
    isActive: false, // true=Active, false=Deleted
  },
  {
    comp_id: '4',
    name: 'QA',
    duration: '6 Months',
    location: 'Burnswil County, North Carolina, US',
    price: 53,
    period: 'Weekly',
    price_plan: 'NA',
    experience: '1 year',
    category: ['LifeStyle', 'Service'],
    delivery_time: '15 days',
    brochure: 'file',
    short_desc: 'JobHunt is a platform that allows blah blah blah',
    full_desc: 'Enter Details',
    isActive: true, // true=Active, false=Deleted
  },
  {
    comp_id: '5',
    name: 'Design Tada',
    duration: '6 Months',
    location: 'Burnswil County, North Carolina, US',
    price: 53,
    period: 'Weekly',
    price_plan: 'NA',
    experience: '1 year',
    category: ['LifeStyle', 'Service'],
    delivery_time: '15 days',
    brochure: 'file',
    short_desc: 'JobHunt is a platform that allows blah blah blah',
    full_desc: 'Enter Details',
    isActive: false, // true=Active, false=Deleted
  },
];
const numEachPage = 2;

class ServiseListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 2,
      data: [],
      resultsPerPage: 10,
      totalData: '',
      totalPages: '',
      currentPage: '',
      serviceid: '',
    };
  }
  componentDidMount() {
    this.makeHttpRequestWithPage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
    if (this.props.city_name !== prevProps.city_name) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
    if (this.props.comapny_name !== prevProps.comapny_name) {
      console.log('working!!!', this.props.comapny_name);
      this.makeHttpRequestWithPage();
    }
    if (this.props.category !== prevProps.category) {
      console.log('working!!!', this.props.category);
      this.makeHttpRequestWithPage();
    }
    if (this.props.price !== prevProps.price) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
  }
  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };
  makeHttpRequestWithPage = async (pageNumber = 1) => {
    const search = this.props.searchQuery;
    const city = this.props.city_name;
    const company = this.props.comapny_name;
    const category = this.props.category;
    const price = this.props.price;
    console.log(category, "-----------------")

    let searchCat = ""
    // if (category.length > 0) {
    //   category.map((val) => {
    //     searchCat = searchCat + `&category=${val}`
    //   })
    // }
    let searchComp = ""
    if (company.length > 0) {
      company.map((val) => {
        searchComp = searchComp + `&companyId=${val}`
      })
    }
    APIManager.allServicesSortAndSearch(
      pageNumber,
      searchCat,
      searchComp,
      price ? `&price=${price}` : "",
      search ? `&search=${search}` : ""
      // price,
      // search.toLowerCase(),
      // company
    )
      .then((resp) => {
        // console.log(resp, 'sss');
        this.setState({
          data: resp.data.data,
          totalData: resp.data.totalCount,
          resultsPerPage: resp.data.results,
          totalPages: resp.data.totalPages,
          currentPage: resp.data.currentPage,
        });
      })
      .catch((err) => message.error(err));
  };
  renderDetailPage = () => { };
  render() {
    let renderPageNumbers;
    console.log(
      this.state.data,
      this.state.totalData,
      this.state.totalPages,
      this.state.currentPage
    );

    // const data = this.props.servicedata ? this.props.servicedata.data : '';
    const loading = this.props.isloading;
    return (
      <>
        {this.state.data === null && (
          <div className={'d-flex justify-content-center'}>
            <Spin />
          </div>
        )}
        <h3 className="card-div-head">{this.state.total} Services Found</h3>
        <div className="custom-container" style={{ padding: 0 }}>
          {this.state.data.length === 0
            ? 'No data Found'
            : this.state.data &&
            this.state.data.map((data) => (
              <>
                <Card
                  className="services-card"
                  // onClick={(e) => this.props.ServiceDetailRender(e, data)}
                  onClick={() => {
                    var ls = require('local-storage');
                    ls.set('serviceId', data._id);
                    this.props.history.push({
                      pathname: '/services/detail',
                      id: data._id,
                    });
                  }}
                  style={{ margin: '0 40px 15px 40px' }}
                  key={data.comp_id}
                >
                  <Row>
                    <Col span={3}>
                      <img
                        alt="example"
                        src={
                          data.media[0]
                            ? ImageUrl.imageUrlPath + data.media[0].fileName
                            : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }
                        style={{ width: '100%', height: '100px' }}
                      />
                    </Col>
                    <Col
                      span={21}
                      style={{ paddingLeft: '20px' }}
                      className="service-detail-row"
                    >
                      <Row justify="space-between">
                        <Col span={17}>
                          <div className="service-name">{data.name}</div>
                        </Col>
                        <Col span={7}>
                          <Tag
                            color="volcano"
                            className="s-price-tag"
                            style={{ float: 'right' }}
                          >
                            {data.period + ' $ ' + data.price.amount}
                          </Tag>
                          <p className="job-card-8">
                            {data.isSponsored ? 'SPONSORED' : ''}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ margin: '4px 0 10px' }}>
                          <span className="s-company-name">{data.companyData.comp_info.bus_name}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={data.category.length > 1 ? 24 : 6}>
                          <span style={{ marginRight: '15px' }}>
                            {/* {data.category.map((cat) => (
                              <Tag color="volcano" className="s-price-tag">
                                {cat}
                              </Tag>
                            ))} */}
                          </span>
                        </Col>

                        {/* <EyeFilled className='eye-icon'/><span className='like-eye-text'>1.2k</span>
                      <LikeFilled className='like-icon'/><span className='like-eye-text'>2.6k</span> */}
                      </Row>
                      <Row>
                        <Col
                          lg={data.category.length > 1 ? 24 : 10}
                          xs={24}
                          md={24}
                        >
                          <EyeFilled className="eye-icon" />
                          <span className="like-eye-text">1.2k</span>
                          <LikeFilled className="like-icon" />
                          <span className="like-eye-text">2.6k</span>
                        </Col>
                      </Row>
                      <Row
                        align="bottom"
                        style={{ marginTop: '10px' }}
                        gutter={16}
                      >
                        <Col
                          span={8}
                          style={{ display: 'flex', alignSelf: 'self-start' }}
                        >
                          <EnvironmentFilled className="service-icons" />
                          <div
                            className="service-location"
                            style={{ display: 'block' }}
                          >
                            {data.location}
                          </div>
                        </Col>
                        <Col span={12}>
                          <ClockCircleOutlined className="service-icons" />
                          <div className="service-location">
                            {data.duration}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </>
            ))}
          <div className={'paginate-container'}>
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={20}
              firstPageText={false}
              lastPageText={false}
              totalItemsCount={this.state.totalData}
              pageRangeDisplayed={5}
              onChange={(pageNumber) => {
                this.makeHttpRequestWithPage(pageNumber);
              }}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>

      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    servicedata: state.ServiceReducer.servicedata,
    isloading: state.ServiceReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(ServiseListingCard));
