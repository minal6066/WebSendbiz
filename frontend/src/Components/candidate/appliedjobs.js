import React, { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import { message, Spin,Card,Row,Col } from "antd";
import { ImageUrl } from '../../Shared/imageUrlPath';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import moment from 'moment';
import ApplicationStatus from '../app_status/application_status'

class AppliedJobs extends Component {
  componentDidMount(){
    APIManager.appliedCandidateJobs();
  }
  render() {
    console.log(this.props)
    let loader = this.props.isloading
    let applied_job = []
    if(this.props.data !== undefined && this.props.data !== null){
      applied_job = this.props.data.data
      console.log(applied_job)
    }

    return (
      <>
        <div className="row row-top">
          <div className="col-sm-11">
            <h5 className="candidate_heading">Applied Jobs</h5>
            { loader ? (<Spin />):(
              <>
                { applied_job.length === 0 ? (
                  <div className="row text-center">
                    No data found
                  </div>
                ):(
                <>
                { applied_job.map((val,index)=>(
                  <>
                  {/*<div className="row shadow-lg p-3 mb-5 bg-white rounded custom-row" key={index}>
                    <div className="col-sm-2 favourite-col-sm-2 p-0 text-center">
                      <img
                        src={process.env.PUBLIC_URL + '/rectangle.png'}
                        className="resume_profile_image"
                        alt="profile image"
                      />
                    </div>
                    <div className="col-sm-8 favourite-col-sm-8">
                      <h3 className="resume-heading">{val.applied_for_job.title}</h3>
                      <p className="favourite-para-1 m-0">{val.companyData.comp_info.comp_name}</p>
                      <p className="favourite-para  m-0">
                        <i
                          className="fa fa-map-marker resume-color"
                          aria-hidden="true"
                        ></i>
                        &nbsp;&nbsp;{val.companyData.contact_info.city}, {val.companyData.contact_info.country}
                      </p>
                      <ul className="menu-content resume-ul form-inline text-center  m-0">
                        <li
                          style={{ paddingRight: '10px' }}
                          className="favourite-para applied-para-1"
                        >
                          <img
                            className="fa fa-globe fa-lg"
                            style={{ width: '7%' }}
                            src={process.env.PUBLIC_URL + '/page-check-red.png'}
                          />
                          &nbsp;&nbsp;Less than {moment(val.applied_at).format('d MMM YY')}
                        </li>
                        <li
                          style={{ paddingRight: '10px' }}
                          className="favourite-para"
                        >
                          <img
                            src={process.env.PUBLIC_URL + '/countdown.png'}
                            style={{ width: '10%' }}
                          />
                          &nbsp;&nbsp;{moment(val.createdAt).format('DD MMM YY')}
                        </li>
                        <li
                          style={{ paddingRight: '10px' }}
                          className="favourite-para"
                        >
                          <img
                            src={process.env.PUBLIC_URL + '/countdown.png'}
                            style={{ width: '10%' }}
                          />
                          &nbsp;&nbsp;{moment(val.updatedAt).format('DD MMM YY')}
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-2">
                      <ApplicationStatus status={val.status} />
                    </div>
                  </div>*/}
                  <Card className="services-card w-100" key={index}>
                      <Row>
                        <Col span={3}>
                          <img
                            alt="example"
                            src={
                              val.job_logo
                                ? ImageUrl.imageUrlPath + val.job_logo
                                : process.env.PUBLIC_URL + '/rectangle.png'
                            }
                            style={{ width: '100%', height: '100%' }}
                          />
                        </Col>
                        <Col
                          span={17}
                          style={{ paddingLeft: '20px' }}
                          className="service-detail-row"
                        >
                          <Row justify="space-between">
                            <Col span={17}>
                              <div className="service-name">{val.applied_for_job.title}</div>
                              <p className="favourite-para-1 m-0">{val.companyData.comp_info.comp_name}</p>
                            </Col>
                            <Col span={7} className="icon-col">
                            </Col>
                          </Row>
                          <Row>
                            <Col span={18}>
                              <span>
                                <img
                                    src={
                                      process.env.PUBLIC_URL + '/location-red.png'
                                    }
                                    style={{ width: 14 }}
                                  />
                                </span>
                              <span className="service-s-desc" style={{paddingLeft:'8px', verticalAlign:'middle'}}>
                                  {val.companyData.contact_info.city}, {val.companyData.contact_info.country}</span>
                            </Col>
                          </Row>
                          <Row align="bottom" style={{ marginTop: '10px' }}>
                            {val.location === null || val.location === ' ' ? ('') :
                            <Col
                              span={8}
                              style={{ display: 'flex', alignSelf: 'self-start' }}
                            >
                              <img
                                src={process.env.PUBLIC_URL + '/clock-red.png'} className='service-icons' style={{height:'16px', verticalAlign:'super'}}
                                />
                              <div
                                className="service-location"
                                style={{ display: 'block' }}
                              >
                                {moment(val.applied_at).format('d MMM YY')}
                              </div>
                            </Col>
                            }
                            <Col span={8}>
                              {/* <ClockCircleFilled className="service-icons" /> */}
                              <img
                                src={process.env.PUBLIC_URL + '/clock-red.png'} className='service-icons' style={{height:'16px', verticalAlign:'super'}}
                              />
                              <div className="service-location">
                              {moment(val.applied_at).format('d MMM YY')}
                              </div>
                            </Col>
                            <Col span={8}>
                                <img
                                  src={process.env.PUBLIC_URL + '/countdown.png'} className='service-icons' style={{height:'16px', verticalAlign:'super'}}
                                />
                                <div className="service-location">
                                {moment(val.applied_at).format('d MMM YY')}
                                </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={4}>
                          <ApplicationStatus status={val.status} />
                        </Col>
                      </Row>
                  </Card>
                  </>
                ))}
                </>
                )}
              
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
    data: state.candidateInfoSubmitReducer.job_data,
    isloading: state.candidateInfoSubmitReducer.isLoading
})

export default connect(mapStateToProps)(AppliedJobs);
