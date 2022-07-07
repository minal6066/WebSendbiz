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
} from 'antd';
import {
  SendOutlined,
  LeftOutlined,
  EnvironmentFilled,
  CalendarFilled,
  LikeFilled,
  LikeOutlined,
  MessageFilled,
} from '@ant-design/icons';
import '../topNav.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin, Image, message } from 'antd';
import NewsComp from '../Services/news_comp';
import './event_details.css';
import moment from 'moment';
import { ImageUrl, fileUrl } from '../../../Shared/imageUrlPath';
import cardDefaultPic from '../../../Components/asset/card.svg';
import userDefaultPic from '../../../Components/asset/user.svg';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    className="event-comment-list"
    dataSource={comments}
    header={`${comments.length > 1 ? 'Comments' : 'Comment'} (${
      comments.length
    }) `}
    itemLayout="horizontal"
    renderItem={(item) => (
      <div>
        <Comment
          author={item.author}
          avatar={<img src={fileUrl.fileUrlPath + item.avator} alt="imag" />}
          content={item.content}
          datetime={item.datetime}
        />

        {console.log('image [path:', item.avator, item)}
      </div>
    )}
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

class EventDetail extends Component {
  formRef = React.createRef();
  state = {
    loading: true,
    like: '',
    submitting: false,
    likesLength: '',
    showMoreComments: false,
    loadCommentName: false,
    allProductsData: null,
    comments: [
    ],
  };

  componentDidMount() {
    var ls = require('local-storage');
    var eventId = ls.get('eventId');
    APIManager.getAllServices();
    APIManager.jobList();
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
    var ls = require('local-storage');
    var picture = ls.get('displayPicture');
    APIManager.getoneEvent(eventId).then((response) => {
      const like = response.data.data.hasLiked;
      console.log('response for one event:', response.data.data);
      console.log(
        'comments for one event:',
        response.data.data.comments.profileImage
      );
      const peopleWhoCommented = response.data.data.comments;
      const comments = [];
      peopleWhoCommented &&
        peopleWhoCommented.forEach((element) => {
          const data = {
            author: element.name,
            avator: element.profileImage
              ? element.profileImage
              : userDefaultPic,
            content: element.comment,
            datetime: moment(element.createdAt).fromNow(),
            //datetime: moment().fromNow(),
          };
          comments.push(data);
        });
      this.setState({
        loading: false,
        comments: comments,
        like: like,
        likesLength: response.data.data.likes.length,
      });
    });
    // if (this.props.location.event_obj) this.setState({ loading: false });
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  EventListingRender = () => {
    this.props.history.push({
      pathname: '/events',
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
  viewMoreComments = () => {
    var size = 3;
    var comment = this.state.comments.slice(0, size);
    console.log(comment, 'llllllllll');
  };

  handleLike = () => {
    var ls = require('local-storage');
    var id = ls.get('eventId');
    const eventId = id;
    APIManager.likeEvent(eventId).then((resp) => {
      console.log(resp.data.data.hasLiked, 'ooooooooooooooooooooo');
      if (resp.data.isSuccess) {
        this.setState({
          like: resp.data.data.hasLiked,
          likesLength: resp.data.data.likes.length,
        });
        APIManager.getoneEvent(eventId);
      }
      console.log(resp);
    });
  };
  handleSubmit = (values) => {
    console.log('form values:', values);
    var ls = require('local-storage');
    var id = ls.get('eventId');
    const eventId = id;
    APIManager.commentEvent(eventId, values).then((resp) => {
      console.log(resp, 'ssssssssss');
      const comments = [];
      resp.data.data.comments.forEach((element) => {
        const data = {
          author: element.name,
          avator: element.profileImage,
          content: element.comment,
          datetime: moment(element.createdAt).fromNow(),
        };
        comments.push(data);
      });
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
          comments: comments,
          // comments:
          // [
          //   ...this.state.comments,
          //   {
          //     author: 'Priyanshi Tater',
          //     avatar:
          //       'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          //     content: <span>{values.comment}</span>,
          //     datetime: moment().fromNow(),
          //   },
          // ],
        });
      });
    }, 1000);
  };

