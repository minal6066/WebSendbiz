import React, { Component } from 'react';
import { Row, Col, Input, Switch, Image, Spin, Card } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import AppliedJobCards from './all_applied_job_card';
import APIManager from '../../APIManager/index';
import { ImageUrl } from '../../Shared/imageUrlPath';

class AppliedJobDetail extends Component {
  componentDidMount() {
    const jobId = this.props.location.state.jobId;
    APIManager.resumeGetOneAppliedJob(jobId);
  }
  render() {
    const jobName = this.props.appliedJobData
      ? this.props.appliedJobData.data.applied_for_job.title
      : '';
    const companyName = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.current_company
      : '';
    const currentPosition = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.current_position
      : '';
    const location = this.props.appliedJobData
      ? this.props.appliedJobData.data.location
      : 'No location found';
    const date = this.props.appliedJobData
      ? this.props.appliedJobData.data.create
      : '';
    const loading = this.props.isloading;
    // const apply_for_job_id = this.props.appliedJobData ?
    //console.log(this.props.appliedJobData.data)
    const appliedJobId = this.props.appliedJobData
      ? this.props.appliedJobData.data.applied_for_job
      : '';
    // console.log(appliedJobId,'pppp');
    // var ls = require('local-storage');
    // ls.set('applied_jobId',appliedJobId);
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {loading && <Spin />}
        </div>
        <div className="">
          <Row>
            <p className="resume-1">{`Applied Job : ${jobName}`}</p>
          </Row>
          {/*<Row className={'jobListingclscard-1 resume-card-2 mt-3 p-0'}>
            <div className="col-sm-2 resume-custom-col-2 text-center"
              style={{ padding: '20px 30px' }}
            >
              <Image
                className="job-card-image-1"
                src={process.env.PUBLIC_URL + '/Rectangle@2x.png'}
              />
            </div>
            <div className="col-sm-10 resume-custom-col-10 resume-col-10">
              <Row>
                <div className="col-sm-9 col-xs-9 p-0">
                  <p className="resume-card-4">
                    {' '}
                    {companyName.charAt(0).toUpperCase() + companyName.slice(1)}
                    &nbsp;&nbsp;
                    <div className="resume-card-3">
                      <img src={process.env.PUBLIC_URL + '/user.png'} />
                      <span>03</span>
                    </div>
                  </p>
                  <p className="job-card-4">
                    {currentPosition.charAt(0).toUpperCase() +
                      currentPosition.slice(1)}
                  </p>
                  <p className="job-card-5">
                    <img src={process.env.PUBLIC_URL + '/location-red.png'} />
                    &nbsp;&nbsp;{location}
                  </p>
                </div>
              </Row>
              <ul className="job-card-6">
                <li>
                  <p>
                    <img src={process.env.PUBLIC_URL + '/Group 363-red.png'} />
                    &nbsp;&nbsp;Less than 3 months
                  </p>
                </li>
                <li>
                  <p>
                    <img src={process.env.PUBLIC_URL + '/clock-red.png'} />
                    &nbsp;&nbsp;
                    {moment(date).format('d MMM YY')}
                  </p>
                </li>
              </ul>
            </div>
          </Row>*/}
          <Card className="services-card">
            <Row>
              <Col span={3}>
                <img
                  alt="example"
                  src={process.env.PUBLIC_URL + '/rectangle.png'}
                  style={{ width: '100%', height: '100%' }}
                />
              </Col>
              <Col
                span={21}
                style={{ paddingLeft: '20px' }}
                className="service-detail-row"
              >
                <Row justify="space-between">
                  <Col span={17}>
                    <div className="service-name">
                      {' '}
                      {companyName.charAt(0).toUpperCase() +
                        companyName.slice(1)}
                      &nbsp;&nbsp;
                      <div className="resume-card-3">
                        <img src={process.env.PUBLIC_URL + '/user.png'} />
                        &nbsp;
                        <span>01</span>
                      </div>
                    </div>
                    <p className="job-card-4">
                      {currentPosition.charAt(0).toUpperCase() +
                        currentPosition.slice(1)}
                    </p>
                  </Col>
                  <Col span={7} className="icon-col"></Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <span>
                      <img
                        src={process.env.PUBLIC_URL + '/location-red.png'}
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
                      {location}
                    </span>
                  </Col>
                </Row>
                <Row align="bottom" style={{ marginTop: '10px' }}>
                  <Col span={9}>
                    <span>
                      <img
                        src={process.env.PUBLIC_URL + '/Group 363-red.png'}
                        className="service-icons"
                        style={{
                          height: '16px',
                          verticalAlign: 'super',
                        }}
                      />
                    </span>
                    <div className="service-location">
                      {'Less than 3 months'}
                    </div>
                  </Col>
                  <Col span={12}>
                    <img
                      src={process.env.PUBLIC_URL + '/clock-red.png'}
                      className="service-icons"
                      style={{ height: '16px', verticalAlign: 'super' }}
                    />
                    <div className="service-location">
                      {moment(date).format('d MMM YY')}
                    </div>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={24}>
              <p
                style={{
                  marginTop: 30,
                  font: 'normal normal 400 24px/43px Gilroy Bold',
                }}
              >
                3 Candidates
              </p>
            </Col>
          </Row>
          {loading ? (
            ''
          ) : (
            <AppliedJobCards
              job_id={
                this.props.appliedJobData
                  ? this.props.appliedJobData.data.applied_for_job
                  : ''
              }
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appliedJobData: state.jobManagementReducer.appliedJobData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(AppliedJobDetail);
