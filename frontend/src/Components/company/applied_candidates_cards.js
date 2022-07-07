import React, { Component } from 'react';
import { Row, Col, Input, Switch,Card,Tag } from 'antd';
import { connect } from 'react-redux';
import { ImageUrl } from '../../Shared/imageUrlPath';
import moment from 'moment';
import AppliedJobStatus from '../layout/applied-job-status'
class JobCards extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.data ? this.props.data : '', 'ssss');
    const appliedData = this.props.candidateData
      ? this.props.candidateData.data
      : '';

    return (
      <div className={'job-card'}>
        {appliedData.length === 0
          ? 'No data found'
          : appliedData &&
            appliedData.map((data) => (
              <>
              {/*<Row
                style={{
                  backgroundColor: 'white',
                  height: 130,
                  marginTop: 17,
                  borderRadius: 6,
                  height: '100%',
                }}
                
              >
                <Col span={4}>
                  <div
                    style={{
                      backgroundColor: 'red',
                      marginTop: 9,
                      width: '80%',
                      marginLeft: 11,
                      height: '80%',
                      borderRadius: 10,
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/edit-company.png'}
                      style={{
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </div>
                </Col>
                <Col span={16}>
                  <Row style={{ width: '100%' }}>
                    <Col span={20} style={{ height: 34 }}>
                      <p
                        style={{
                          font: 'normal normal 400 26px/43px Gilroy semiBold',
                        }}
                        onClick={() =>
                          this.props.history.push({
                            pathname: '/Applied-candidate-info',
                            state: { candidateId: data._id },
                          })
                        }
                      >
                        {' '}
                        {data.candidate.name}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ height: 25 }}>
                      <p>{data.current_position} {moment(data.applied_at).format("d MMM YY")}</p>
            
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div style={{ display: 'flex' }}>
                        <img
                          src={process.env.PUBLIC_URL + '/location-red.png'}
                          style={{ height: '100%', marginTop: 5 }}
                        />
                        <p style={{ marginLeft: 8 }}>
                          {data.applied_for_job.location}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ height: 60 }}>
                      <ul
                        style={{
                          padding: 0,
                          listStyle: 'none',
                          display: 'flex',
                          paddingLeft: 10,
                          height: '72',
                          height: '70%',
                        }}
                      >
                        <li
                          style={{
                            paddingRight: 10,
                            borderRight: '1px solid',
                            width: '25%',
                            borderColor: '#e2e4e9',
                          }}
                        >
                          <Row style={{ height: 25 }}>
                            <Col span={24}>
                              <p>21 yrs</p>
                            </Col>
                          </Row>
                          <Row style={{ height: 20 }}>
                            <Col span={24}>
                              <p className={'input-label-field-custom-type-1'}>
                                Age
                              </p>
                            </Col>
                          </Row>
                        </li>
                        <li
                          style={{
                            paddingRight: 10,
                            borderRight: '1px solid',
                            width: '25%',
                            borderColor: '#e2e4e9',
                          }}
                        >
                          <Row style={{ paddingLeft: 15, height: 25 }}>
                            <p>Immediate</p>
                          </Row>
                          <Row style={{ paddingLeft: 15, height: 20 }}>
                            <p className={'input-label-field-custom-type-1'}>
                              Availibility
                            </p>
                          </Row>
                        </li>
                        <li
                          style={{
                            paddingRight: 10,
                            borderRight: '1px solid',
                            width: '25%',
                            borderColor: '#e2e4e9',
                          }}
                        >
                          <Row style={{ paddingLeft: 15, height: 25 }}>
                            <p>{`$${data.candidate.price}`}</p>
                          </Row>
                          <Row style={{ paddingLeft: 15, height: 20 }}>
                            <p className={'input-label-field-custom-type-1'}>
                              Salary
                            </p>
                          </Row>
                        </li>
                        <li
                          style={{
                            paddingRight: 10,
                            width: '25%',
                            borderColor: '#e2e4e9',
                          }}
                        >
                          <Row style={{ width:"300px", paddingLeft: 15, height: 25 }}>
                            <Col span={24} >
                              <p>{data.applied_for_job.title}</p>
                            </Col>
                          </Row>
                          <Row style={{ paddingLeft: 15, height: 20 }}>
                            <p className={'input-label-field-custom-type-1'}>
                              Job
                            </p>
                          </Row>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{paddingRight:40}}>
                  <AppliedJobStatus status={data.status} job_id={data._id} />
                </Col>
              </Row>*/}
              <Card className="services-card">
                <Row>
                  <Col span={4}>
                    <img
                      alt="example"
                      src={
                        data.job_logo
                          ? ImageUrl.imageUrlPath + data.job_logo
                          : process.env.PUBLIC_URL + '/Rectangle.png'
                      }
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Col>
                  <Col span={16} className="service-detail-row" style={{ paddingLeft: '20px' }}>
                    <Row justify="space-between">
                      <Col span={17}>
                        <div className="service-name"
                          onClick={() =>
                            this.props.history.push({
                              pathname: '/Applied-candidate-info',
                              state: { candidateId: data._id,status:data.status },
                            })
                          }
                          >
                          {' '}
                          {data.candidate.name}
                        </div>
                        <p className="ac-position m-0">{data.candidate.current_position}-{moment(data.applied_at).format("DD MMM YY")}</p>
                      </Col>
                      <Col span={7} className="icon-col">
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18}>
                          <img
                              src={
                                process.env.PUBLIC_URL + '/location-red.png'
                              }
                              style={{ width: 14 }}
                            />
                        <span className="service-s-desc" style={{paddingLeft:'8px', verticalAlign:'middle'}}>
                            {data.applied_for_job.location}</span>
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '20px' }}>
                      <Col span={4}>
                        <div className="ac-card-list-item w-100 ac-card-list-border">
                          <Row>
                              <p className="ac-position w-100 m-0">21 yrs</p>
                          </Row>
                          <Row>
                              <p className={'input-label-field-custom-type-1 m-0'}>
                                Age
                              </p>
                          </Row>
                        </div>
                      </Col>
                      <Col span={7} align="middle">
                        <div className="ac-card-list-item w-100 ac-card-list-border">
                          <Row>
                            <p className="ac-position w-100 m-0">Immediate</p>
                          </Row>
                          <Row>
                            <p className={'w-100 input-label-field-custom-type-1 m-0'}>
                              Availibility
                            </p>
                          </Row>
                        </div>
                      </Col>
                      <Col span={7} align="middle">
                        <div className="ac-card-list-item w-100 ac-card-list-border">
                          <Row>
                            <p className="ac-position w-100 m-0">{'$'+`${data.candidate.price}`}</p>
                          </Row>
                          <Row>
                            <p className={'w-100 input-label-field-custom-type-1 m-0'}>
                              Salary
                            </p>
                          </Row>
                        </div>
                      </Col>
                      <Col span={6} align="middle">
                        <div className="ac-card-list-item w-100">
                          <Row>
                                <p className="ac-position w-100 m-0">{data.applied_for_job.title}</p>
                            </Row>
                            <Row>
                              <p className={'w-100 input-label-field-custom-type-1 m-0'}>
                                Job
                              </p>
                            </Row>
                          </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={4}>
                    <AppliedJobStatus status={data.status} job_id={data._id} />
                  </Col>
                </Row>
              </Card>
              </>
            ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    candidateData: state.jobManagementReducer.candidateData,
   // candidateData: state,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(JobCards);
