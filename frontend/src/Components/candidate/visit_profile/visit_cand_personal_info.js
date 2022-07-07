import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Divider, Button } from 'antd';
import { Row, Col, Input, Image, Collapse } from 'antd';
import CompanyModal from '../../layout/editCompanyModal';
import { connect } from 'react-redux';
import CoverImage from '../../asset/card.svg';
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
    console.log(this.props.data);
    const candidateData = this.props.data
      ? this.props.data.data.data.can_experience
      : '';
    const candidateSalary = this.props.data
      ? this.props.data.data.data.can_salary
      : '';
    const lastSalary = this.props.data
      ? this.props.data.data.data.can_salary.lastSalary
      : '';
    const minSalary = this.props.data
      ? this.props.data.data.data.can_salary.minSalary
      : '';
    const maxSalary = this.props.data
      ? this.props.data.data.data.can_salary.maxSalary
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
                  <p className="visit_cand_personal_1">
                    Current Position
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }} className="visit_cand_personal_2">
                <Col span={4} style={{ paddingLeft: 29}}>
                  <img src={CoverImage} />
                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={24}>
                      <p className="visit_cand_personal_3">
                        {data.title}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="visit_cand_personal_4">
                        {data.company}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="visit_cand_personal_5">
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
                  <p className="visit_cand_personal_6">
                    Professional Experience
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }} className="visit_cand_personal_7">
                <Col span={4} style={{ paddingLeft: 27, paddingBottom: 25 }}>
                  <img className="visit_cand_personal_8"
                    src={CoverImage}/>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={24}>
                      <p className="visit_cand_personal_3">
                        {data.title} {data.company}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="visit_cand_personal_4">
                        {`from ${moment(data.datefrom).format(
                          'YYYY MMM'
                        )} to ${moment(data.dateto).format('YYYY MMM')}`}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="visit_cand_personal_5">
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
                    <Row className="visit_cand_personal_9">
                      <Col span={12}>
                        <p className="visit_cand_personal_10">
                          Title
                        </p>
                      </Col>
                      <Col span={12}>
                        <p className="visit_cand_personal_10">
                          Employment type
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <p className="visit_cand_personal_11">
                          {/* {currentPosition} */}
                          {data.title}
                        </p>
                      </Col>
                      <Col span={12}>
                        <p className="visit_cand_personal_11">
                          {/* {employeeType} */}
                          {data.employmentType}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p className="visit_cand_personal_10">
                          Description
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p className="visit_cand_personal_12">
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
              <p className="visit_cand_personal_13">
                Salary
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p className="visit_cand_personal_14">
                Last Salary
              </p>
            </Col>

            <Col span={5}>
              <p className="visit_cand_personal_14">
                Salary Payout
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p className="visit_cand_personal_15">
                {`$ ${lastSalary} Per Anum`}
              </p>
            </Col>
            <Col span={5}>
              <p className="visit_cand_personal_15">
                $ 45000 Per Annum
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p className="visit_cand_personal_14">
                Minimum Salary
              </p>
            </Col>

            <Col span={5}>
              <p className="visit_cand_personal_14">
                Maximum Salary
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p className="visit_cand_personal_14">
                {`$ ${minSalary} Per Anum`}
              </p>
            </Col>
            <Col span={5}>
              <p className="visit_cand_personal_15">
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
    data: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading,
  };
};
export default connect(mapStateToProps)(CompanyMedia);
