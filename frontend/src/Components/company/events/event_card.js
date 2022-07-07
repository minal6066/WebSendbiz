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
  EditFilled,
  LikeFilled,
  MessageFilled,
  CalendarFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import cardDefaultPic from '../../../Components/asset/card.svg';

const numEachPage = 2;

class EventCards extends Component {
  state = {
    minValue: 0,
    maxValue: 2,
    data: [],
    resultsPerPage: 10,
    totalData: null,
    totalPages: null,
    deleteEventId: '',
    current_page: null,
    isloading: false,
  };
  componentDidMount() {
    //APIManager.getEventList();
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
  DeleteEvent = () => {
    const id = this.state.deleteEventId;
    APIManager.deleteEvent(id)
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
    const sort = this.props.sortValue;
    const searchQuery = this.props.searchQuery;
    this.setState({
      isloading: true,
    });
    if ((sort && sort !== 'reset') || (searchQuery && searchQuery !== '')) {
      APIManager.sortEvents(sort, searchQuery)
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
      APIManager.getEventList(pageNumber)
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

    const loading = this.props.isloading;
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        <div className={'d-flex justify-content-center pt-3'}>
          {loading || this.state.isloading ? <Spin /> : ''}
        </div>
        {this.state.data.length === 0
          ? 'No data found'
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
                      src={
                        data.imagePath.length !== 0 && data.imagePath[0] !== ''
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
                      <Col span={20}>
                        <div
                          className="service-name"
                          onClick={() => {
                            var ls = require('local-storage');
                            ls.set('eventId', data._id);
                            this.props.history.push({
                              pathname: '/events/detail',
                              eventId: data._id,
                            });
                          }}
                        >
                          {data.name}
                        </div>
                      </Col>
                      <Col span={4} className="icon-col">
                        <Popconfirm
                          title="Are you sure to delete this event?"
                          onConfirm={() => {
                            this.setState(
                              { deleteEventId: data._id },
                              this.DeleteEvent
                            );
                          }}
                          onCancel={this.cancelDelete}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteFilled className="service-hidden-icons service-icons" />
                        </Popconfirm>
                        <EditFilled
                          className="service-hidden-icons service-icons"
                          onClick={(e) => this.props.editEvent(e, data)}
                        />
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '10px' }}>
                      <Col
                        span={20}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <EnvironmentFilled className="service-icons" />
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.location}
                        </div>
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '10px' }}>
                      <Col
                        span={8}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <LikeFilled className="service-icons" />
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.likes.length} Likes
                        </div>
                      </Col>
                      <Col span={8}>
                        <MessageFilled className="service-icons" />
                        <div className="service-location">
                          {/* {data.comments.length} Comments{' '} */}
                          {data.comments.length}
                        </div>
                      </Col>
                      <Col span={8}>
                        <CalendarFilled className="service-icons" />
                        <div className="service-location">
                          {moment(data.from).format('d MMM YYYY')}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
        <div className={'d-flex justify-content-end pt-3'}>
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
const mapStateToProps = (state) => {
  return {
    eventList: state.eventReducer.eventList,
    isloading: state.eventReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(EventCards));
