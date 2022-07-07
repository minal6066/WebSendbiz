import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Switch,
  Spin,
  Image,
  Popconfirm,
  message,
  Card,
  Tag,
} from 'antd';
import {
  DeleteFilled,
  NotificationFilled,
  EnvironmentFilled,
  DollarCircleFilled,
  EditFilled,
  ClockCircleFilled,
} from '@ant-design/icons';

import { connect } from 'react-redux';
import moment from 'moment';
import APIManager from '../../APIManager/index.js';
import { ImageUrl } from '../../Shared/imageUrlPath';
import { withRouter } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Icons } from '../../Shared/Assets.js';
import edit from '../../Components/asset/editJob.png';
import trash from '../../Components/asset/trashIcon.png';
import { myjobManagementData } from '../../Redux/Actions/JobManagementAction';
import './jobCards.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import cardDefaultPic from '../../Components/asset/card.svg';
import PromoteJob from '../../Components/company/promoteEntity/index';

class JobCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSwitchId: '',
      jobswitchflag: true,
      editJob: true,
      users: null,
      // resultsPerPage: 10,
      deleteJobId: '',
      flag: false,
      isSpin: false,
      resultsPerPage: '',
      totalData: '',
      totalPages: '',
      currentPage: '',
      promoteJob: false,
      promoteJobId: '',
    };
  }

  componentDidMount() {
    this.makeHttpRequestWithPage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchingValue !== prevProps.searchingValue) {
      this.makeHttpRequestWithPage();
    }
  }
  deleteJob = () => {
    const id = this.state.deleteJobId;
    APIManager.deleteJob(id).then((resp) => {
      if (resp.data.isSuccess) {
        message.success('Job is deleted.');
        this.makeHttpRequestWithPage();
        APIManager.myJobs();
      }
    });
  };
  confirmDelete = () => {
    this.deleteJob();
  };

  // makeHttpRequestWithPage = async (pageNumber) => {
  //   var ls = require('local-storage');
  //   var tok = ls.get('token');
  //   const response = await fetch(
  //     `https://reqres.in/api/users?page=${pageNumber}}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${tok}`,
  //       },
  //     }
  //   );

  //   const data = await response.json();
  //   console.log(data, 'lll');
  //   this.setState({
  //     users: data.data,
  //     total: data.total,
  //     per_page: data.per_page,
  //     current_page: data.page,
  //   });
  // };
  makeHttpRequestWithPage = async (pageNumber = 1) => {
    const searchQuery = this.props.searchingValue;
    APIManager.myJobsSortAndSearch(pageNumber, searchQuery.toLowerCase()).then(
      (resp) => {
        console.log(resp.data.currentPage, 'sss');
        this.setState({
          users: resp.data.data,
          resultsPerPage: resp.data.results,
          totalData: resp.data.totalCount,
          totalPages: resp.data.totalPages,
          currentPage: resp.data.currentPage,
        });
      }
    );
  };
  handleActiveJobStatus = () => {
    //APIManager.changeJobActiveStatus(id);
    // console.log(this.state.jobSwitchId);
    const id = this.state.jobSwitchId;
    // console.log(id, 'ddddddd');
    this.setState({ isSpin: true });
    APIManager.changeJobActiveStatus(id)
      .then((resp) => {
        console.log(resp, 'current response');
        this.setState({ jobswitchflag: resp.data.data.isActive });
        this.props.setzero();
        this.setState({
          isSpin: false,
        });
      })
      .catch((err) => {
        this.setState({ isSpin: false });
      });
  };
  render() {
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.resultsPerPage);
        i++
      ) {
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
    // console.log(this.props.data ? this.props.data : '', 'tusharrrrr');
    const myJobdata = this.props.myjobData ? this.props.myjobData.data : '';
    const loading = this.props.isloading ? this.props.isloading : '';
    const searchingValue = this.props.searchingValue
      ? this.props.searchingValue
      : '';
    // console.log(this.state.deleteJobId, 'sss');
    // console.log(searchingValue, 'ddddeee');
    return (
      <>
        {this.state.promoteJob && (
          <PromoteJob
            show={this.state.promoteJob}
            onHide={() => this.setState({ promoteJob: false })}
            name={'job'}
            entity={this.state.promoteJobId}
          />
        )}
        <div className={'d-flex justify-content-center pt-3'}>
          {this.state.users === null ? <Spin /> : ''}
        </div>
        {this.state.users !== null && this.state.users.length === 0
          ? 'No data Found'
          : this.state.users &&
            this.state.users
              .filter((data) =>
                data.title
                  .toLowerCase()
                  .startsWith(searchingValue.toLowerCase())
              )
              .map((data) => (
                <Card className="services-card">
                  <Row>
                    <Col span={3}>
                      <img
                        alt="example"
                        src={data.logoPath ? data.logoPath : cardDefaultPic}
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
                            onClick={() =>
                              this.props.history.push({
                                pathname: '/apply-for-job',
                                state: { jobId: data._id },
                              })
                            }
                          >
                            {data.title}{' '}
                            <Tag
                              color="volcano"
                              className="s-price-tag"
                              style={{
                                marginLeft: '25px',
                                verticalAlign: 'bottom',
                                maxWidth: '100%',
                              }}
                            >
                              {data.noOf_applied > 0
                                ? data.noOf_applied + ' APPLIED'
                                : 'NONE APPLIED'}
                            </Tag>
                          </div>
                        </Col>
                        <Col span={7} className="icon-col">
                          <EditFilled
                            className="service-hidden-icons service-icons"
                            onClick={() =>
                              this.props.history.push({
                                state: data,
                                pathname: '/AddJob',
                              })
                            }
                          />
                          <NotificationFilled
                            onClick={() =>
                              this.setState({
                                promoteJob: true,
                                promoteJobId: data._id,
                              })
                            }
                            className="service-hidden-icons service-icons"
                          />
                          <Popconfirm
                            title="Are you sure to delete this job?"
                            onConfirm={() => {
                              this.setState(
                                { deleteJobId: data._id },
                                this.confirmDelete
                              );
                            }}
                            onCancel={this.cancelDelete}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteFilled className="service-hidden-icons service-icons" />
                          </Popconfirm>
                          <Switch
                            defaultChecked={data.isActive}
                            onChange={() => {
                              this.setState({ jobSwitchId: data._id }, () =>
                                this.handleActiveJobStatus()
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18}>
                          <span>
                            <img
                              src={
                                process.env.PUBLIC_URL + '/briefcase-red.png'
                              }
                              style={{ width: 14 }}
                            />
                          </span>
                          <span
                            className="service-s-desc"
                            style={{
                              paddingLeft: '8px',
                              verticalAlign: 'middle',
                            }}
                          >
                            {'Permanent'}
                          </span>
                        </Col>
                      </Row>
                      <Row align="bottom" style={{ marginTop: '10px' }}>
                        {data.location === null || data.location === ' ' ? (
                          ''
                        ) : (
                          <Col
                            span={9}
                            style={{ display: 'flex', alignSelf: 'self-start' }}
                          >
                            {/* <EnvironmentFilled className="service-icons" /> */}
                            <span>
                              <img
                                src={
                                  process.env.PUBLIC_URL + '/location-red.png'
                                }
                                className="service-icons"
                                style={{
                                  height: '16px',
                                  verticalAlign: 'super',
                                }}
                              />
                            </span>
                            <div
                              className="service-location"
                              style={{ display: 'block' }}
                            >
                              {data.location}
                            </div>
                          </Col>
                        )}
                        <Col span={12}>
                          {/* <ClockCircleFilled className="service-icons" /> */}
                          <img
                            src={process.env.PUBLIC_URL + '/clock-red.png'}
                            className="service-icons"
                            style={{ height: '16px', verticalAlign: 'super' }}
                          />
                          <div className="service-location">
                            {`${moment(data.publish_from).format(
                              'DD MMM YY'
                            )}-${moment(data.publish_to).format('DD MMM YY')}`}
                          </div>
                        </Col>
                        <Col
                          span={2}
                          style={{ textAlign: 'right' }}
                          className="sponsered"
                        >
                          <span className="sponsered">
                            {data.is_sponsored ? 'SPONSERED' : ''}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              ))}
        <div className={'paginate-container'}>
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={10}
            firstPageText={false}
            lastPageText={false}
            totalItemsCount={this.state.totalData}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => {
              this.makeHttpRequestWithPage(pageNumber);
            }}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myjobData: state.jobManagementReducer.myjobData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(JobCards));
