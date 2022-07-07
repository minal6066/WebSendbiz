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
    const jobCategory = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.jobCategory
      : '';
    const skills = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.skills
      : '';
    const bio = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.description
      : '';
    const desiredLocation = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_detail.desiredLocation
      : '';
    const canSocial = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidateData.can_social
      : '';
   
    return (
      <div>
      <div style={{ backgroundColor: 'white' }}>
        <Row className='p-info-head' style={{ marginTop:'0'}}>
          <Col span={24} style={{ paddingTop: 35}}>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/23px Gilroy semiBold',
                color: '#000000',
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Job Category
            </p>
          </Col>
        </Row>
        <Row>
          {jobCategory &&
            jobCategory.map((data) => (
              <Col
                span={'Technology of ins'.length < 10 ? 5 : 8}
                style={{ marginBottom: 12 }}
              >
                <div
                  style={{
                    marginLeft: 34,
                    color: '#EE5050',
                    backgroundColor: '#fdeded',
                    borderRadius: 5,
                    textAlign: 'center',
                    padding: '5px 30px 4px 24px',
                    font: 'normal normal 400 24px/40px Gilroy semiBold',
                  }}
                >
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row className='p-info-head'>
          <Col span={24}>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/23px Gilroy semiBold',
                color: '#000000',
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Skills
            </p>
          </Col>
        </Row>
        <Row>
          {skills &&
            skills.map((data) => (
              <Col
                style={{ marginBottom: 12 }}
                span={'Technology of ins'.length < 10 ? 5 : 8}
              >
                <div
                  style={{
                    marginLeft: 34,
                    color: '#EE5050',
                    backgroundColor: '#fdeded',
                    borderRadius: 5,
                    textAlign: 'center',
                    padding: '5px 30px 4px 24px',
                    font: 'normal normal 400 24px/43px Gilroy semiBold',
                  }}
                >
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row>
          <Col span={24}  className='p-info-head'>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/23px Gilroy semiBold',
                color: '#000000',
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Bio
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <p
              style={{
                color: '#7f7f7f',
                paddingLeft: 34,
                overflowWrap: 'break-word',
                font: 'normal normal 400 16px/43px Gilroy semiBold',
                marginBottom:0,
              }}
            >
              {bio}
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={24} className='p-info-head'>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/23px Gilroy semiBold',
                color: '#000000',
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Desired Locations
            </p>
          </Col>
        </Row>
        <Row>
          {desiredLocation &&
            desiredLocation.map((data) => (
              <Col
                span={'Gurgaon'.length < 10 ? 5 : 8}
                style={{ marginBottom: 12 }}
              >
                <div
                  style={{
                    marginLeft: 34,
                    color: '#EE5050',
                    backgroundColor: '#fdeded',
                    borderRadius: 5,
                    textAlign: 'center',
                    padding: '5px 30px 4px 24px',
                    font: 'normal normal 400 24px/43px Gilroy semiBold',
                  }}
                >
                  {data}
                </div>
              </Col>
            ))}
        </Row>
        <Row  className='p-info-head' style={{marginBottom:'0'}}>
          <Col span={24}>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/43px Gilroy semiBold',
                color: '#000000',
                marginBottom:'0'
              }}
            >
              Social
            </p>
          </Col>
        </Row>
        {canSocial &&
          canSocial.map((data) => (
            <>
              <Row>
                <Col span={24}>
                  <p
                    style={{
                      paddingLeft: 34,
                      font: 'normal normal 400 17px/43px Gilroy semiBold',
                      color: '#000000',
                      textTransform:'capitalize',
                      marginBottom:'0'
                    }}
                  >
                    {data.name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <a
                    style={{
                      paddingLeft: 50,
                      color: '#7f7f7f',
                      font: 'normal normal 400 15px/20px Gilroy semiBold',
                      paddingBottom:'20px'
                    }}
                    href={'#'}
                  >
                    {data.link}
                  </a>
                </Col>
              </Row>
              {/* 
        <Row>
            
          <Col span={24}>
            <p
              style={{
                paddingLeft: 34,
                font: 'normal normal 400 19px/43px Gilroy semiBold',
                color: '#000000',
              }}
            >
            {data.name}
            </p>
          </Col>
        </Row>
       
            <Row>
              <Col span={24}>
                <a
                  style={{
                    paddingLeft: 50,
                    color: '#7f7f7f',
                    font: 'normal normal 400 15px/20px Gilroy semiBold',
                  }}
                  href={'#'}
                >
               {data.link}
                </a>
              </Col>
            </Row>
         <Row>
              <Col span={24}>
                <p
                  style={{
                    paddingLeft: 34,
                    font: 'normal normal 400 19px/43px Gilroy semiBold',
                    color: '#000000',
                  }}
                >
                  Instagram
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <a
                  style={{
                    paddingLeft: 50,
                    color: '#7f7f7f',
                    font: 'normal normal 400 15px/20px Gilroy semiBold',
                  }}
                  href={'#'}
                >
                  http//www.instagram.com/tva9339.4883
                </a>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p
                  style={{
                    paddingLeft: 34,
                    font: 'normal normal 400 19px/43px Gilroy semiBold',
                    color: '#000000',
                  }}
                >
                  Twitter
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <a
                  style={{
                    paddingLeft: 50,
                    color: '#7f7f7f',
                    font: 'normal normal 400 15px/20px Gilroy semiBold',
                  }}
                  href={'#'}
                >
                  http//www.twitter.com/tva9339.4883
                </a>
              </Col>
            </Row> */}
            </>
          ))}
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
