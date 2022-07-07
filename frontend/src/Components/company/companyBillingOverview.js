import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Col, Row, Card, Input, Select, Button, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AddUser from '../createprofile/create-user.js';
import RightModal from '../job/rightModal.js';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
import moment from 'moment';
const { Option } = Select;
class companyBillingOverview extends Component {
  constructor(props) {
    super(props);
    this.buttonpressElement = React.createRef();
  }
  state = {
    applymodal: false,
    isPremium: "",
    sortBy: "",
    serchQuery: "",
    isloading: false
  };
  componentDidMount() {
    APIManager.getSubUserList();
    this.setState({ isloading: true })
    APIManager.getAllOrders(this.state.sortBy, this.state.serchQuery).then((response) => {
      if (response.data.isSuccess) {
        this.setState({ isloading: false })
      }
    })
      .catch((error) => message.info("Something went wrong."))
    APIManager.companyInfo().then((response) => {
      if (response.data.isSuccess) {
        this.setState({
          isPremium: response.data.data.data.isPremium
        })
        console.log(this.state.isPremium)
      }
    })
  }

  componentDidUpdate(prevState, prevprops) {
    if (prevprops.sortBy !== this.state.sortBy || prevprops.serchQuery !== this.state.serchQuery) {
      this.setState({isloading:true})
      APIManager.getAllOrders(this.state.sortBy, this.state.serchQuery).then((response) => {
        if (response.data.isSuccess) {
          this.setState({ isloading: false })
        }
      })
    }
  }
  refreshPage = () => {
    APIManager.getSubUserList();
  };
  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ sortBy: value })
  };
  handleSubmit = () => {
    // console.log("hello")
    this.buttonpressElement.current.clickSubmitClick();
  };
  handleClick = () => {
    this.setState({ applymodal: true });
  };
  closeModal = () => {
    document.body.style.overflow = 'auto';
    this.setState({ applymodal: false });
  };
  openPackagePlan = () => {
    console.log(this.props);
    this.props.history.push({
      pathname: '/package-plan',
    });
  };

  render() {
    console.log(this.props);
    let d = this.props.data;
    let data = [];
    if (d !== null) {
      data = d;
    }
    const paidOrders = this.props.orderdata ? this.props.orderdata.data : '';
    const currentPackages =
      paidOrders && paidOrders.map((data) => data.packages);
    var ls = require('local-storage');
    var companyName = ls.get('comapny_name');
    console.log(currentPackages, 'paid');
    return (
      <>
        {
          this.state.isloading &&
          <div className={'d-flex justify-content-center flex-direction-row align-item-center'}>
            <Spin />
          </div>
        }
        <Layout>
          {this.state.applymodal ? (
            <RightModal
              isClose={this.closeModal}
              onSubmit={this.handleSubmit}
              className={'create-user-modal'}
              component={
                <AddUser
                  ref={this.buttonpressElement}
                  isClose={this.closeModal}
                  refreshPage={this.refreshPage}
                />
              }
              title={'Add User'}
              isOpen={this.state.applymodal}
            />
          ) : null}
          <Layout className="main-margin-top-for-edit-profile responsive-div">
            <Row className="custom_row">
              <Col span={12} className="p-0">
                <h6 className="candidate_heading">Billing Overview</h6>
              </Col>
              <Col span={12} className="text-right p-0"></Col>
            </Row>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8} className="biiling-card-main-cls">
                  <Card hoverable>
                    <div style={{ display: 'flex' }}>
                      <img src={process.env.PUBLIC_URL + '/users-red.svg'} />
                      <div style={{ paddingLeft: 15 }}>
                        <p className="site-card-wrapper-1" style={{ margin: 0 }}>
                          Users
                      </p>
                        <p className="site-card-wrapper-2" style={{ margin: 0 }}>
                          {data.totalCount}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        window.location.href = '/manage-user';
                      }}
                      className="billing-card-button-1"
                    >
                      Manage Users
                  </Button>
                  </Card>
                </Col>
                <Col span={8} className="biiling-card-main-cls">
                  <Card hoverable>
                    <div style={{ display: 'flex' }}>
                      <img src={process.env.PUBLIC_URL + '/doller.svg'} />
                      <div style={{ paddingLeft: 15 }}>
                        <p className="site-card-wrapper-1" style={{ margin: 0 }}>
                          Monthly Payment
                      </p>
                        <p className="site-card-wrapper-2" style={{ margin: 0 }}>
                          {`$ ${data.totalCount * 15}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="billing-card-button-1"
                      onClick={this.handleClick}
                    >
                      Add Users
                  </Button>
                  </Card>
                </Col>
                <Col span={8} className="biiling-card-main-cls">
                  <Card hoverable>
                    <div style={{ display: 'flex' }}>
                      <img src={process.env.PUBLIC_URL + '/premium_plan.svg'} />
                      <div style={{ paddingLeft: 15 }}>
                        <p className="site-card-wrapper-1" style={{ margin: 0 }}>
                          Current Subscription
                      </p>
                        {
                          this.state.isPremium ?
                            <p className="site-card-wrapper-2" style={{ margin: 0 }}>
                              Premium Plan
                  </p> :
                            <p className="site-card-wrapper-2" style={{ margin: 0 }}>
                              Fremium Plan
                      </p>

                        }
                      </div>
                    </div>
                    <Button
                      className="billing-card-button-1"
                      onClick={this.openPackagePlan}
                    >
                      Manage Subscriptions
                  </Button>
                  </Card>
                </Col>
              </Row>
            </div>
            <Row style={{ paddingTop: 30 }}>
              <p className="billing_overview_invoice_1">Invoices</p>
              <Col span={12} className="billing_overview_input_and_sort">
                <Input
                  size="large"
                  placeholder="Search for keywords"
                  className="billing-searchbox"
                  prefix={<SearchOutlined />}
                  onChange={(e) => this.setState({ serchQuery: e.target.value })}
                />
                <Select
                  defaultValue="Sort"
                  className="billing-sort"
                  onChange={this.handleChange}
                >
                  <Option value="-createdAt">Latest</Option>
                </Select>
              </Col>
            </Row>
            <div className={'order-list'}>
              {paidOrders &&
                paidOrders.map((data) => {
                  console.log(data, 'data');
                  return (
                    <>
                      <Row className="billing_overview_card_list-1">
                        <Col span={3}>
                          <p className="billing_overview_card_list-1-inner-para-3">
                            Id:{data._id}
                          </p>
                        </Col>
                        <Col span={13}></Col>
                        <Col span={4} style={{ display: 'flex' }}>
                          <div className="">
                            <img
                              src={
                                process.env.PUBLIC_URL + '/Subtraction_276.svg'
                              }
                            />
                          </div>
                          <p className="billing_overview_card_list-1-inner-para">
                            Print Invoice
                        </p>
                        </Col>
                        <Col span={3} style={{ textAlign: 'right' }}>
                          <p className="billing_overview_card_list-1-inner-para-2">
                            {moment(data.createdAt).format('l')}
                          </p>
                        </Col>
                        <Row className="billing_amount_overview">
                          ${data.price}
                        </Row>
                        <Row className="billing-overview-detail">
                          {/* <Col span={4}>
                        <h6>463523</h6>
                        <p>VTA No.</p>
                      </Col> */}
                          <Col span={6}>
                            <h6>{companyName}</h6>
                            <p>Company</p>
                          </Col>
                          <Col span={6}>
                            <h6>**** **** **** {data.last4}</h6>
                            <p>Payment Method</p>
                          </Col>
                          <Col span={4}>
                            {currentPackages &&
                              currentPackages[0].map((data) => {
                                return (
                                  <h6>{moment(data.expiresAt).format('l')}</h6>
                                );
                              })}
                            <p>Next Billing date</p>
                          </Col>
                          {/* <Col span={4}>
                        <h6>France</h6>
                        <p>Billing Country</p>
                      </Col> */}
                        </Row>
                      </Row>
                    </>
                  );
                })}
            </div>
          </Layout>
        </Layout>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.billingOverViewReducer.sub_data,
    isloading: state.billingOverViewReducer.isloading,
    orderdata: state.OrderReducer.orderdata,
  };
};
export default connect(mapStateToProps)(companyBillingOverview);
