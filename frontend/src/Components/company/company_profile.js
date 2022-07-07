import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import './company.css';
import axios from 'axios';
import { Spin } from 'antd';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import moment from 'moment';
import Presentation from './presentation';
import CompanyJobs from './company_jobs';
import CompanyProducts from './company_products';
import CompanyServices from './company_services';
import CompanyNews from './company_news';
import CompanyEvents from './company_events';
import RightFeature from './right_features_company';
import { useParam } from 'react-router-dom';
import cardDefaultPic from '../../Components/asset/card.svg';
import { LeftOutlined } from '@ant-design/icons';
import { fileUrl } from '../../Shared/imageUrlPath';

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info_active: 'company-active',
      presentation: true,
      jobs: false,
      products: false,
      services: false,
      news: false,
      events: false,

      company_name: '',
      company_mail: '',
      company_address: '',
      company_phone: '',
      company_activity: '',
      company_city: '',
      data: null,
    };
  }
  gotoCompanyPresentation() {
    this.setState({
      presentation: true,
      jobs: false,
      products: false,
      services: false,
      news: false,
      events: false,
    });
    // this.props.history.push("/company/presentation")
  }
  gotoCompanyJobs() {
    this.setState({
      presentation: false,
      jobs: true,
      products: false,
      services: false,
      news: false,
      events: false,
    });
  }
  gotoCompanyProducts() {
    this.setState({
      presentation: false,
      jobs: false,
      products: true,
      services: false,
      news: false,
      events: false,
    });
  }
  gotoCompanyServices() {
    this.setState({
      presentation: false,
      jobs: false,
      products: false,
      services: true,
      news: false,
      events: false,
    });
  }
  gotoCompanyNews() {
    this.setState({
      presentation: false,
      jobs: false,
      products: false,
      services: false,
      news: true,
      events: false,
    });
  }
  gotoCompanyEvents() {
    this.setState({
      presentation: false,
      jobs: false,
      products: false,
      services: false,
      news: false,
      events: true,
    });
  }
  getData = () => {
    // let data = this.props.location.state.compId; //"5ff6be8b2032e761c0de6ec1"//this.props.location.state.compId
    const { id } = this.props.match.params;
    console.log(id);
    APIManager.companyDetail(id).then((resp) => {
      console.log(resp);
      this.setState({ data: resp.data.data });
    });
  };
  async componentDidMount() {
    await this.getData();
  }
  render() {
    console.log(this.props.data);
    // const { name } = this.props.data
    //   ? this.props.data.data.comp_info.comp_name.match.params.name
    //   : '';
    //  console.log(name);
    let loader = true;
    let data = this.state.data;
    if (data !== null) {
      // data = data.data
      loader = false;
    } else {
      loader = true;
    }
    // console.log(data)
    let tabs = [
      { tabname: 'COMPANY INFO', comp: <Spin /> },
      { tabname: 'SOCIAL', comp: <Spin /> },
      { tabname: 'CONTACT INFO', comp: <Spin /> },
      { tabname: 'MEDIA', comp: <Spin /> },
    ];
    return (
      <>
        <Header />
        <div
          style={{ padding: '10px' }}
          onClick={() => {
            this.props.history.push('/CompanyList');
          }}
        >
          <LeftOutlined className="back-icon" />
          <span className="back-btn">Go back</span>
        </div>
        {loader ? (
          <div className={'d-flex justify-content-center w-100'}>
            <Spin />
          </div>
        ) : (
          <div className="row custom-row m-0">
            <div className="col-sm-12 card company-profile-1 background-color p-0">
              {data.coverImage.path !== null && data.coverImage.path !== '' ? (
                <img
                  src={fileUrl.fileUrlPath + data.coverImage.path}
                  style={{ width: '100%' }}
                  alt="company"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + '/company_home.png'}
                  style={{ width: '100%' }}
                  alt="company"
                />
              )}
              <div className="card-body company-home-card-1 card-border">
                <div className="row custom-row m-0">
                  <ul className="company-main-ul-1">
                    <li
                      className="company-main-ul-1-li"
                      style={{ width: '11.453%' }}
                    >
                      {data.logo.path !== null && data.logo.path !== '' ? (
                        <img
                          src={data.logo.path}
                          style={{ width: '100%', borderRadius: '6px' }}
                          alt=""
                        />
                      ) : (
                        <img
                          src={cardDefaultPic}
                          style={{ width: '100%', borderRadius: '6px' }}
                          alt=""
                        />
                      )}
                    </li>
                    <li
                      className="font-class-1 company-main-ul-1-li"
                      style={{ width: '75%' }}
                    >
                      <h3 className="company-profile-heading">
                        {data.comp_info.comp_name.charAt(0).toUpperCase() +
                          data.comp_info.comp_name.slice(1)}
                      </h3>
                      <h6 className="company-activity mb-3">
                        {data.comp_info.bus_name}
                      </h6>
                      <ul className="company-main-ul-1">
                        <li className="company-main-ul-1-li">
                          <p className="m-0">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp;{data.contact_info.city},&nbsp;
                            {data.contact_info.country}
                          </p>
                        </li>
                        <li className="company-main-ul-1-li">
                          <p className="m-0">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            &nbsp;&nbsp;{data.contact_info.phone_no}
                          </p>
                        </li>
                        <li className="company-main-ul-1-li">
                          <p className="m-0">
                            <i
                              className="fa fa-paper-plane"
                              aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp;{data.contact_info.email}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li style={{ width: '15%' }}>
                      <ul className="company-main-ul-1 company-visit-profile text-right">
                          {data.social_link.map((data) => {
                            return (
                              <>
                                {data.tag==="facebook" &&
                                <li className="company-main-ul-1-li">
                                  <p className="m-0 social-icon-company">
                                    <img
                                      src={process.env.PUBLIC_URL + '/facebook.png'}
                                    />
                                  </p>
                                </li>
                                }
                                {data.tag==="linkedIn" &&
                                <li className="company-main-ul-1-li">
                                  <p className="m-0 social-icon-company">
                                    <img
                                      src={process.env.PUBLIC_URL + '/linkedin.png'}
                                    />
                                  </p>
                                </li>
                                }
                                {data.tag==="twitter" &&
                                <li className="company-main-ul-1-li">
                                  <p className="m-0 social-icon-company">
                                    <img
                                      src={process.env.PUBLIC_URL + '/twitter.png'}
                                    />
                                  </p>
                                </li>
                                }
                              </>
                            )
                          })
                          }
                      </ul>
                      <p className="visit-company-page">
                        <i class="fa fa-paperclip"></i>&nbsp;&nbsp;Visit company
                        page
                      </p>
                    </li>
                  </ul>
                </div>
                <ul className="company-main-ul-1 c1">
                  <li className="c1-li-2">
                    <p className="m-0 w-100 company-information-div-1">
                      {data.jobs.length}
                    </p>
                    <p className="m-0 company-information-div-2">Jobs</p>
                  </li>
                  <li className="c1-li-1">
                    <p className="m-0 w-100 company-information-div-1">
                      {data.products.length}
                    </p>
                    <p className="m-0 company-information-div-2">Products</p>
                  </li>
                  <li className="c1-li-1">
                    <p className="m-0 w-100 company-information-div-1">
                      {data.services.length}
                    </p>
                    <p className="m-0 company-information-div-2">Services</p>
                  </li>
                  <li className="c1-li-1">
                    <p className="m-0 w-100 company-information-div-1">
                      {data.comp_info.noOf_emp}
                    </p>
                    <p className="m-0 company-information-div-2">Employees</p>
                  </li>
                  <li className="c1-li-1">
                    <p className="m-0 w-100 company-information-div-1">
                      {data.comp_info ? data.comp_info.age : ''} yrs
                    </p>
                    <p className="m-0 company-information-div-2">Average age</p>
                  </li>
                </ul>
                <hr />
                <div className="row custom_row">
                  <ul className="form-inline list-style-3">
                    <li className="cursor list-style-3-li-1">
                      {this.state.presentation ? (
                        <p
                          className={`company-profile company-active`}
                          onClick={() => this.gotoCompanyPresentation()}
                        >
                          Presentation
                        </p>
                      ) : (
                        <p
                          className={`company-profile`}
                          onClick={() => this.gotoCompanyPresentation()}
                        >
                          Presentation
                        </p>
                      )}
                    </li>
                    <li className="cursor list-style-3-li-2">
                      {this.state.jobs ? (
                        <p
                          onClick={() => this.gotoCompanyJobs()}
                          className={`company-profile company-active`}
                        >
                          jobs
                        </p>
                      ) : (
                        <p
                          onClick={() => this.gotoCompanyJobs()}
                          className={`company-profile `}
                        >
                          jobs
                        </p>
                      )}
                    </li>
                    <li className="cursor list-style-3-li-2">
                      {this.state.products ? (
                        <p
                          onClick={() => this.gotoCompanyProducts()}
                          className={`company-profile company-active`}
                        >
                          products
                        </p>
                      ) : (
                        <p
                          onClick={() => this.gotoCompanyProducts()}
                          className={`company-profile `}
                        >
                          products
                        </p>
                      )}
                    </li>
                    <li className="cursor list-style-3-li-2">
                      {this.state.services ? (
                        <p
                          onClick={() => this.gotoCompanyServices()}
                          className={`company-profile company-active`}
                        >
                          services
                        </p>
                      ) : (
                        <p
                          onClick={() => this.gotoCompanyServices()}
                          className={`company-profile `}
                        >
                          services
                        </p>
                      )}
                    </li>
                    <li className="cursor list-style-3-li-2">
                      {this.state.news ? (
                        <p
                          onClick={() => this.gotoCompanyNews()}
                          className={`company-profile company-active`}
                        >
                          news
                        </p>
                      ) : (
                        <p
                          onClick={() => this.gotoCompanyNews()}
                          className={`company-profile `}
                        >
                          news
                        </p>
                      )}
                    </li>
                    <li className="cursor list-style-3-li-2">
                      {this.state.events ? (
                        <p
                          onClick={() => this.gotoCompanyEvents()}
                          className={`company-profile company-active`}
                        >
                          EVENTS
                        </p>
                      ) : (
                        <p
                          onClick={() => this.gotoCompanyEvents()}
                          className={`company-profile `}
                        >
                          EVENTS
                        </p>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body company-home-card-2 p-0">
                <div className="row custom-row">
                  {this.state.presentation ? (
                    <Presentation data={data} />
                  ) : null}
                  {this.state.jobs ? (
                    <CompanyJobs
                      comp_data={data.comp_info}
                      jobs_data={data.jobs}
                    />
                  ) : null}
                  {this.state.products ? (
                    <CompanyProducts prod_data={data.products} />
                  ) : null}
                  {this.state.services ? (
                    <CompanyServices ser_data={data.services} />
                  ) : null}
                  {this.state.news ? (
                    <CompanyNews news_data={data.news} />
                  ) : null}
                  {this.state.events ? (
                    <CompanyEvents
                      comments_on_off={false}
                      events_data={data.products}
                    />
                  ) : null}
                  <RightFeature />
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.companyInfoReducer.comp_pro_data,
  isloading: state.companyInfoReducer.jobloading,
});
export default connect(mapStateToProps)(CompanyProfile);
