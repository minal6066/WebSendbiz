import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Pagination,
  Select,
  Card,
  Tag,
  Button,
  message,
  Carousel,
  Image,
  Popconfirm,
} from 'antd';
import {
  FacebookFilled,
  LeftOutlined,
  LinkedinFilled,
  TwitterCircleFilled,
  BookFilled,
  HistoryOutlined,
  EnvironmentFilled,
  MoneyCollectFilled,
  ClockCircleFilled,
  HourglassFilled,
  BookOutlined,
} from '@ant-design/icons';
import '../topNav.css';
import './ServiceDetail.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import NewsComp from './news_comp';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import moment from 'moment';
import logo from '../../../Components/asset/Group 314.svg';

const { Search } = Input;
const { Option } = Select;

class ServiceDetail extends Component {
  state = {
    loading: true,
    isIntersted: '',
    isLoading: false,
  };

  componentDidMount() {
    const id = this.props.location.id;
    var ls = require('local-storage');
    var serviceId = ls.get('serviceId');
    this.setState({ isLoading: true });
    APIManager.getOneService(serviceId).then((resp) => {
      if (resp.status === 200)
        this.setState({
          isIntersted: resp.data.isInterested,
          isLoading: false,
        });
    });
    if (this.props.location.service_obj) this.setState({ loading: false });
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  saveAsIntersted = () => {
    var ls = require('local-storage');
    var serviceId = ls.get('serviceId');
    const param = {
      interestId: serviceId,
    };
    const category = 'service';
    this.setState({
      isLoading: true,
    });
    APIManager.createInterested(category, param)
      .then((resp) => {
        console.log(resp.data.isSuccess);
        if (resp.data.isSuccess) {
          this.setState({
            isIntersted: resp.data.message,
            isLoading: false,
          });
          if (resp.data.message) {
            message.success('Added to interested !');
          } else {
            message.warn('Removed from interested !');
          }
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        message.error('Something went wrong!');
      });
  };
  render() {
    console.log('props:', this.state.isIntersted);
    const name = this.props.oneservicedata
      ? this.props.oneservicedata.data.name
      : '';
    const companyName = this.props.oneservicedata
      ? this.props.oneservicedata.data.companyData.comp_info.comp_name
      : '';
    const shortDescription = this.props.oneservicedata
      ? this.props.oneservicedata.data.shortDescription
      : '';
    const fullDescription = this.props.oneservicedata
      ? this.props.oneservicedata.data.fullDescription
      : '';
    const category = this.props.oneservicedata
      ? this.props.oneservicedata.data.category
      : '';
    const price = this.props.oneservicedata
      ? this.props.oneservicedata.data.price.amount
      : '';
    const duration = this.props.oneservicedata
      ? this.props.oneservicedata.data.duration
      : '';
    const period = this.props.oneservicedata
      ? this.props.oneservicedata.data.period
      : '';
    const location = this.props.oneservicedata
      ? this.props.oneservicedata.data.location
      : '';
    const pricingPlan = this.props.oneservicedata
      ? this.props.oneservicedata.data.pricingPlan
      : '';
    const experience = this.props.oneservicedata
      ? this.props.oneservicedata.data.experience
      : '';
    const deliveryTime = this.props.oneservicedata
      ? this.props.oneservicedata.data.deliveryTime
      : '';
    const socialLinks = this.props.oneservicedata
      ? this.props.oneservicedata.data.socialLinks
      : [];
    const loading = this.props.isloading;
    const imagePath = this.props.oneservicedata
      ? this.props.oneservicedata.data.media
      : '';

    return (
      <>
        {this.state.isLoading || loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          ''
        )}
        <div className="detail-outer-div">
          <div
            style={{ paddingBottom: '16px' }}
            onClick={() => {
              this.props.history.push('/services');
            }}
          >
            <LeftOutlined className="back-icon" />
            <span className="back-btn">Go back</span>
          </div>
          <Row gutter={32}>
            <Col span={8}>
              <Card bordered={false} className="s-detail-left-card">
                <Carousel
                  afterChange={this.onChange}
                  className="event-carousel"
                  autoplay
                >
                  {imagePath &&
                    imagePath.map((data) => (
                      <div>
                        <Image
                          src={data.filePath ? data.filePath : logo}
                          alt="event"
                          className="event-carousel-img"
                          width={'100%'}
                          height={300}
                        ></Image>
                      </div>
                    ))}
                </Carousel>
                {/* <img
                  alt="example"
                  src={
                    this.props.oneservicedata &&
                    this.props.oneservicedata.data.media[0]
                      ? ImageUrl.imageUrlPath +
                        this.props.oneservicedata.data.media[0].fileName
                      : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                  }
                  style={{ width: '100%', height: '213px' }}
                  className="service-d-img"
                /> */}
                <h4 className="s-detail-name">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h4>
                <p className="s-detail-comp-name">{companyName}</p>
                <p className="s-detail-short-desc">{shortDescription}</p>
                {category &&
                  category.map((cat) => (
                    <Tag color="volcano" className="s-price-tag">
                      {cat}
                    </Tag>
                  ))}
                <div>
                  <Row gutter={16} style={{ margin: '40px 0 28px' }}>
                    <Col
                      span={8}
                      style={{ borderRight: 'solid 1px #6c7a8f20' }}
                    >
                      <p className="s-detail-val">${price}</p>
                      <p className="s-detail-attr">Price</p>
                    </Col>
                    <Col
                      span={8}
                      style={{
                        borderRight: 'solid 1px #6c7a8f20',
                        textAlign: 'center',
                      }}
                    >
                      <p className="s-detail-val">{duration}</p>
                      <p className="s-detail-attr">Duration</p>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <p className="s-detail-val">{period}</p>
                      <p className="s-detail-attr">Period</p>
                    </Col>
                  </Row>
                </div>
                {socialLinks &&
                  socialLinks.map((data) => (
                    <div>
                      <a href={data.link}>
                        <FacebookFilled
                          style={{
                            fontSize: '30px',
                            marginRight: '17px',
                            cursor: 'pointer',
                          }}
                        />
                      </a>
                      <LinkedinFilled
                        style={{
                          fontSize: '30px',
                          marginRight: '17px',
                          cursor: 'pointer',
                        }}
                      />
                      <TwitterCircleFilled
                        style={{
                          fontSize: '30px',
                          marginRight: '17px',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  ))}
                <div style={{ marginTop: '27px' }}>
                  <Button className="send-msg-btn">Send a Message</Button>
                  <div className="bookmark-div" onClick={this.saveAsIntersted}>
                    {this.state.isIntersted ? (
                      // <BookFilled
                      //   style={{ fontSize: '30px', cursor: 'pointer' }}
                      // />
                      <div style={{ fontWeight: '600', cursor: 'pointer' }}>
                        Interested
                      </div>
                    ) : (
                      //   <BookOutlined
                      //     style={{ fontSize: '30px', cursor: 'pointer' }}
                      //   />
                      //       <div>Interested</div>
                      // )

                      <div style={{ fontWeight: '600', cursor: 'pointer' }}>
                        Interested
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="s-detail-r-card" bordered={false}>
                <h4 className="r-card-head">About the service</h4>
                <p className="r-card-text">{fullDescription}</p>
                <h4 className="r-card-head" style={{ padding: '20px 0 0' }}>
                  Service Information
                </h4>
                <Row gutter={16}>
                  <Col span={9}>
                    <p className="s-detail-attr">Location of Intervetion</p>
                    <EnvironmentFilled className="p-detail-icons" />
                    <span className="s-detail-val">{location}</span>
                  </Col>
                  <Col span={8}>
                    <p className="s-detail-attr">Duration</p>
                    <HistoryOutlined className="p-detail-icons" />{' '}
                    <span className="s-detail-val">{duration}</span>
                  </Col>
                  <Col span={7}>
                    <p className="s-detail-attr">Pricing Plan</p>
                    <MoneyCollectFilled className="p-detail-icons" />
                    <span className="s-detail-val">{pricingPlan}</span>
                  </Col>
                  <Col span={9}>
                    <p className="s-detail-attr">Delivery Time</p>
                    <ClockCircleFilled className="p-detail-icons" />
                    <span className="s-detail-val">
                      {moment(deliveryTime).format('d MMM YYYY')}
                    </span>
                  </Col>
                  <Col span={8}>
                    <p className="s-detail-attr">Experience</p>
                    <HourglassFilled className="p-detail-icons" />
                    <span className="s-detail-val">{experience}</span>
                  </Col>
                </Row>
                {/* <img src={process.env.PUBLIC_URL + "/facebook.png"} style={{fontSize:'30px',marginRight:'17px',cursor:'pointer'}}/>
                  <img src={process.env.PUBLIC_URL + "/linkedin.png"} style={{fontSize:'30px',marginRight:'17px',cursor:'pointer'}}/>
                  <img src={process.env.PUBLIC_URL + "/twitter.png"} style={{fontSize:'30px',marginRight:'17px',cursor:'pointer'}}/> */}
                {/* <div style={{marginTop:'27px'}}>
                    <Button className='send-msg-btn'>Send a Message</Button>
                    <div className='bookmark-div'><BookFilled style={{fontSize:'30px',cursor:'pointer'}}/></div>
                  </div> */}
              </Card>
            </Col>
          </Row>
        </div>
        <NewsComp />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    oneservicedata: state.ServiceReducer.oneservicedata,
    isloading: state.ServiceReducer.isloading,
  };
};
export default connect(mapStateToProps)(ServiceDetail);
