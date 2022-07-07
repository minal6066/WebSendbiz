import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Pagination,
  Select,
  Card,
  Carousel,
  Comment,
  List,
  Button,
  Form,
  Avatar,
  message,
  Image
} from 'antd';
import {
  SendOutlined,
  LeftOutlined,
  EnvironmentFilled,
  CalendarFilled,
  WechatFilled,
  LikeFilled,
  MessageFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import '../topNav.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import NewsComp from '../Services/news_comp';
import './event_details.css';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    className="event-comment-list"
    dataSource={comments}
    header={`${comments.length > 1 ? 'Comments' : 'Comment'} (${
      comments.length
    }) `}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ submitting, onSubmit, formRef }) => (
  <>
    <Form
      onFinish={onSubmit}
      ref={formRef}
      style={{ display: 'flex', marginTop: '40px' }}
    >
      <Form.Item
        name="comment"
        style={{ display: 'inline-block', width: '100%' }}
      >
        <TextArea
          rows={1}
          className="comment-textarea"
          placeholder="comment here"
          autoSize
        />
      </Form.Item>
      <div className="comment-btn-div">
        <Form.Item style={{ display: 'inline-block' }}>
          <Button
            htmlType="submit"
            className="comment-btn"
            loading={submitting}
            icon={
              <SendOutlined
                style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  top: '-4px',
                  position: 'relative',
                }}
                rotate={-45}
              />
            }
          ></Button>
        </Form.Item>
      </div>
    </Form>
  </>
);

class NewsDetail extends Component {
  formRef = React.createRef();
  state = {
    data: null,
    resultsPerPage: 10,
    totalData: null,
    totalPages: null,
    current_page: null,
    serviceid: '',
    loading: true,
    submitting: false,
    allProductsData: null,
    isLoading: false,
    comments: [
      {
        author: 'Priyanshi Tater',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <span>I love the JobHunt platform</span>,
        datetime: moment().fromNow(),
      },
    ],
  };

