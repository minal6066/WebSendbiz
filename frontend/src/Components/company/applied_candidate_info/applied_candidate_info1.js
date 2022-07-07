import React, { Component } from 'react';
import { Row, Col, Input, Switch, Spin } from 'antd';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import AppliedJobStatus from '../../layout/applied-job-status';
import './applied_candidate.css'
class JobCards extends Component {
  state = {
    status:""
  }
  componentDidMount() {
    const candidateId = this.props.id;
    if(this.props.status !== null && this.props.status !== undefined){
      this.setState({
        status:this.props.status
      })
    }
    APIManager.resumeGetOneAppliedJob(candidateId);
  }
  render() {
    console.log(
      this.props.appliedJobData ? this.props.appliedJobData : '',
      'ffffffffffff'
    );
    const candidateName = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.name
      : '';
    const candidateCompany = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.current_company
      : '';
    const candidateExperience = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.experience
      : '';
    const candidateSalary = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.price
      : '';

    const location = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.currentLocation
      : '';
    const Availibility = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.availability
      : '';
    const profilePhoto = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.profile
      : '';
    const phoneNumber = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.phoneNumber
      : '';
    const email =  this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.email
      : '';
    const id =  this.props.appliedJobData
      ? this.props.appliedJobData.data._id
      : '';
    const loading = this.props.isloading;
    return (
      <div
        className={'job-card'}
        style={{ borderRadius: 4 }}
        style={{ cursor: 'revert' }}
      >
        <div className={'d-flex justify-content-center pt-2'}>
          {loading && <Spin />}
        </div>
        <Row
          style={{
            backgroundColor: 'white',
            height: 130,
            marginTop: 17,
            borderRadius: 6,
            height: '100%',
          }}
        >
          <Col span={3} style={{ height: 120 }}>
            <div
              style={{
                backgroundColor: 'red',
                marginTop: 9,
                width: '70%',
                marginLeft: 25,
                marginRight: 18,
                marginBottom: 28,
                height: '80%',
                borderRadius: 10,
              }}
            >
              <img
                src={
                  profilePhoto
                    ? ImageUrl.imageUrlPath + profilePhoto
                    : process.env.PUBLIC_URL + '/edit-company.png'
                }
                style={{
                  width: '100%',
                  position: 'relative',
                  height: '100%',
                  borderRadius: 4,
                }}
              />
            </div>
          </Col>
          <Col span={15}>
            <Row style={{ width: '100%' }}>
              <Col span={20} style={{ height: 40 }}>
                <p
                  style={{
                    font: 'normal normal 400 26px/43px Gilroy semiBold',
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {' '}
                  {candidateName.charAt(0).toUpperCase() +
                    candidateName.slice(1)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{ height: 40 }}
                className={'input-label-field-custom-type-1'}
              >
                <p
                  style={{
                    paddingTop: 10,
                    paddingBottom: 25,
                    fontSize: 20,
                  }}
                >
                  {' '}
                  {candidateCompany.charAt(0).toUpperCase(0) +
                    candidateCompany.slice(1)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div className="visit_info_card_5">
                  <img src={process.env.PUBLIC_URL + '/location-red.png'} />
                  <p>
                    {location}
                  </p>
                </div>
              </Col>
              <Col span={6}>
                <div className="visit_info_card_5">
                  <p>
                    <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{phoneNumber}
                  </p>
                </div>
              </Col>
              <Col span={6}>
                <div className="visit_info_card_5">
                  <p>
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>&nbsp;&nbsp;{email}
                  </p>
                </div>
              </Col>
              {/*<Col span={24}>
                <div style={{ display: 'flex' }}>
                  <img
                    src={process.env.PUBLIC_URL + '/location-red.png'}
                    style={{ height: '100%', marginTop: 5 }}
                  />
                  <p
                    style={{
                      marginLeft: 8,
                      font: 'normal normal 400 15px/22px Gilroy semiBold',
                    }}
                  >
                    {location}
                  </p>
                </div>
              </Col>*/}
            </Row>
          </Col>

          <Col span={5}></Col>
        </Row>
        <Row>
          <Col lg={10} span={12} sm={12} md={12} style={{ height: 60 }}>
            <ul
              style={{
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                paddingLeft: 25,
                height: '72',
                height: '70%',
              }}
            >
              <li
                style={{
                  paddingRight: 5,
                  borderRight: '1px solid',
                  width: '33%',
                  borderColor: '#e2e4e9',
                }}
              >
                <Row style={{ height: 25 }}>
                  <Col span={24}>
                    <p style={{ fontSize: 19, fontWeight:700 }}>{Availibility}</p>
                  </Col>
                </Row>
                <Row style={{ height: 20 }}>
                  <Col span={24}>
                    <p className={'input-label-field-custom-type-1'}>
                      Availibility
                    </p>
                  </Col>
                </Row>
              </li>
              <li
                style={{
                  paddingRight: 10,
                  borderRight: '1px solid',
                  width: '33%',
                  borderColor: '#e2e4e9',
                }}
              >
                <Row style={{ paddingLeft: 15, height: 25 }}>
                  <Col span={24}>
                    <p
                      style={{ fontSize: 19, fontWeight:700 }}
                    >{`${candidateExperience} years`}</p>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: 15, height: 20 }}>
                  <Col span={24}>
                    <p className={'input-label-field-custom-type-1'}>
                      Experience
                    </p>
                  </Col>
                </Row>
              </li>
              <li
                style={{
                  paddingRight: 10,
                  // borderRight: '1px solid',
                  width: '33%',
                  borderColor: '#e2e4e9',
                }}
              >
                <Row style={{ paddingLeft: 30, height: 25 }}>
                  <Col span={24}>
                    <p style={{  fontSize: 19, fontWeight:700 }}> $ {candidateSalary}</p>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: 30, height: 20 }}>
                  <Col span={24}>
                    <p className={'input-label-field-custom-type-1'}>Salary</p>
                  </Col>
                </Row>
              </li>
            </ul>
          </Col>
          <Col span={11}></Col>
          <Col span={2} className="applied_candidate_status">
            <img
                  src={process.env.PUBLIC_URL + '/'+ this.state.status +'.png'}
                  style={{ width: '100%' }}
                />
                <p className="application_status_card w-100">Job status</p>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appliedJobData: state.jobManagementReducer.appliedJobData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(JobCards);
