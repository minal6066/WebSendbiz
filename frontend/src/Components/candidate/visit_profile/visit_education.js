import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Divider, Button } from 'antd';
import { Row, Col, Input, Image } from 'antd';
import CompanyModal from '../../layout/editCompanyModal';
import { connect } from 'react-redux';
import CoverImage from '../../asset/card.svg';
import moment from 'moment';
const { TextArea } = Input;
const { TabPane } = Tabs;
class CompanyMedia extends Component {
  render() {
    const educationData = this.props.data
      ? this.props.data.data.data.can_qualification
      : '';
    return (
      <div style={{ backgroundColor: 'white'}}>
        {educationData &&
          educationData.map((data) => (
            <>
              <Row style={{ paddingTop: 35 }}>
                <Col span={24}>
                  <p className="visit_education-1">
                    Education Qualification
                  </p>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, sm: 24, md: 8, lg: 0 }}>
                <Col span={4} style={{ paddingLeft: 29, paddingBottom: 25 }}>
                  <img src={CoverImage}
                    className="visit_education-2"/>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={24} style={{ height: 40 }}>
                      <p className="visit_education-3">
                      {data.institute}
                      </p>
                    </Col>
                    <Col span={24} style={{ height: 40 }}>
                      <p className="visit_education-4">
                        {data.degree}
                      </p>
                    </Col>
                    <Col span={24} style={{ height: 40 }}>
                      <p className="visit_education-4">
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
    data: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading,
  };
};
export default connect(mapStateToProps)(CompanyMedia);
