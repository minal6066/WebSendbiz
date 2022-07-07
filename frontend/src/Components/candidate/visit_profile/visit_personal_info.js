import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs, Divider, Button } from 'antd';
import { Row, Col, Input, Image } from 'antd';
import { connect } from 'react-redux';
import CompanyModal from '../../layout/editCompanyModal';
import Footer from '../../footer/footer';
const { TextArea } = Input;
const { TabPane } = Tabs;
class CompanyMedia extends Component {
  state = {
    callAddMedia: false,
  };
  handleClick = () => {
    this.setState({ callAddMedia: true });
  };
  closeModal = () => {
    this.setState({ callAddMedia: false });
  };
  render() {
    // console.log(this.state.callAddMedia);
    let operations = (
      <Button className="add_media_button" onClick={this.handleClick}>
        <img width={'auto'} src={process.env.PUBLIC_URL + '/add-circle.png'} />
        &nbsp;&nbsp; Add media
      </Button>
    );
    if(!this.props.isloading){
      console.log(this.props.data.data.data)
    }
    
    const jobCategory = this.props.data
      ? this.props.data.data.data.can_detail.jobCategory
      : '';
    const skills = this.props.data
      ? this.props.data.data.data.can_detail.skills
      : '';
    const bio = this.props.data
      ? this.props.data.data.data.can_detail.description
      : '';
    const desiredLocation = this.props.data
      ? this.props.data.data.data.can_detail.desiredLocation
      : '';
    const canSocial = this.props.data
      ? this.props.data.data.data.can_social
      : '';
   
    return (
      <div>
      <div style={{ backgroundColor: 'white' }}>
        <Row className='p-info-head' style={{ marginTop:'0'}}>
          <Col span={24} style={{ paddingTop: 35}}>
            <p className="personal-info-1">
              Job Category
            </p>
          </Col>
        </Row>
        <Row>
          {jobCategory &&
            jobCategory.map((data) => (
              <Col span={'Technology of ins'.length < 10 ? 5 : 8} style={{ marginBottom: 12 }}>
                <div className="personal-info-2">
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row className='p-info-head'>
          <Col span={24}>
            <p className="personal-info-3">
              Skills
            </p>
          </Col>
        </Row>
        <Row>
          {skills &&
            skills.map((data) => (
              <Col style={{ marginBottom: 12 }} span={'Technology of ins'.length < 10 ? 5 : 8}>
                <div className="personal-info-2">
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row>
          <Col span={24}  className='p-info-head'>
            <p className="personal-info-3">
              Bio
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <p className="personal-info-4">
              {bio}
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={24} className='p-info-head'>
            <p className="personal-info-3">
              Desired Locations
            </p>
          </Col>
        </Row>
        <Row>
          {desiredLocation &&
            desiredLocation.map((data) => (
              <Col span={'Gurgaon'.length < 10 ? 5 : 8} style={{ marginBottom: 12 }}>
                <div className="personal-info-2">
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row  className='p-info-head' style={{marginBottom:'0'}}>
          <Col span={24}>
            <p className="personal-info-3">
              Social
            </p>
          </Col>
        </Row>
        {canSocial &&
          canSocial.map((data) => (
            <>
              <Row>
                <Col span={24}>
                  <p className="personal-info-5">
                    {data.name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <a className="personal-info-6">
                    {data.link}
                  </a>
                </Col>
              </Row>
            </>
          ))}
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
