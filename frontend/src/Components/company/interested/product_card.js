import React, { Component } from 'react';
import { Row, Col, Card, Pagination, Tag, message } from 'antd';
import './servicescard.css';
import { DeleteFilled, EnvironmentFilled } from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import userDefaultPic from '../../../Components/asset/user.svg';
import { fileUrl } from '../../../Shared/imageUrlPath';
import {withRouter} from 'react-router-dom';

class Product extends Component {
  state = {
    data: [],
    total: '',
    current_page: '',
    isloading: false,
  };
  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }
  makeHttpRequestWithPage = async (pageNumber) => {
    const category = 'product';
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
    //check channel if exists or not
    checkChannelExist = (id) => {
      APIManager.checkChannel(id).then((resp) =>
        console.log(resp, 'resonse of channel')
      );
    };

  render() {
    const { data } = this.state;
    return (
      <>
        {data.map((data) => (
          <Card
            className="services-card"
            // onClick={(e)=>this.renderb(e,data)}
          >
            <Row>
              <Col span={3}>
                <img
                  alt="example"
                  src={
                    (data.userType === 3
                      ? fileUrl.fileUrlPath + data.userId.subUserData.user_image
                      : userDefaultPic) ||
                    (data.userType === 2
                      ? fileUrl.fileUrlPath + data.userId.companyData.logo.name
                      : userDefaultPic)
                  }
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
                    <div className="service-name product-name">
                      {(data.userType === 3
                        ? data.userId.subUserData.first_name
                        : '') ||
                        (data.userType === 2
                          ? data.userId.companyData.comp_info.comp_name
                          : '') ||
                        (data.userType === 1
                          ? data.userId.candidateData.can_detail.firstName
                          : '')}
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
                        src={process.env.PUBLIC_URL + '/mailbox_red.png'}
                        className="service-hidden-icons  service-icons"
                        style={{ height: 18 }}
                      />
                    </div>
                    <DeleteFilled className="service-hidden-icons service-icons" />
                  </Col>
                </Row>
                <Row align="bottom" style={{ marginTop: '20px' }}>
                  <Col
                    span={14}
                    style={{ display: 'flex', alignSelf: 'self-start' }}
                  >
                    {/* <img src={process.env.PUBLIC_URL + "/chat_int.png"} 
                        className="service-icons chat-icon" /> */}
                    {/* <img
                      src={process.env.PUBLIC_URL + '/location-red.png'}
                      style={{ height: '15px', width: '15px' }}
                    />
                    <div
                      className="service-location"
                      style={{
                        display: 'block',
                        marginLeft: '5px',
                        paddingBottom: '5px',
                      }}
                    >
                      location
                    </div> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     data: state.appliedJobsReducer.data,
//     isloading: state.appliedJobsReducer.isloading,
//   };
// };
 export default withRouter((Product));
