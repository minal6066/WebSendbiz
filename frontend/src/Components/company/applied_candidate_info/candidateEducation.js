import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Divider, Button } from 'antd';
import { Row, Col, Input, Image } from 'antd';
import CompanyModal from '../../layout/editCompanyModal';
import { connect } from 'react-redux';
import moment from 'moment';
const { TextArea } = Input;
const { TabPane } = Tabs;
class CompanyMedia extends Component {
  render() {
    const educationData = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_qualification
      : '';
    return (
      <div style={{ backgroundColor: 'white'}}>
        {educationData &&
          educationData.map((data) => (
            <>
              <Row style={{ paddingTop: 35 }}>
                <Col span={24}>
                  <p
                    style={{
                      paddingLeft: 34,
                      font: 'normal normal 400 19px/43px Gilroy semiBold',
                      color: '#000000',
                    }}
                  >
                    Education Qualification
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }}>
                <Col span={4} style={{ paddingLeft: 29, paddingBottom: 25 }}>
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
                    <Col span={24} style={{ height: 40 }}>
                      <p
                        style={{
                          font: 'normal normal 400 30px/43px Gilroy semiBold',
                        }}
                      >
                      {data.institute}
                      </p>
                    </Col>
                    <Col span={24} style={{ height: 40 }}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px/43px Gilroy semiBold',
                        }}
                      >
                        {data.degree}
                      </p>
                    </Col>
                    <Col span={24} style={{ height: 40 }}>
                      <p
                        style={{
                          color: '#7f7f7f',
                          font: 'normal normal 400 21px/43px Gilroy semiBold',
                        }}
                      >
                    {moment(data.from).format("YYYY")} to {moment(data.to).format("YYYY")}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ))}
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
