import React, { Component } from 'react';
import { Row, Col, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { ImageUrl } from '../../Shared/imageUrlPath'
class JobCards extends Component {
  render() {
    console.log(this.props.appliedJobData, 'ddddeeee');
    const candidateName = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.name
      : '';
    const loading = this.props.isloading;
    const appliedAt = this.props.appliedJobData
      ? this.props.appliedJobData.data.applied_at
      : '';
    const status = this.props.appliedJobData 
      ? this.props.appliedJobData.data.status
      :'';
    const link = this.props.appliedJobData 
      ? this.props.appliedJobData.data.candidate.resume
       :'';
    const email = this.props.appliedJobData 
      ? this.props.appliedJobData.data.candidate.email
       :'';
    const image = this.props.appliedJobData 
      ? this.props.appliedJobData.data.candidate.image
       :'';
    return (
      <div className={'job-card'}>
        <div className={'d-flex justify-content-center'}>
          {loading && <Spin />}
        </div>
        <Row className={'col-sm-12 jobListingclscard-1 resume-card-2 mt-3 p-0'}>
          <div className="col-sm-2 all-applied-resume-card-1">
          { image === "" ? (
            <img src={process.env.PUBLIC_URL + '/resume-profile-logo.png'} />
          ):(
            <img className="w-100 rounded-circle" src={ImageUrl.imageUrlPath + image} />
          )}
            
          
          </div>
          <div className="col-sm-10 all-applied-resume-card-7">
            <div className="row">
              <div className="col-sm-9 all-applied-resume-card-10">
                <p className="all-applied-resume-card-2">
                  {candidateName.charAt(0).toUpperCase() +
                    candidateName.slice(1)}
                </p>
                <p className="all-applied-resume-card-3">
                  {email}
                </p>
                <ul className="all-applied-resume-card-8">
                  <li>
                    <a href={ImageUrl.imageUrlPath+"/"+link} className="p-0">
                      <p className="all-applied-resume-card-4">
                        <img src={process.env.PUBLIC_URL + '/link.svg'} />
                        &nbsp;&nbsp;View Resume PDF
                      </p>
                    </a>
                  </li>
                  <li>
                    <p className="all-applied-resume-card-5">
                      <span className="all-applied-resume-card-6">
                        Applied on:
                      </span>
                      &nbsp;&nbsp;{moment(appliedAt).format('d MMM YY')}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-sm-3">
                <img
                  src={process.env.PUBLIC_URL + '/'+ status +'.png'}
                  style={{ width: '100%' }}
                />
                <p className="application_status_card w-100">Job status</p>
              </div>
            </div>
          </div>
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
export default withRouter(connect(mapStateToProps)(JobCards));
