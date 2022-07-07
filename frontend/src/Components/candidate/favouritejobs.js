import React, { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import { connect } from 'react-redux';
import { message, Spin, Row, Col, Card, Tag } from 'antd';
import APIManager from '../../APIManager';
import moment from 'moment';
import { ImageUrl } from '../../Shared/imageUrlPath';

class FavouriteJobs extends Component {
  componentDidMount() {
    APIManager.favouriteJobs();
  }
  deleteFavJob = (id) => {
    APIManager.delfavouriteJobs(id)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === 'success') {
          message.info('Job deleted favourite');
          APIManager.favouriteJobs();
          // window.location.reload();
          // console.log(response)
        }
      })
      .catch((err) => message.error('Something went wrong.'));
  };
  render() {
    console.log(this.props);
    let loader = this.props.isloading;
    let fav_job = [];
    if (this.props.data !== undefined && this.props.data !== null) {
      fav_job = this.props.data.data;
      console.log(fav_job);
    }
    return (
      <>
        <Row>
          <h5 className="candidate_heading favouritejobsheading-2">
            Favourite Jobs
          </h5>
          {loader ? (
            <Spin />
          ) : (
            <>
              {fav_job.length === 0 ? (
                <Row className="w-100 text-center">No data found</Row>
              ) : (
                <>
                  {fav_job.map((val, index) => (
                    <>
                      {/*<Row className="w-100 bg-white rounded" key={index}>
									<div className="col-sm-2 favouritejobs-col-sm-2 favouritejobs-card-1 text-center">
										<img src={ process.env.PUBLIC_URL + "/rectangle.png"} className="resume_profile_image" alt="profile image" />
									</div>
									<div className="col-sm-8 favourite-col-sm-8 favouritejobs-card-2">
										<h3 className="favritejob-heading m-0">{val.job.title}</h3>
										<p className="favourite-para-1 m-0">{val.companyDetail.comp_info.comp_name}</p>
										<p className="favourite-para m-0 "><i className="fa fa-map-marker resume-color" aria-hidden="true"></i>&nbsp;&nbsp;{ val.job.location !== null ?(val.job.location):null}</p>
										<ul className="menu-content favouritejobs-card-3 m-0 form-inline text-center">
											<li style={{paddingRight:"10px"}} className="favourite-para">
												<i className="fa fa-clock-o resume-color" aria-hidden="true"></i>&nbsp;&nbsp;Less than {moment(val.job.publish_from).format('d MMM YY')}
											</li>
											<li style={{paddingRight:"10px"}} className="favourite-para" >
												<img src={process.env.PUBLIC_URL + "/countdown.png"} style={{width:"12%"}} />&nbsp;&nbsp;{moment(val.job.publish_to).format('DD MMM YY')}
											</li>
										</ul>
									</div>
									<div className="col-sm-2 favouritejobs-card-4">*/}
                      {/*<p className="resume-last-days">Last updated on 5 July</p>*/}
                      {/*<img onClick={() => this.deleteFavJob(val.job._id)} src={process.env.PUBLIC_URL + "/bookmark-red.svg"} className="favouritejobs-card-5" alt="like" />	
									</div>
								</Row>*/}
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
                              style={{ width: '100%', height: '119px' }}
                            />
                          </Col>
                          <Col
                            span={19}
                            style={{ paddingLeft: '20px' }}
                            className="service-detail-row"
                          >
                            <Row justify="space-between">
                              <Col span={17}>
                                <div className="service-name">
                                  {val.job.title}
                                </div>
                                <p className="favourite-para-1 m-0">
                                  {val.companyDetail.comp_info.comp_name}
                                </p>
                              </Col>
                              <Col span={7} className="icon-col"></Col>
                            </Row>
                            <Row>
                              <Col span={18}>
                                <span>
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      '/location-red.png'
                                    }
                                    style={{ width: 14 }}
                                  />
                                </span>
                                <span
                                  className="service-s-desc"
                                  style={{
                                    paddingLeft: '8px',
                                    verticalAlign: 'middle',
                                  }}
                                >
                                  {val.job.location !== null
                                    ? val.job.location
                                    : null}
                                </span>
                              </Col>
                            </Row>
                            <Row align="bottom" style={{ marginTop: '10px' }}>
                              {val.location === null || val.location === ' ' ? (
                                ''
                              ) : (
                                <Col
                                  span={9}
                                  style={{
                                    display: 'flex',
                                    alignSelf: 'self-start',
                                  }}
                                >
                                  {/* <EnvironmentFilled className="service-icons" /> */}
                                  <span>
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        '/clock-red.png'
                                      }
                                      className="service-icons"
                                      style={{
                                        height: '16px',
                                        verticalAlign: 'super',
                                      }}
                                    />
                                  </span>
                                  <div
                                    className="service-location"
                                    style={{ display: 'block' }}
                                  >
                                    Less than{' '}
                                    {moment(val.job.publish_from).format(
                                      'd MMM YY'
                                    )}
                                  </div>
                                </Col>
                              )}
                              <Col span={12}>
                                {/* <ClockCircleFilled className="service-icons" /> */}
                                <img
                                  src={
                                    process.env.PUBLIC_URL + '/clock-red.png'
                                  }
                                  className="service-icons"
                                  style={{
                                    height: '16px',
                                    verticalAlign: 'super',
                                  }}
                                />
                                <div className="service-location">
                                  {moment(val.job.publish_to).format(
                                    'DD MMM YY'
                                  )}
                                </div>
                              </Col>
                              <Col
                                span={2}
                                style={{ textAlign: 'right' }}
                                className="sponsered"
                              ></Col>
                            </Row>
                          </Col>
                          <Col span={2}>
                            <img
                              onClick={() => this.deleteFavJob(val.job._id)}
                              src={process.env.PUBLIC_URL + '/bookmark-red.svg'}
                              className="favouritejobs-card-5"
                              alt="like"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.candidateInfoSubmitReducer.fav_data,
  isloading: state.candidateInfoSubmitReducer.isLoading,
});
export default connect(mapStateToProps)(FavouriteJobs);