  render() {
    const name = this.props.oneeventdata
      ? this.props.oneeventdata.data.name
      : '';
    const companyName = this.props.oneeventdata
      ? this.props.oneeventdata.data.companyData.comp_info.comp_name
      : '';
    const location = this.props.oneeventdata
      ? this.props.oneeventdata.data.location
      : '';
    console.log('props:', this.props);
    const data = this.props.location.event_obj
      ? this.props.location.event_obj
      : '';
    const fromDate = this.props.oneeventdata
      ? this.props.oneeventdata.data.from
      : '';
    const { submitting, comments } = this.state;
    const peoplewhoLikedEventd = this.props.oneeventdata
      ? this.props.oneeventdata.data.likes
      : '';
    const loading = this.props.isloading;
    // const comments = this.props.oneeventdata
    //   ? this.props.oneeventdata.data.comments
    //   : '';
    const hasliked = this.props.oneeventdata
      ? this.props.oneeventdata.data.companyData.hasliked
      : '';
    const allServiceData = this.props.servicedata
      ? this.props.servicedata.data
      : '';
    const allJobs = this.props.jobdata ? this.props.jobdata.data : '';
    const recentJobs = allJobs.slice(0, 3);
    const RecentServices = allServiceData.slice(0, 3);
    const initialComments = this.state.comments.slice(0, 3);
    const recentProducts = this.state.allProductsData
      ? this.state.allProductsData.slice(0, 3)
      : '';
    const imagePath = this.props.oneeventdata
      ? this.props.oneeventdata.data.imagePath
      : '';
    var ls = require('local-storage');
    var picture = ls.get('displayPicture');
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {loading && <Spin />}
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
                          src={data.logoPath ? data.logoPath : cardDefaultPic}
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
                            data.media.length !== 0
                              ? data.media.map((data) =>
                                  data.filePath ? data.filePath : cardDefaultPic
                                )
                              : cardDefaultPic
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
                          src={
                            data.media.length !== 0
                              ? data.media.map((data) =>
                                  data.filePath ? data.filePath : cardDefaultPic
                                )
                              : cardDefaultPic
                          }
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
                <Row>
                  <Col span={2}>
                    <img
                      style={{ height: '370px' }}
                      src={picture}
                      alt="event"
                      className="event-d-head-image img-responsive"
                    />
                  </Col>
                  <Col span={20} style={{ paddingLeft: '10px' }}>
                    <h4 className="event-detail-name">
                      {companyName.charAt(0).toUpperCase() +
                        companyName.slice(1)}
                    </h4>
                    {/* <span className="event-detail-date">
                      {moment().diff(
                        moment(data.create, 'DD-MM-YYYY'),
                        'days'
                      ) > 0
                        ? moment().diff(
                            moment(data.create, 'DD-MM-YYYY'),
                            'days'
                          ) + ' days ago'
                        : moment().diff(
                            moment(data.create, 'DD-MM-YYYY'),
                            'hours'
                          ) + ' hours ago'}
                    </span> */}
                  </Col>
                </Row>
                <Row style={{ margin: '30px 0 20px' }}>
                  <Col>
                    <h4
                      className="event-detail-name"
                      style={{ fontSize: '28px', marginBottom: '15px' }}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </h4>
                    <EnvironmentFilled className="service-icons" />
                    <span
                      className="event-detail-date"
                      style={{ fontSize: '18px', marginRight: '35px' }}
                    >
                      {location}
                    </span>
                    <CalendarFilled className="service-icons" />
                    <span
                      className="event-detail-date"
                      style={{ fontSize: '18px' }}
                    >
                      {moment(fromDate).format('d MMM YY')}
                    </span>
                  </Col>
                </Row>
                <Carousel
                  afterChange={this.onChange}
                  className="event-carousel"
                  autoplay
                >
                  {imagePath &&
                    imagePath.map((data) => (
                      <div>
                        <Image
                          src={data ? data : cardDefaultPic}
                          alt="event"
                          className="event-carousel-img"
                          width={'100%'}
                          height={300}
                        ></Image>
                      </div>
                    ))}
                </Carousel>
                <Row
                  style={{
                    marginTop: '30px',
                    paddingBottom: '20px',
                    borderBottom: 'solid 2px #D8D8D830',
                  }}
                >
                  <Col span={12}>
                    {/* <LikeFilled className="service-icons" /> */}
                    <div onClick={this.handleLike}>
                      {this.state.like ? (
                        <LikeFilled className="service-icons" />
                      ) : (
                        <LikeOutlined className="service-icons" />
                      )}
                    </div>
                    <span className="event-detail-date">
                      {peoplewhoLikedEventd &&
                        peoplewhoLikedEventd.map((data) =>
                          data.length > 1 ? (
                            <span className="event-detail-date">{`${
                              data.name[0]
                            }and ${data.length - 1} others.`}</span>
                          ) : (
                            <span className="event-detail-date">
                              {data.name}
                            </span>
                          )
                        )}
                    </span>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <span className="" style={{ marginRight: '35px' }}>
                      <LikeFilled className="service-icons" />
                      {this.state.likesLength} Likes
                    </span>
                    <MessageFilled
                      className="service-icons"
                      style={{ color: 'black' }}
                    />
                    <span className="event-detail-date">
                      {this.state.comments.length} Comments
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {comments.length > 0 && comments.length > 3 ? (
                      this.state.showMoreComments ? (
                        <CommentList comments={this.state.comments} />
                      ) : (
                        <CommentList comments={initialComments} />
                      )
                    ) : (
                      <CommentList comments={comments} />
                    )}
                    <div className={'d-flex justify-content-end'}>
                      {this.state.comments.length > 3 && (
                        <Button
                          onClick={() => {
                            this.setState({
                              showMoreComments: !this.state.showMoreComments,
                              loadCommentName: !this.state.loadCommentName,
                            });
                          }}
                        >
                          {this.state.loadCommentName ? (
                            <p>view less</p>
                          ) : (
                            <p>View more</p>
                          )}
                        </Button>
                      )}
                    </div>
                    <Comment
                      content={
                        <Editor
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          formRef={this.formRef}
                        />
                      }
                    />
                  </Col>
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
    oneeventdata: state.eventReducer.oneeventdata,
    isloading: state.eventReducer.isloading,
    servicedata: state.ServiceReducer.servicedata,
    jobdata: state.jobManagementReducer.jobdata,
  };
};
export default connect(mapStateToProps)(EventDetail);
