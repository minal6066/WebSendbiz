import React, { Component } from 'react';
import { Row, Col, Input, Switch, Image, Spin, Card, Tag } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { ImageUrl } from '../../../Shared/imageUrlPath';

class JobCards extends Component {
  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };
  render() {
    const appliedJobData = this.props.data ? this.props.data.data : '';
    const loading = this.props.isloading ? this.props.isloading : '';
    const { searchQuery } = this.props;
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {loading && <Spin />}
        </div>
        {appliedJobData &&
          appliedJobData
            .filter((data) =>
              data.candidate.current_company.startsWith(
                searchQuery.toLowerCase()
              )
            )
            .map((data,index) => (
              <>
                {/*<Row
                  className={
                    'col-sm-12 jobListingclscard-1 resume-card-2 mt-3 p-0'
                  }
                  onClick={() =>
                    this.props.history.push({
                      pathname: '/applied-job-detail',
                      state: { jobId: data._id },
                    })
                  }
                >
                  <div
                    className="col-sm-2 resume-custom-col-2 text-center"
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
                          {data.candidate.current_company}&nbsp;&nbsp;
                          <div className="resume-card-3">
                            <img src={process.env.PUBLIC_URL + '/user.png'} />
                            <span>03</span>
                          </div>
                        </p>
                        <p className="job-card-4">
                          {data.candidate.current_position}
                        </p>
                        <p className="job-card-5">
                          <img
                            src={process.env.PUBLIC_URL + '/location-red.png'}
                          />
                          &nbsp;&nbsp;{data.candidate.location}
                        </p>
                      </div>
                    </Row>
                    <ul className="job-card-6">
                      <li>
                        <p>
                          <img
                            src={process.env.PUBLIC_URL + '/Group 363-red.png'}
                          />
                          &nbsp;&nbsp;Less than 3 months
                        </p>
                      </li>
                      <li>
                        <p>
                          <img
                            src={process.env.PUBLIC_URL + '/clock-red.png'}
                          />
                          &nbsp;&nbsp;
                          {moment(data.applied_at).format('d MMM YY')}
                        </p>
                      </li>
                    </ul>
                  </div>
                </Row>*/}
                <Card className="services-card" key={index}>
                  <Row onClick={() =>
                    this.props.history.push({
                      pathname: '/applied-job-detail',
                      state: { jobId: data._id },
                    })
                  }>
                    <Col span={3}>
                      <img
                        alt="example"
                        src={
                          data.job_logo
                            ? ImageUrl.imageUrlPath + data.job_logo
                            : process.env.PUBLIC_URL + '/rectangle.png'
                        }
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Col>
                    <Col span={21} style={{ paddingLeft: '20px' }} className="service-detail-row">
                      <Row justify="space-between">
                        <Col span={17}>
                          <div className="service-name">
                            {' '}
                            {data.candidate.current_company}&nbsp;&nbsp;
                            <div className="resume-card-3">
                              <img src={process.env.PUBLIC_URL + '/user.png'} />&nbsp;
                              <span>01</span>
                            </div>
                          </div>
                          <p className="job-card-4">
                            {data.candidate.current_position}
                          </p>
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
                          <span
                            className="service-s-desc"
                            style={{
                              paddingLeft: '8px',
                              verticalAlign: 'middle',
                            }}
                          >
                            {data.candidate.location}
                          </span>
                        </Col>
                      </Row>
                      <Row align="bottom" style={{ marginTop: '10px' }}>
                        <Col span={9}>
                          <span>
                            <img
                              src={
                                process.env.PUBLIC_URL + '/Group 363-red.png'
                              }
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
                            {moment(data.applied_at).format('d MMM YY')}
                          </div>
                        </Col>
                        <Col span={2}>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
                </>
            ))}
            
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.appliedJobsReducer.data,
    isloading: state.appliedJobsReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(JobCards));