  componentDidMount() {
    var ls = require('local-storage');
    var newsId = ls.get('newsId');
    APIManager.getOneNews(newsId);
    APIManager.getAllServices();
    APIManager.jobList();
    this.setState({
      isLoading: true,
    });
    APIManager.getAllProducts()
      .then((resp) => {
        if (resp.data.isSuccess) {
          this.setState({
            allProductsData: resp.data.data,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        message.error('Something went wrong');
        this.setState({
          isLoading: false,
        });
      });
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  EventListingRender = () => {
    this.props.history.push({
      pathname: '/news',
    });
  };
  renderJobs = () => {
    this.props.history.push({
      pathname: '/all_jobs',
    });
  };
  renderProducts = () => {
    this.props.history.push({
      pathname: '/products',
    });
  };
  renderServices = () => {
    this.props.history.push({
      pathname: '/services',
    });
  };
  changed = (a, b, c) => {
    console.log(a, b, c);
  };
  handleSubmit = (values) => {
    console.log('form values:', values);
    if (!values.comment) {
      return;
    }

    this.setState({
      submitting: true,
    });
    this.formRef.current.resetFields();
    setTimeout(() => {
      this.setState({
        submitting: false,
        comments: [
          ...this.state.comments,
          {
            author: 'Priyanshi Tater',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <span>{values.comment}</span>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  render() {
    console.log('props:', this.props.newsonedata);
    const data = this.props.location.event_obj
      ? this.props.location.event_obj
      : '';
    const { comments, submitting } = this.state;
    const title = this.props.newsonedata
      ? this.props.newsonedata.data.title
      : '';
    const readingTime = this.props.newsonedata
      ? this.props.newsonedata.data.avgReadTime
      : '';
    const createdAt = this.props.newsonedata
      ? this.props.newsonedata.data.createdAt
      : '';
    const comment = this.props.newsonedata
      ? this.props.newsonedata.data.comments
      : '';
    const description = this.props.newsonedata
      ? this.props.newsonedata.data.description
      : '';
    const imagePath = this.props.newsonedata
      ? this.props.newsonedata.data.imagePath
      : '';
    const allServiceData = this.props.servicedata
      ? this.props.servicedata.data
      : '';
    const allJobs = this.props.jobdata ? this.props.jobdata.data : '';
    const RecentServices = allServiceData.slice(0, 3);
    const recentJobs = allJobs.slice(0, 3);
    const recentProducts = this.state.allProductsData
      ? this.state.allProductsData.slice(0, 3)
      : '';
    console.log(RecentServices, ';;;;;;;;;;;;');
    const loading = this.props.isloading;
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {loading || this.state.isLoading ? <Spin /> : ''}
        </div>
        <div className="detail-outer-div">
          <div style={{ paddingBottom: '16px' }}>
            <LeftOutlined
              className="back-icon"
              onClick={this.EventListingRender}
            />
            <span className="back-btn" onClick={this.EventListingRender}>
              Go back
            </span>
          </div>
          <Row gutter={32}>
            <Col span={8}>
              <div className="bg-white p-3 s-detail-left-card">
                <div className="row custom_row">
                  <div className="col-8 side-navbar-heading-company-1 pl-0">
                    Recent Jobs
                  </div>
                  <div
                    className="col-4 p-0 side-navbar-heading-company-2 custom-view-all"
                    onClick={this.renderJobs}
                  >
                    View All&nbsp;&nbsp;
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                </div>
                <ul className="icons-listing p-0">
                  {recentJobs &&
                    recentJobs.map((data) => (
                      <li>
                        <img
                          src={process.env.PUBLIC_URL + '/feature_jobs.png'}
                          className="feature_jobs_company"
                          alt="feature jobs"
                        />
                        <p
                          className="partner-text mb-0"
                          onClick={() => {
                            this.props.history.push({
                              pathname: '/apply-for-job',
                              state: { jobId: data._id },
                            });
                          }}
                        >
                          <span className="partner-text-span-1">
                            {data.title.charAt(0).toUpperCase() +
                              data.title.slice(1)}
                          </span>
                          <span className="partner-text-span-2">
                            {moment(data.publish_from).format('d MMM YYYY')}
                          </span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-white p-3 mt-4 s-detail-left-card">
                <div className="row custom_row">
                  <div className="col-8 side-navbar-heading-company-1 pl-0">
                    Recent Services
                  </div>
                  <div
                    className="col-4 side-navbar-heading-company-2 custom-view-all"
                    onClick={this.renderServices}
                  >
                    View All&nbsp;&nbsp;
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                </div>
                {RecentServices &&
                  RecentServices.map((data) => (
                    <ul className="icons-listing p-0">
                      <li>
                        <img
                          src={
                            data.imagePath
                              ? data.imagePath
                              : process.env.PUBLIC_URL + '/feature_jobs.png'
                          }
                          className="feature_jobs_company"
                          alt="feature jobs"
                        />
                        <p
                          className="partner-text mb-0"
                          onClick={() => {
                            var ls = require('local-storage');
                            ls.set('serviceId', data._id);
                            this.props.history.push({
                              pathname: '/services/detail',
                              id: data._id,
                            });
                          }}
                        >
                          <span className="partner-text-span-1">
                            {data.name.charAt(0).toUpperCase() +
                              data.name.slice(1)}
                          </span>
                          <span className="partner-text-span-2">
                            {moment(data.createdAt).format('d MMM YYYY')}
                          </span>
                        </p>
                      </li>
                    </ul>
                  ))}
              </div>

              <div className="bg-white p-3 mt-4 s-detail-left-card">
                <div className="row custom_row">
                  <div className="col-8 side-navbar-heading-company-1 pl-0">
                    Recent Products
                  </div>
                  <div
                    className="col-4 side-navbar-heading-company-2 custom-view-all"
                    onClick={this.renderProducts}
                  >
                    View All&nbsp;&nbsp;
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                </div>
                <ul className="icons-listing p-0">
                  {recentProducts &&
                    recentProducts.map((data) => (
                      <li>
                        <img
                          src={process.env.PUBLIC_URL + '/feature_jobs.png'}
                          className="feature_jobs_company"
                          alt="feature jobs"
                        />
                        <p
                          className="partner-text mb-0"
                          onClick={() =>
                            this.props.history.push({
                              pathname: '/products/detail',
                              product_obj: data,
                            })
                          }
                        >
                          <span className="partner-text-span-1">
                            {data.name.charAt(0).toUpperCase() +
                              data.name.slice(1)}
                          </span>
                          <span className="partner-text-span-2">
                            {moment(data.createdAt).format('d MMM YYYY')}
                          </span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              {/* </Card> */}
            </Col>
            <Col span={16}>
              <Card className="s-detail-r-card" bordered={false}>
                <Carousel
                  afterChange={this.onChange}
                  className="event-carousel"
                  autoplay
                >
                  {imagePath &&
                    imagePath.map((data) => (
                      <div>
                        <Image
                          src={data}
                          alt="event"
                          className="event-carousel-img"
                         width={"100%"}
                         height={300}
                        >
                          </Image>
                      </div>
                    ))}
                </Carousel>
                <Row style={{ margin: '30px 0 20px' }}>
                  <Col span={18} style={{ paddingLeft: '10px' }}>
                    <h4
                      className="event-detail-name"
                      style={{ fontSize: '28px', marginBottom: '15px' }}
                    >
                      {title.charAt(0).toUpperCase() + title.slice(1)}
                    </h4>
                    <ClockCircleOutlined className="service-icons" />
                    <span
                      className="event-detail-date"
                      style={{ fontSize: '18px', marginRight: '35px' }}
                    >
                      {readingTime}
                    </span>
                    <CalendarFilled className="service-icons" />
                    <span
                      className="event-detail-date"
                      style={{ fontSize: '18px', marginRight: '35px' }}
                    >
                      {moment(createdAt).format('d MMM YYYY')}
                    </span>
                    {/* <CommentOutlined className="service-icons" />
                    <span
                      className="event-detail-date"
                      style={{ fontSize: '18px' }}
                    >
                      {(comment.length === 0 || comment.length === 1)
                        ? `${comment.length} Comment`
                        : `${comment.length} Comments` 
                      }
                    </span> */}
                  </Col>
                  <Col span={6} style={{ justifyContent: 'right' }}>
                    <img
                      src={process.env.PUBLIC_URL + '/facebook.png'}
                      style={{
                        fontSize: '30px',
                        marginRight: '17px',
                        cursor: 'pointer',
                      }}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/linkedin.png'}
                      style={{
                        fontSize: '30px',
                        marginRight: '17px',
                        cursor: 'pointer',
                      }}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/twitter.png'}
                      style={{
                        fontSize: '30px',
                        marginRight: '17px',
                        cursor: 'pointer',
                      }}
                    />
                  </Col>
                </Row>
                <p className="s-detail-short-desc" style={{ fontSize: '16px' }}>
                  {description}
                </p>
                <Row>
                  {/* <Col span={24}>
                    {comments.length > 0 && <CommentList comments={comments} />}
                    <Comment
                      content={
                        <Editor
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          formRef={this.formRef}
                        />
                      }
                    />
                  </Col> */}
                </Row>
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
    newsonedata: state.newsReducer.newsonedata,
    jobdata: state.jobManagementReducer.jobdata,
    servicedata: state.ServiceReducer.servicedata,
    isloading: state.newsReducer.isloading,
  };
};
export default connect(mapStateToProps)(NewsDetail);
