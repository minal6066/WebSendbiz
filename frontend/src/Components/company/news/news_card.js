import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Switch,
  Image,
  Spin,
  Card,
  Pagination,
  Popconfirm,
  message,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './servicescard.css';
import {
  DeleteFilled,
  NotificationFilled,
  EnvironmentFilled,
  DollarCircleFilled,
  ClockCircleFilled,
  ClockCircleOutlined,
  EditFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import cardDefaultPic from '../../../Components/asset/card.svg';

const numEachPage = 2;

class NewsCards extends Component {
  state = {
    minValue: 0,
    maxValue: 2,
    id: '',
    deleteNewsId: '',
    isLoading: false,
    data: [],
  };
  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.sortValue !== prevProps.sortValue) {
      console.log('hello');
      this.makeHttpRequestWithPage();
    }
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.makeHttpRequestWithPage();
    }
  }
  makeHttpRequestWithPage = async (pageNumber) => {
    APIManager.newsList(pageNumber).then((resp) => {
      console.log(resp, 'sss');
      this.setState({
        data: resp.data.data,
        total: resp.data.totalCount,
        //   per_page: resp.data.results,
        current_page: resp.data.currentPage,
      });
    });
  };
  makeHttpRequestWithPage = async (pageNumber) => {
    const sort = this.props.sortValue;
    const searchQuery = this.props.searchQuery;
    this.setState({
      isloading: true,
    });
    if ((sort && sort !== 'reset') || (searchQuery && searchQuery !== '')) {
      APIManager.sortNews(sort, searchQuery)
        .then((resp) => {
          console.log(resp, 'sss');
          this.setState({
            data: resp.data.data,
            total: resp.data.totalCount,
            //   per_page: resp.data.results,
            current_page: resp.data.currentPage,
            isloading: false,
          });
        })
        .catch((err) => {
          this.setState({ isloading: false });
          message.error('Something went wrong!');
        });
    } else {
      APIManager.newsList(pageNumber)
        .then((resp) => {
          this.setState({
            data: resp.data.data,
            total: resp.data.totalCount,
            //   per_page: resp.data.results,
            current_page: resp.data.currentPage,
            isloading: false,
          });
        })
        .catch((err) => {
          this.setState({ isloading: false });
          message.error('Something went wrong!');
        });
    }
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
  changeActiveStatus = () => {
    const id = this.state.id;
    APIManager.newsActiveStatus(id);
  };
  deleteNews = () => {
    APIManager.deleteNews(this.state.deleteNewsId)
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
    console.log(this.props, 'props');
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        <div className={'d-flex justify-content-center pt-3'}>
          {this.state.isloading ? <Spin /> : ''}
        </div>

        {this.state.data.length === 0
          ? 'No data found'
          : this.state.data &&
            this.state.data
              //  .slice(this.state.minValue, this.state.maxValue)
              .map((data) => (
                <Card
                  className="services-card"
                  // onClick={(e)=>this.renderb(e,data)}
                >
                  <Row>
                    <Col span={3}>
                      <img
                        alt="example"
                        src={
                          data.imagePath.length !== 0 &&
                          data.imagePath[0] !== ''
                            ? data.imagePath[0]
                            : cardDefaultPic
                        }
                        style={{ width: '100%', height: '100px' }}
                      />
                    </Col>
                    <Col
                      span={21}
                      style={{ paddingLeft: '20px' }}
                      className="service-detail-row"
                    >
                      <Row justify="space-between">
                        <Col span={17}>
                          <div
                            className="service-name"
                            onClick={() => {
                              var ls = require('local-storage');
                              ls.set('newsId', data._id);
                              this.props.history.push({
                                pathname: '/news/detail',
                                newsId: data._id,
                              });
                            }}
                          >
                            {data.title.charAt(0).toUpperCase() +
                              data.title.slice(1)}
                          </div>
                        </Col>
                        <Col span={7} className="icon-col">
                          <EditFilled
                            className="service-hidden-icons service-icons"
                            onClick={(e) => this.props.editNews(e, data)}
                          />
                          <Popconfirm
                            title="Are you sure to delete this news?"
                            onConfirm={() => {
                              this.setState(
                                { deleteNewsId: data._id },
                                this.deleteNews
                              );
                            }}
                            onCancel={this.cancelDelete}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteFilled className="service-hidden-icons service-icons" />
                          </Popconfirm>
                          <Switch
                            onChange={() => {
                              this.setState({ id: data._id }, () =>
                                this.changeActiveStatus()
                              );
                            }}
                            defaultChecked={data.isActive}
                          />
                        </Col>
                      </Row>

                      <Row align="bottom" style={{ marginTop: '45px' }}>
                        <Col
                          span={12}
                          style={{ display: 'flex', alignSelf: 'self-start' }}
                        >
                          <ClockCircleOutlined className="service-icons" />
                          <div
                            className="service-location"
                            style={{ display: 'block' }}
                          >
                            Created on{' '}
                            {moment(data.createdAt).format('DD MMM YYYY')}
                          </div>
                        </Col>
                        <Col span={9}>
                          <ClockCircleOutlined className="service-icons" />
                          <div className="service-location">
                            Published on{' '}
                            {moment(data.updatedAt).format('DD MMM YYYY')}
                          </div>
                        </Col>
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
// const mapStateToProps = (state) => {
//   return {
//     data: state.appliedJobsReducer.data,
//     isloading: state.appliedJobsReducer.isloading,
//   };
// };
export default withRouter(NewsCards);
