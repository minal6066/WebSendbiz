import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Layout,
  Menu,
  Col,
  Row,
  Card,
  Input,
  Select,
  Button,
  Image,
} from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NavLink } from 'react-router-dom';
import {
  LeftOutlined,
  RightOutlined,
  BookFilled,
  BookOutlined,
} from '@ant-design/icons';
import './apply_job.css';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import { RightArrow } from '../asset/job-apply-right-arrow.svg';
import { LeftArrow } from '../asset/job-apply-left-arrow.svg';
import RightModal from './rightModal.js';
import ApplyJobModal from './applyJobModal.js';
import CandidateForm from './candidate_form.js';
import APIManager from '../../APIManager/index';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import { ImageUrl } from '../../Shared/imageUrlPath';
import Header from '../header/header';
import HELPERS from '../../APIManager/helper';
const { Meta } = Card;
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group">
      <Button
        className="react-multiple-carousel__arrow_custom custom-left"
        onClick={() => previous()}
      >
        <img src={process.env.PUBLIC_URL + '/job-apply-left-arrow.svg'} />
      </Button>
      <Button
        className="react-multiple-carousel__arrow_custom custom-right"
        onClick={() => next()}
      >
        <img src={process.env.PUBLIC_URL + '/job-apply-right-arrow.svg'} />
      </Button>
    </div>
  );
};

