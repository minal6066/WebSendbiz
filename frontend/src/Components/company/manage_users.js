import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Layout,
  Menu,
  Col,
  Row,
  Card,
  Input,
  Select,
  Button,
  Spin,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RightModal from '../job/rightModal.js';
import AddUser from '../createprofile/create-user.js';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
import { ImageUrl } from '../../Shared/imageUrlPath';
import Pagination from 'react-js-pagination';
const { Option } = Select;
class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.buttonpressElement = React.createRef();
  }
  state = {
    applymodal: false,
    sub_users: [],
    resultsPerPage: '',
    totalData: '',
    totalPages: '',
    currentPage: '',
    sort_by: '',
    search: '',
  };
  componentDidMount() {
    // APIManager.getSubUserList();
    this.refreshPage();
  }

  async refreshPage() {
    await this.loadMoreData(1);
  }
  loadMoreData = (pageNumber = 1, search, sort_by) => {
    // console.log(search,sort_by)
    // let sort_by = this.state.sort_by
    // let search = this.state.search
    APIManager.subuserSortAndSearch(pageNumber, search, sort_by).then(
      (resp) => {
        if (resp.data.status === 'success') {
          this.setState({
            sub_users: resp.data.data,
            resultsPerPage: resp.data.results,
            totalData: resp.data.totalCount,
            totalPages: resp.data.totalPages,
            currentPage: resp.data.currentPage,
          });
        }
      }
    );
  };
  handleSubmit = () => {
    // console.log("hello")
    this.buttonpressElement.current.clickSubmitClick();
  };
  handleClick = () => {
    this.setState({ applymodal: true });
  };
  handleSortChange = (value) => {
    let data = '';
    if (value === 'Super user' || value === 'Admin') {
      data = `&permission=${value}`;
    } else {
      data = `&sort=${value}`;
    }
    this.setState({
      sort_by: data,
    });
    this.loadMoreData(1, this.state.search, data);
  };
  handleSearchChange = (value) => {
    this.setState({
      search: value.target.value,
    });
    this.loadMoreData(1, value.target.value, this.state.sort_by);
  };
  closeModal = () => {
    document.body.style.overflow = 'auto';
    this.setState({ applymodal: false });
  };
  render() {
    console.log(this.state.sub_users);
    let data = this.state.sub_users;
    console.log(data);
    let d = [];
    let loader = false;
    if (data === null) {
      loader = true;
      d = [];
    } else {
      d = data;
    }
    return (
      <>
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
        <Row>
          <p className="billing_overview_invoice_1">Manage Users</p>
          <Col
            span={12}
            className="p-manage-search billing_overview_input_and_sort"
          >
            <Input
              size="large"
              placeholder="Search for keywords"
              onChange={this.handleSearchChange}
              className="billing-searchbox"
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Sort by"
              className="billing-sort"
              onChange={this.handleSortChange}
            >
              <Option value="first_name">A-Z</Option>
              <Option value="-first_name">Z-A</Option>
              <Option value="create">Created</Option>
              <Option value="Super user">Super User</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Col>
          <Col span={12} align="end">
            <Button
              className="btn btn-dark bold-family btn-save-font b-height"
              onClick={this.handleClick}
            >
              Add Users
            </Button>
          </Col>
        </Row>
        {loader ? (
          <Spin />
        ) : (
          <>
            {d.length === 0 ? (
              <div className="row text-center">No data found</div>
            ) : (
              <>
                {d.map((val, index) => (
                  <Row className={'resume-card-2 m-user-card'} key={index}>
                    <div className="col-sm-2 all-applied-resume-card-1">
                      {val.user_image === '' ? (
                        <img
                          src={
                            process.env.PUBLIC_URL + '/resume-profile-logo.png'
                          }
                        />
                      ) : (
                        <img
                          className="w-100 rounded-circle"
                          src={ImageUrl.imageUrlPath + val.user_image}
                        />
                      )}
                    </div>
                    <div className="col-sm-10 all-applied-resume-card-7">
                      <div className="row">
                        <div className="col-sm-9 all-applied-resume-card-10">
                          <p className="all-applied-resume-card-2">
                            {' '}
                            {val.first_name + ' ' + val.last_name}
                          </p>
                          <p className="all-applied-resume-card-3">
                            {val.email}
                          </p>
                          <ul className="all-applied-resume-card-8">
                            <li>
                              <p className="user-background-manage all-applied-resume-card-4 m-0">
                                {val.permission}
                              </p>
                            </li>
                            <li>
                              {/*<p className="all-applied-resume-card-5">
		                                        <span className="all-applied-resume-card-6">Applied on:</span>
		                                        &nbsp;&nbsp;{moment("val.appliedOn").format('d MMM YYYY')}
		                                    </p>*/}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Row>
                ))}
                <div className={'paginate-container'}>
                  <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={this.state.resultsPerPage}
                    totalItemsCount={this.state.totalData}
                    pageRangeDisplayed={5}
                    onChange={(pageNumber) => {
                      this.loadMoreData(pageNumber);
                    }}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.billingOverViewReducer.sub_data,
    isloading: state.billingOverViewReducer.isloading,
  };
};
export default connect(mapStateToProps)(ManageUsers);
