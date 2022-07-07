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
  message,
  Popconfirm,
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
} from '@ant-design/icons';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import APIManager from '../../../APIManager';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import cardDefaultPic from '../../../Components/asset/card.svg';
import PromoteEntity from '../../../Components/company/promoteEntity/index';
const numEachPage = 2;
class ServiceCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 2,
      data: [],
      resultsPerPage: 10,
      totalData: null,
      totalPages: null,
      current_page: null,
      deleteServiceId: '',
      id: '',
      isloading: false,
      promoteEntity: false,
      promoteServiceId: '',
    };
  }
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
    const sort = this.props.sortValue;
    const searchQuery = this.props.searchQuery;
    this.setState({
      isloading: true,
    });
    if ((sort && sort !== 'reset') || (searchQuery && searchQuery !== '')) {
      APIManager.sortServices(sort, searchQuery)
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
      APIManager.serviceList(pageNumber)
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
  changeActiveStatus = () => {
    const id = this.state.id;
    APIManager.changeActiveStatus(id);
  };
  renderb = (e, data) => {
    console.log(e, data);
  };
  deleteService = () => {
    const id = this.state.deleteServiceId;
    APIManager.deleteService(id)
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
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';

    const serviceData = this.props.servicelistdata
      ? this.props.servicelistdata.data
      : '';
    const loading = this.props.isloading;
    console.log(this.props, 'lllllllllllll');

    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        {this.state.promoteEntity && (
          <PromoteEntity
            show={this.state.promoteEntity}
            onHide={() => this.setState({ promoteEntity: false })}
            name={'service'}
            entity={this.state.promoteServiceId}
          />
        )}
        {loading || this.state.isloading ? (
          <div className={'d-flex justify-content-center pt-2'}>
            <Spin />
          </div>
        ) : (
          ''
        )}
        {this.state.data.length === 0
          ? 'No data Found'
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
                        data.media.length !== 0 && data.media[0].filePath !== ''
                          ? data.media[0].filePath
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
                            ls.set('serviceId', data._id);
                            this.props.history.push({
                              pathname: '/services/detail',
                              serviceId: data._id,
                            });
                          }}
                        >
                          {data.name}
                        </div>
                      </Col>
                      {/* <Col>
                        <NotificationFilled className="service-hidden-icons service-icons" />
                      </Col> */}
                      <Col span={7} className="icon-col">
                        <EditFilled
                          className="service-hidden-icons service-icons"
                          onClick={(e) => this.props.editService(e, data)}
                        />
                        <NotificationFilled
                          className="service-hidden-icons service-icons"
                          onClick={() =>
                            this.setState({
                              promoteEntity: true,
                              promoteServiceId: data._id,
                            })
                          }
                        />
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
                        <Switch
                          defaultChecked={data.isActive}
                          onChange={() => {
                            this.setState({ id: data._id }, () =>
                              this.changeActiveStatus()
                            );
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18}>
                        <div className="service-s-desc">
                          {data.shortDescription}
                        </div>
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '10px' }}>
                      <Col
                        span={9}
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
                      <Col span={6}>
                        <ClockCircleFilled className="service-icons" />
                        <div className="service-location">{data.period}</div>
                      </Col>
                      <Col span={6}>
                        <DollarCircleFilled className="service-icons" />
                        <div className="service-location">
                          {data.price.amount}
                        </div>
                      </Col>
                      <Col span={3}>
                        <div
                          className="sponsered"
                          style={{ textAlign: 'right' }}
                        >
                          {data.isSponsored ? 'SPONSORED' : ''}
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
const mapStateToProps = (state) => {
  return {
    servicelistdata: state.ServiceReducer.servicelistdata,
    isloading: state.ServiceReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(ServiceCards));