class ApplyJob extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    applymodal: false,
    already_applied: true,
    id: '',
    spinner: false,
    isIntersted: '',
    isLoading: false,
  };
  handleClick = () => {
    console.log('hello');
    this.setState({ applymodal: true });
  };
  componentDidMount() {
    const id = this.props.location.state.jobId;
    APIManager.getJobDescription(id).then((resp) => {
      if (resp.status === 200)
        this.setState({
          isIntersted: resp.data.isInterested,
          isLoading: false,
        });
    });
  }
  saveAsIntersted = () => {
    var ls = require('local-storage');
    const id = this.props.location.state.jobId;
    const param = {
      interestId: id,
    };
    const category = 'job';
    this.setState({
      isLoading: true,
    });
    APIManager.createInterested(category, param)
      .then((resp) => {
        console.log(resp.data.isSuccess);
        if (resp.data.isSuccess) {
          this.setState({
            isIntersted: resp.data.message,
            isLoading: false,
          });
          if (resp.data.message) {
            message.success('Added to interested !');
          } else {
            message.warn('Removed from interested !');
          }
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        message.error('Something went wrong!');
      });
  };
  addFavourite = (id) => {
    let data = {
      job: id,
    };
    APIManager.submitfavouriteJobs(data)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === 'success') {
          message.info('Job added favourite');
          // console.log(response)
        }
      })
      .catch((err) => message.error('Something went wrong.'));
  };
  closeModal = () => {
    // document.body.style.overflow = 'auto';
    this.setState({ applymodal: false });
  };

  uploaded = (spinner) => {
    this.setState({ spinner: spinner });
    this.refreshPage();
  };
  // refreshPage = () => {
  //   APIManager.getJobDescription(id);
  // };
  render() {
    console.log(this.props.decriptionData);
    const comp_name =
      this.props.decriptionData &&
      this.props.decriptionData.data.companyDetail.length !== 0 &&
      this.props.decriptionData.data.companyDetail !== undefined
        ? this.props.decriptionData.data.companyDetail[0].comp_info.comp_name
        : '';
        const bus_name =
        this.props.decriptionData &&
        this.props.decriptionData.data.companyDetail.length !== 0 &&
        this.props.decriptionData.data.companyDetail !== undefined
          ? this.props.decriptionData.data.companyDetail[0].comp_info.bus_name
          : '';
    const loading = this.props.isloading ? this.props.isloading : '';
    const jobPostion = this.props.decriptionData
      ? this.props.decriptionData.data.title
      : '';
    const companyName =
      this.props.decriptionData &&
      this.props.decriptionData.data.companyAccount.length !== 0 &&
      this.props.decriptionData.data.companyAccount !== undefined
        ? this.props.decriptionData.data.companyAccount[0].comp_detail
            .company_name
        : '';
    const description = this.props.decriptionData
      ? this.props.decriptionData.data.description
      : '';
    const location = this.props.decriptionData
      ? this.props.decriptionData.data.location
      : '';
    const minSalary = this.props.decriptionData
      ? this.props.decriptionData.data.min_salary
      : '';
    const maxSalary = this.props.decriptionData
      ? this.props.decriptionData.data.max_salary
      : '';
    const minExperience = this.props.decriptionData
      ? this.props.decriptionData.data.min_experience
      : '';
    const maxExperience = this.props.decriptionData
      ? this.props.decriptionData.data.max_experience
      : '';
    const RecruitmentProcess = this.props.decriptionData
      ? this.props.decriptionData.data.req_process
      : '';
    const qualification = this.props.decriptionData
      ? this.props.decriptionData.data.qualification
      : '';
    const Specialization = this.props.decriptionData
      ? this.props.decriptionData.data.specialization
      : '';
    const desiredCandidate = this.props.decriptionData
      ? this.props.decriptionData.data.desired
      : '';
    const address = this.props.decriptionData
      ? this.props.decriptionData.data.companyDetail[0].contact_info.address
      : '';
    const phone = this.props.decriptionData
      ? this.props.decriptionData.data.companyDetail[0].contact_info.phone_no
      : '';
    const email = this.props.decriptionData
      ? this.props.decriptionData.data.companyDetail[0].contact_info.email
      : '';
    const logo = this.props.decriptionData
      ? this.props.decriptionData.data.job_logo
      : '';
    const cover = this.props.decriptionData
      ? this.props.decriptionData.data.job_cover
      : '';
    const compInfo = this.props.decriptionData
      ? this.props.decriptionData.data.companyDetail[0].comp_info.comp_info
      : '';
    const hasApplied = this.props.decriptionData
      ? this.props.decriptionData.hasApplied
      : true;
    const social_link = this.props.decriptionData
      ? this.props.decriptionData.data.companyDetail[0].social_link
      : [];
    const title = this.props.decriptionData
      ? this.props.decriptionData.data.title
      : '';
    const myJob = this.props.decriptionData
      ? this.props.decriptionData.myJob
      : true;
    let user_type = JSON.parse(localStorage.getItem('user_type') || false);
    const user_type2 = JSON.parse(localStorage.getItem('user_type2') || false);
    let type_of_user = HELPERS.isNumber(user_type);
    let type_of_user2 = HELPERS.isNumber(user_type2);
    user_type = user_type / (user_type2 * 99);
    console.log(user_type, 'llll');
    return (
      <div className="responsive-div">
        <Spin tip="Loading..." spinning={this.state.spinner}>
          {this.state.applymodal ? (
            <ApplyJobModal
              isClose={this.closeModal}
              comp_name={comp_name}
              id={this.state.id}
              uploaded={this.uploaded}
              title={'Apply Job'}
              isOpen={this.state.applymodal}
            />
          ) : null}
          <Header />
          <div
            style={{ padding: '10px' }}
            onClick={() => {
              this.props.history.push('/all_jobs');
            }}
          >
            <LeftOutlined className="back-icon" />
            <span className="back-btn">Go back</span>
          </div>
          <Row>
            <div className={'d-flex justify-content-center w-100'}>
              {loading && <Spin />}
            </div>
            <Image
              width={'100%'}
              className="apply-job-image-height"
              src={
                cover
                  ? ImageUrl.imageUrlPath + cover
                  : process.env.PUBLIC_URL + '/job-profile-page.png'
              }
            />
          </Row>
          <Row className="site-layout-background main-left-right">
            <Col span={8}>
              <div className="apply-job-sidebar">
                <div className="menu-list">
                  <Row>
                    <Col span={8}>
                      <img
                        src={
                          logo
                            ? ImageUrl.imageUrlPath + logo
                            : process.env.PUBLIC_URL + '/company_logo.png'
                        }
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col span={16} className="apply-custom-navbar">
                      <h5 className="apply-custom-navbar-h5-1">
                        {jobPostion.charAt(0).toUpperCase() +
                          jobPostion.slice(1)}
                      </h5>
                      <p className="apply-custom-navbar-p-1">
                        {bus_name.charAt(0).toUpperCase() +
                          bus_name.slice(1)}
                      </p>
                      <p className="apply-custom-navbar-p-2">PERMANENT</p>
                    </Col>
                  </Row>
                  <Row>
                    <p className="apply-job-location">
                      <img src={process.env.PUBLIC_URL + '/location-red.png'} />
                      &nbsp;&nbsp;{location}
                    </p>
                    <p className="apply-job-salary-1">{`$${minSalary} - $ ${maxSalary}`}</p>
                    <p className="apply-job-salary-2 padding-bottom-apply-job">
                      Monthly Salary
                    </p>
                    <Col span={6} className="right-border-apply-job">
                      <p className="apply-job-salary-1">Service</p>
                      <p className="apply-job-salary-2">Industry</p>
                    </Col>
                    <Col
                      span={10}
                      style={{ textAlign: 'center' }}
                      className="right-border-apply-job"
                    >
                      <p className="apply-job-salary-1">{`${minExperience} - ${maxExperience}`}</p>
                      <p className="apply-job-salary-2">Experience</p>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                      <p className="apply-job-salary-1">Immidiate</p>
                      <p
                        className="apply-job-salary-2"
                        style={{ textAlign: 'center' }}
                      >
                        Joining
                      </p>
                    </Col>
                  </Row>
                  <Row className="padding-top-apply-job ">
                    <Col span={11} className="padding-bottom-apply-job">
                      <ul className="company-main-ul-1">
                        {social_link.map((val, index) => (
                          <>
                            {val.tag === 'Facebook' ||
                            val.tag === 'facebook' ? (
                              <li
                                style={{ paddingRight: 15 }}
                                onClick={() => window.open(val.link, '_blank')}
                              >
                                <img
                                  src={process.env.PUBLIC_URL + '/facebook.png'}
                                />
                              </li>
                            ) : null}
                            {val.tag === 'Linkedin' ||
                            val.tag === 'linkedin' ||
                            val.tag === 'LinkedIn' ? (
                              <li
                                style={{ paddingRight: 15 }}
                                onClick={() => window.open(val.link, '_blank')}
                              >
                                <img
                                  src={process.env.PUBLIC_URL + '/linkedin.png'}
                                />
                              </li>
                            ) : null}
                            {val.tag === 'Twitter' ||
                            val.tag === 'twitter' ||
                            val.tag === 'linkedIn' ? (
                              <li
                                style={{ paddingRight: 15 }}
                                onClick={() => window.open(val.link, '_blank')}
                              >
                                <img
                                  src={process.env.PUBLIC_URL + '/twitter.png'}
                                />
                              </li>
                            ) : null}
                          </>
                        ))}
                      </ul>
                    </Col>
                    <Col span={13}></Col>
                    {myJob ? (
                      ''
                    ) : (
                      <div className="apply-job-btn-cls w-100">
                        {hasApplied ? (
                          <Button className="btn btn-dark bold-family btn-save-font cursor">
                            Applied
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-dark bold-family btn-save-font cursor"
                            onClick={this.handleClick}
                          >
                            Apply Now
                          </Button>
                        )}
                        {user_type === 1 ? (
                          <p
                            className="bookmark-job-detail"
                            onClick={() => this.addFavourite(this.state.id)}
                          >
                            <img
                              src={process.env.PUBLIC_URL + '/bookmark-1.svg'}
                            />
                          </p>
                        ) : (
                          ''
                        )}
                        <div
                          className="bookmark-div"
                          onClick={this.saveAsIntersted}
                        >
                          {this.state.isIntersted ? (
                            <BookFilled
                              style={{ fontSize: '30px', cursor: 'pointer' }}
                            />
                          ) : (
                            <BookOutlined
                              style={{ fontSize: '30px', cursor: 'pointer' }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={16} className="job-description-main-cls">
              {title.charAt(0).toUpperCase() + title.slice(1)}
              <h5 className="job-detail-description">Job Description</h5>
              <p className="job-detail-description-para">
                {/* We are looking for a dynamic UI/UX Designer who will be
              responsible for the user experience (UX) and user interface (UI)
              design of our various digital assets. You will ensure that all
              elements of the online user experience are optimized for improved
              usability, usefulness, and exceptional visual design. */}
                {description}
              </p>
              {/* <p className="job-detail-description-para">
              The successful candidate will evidence a passion for delivering
              adaptive and creative solutions to UI/UX design problems by
              staying up to date with best practices and emerging trends in user
              experience design and user interface technology.
            </p> */}
              <p className="job-detail-description-para">Responsibilities</p>
              {/* <ul
              className="job-detail-description-para"
              style={{ paddingLeft: 15 }}
            >
              <li>
                Investigating user experience design requirements for our suite
                of digital assets.
              </li>
              <li>
                Developing and conceptualizing a comprehensive UI/UX design
                strategy for the brand.
              </li>
              <li>
                Producing high quality UX design solutions through wireframes,
                visual and graphic designs, flow diagrams, storyboards, site
                maps, and prototypes.
              </li>
              <li>
                Testing UI elements such as CTAs, banners, page layouts, page
                designs, page flows, and target links for landing pages.
              </li>
              <li>
                Designing UI elements and tools such as navigation menus, search
                boxes, tabs, and widgets for our digital assets.
              </li>
            </ul> */}

            

              <Image
                width={'auto'}
                style={{ margin: '20px 0px' }}
                src={process.env.PUBLIC_URL + '/job-detail-description.png'}
              />

              <h5 className="job-detail-description">Recruitment Process</h5>
              <p className="job-detail-description-para">
                {RecruitmentProcess}
              </p>
              <h5 className="job-detail-description">Requirements</h5>
              <p
                className="job-detail-description"
                style={{ marginBottom: 10 }}
              >
                Qualification
              </p>
              <p className="job-detail-description-para">{qualification}</p>
              <p
                className="job-detail-description"
                style={{ marginBottom: 10 }}
              >
                Specialization
              </p>
              <p>
                <span className="apply-custom-navbar-p-2 job-name-in-description">
                  {Specialization}
                </span>
              </p>
              <p className="apply-job-salary-2" style={{ marginBottom: 10 }}>
                Desired Candidate
              </p>
              <p
                className="apply-job-salary-2"
                style={{ opacity: 1, marginBottom: 10 }}
              >
                {desiredCandidate}
              </p>
              <h5 className="job-detail-description" style={{ marginTop: 30 }}>
                About the company
              </h5>
              <p className="job-detail-description-para">{compInfo}</p>
              <ul className="job-detail-description-ul">
                <li style={{ paddingRight: 40 }}>
                  <img src={process.env.PUBLIC_URL + '/location.svg'} />
                  &nbsp;&nbsp;
                  <span>{address}</span>
                </li>
                <li style={{ paddingRight: 40 }}>
                  <img src={process.env.PUBLIC_URL + '/phone.svg'} />
                  &nbsp;&nbsp;
                  <span>{phone}</span>
                </li>
                <li>
                  <img src={process.env.PUBLIC_URL + '/paper-airplane.svg'} />
                  &nbsp;&nbsp;
                  <span>{email}</span>
                </li>
              </ul>
              <p
                className="job-detail-link-company-page"
                onClick={() => {
                  window.location.href = '/company/presentation';
                }}
              >
                <img src={process.env.PUBLIC_URL + '/link.svg'} />
                &nbsp;&nbsp;
                <span>Visit company page</span>
              </p>
              {myJob ? (
                ''
              ) : (
                <div className="apply-job-btn-cls">
                  {hasApplied ? (
                    ''
                  ) : (
                    <Button
                      className="btn btn-dark bold-family btn-save-font cursor"
                      onClick={this.handleClick}
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Row className="apply-job-news-bottom" style={{ paddingTop: 70 }}>
            <p className="apply-job-news-bottom-para-1">News</p>
            <p className="apply-job-news-bottom-para-2">Inside JobHunt</p>
          </Row>
          <Row justify="center">
            <Col span={20} className="apply-job-scroller">
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                customButtonGroup={<ButtonGroup />}
                autoPlaySpeed={0}
                centerMode={true}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={true}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 3,
                    partialVisibilityGutter: 40,
                  },

                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/scroller-1.png'}
                    />
                  }
                >
                  <p className="card-heading-job-detail-scroller-1">
                    6 tips for running a successful online business
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                    />
                    &nbsp;&nbsp;
                    <span>5 min. read</span>
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    12 May 2019
                  </p>
                </Card>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/scroller-1.png'}
                    />
                  }
                >
                  <p className="card-heading-job-detail-scroller-1">
                    How do you know when it’s time to finally rebrand?
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                    />
                    &nbsp;&nbsp;
                    <span>5 min. read</span>
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    12 May 2019
                  </p>
                </Card>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/scroller-1.png'}
                    />
                  }
                >
                  <p className="card-heading-job-detail-scroller-1">
                    Here are 6 tips for running a successful online business
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                    />
                    &nbsp;&nbsp;
                    <span>5 min. read</span>
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    12 May 2019
                  </p>
                </Card>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/scroller-1.png'}
                    />
                  }
                >
                  <p className="card-heading-job-detail-scroller-1">
                    What’s the purpose of logos and why do they matter?
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                    />
                    &nbsp;&nbsp;
                    <span>5 min. read</span>
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    12 May 2019
                  </p>
                </Card>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/scroller-1.png'}
                    />
                  }
                >
                  <p className="card-heading-job-detail-scroller-1">
                    6 tips for running a successful online business
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    <img
                      alt="example"
                      src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                    />
                    &nbsp;&nbsp;
                    <span>5 min. read</span>
                  </p>
                  <p className="card-heading-job-detail-scroller-2">
                    12 May 2019
                  </p>
                </Card>
              </Carousel>
            </Col>
          </Row>
          <Footer />
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    decriptionData: state.jobManagementReducer.decriptionData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(ApplyJob));
