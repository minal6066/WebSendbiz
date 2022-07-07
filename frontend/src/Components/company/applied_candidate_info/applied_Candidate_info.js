import React, { Component } from 'react';
import { Row, Col, Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Box from '../../candidate/box';
import Header from '../../header/header'
import Footer from '../../footer/footer';
import Card1 from './applied_candidate_info1';
import AllTabs from '../../layout/tabsComponent';
import CompanyInfo from '../company_info_component.js';
import PesonalInfo from './personalInfo';
import ContactInfo from '../company_contact_info_component.js';
import CompanyMedia from '../company_media_component.js';
import CandidateEducation from './candidateEducation';
import CanidateProfessionalInfo from './candidateProfesionalInfo';
import { connect } from 'react-redux';

class Job extends Component {
    render() {
        const tabs = [
            { tabname: 'PERSONAL INFO', comp: <PesonalInfo /> },
            { tabname: 'PROFESSIONAL INFO', comp: <CanidateProfessionalInfo /> },
            { tabname: 'EDUCATION', comp: <CandidateEducation /> },
        ];
        const id=this.props.location.state.candidateId;
        const status = this.props.location.state.status;
    console.log(this.props,'lllllllllll');
    const cover = this.props.appliedJobData
    ? this.props.appliedJobData.data.companyData.coverImage.path
    : '';
    return (
      <div>
        <Header />
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <img
                  src={cover?cover:process.env.PUBLIC_URL + '/edit-company.png'}
                  style={{ width: '100%', position: 'relative' }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={20}>
                <div
                  className={'candidate-info-card-1'}
                  style={{ borderRadius: 10, paddingBottom: 10 }}
                >
                  <Card1 id={id} status={status} />
                  <div style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div
                      style={{
                        backgroundColor: '#F4F6F9',
                        // height: 50,
                        // paddingTop: 10,
                        borderTop: '2px solid',
                        borderTopColor: '#e7ebf3',
                      }}
                    >
                      <AllTabs
                        company_tabs={tabs}
                        class={'candidat-profile-info-tab'}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={2}></Col>
            </Row>
          </Col>
        </Row>
          {/* <div className="space-issues"> */}
            <Footer />
          {/* </div> */}
        
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
export default connect(mapStateToProps)(Job);
