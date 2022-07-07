import React, { Component } from 'react';
import { Row, Col, Input, Switch, Image, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import './resume.css';

class JobCards extends Component {

  render() {
    console.log(this.props);
    const appliedJobsData = this.props.appliedCandidateData
      ? this.props.appliedCandidateData.data
      : '';
    const loading = this.props.isloading ? this.props.isloading : '';
    const {searchingValue}=this.props
    console.log(loading, 'dddd');
    return (
      <>
        <div className={'d-flex justify-content-center w-100'}>
          {loading && <Spin />}
        </div>
        {(appliedJobsData.length === 0 && appliedJobsData===null)
          ? 'No data found'
          : appliedJobsData &&
            appliedJobsData
              .filter((data) =>
              data.candidate.current_position.startsWith(
                  searchingValue.toLowerCase()
                )
              )
              .map((data) => (
                <div className="resume-card-1" 
                onClick={()=>this.props.history.push
                  ({
                    pathname: "/All_applied_resume",
                    state: { resumeId: data._id },
                  })           
                
                }
                >
                  <Row
                    className={
                      'col-sm-12 jobListingclscard-1 resume-card-2 mt-3 p-0'
                    }
                  >
                    <div
                      className="col-sm-2 resume-custom-col-2 text-center"
                      style={{ padding: '20px 30px' }}
                    >
                      {/*<div style={{backgroundColor:"red",marginTop:11,width:"80%",marginLeft:11,height:"80%",borderRadius:10}}>*/}
                      <Image
                        src={process.env.PUBLIC_URL + '/rectangle.png'}
                      />
                      {/*</div>*/}
                    </div>
                    <div className="col-sm-10 resume-custom-col-10 resume-col-10">
                      <Row>
                        <div className="col-sm-9 col-xs-9 p-0">
                          <p className="resume-card-4">
                            {' '}
                            {data.candidate.current_position}&nbsp;&nbsp;
                            <div className="resume-card-3">
                              <img src={process.env.PUBLIC_URL + '/user.png'} />
                              &nbsp;&nbsp;<span>01</span>
                            </div>
                          </p>
                          <p className="job-card-4">
                            {data.candidate.current_company}
                          </p>
                          <p className="job-card-5">
                            <img
                              src={process.env.PUBLIC_URL + '/location-red.png'}
                            />
                            &nbsp;&nbsp;{data.companyData.contact_info ? data.companyData.contact_info.city:""}, {data.companyData.contact_info ? data.companyData.contact_info.country:""}
                          </p>
                        </div>
                      </Row>
                      <ul className="job-card-6">
                      { data.resume !== '' && data.resume !== null? (
                        <li>
                            <p>
                              <img
                                src={
                                  process.env.PUBLIC_URL + '/page-check-red.png'
                                }
                              />
                              &nbsp;&nbsp;{data.resume}
                            </p>
                          </li>
                        ):null}
                        
                        <li>
                          <p>
                            <img
                              src={
                                process.env.PUBLIC_URL + '/Group 363-red.png'
                              }
                            />
                            &nbsp;&nbsp;{moment(data.applied_for_job?data.applied_for_job.publish_from:"").format('d MMM YY')}
                          </p>
                        </li>
                        <li>
                          <p>
                            <img
                              src={process.env.PUBLIC_URL + '/clock-red.png'}
                            />
                            &nbsp;&nbsp;{' '}
                            {moment(data.applied_for_job?data.applied_for_job.publish_from:"").format('d MMM YY')}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Row>
                </div>
              ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appliedCandidateData: state.jobManagementReducer.appliedCandidateData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(JobCards);
