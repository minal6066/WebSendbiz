import React, { Component } from 'react';
import { Row, Col, Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Card from './visit_info_card';
import AllTabs from '../../layout/tabsComponent';
// import CompanyInfo from '../company/company_info_component';
import PesonalInfo from './visit_personal_info';
// import ContactInfo from '../company/company_contact_info_component';
// import CompanyMedia from '../company/company_media_component.js';
import CandidateEducation from './visit_education';
import CanidateProfessionalInfo from './visit_cand_personal_info';
import { connect } from 'react-redux';
import CoverImage from '../../asset/card.svg';
import './visit_profile.css'

class VisitCandidate extends Component {
    render() {
      const tabs = [
            { tabname: 'PERSONAL INFO', comp: <PesonalInfo /> },
            { tabname: 'PROFESSIONAL INFO', comp: <CanidateProfessionalInfo /> },
            { tabname: 'EDUCATION', comp: <CandidateEducation /> },
      ];
      console.log(this.props,'lllllllllll');
      if(!this.props.isloading){
        console.log(this.props.data.data.data)
      }
      const cover = this.props.appliedJobData
      ? this.props.appliedJobData.data.companyData.coverImage.path
      : '';
      const logo = this.props.data ? this.props.data.data.data.can_detail.profile : "";
    return (
      <div>
        <Header />
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <img
                  src={cover?cover:process.env.PUBLIC_URL + '/edit-company.png'}
                  style={{ width: '100%', position: 'relative',height:"400px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={20}>
                <div className='candidate-info-card-1' style={{ borderRadius: 10, paddingBottom: 10 }}>
                  <Card/>
                  <div style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div className="visit_candidate_1">
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
    data: state.companyInfoReducer.data,
    isloading: state.companyInfoReducer.isloading,
  };
};
export default connect(mapStateToProps)(VisitCandidate);
