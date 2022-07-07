import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Divider, Button } from 'antd';
import { Row, Col, Input, Image, Collapse } from 'antd';
import CompanyModal from '../../layout/editCompanyModal';
import { connect } from 'react-redux';
import moment from 'moment';

const { TextArea } = Input;
const { TabPane } = Tabs;
const Panel = Collapse.Panel;
class CompanyMedia extends Component {
  state = {
    isOpen: false,
  };

  changeOpen = () => {
    let val = this.state.isOpen;
    this.setState({ isOpen: !val });
    console.log('llllllll');
  };

  render() {
    console.log(this.state.isOpen);
    const candidateData = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_experience
      : '';
    const candidateSalary = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_salary
      : '';
    const lastSalary = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_salary.lastSalary
      : '';
    const minSalary = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_salary.minSalary
      : '';
    const maxSalary = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_salary.maxSalary
      : '';
    return (
      <div style={{ backgroundColor: 'white', paddingBottom: 20 }}>

        {/* Current Company */}
        {candidateData &&
           candidateData.map((data) => (
            <>{data.isCurrentlyWorking ? 
              <>
              <Row style={{ paddingTop: 35 }}>
                <Col span={24}>
                  <p
                    style={{
                      paddingLeft: 34,
                      font: 'normal normal 400 19px/43px Gilroy semiBold',
                      color: '#000000',
                      marginBottom:'0'
                    }}
                  >
                    Current Position
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }}
                style={{
                  paddingTop: 10,
                  // backgroundColor: '#f4f6f9',
                  borderRadius: 10,
                  marginLeft: 5,
                  marginRight: 32,
                }}
              >
                <Col span={4} style={{ paddingLeft: 29}}>
                  <img
                    src={process.env.PUBLIC_URL + '/edit-company.png'}
                    style={{
                      width: 117,
                      position: 'relative',
                      height: 118,
                      borderRadius: 10,
                    }}
                  />
                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={24}>
                      <p
                        style={{
                          font: 'normal normal 400 30px/43px Gilroy semiBold',
                          marginBottom:'3px'
                        }}
                      >
                        {data.title}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px Gilroy semiBold',
                          marginBottom:'5px'
                        }}
                      >
                        {data.company}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px Gilroy semiBold',
                        }}
                      >
                        {data.location}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              </>
              :''}
              </>))}


            {/* Past Experiences */}
              {candidateData &&
              candidateData.map((data) => (
                <>{!data.isCurrentlyWorking ? 
              <>
              <Row>
                <Col span={24} style={{marginTop:'30px'}}>
                  <p
                    style={{
                      paddingLeft: 34,
                      font: 'normal normal 400 19px/43px Gilroy semiBold',
                      color: '#000000',
                    }}
                  >
                    Professional Experience
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }}
                style={{
                  paddingTop: 20,
                  backgroundColor: '#f4f6f9',
                  borderRadius: 10,
                  marginLeft: 32,
                  marginRight: 32,
                }}
              >
                <Col span={4} style={{ paddingLeft: 27, paddingBottom: 25 }}>
                  <img
                    src={process.env.PUBLIC_URL + '/edit-company.png'}
                    style={{
                      width: 117,
                      position: 'relative',
                      height: 118,
                      borderRadius: 10,
                    }}
                  />
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={24}>
                      <p
                        style={{
                          font: 'normal normal 400 30px/43px Gilroy semiBold',
                          marginBottom:'3px'
                        }}
                      >
                        {data.title} {data.company}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px Gilroy semiBold',
                          marginBottom:'5px'
                        }}
                      >
                        {`from ${moment(data.datefrom).format(
                          'YYYY MMM'
                        )} to ${moment(data.dateto).format('YYYY MMM')}`}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px Gilroy semiBold',
                        }}
                      >
                        {data.location}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="colapsable">
                <Collapse
                  defaultActiveKey={this.state.isOpen}
                  onChange={this.changeOpen}
                >
                  <Panel
                    header={this.state.isOpen ? 'Hide' : 'View More'}
                    key="1"
                  >
                    <Row
                      style={{
                        // paddingTop: 10,
                        backgroundColor: '#f4f6f9',
                        borderRadius: 10,
                        marginLeft: 32,
                        marginRight: 32,
                        marginTop: -14,
                      }}
                    >
                      <Col span={12}>
                        <p
                          style={{
                            color: '#7f7f7f',
                            font: 'normal normal 400 15px Gilroy semiBold',
                            marginBottom:'15px'
                          }}
                        >
                          Title
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            paddingLeft: 32,
                            color: '#7f7f7f',
                            font: 'normal normal 400 15px Gilroy semiBold',
                            marginBottom:'15px'
                          }}
                        >
                          Employment type
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <p
                          style={{
                            paddingLeft: 32,
                            font: 'normal normal 400 19px Gilroy semiBold',
                            marginBottom:'30px'
                          }}
                        >
                          {/* {currentPosition} */}
                          {data.title}
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            paddingLeft: 32,
                            font: 'normal normal 400 19px Gilroy semiBold',
                            marginBottom:'30px'
                          }}
                        >
                          {/* {employeeType} */}
                          {data.employmentType}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p
                          style={{
                            paddingLeft: 32,
                            color: '#7f7f7f',
                            font: 'normal normal 400 15px Gilroy semiBold',
                            marginBottom:'15px'
                          }}
                        >
                          Description
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p
                          style={{
                            paddingBottom: 45,
                            marginLeft: 32,
                            font: 'normal normal 400 17px Gilroy semiBold',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {data.description}
                        </p>
                      </Col>
                      {/* <Col span={24}><p style={{color:'red',font: "normal normal 400 13px/23px Gilroy semiBold",textAlign:"end",cursor:'pointer'}} onClick={this.changeOpen}>Hide</p></Col> */}
                    </Row>
                  </Panel>
                </Collapse>
              </div>
            </>
            :''}
            </>
          ))}


        <div>
          <Row>
            <Col span={24}>
              <p
                style={{
                  paddingLeft: 32,
                  marginTop: 32,
                  font: 'normal normal 400 19px/23px Gilroy semiBold',
                }}
              >
                Salary
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p
                style={{
                  color: '#7f7f7f',
                  marginLeft: 32,
                  font: 'normal normal 400 16px/23px Gilroy semiBold',
                  marginBottom:'15px',
                }}
              >
                Last Salary
              </p>
            </Col>

            <Col span={5}>
              <p
                style={{
                  color: '#7f7f7f',
                  marginLeft: 32,
                  font: 'normal normal 400 16px/23px Gilroy semiBold',
                  marginBottom:'15px',
                }}
              >
                Salary Payout
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p
                style={{
                  marginLeft: 32,
                  font: 'normal normal 400 17px/23px Gilroy semiBold',
                  marginBottom:'20px',
                }}
              >
                {`$ ${lastSalary} Per Anum`}
              </p>
            </Col>
            <Col span={5}>
              <p
                style={{
                  marginLeft: 32,
                  font: 'normal normal 400 17px/23px Gilroy semiBold',
                  marginBottom:'20px',
                }}
              >
                $ 45000 Per Annum
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p
                style={{
                  color: '#7f7f7f',
                  marginLeft: 32,
                  font: 'normal normal 400 16px/23px Gilroy semiBold',
                  marginBottom:'15px',
                }}
              >
                Minimum Salary
              </p>
            </Col>

            <Col span={5}>
              <p
                style={{
                  color: '#7f7f7f',
                  marginLeft: 32,
                  font: 'normal normal 400 16px/23px Gilroy semiBold',
                  marginBottom:'15px',
                }}
              >
                Maximum Salary
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p
                style={{
                  marginLeft: 32,
                  font: 'normal normal 400 17px/23px Gilroy semiBold',
                  marginBottom:'20px',
                }}
              >
                {`$ ${minSalary} Per Anum`}
              </p>
            </Col>
            <Col span={5}>
              <p
                style={{
                  marginLeft: 32,
                  font: 'normal normal 400 17px/23px Gilroy semiBold',
                  marginBottom:'20px',
                }}
              >
                {`$ ${maxSalary} Per Annum`}
              </p>
            </Col>
          </Row>
        </div>
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
export default connect(mapStateToProps)(CompanyMedia);
