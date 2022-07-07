import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Pagination,
  Tag,
  message,
  Spin,
  Popconfirm,
} from 'antd';
import './servicescard.css';
import {
  DeleteFilled,
  EnvironmentFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import logo from '../../../Components/asset/Group 314.svg';
import { withRouter } from 'react-router-dom';
import cardDefaultPic from '../../../Components/asset/card.svg';
import { fileUrl } from '../../../Shared/imageUrlPath';

const numEachPage = 2;

class Services extends Component {
  state = {
    minValue: 0,
    maxValue: 2,
    data: [],
    isloading: false,
  };

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }
  //check channel if exists or not
  checkChannelExist = (id) => {
    APIManager.checkChannel(id).then((resp) =>
      console.log(resp, 'resonse of channel')
    );
  };
  deleteService = () => {
    const id = this.state.deleteServiceId;
    APIManager.deleteIntersted(id)
      .then((resp) => {
        if (resp.data.isSuccess) {
          message.info(resp.data.message);
          this.makeHttpRequestWithPage(this.state.current_page);
        }
      })
      .catch((err) => {
        message.error('Something went wrong.');
      });
  };
  makeHttpRequestWithPage = async (pageNumber) => {
    const category = 'service';
    this.setState({ isloading: true });
    APIManager.getInterstedList(pageNumber, category)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data, 'resp');
          this.setState({
            data: resp.data.data,
            total: resp.data.totalCount,
            //   per_page: resp.data.results,
            current_page: resp.data.currentPage,
            isloading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ isloading: false });
        message.error('Something went wrong!');
      });
  };
  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };
  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };
  renderb = (e, data) => {
    console.log(e, data);
  };
  render() {
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / 10); i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map((number) => {
        // let classes = this.state.currentPage === number ? .active : '';
        return (
          <span
            key={number}
            onClick={() => this.makeHttpRequestWithPage(number)}
            className={
              this.state.current_page === number
                ? 'page-number-btn'
                : 'pagination-container'
            }
          >
            {number}
          </span>
        );
      });
    }
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    console.log('props:', this.props);
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {this.state.isloading && <Spin />}
        </div>
        {this.state.data.length === 0
          ? 'No data found!'
          : this.state.data &&
            this.state.data.map((data) => (
              <Card
                className="services-card"
                // onClick={(e)=>this.renderb(e,data)}
              >
                <Row>
                  <Col span={3}>
                    <img
                      alt="example"
                      // src={
                      //   data.interestId.media.length !== 0 &&
                      //   data.interestId.media[0].fileName !== ''
                      //     ? fileUrl.fileUrlPath + data.media[0].fileName
                      //     : cardDefaultPic
                      // }
                      // src={
                      //   data.interestId.media
                      //     ? fileUrl.fileUrlPath +
                      //       data.interestId.media[0].fileName
                      //     : cardDefaultPic
                      // }
                      style={{ width: '100%', height: '80px' }}
                    />
                  </Col>
                  <Col
                    span={21}
                    style={{ paddingLeft: '20px' }}
                    className="service-detail-row"
                  >
                    <Row justify="space-between">
                      <Col span={20}>
                        <div
                          className="service-name"
                          onClick={() => {
                            var ls = require('local-storage');
                            ls.set('serviceId', data.interestId._id);
                            this.props.history.push({
                              pathname: '/services/detail',
                              serviceId: data.interestId._id,
                            });
                          }}
                        >
                          {data.userId.companyData.comp_info.comp_name}
                        </div>
                      </Col>
                      <Col span={4} className="icon-col">
                        <div
                          onClick={() => {
                            var ls = require('local-storage');
                            ls.set('chatUserId', data.userId._id);
                            this.checkChannelExist(data.userId._id);
                            this.props.history.push({
                              pathname: '/company-mailbox',
                              userInfo: data,
                            });
                          }}
                        >
                          <img
                            src={process.env.PUBLIC_URL + '/location-red.png'}
                          />
                          <img
                            src={process.env.PUBLIC_URL + '/mailbox_red.png'}
                            className="service-hidden-icons  service-icons"
                            style={{ height: 18 }}
                          />
                        </div>
                        <Popconfirm
                          title="Are you sure to delete this service?"
                          onConfirm={() => {
                            this.setState(
                              { deleteServiceId: data._id },
                              this.deleteService
                            );
                          }}
                          onCancel={this.cancelDelete}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteFilled className="service-hidden-icons service-icons" />
                        </Popconfirm>
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '20px' }}>
                      <Col
                        span={12}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.interestId.companyData.comp_info.comp_name}
                        </div>
                      </Col>
                      {/* <Col
                        span={12}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <img
                          src={process.env.PUBLIC_URL + '/chat_int.png'}
                          className="service-icons chat-icon"
                        />
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.person}
                        </div>
                        <div
                          style={{
                            color: '#EE5050',
                            fontWeight: 700,
                            marginLeft: 10,
                          }}
                        >
                          [{data.position}]
                        </div>
                      </Col> */}
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
        <div className={'d-flex justify-content-end pt-2'}>
          <span
            className={
              this.state.current_page === 1 ? 'pagination-side-btn' : ''
            }
            onClick={() => this.makeHttpRequestWithPage(1)}
          >
            {' '}
            <LeftOutlined />{' '}
          </span>
          <div>{renderPageNumbers}</div>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>
            <RightOutlined />
          </span>
        </div>
      </>
    );
  }
}

export default withRouter(Services);
