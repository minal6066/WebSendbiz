import React, { Component } from 'react';
import { Row, Col, Input, Switch, Spin } from 'antd';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import CoverImage from '../../asset/card.svg';
class Card extends Component {
  render() {
    if(!this.props.isloading){
        console.log(this.props.data.data.data)
    }
    const candidateName = this.props.data
      ? this.props.data.data.data.can_detail.firstName
      : '';
    const candidateCompany = '';
    const candidateExperience = '';
    const candidateSalary = '';

    const phoneNumber = this.props.data
      ? this.props.data.data.data.can_contact.phoneNumber
      : '';
    const email = this.props.data 
      ? this.props.data.data.data.can_detail.email : "";
    const city = this.props.data
      ? this.props.data.data.data.can_contact.city
      : '';
    const state = this.props.data
      ? this.props.data.data.data.can_contact.state
      : '';
    const country = this.props.data
      ? this.props.data.data.data.can_contact.country
      : '';
    const Availibility = '';
    const profilePhoto = this.props.data
      ? this.props.data.data.data.can_detail.profile
      : '';

    const loading = this.props.isloading;
    return (
      <div
        className={'job-card'}
        style={{ borderRadius: 4 }}
        style={{ cursor: 'revert' }}
      >
        <div className='d-flex justify-content-center pt-2'>
          {loading && <Spin />}
        </div>
        <Row className="visit_info_card_1">
          <Col span={3} style={{ height: 120 }}>
            <div className="visit_info_card_2">
              <img
                src={
                  profilePhoto
                    ? ImageUrl.imageUrlPath + profilePhoto
                    : CoverImage
                }
              />
            </div>
          </Col>
          <Col span={15}>
            <Row className="w-100">
              <Col span={20} style={{ height: 40 }}>
                <p className="visit_info_card_3" >
                  {' '}
                  {candidateName.charAt(0).toUpperCase() +
                    candidateName.slice(1)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ height: 40 }} className='input-label-field-custom-type-1'>
                <p className="visit_info_card_4">
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
                    {city.length > 0 ? 
                      <>
                        {city},
                      </>
                     :""}
                     {state.length > 0 ? 
                       <>
                         {state},
                        </>
                      :""}
                      {country.length > 0 ? 
                       <>
                         {country},
                        </>
                      :""}
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
            </Row>
          </Col>
          <Col span={5}></Col>
        </Row>
        <Row>
          <Col lg={10} sm={12} md={12} style={{ height: 60 }}>
            <ul className="visit_info_card_6">
              <li className="visit_info_card_7">
                <Row style={{ height: 25 }}>
                  <Col span={24}>
                    <p>{Availibility}</p>
                  </Col>
                </Row>
                <Row style={{ height: 20 }}>
                  <Col span={24}>
                    <p className='input-label-field-custom-type-1'>
                      Availibility
                    </p>
                  </Col>
                </Row>
              </li>
              <li className="visit_info_card_7">
                <Row style={{ paddingLeft: 15, height: 25 }}>
                  <Col span={24}>
                    <p>{`${candidateExperience} years`}</p>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: 15, height: 20 }}>
                  <Col span={24}>
                    <p className='input-label-field-custom-type-1'>
                      Experience
                    </p>
                  </Col>
                </Row>
              </li>
              <li className="visit_info_card_8">
                <Row style={{ paddingLeft: 30, height: 25 }}>
                  <Col span={24}>
                    <p> $ {candidateSalary}</p>
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
        </Row>
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
export default connect(mapStateToProps)(Card);
