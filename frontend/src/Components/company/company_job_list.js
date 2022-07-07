import React, { Component } from 'react';
import JobCards from './job_cards';

import { Row, Col, Input, Pagination, Spin,notification, Select } from 'antd';
import Classes from './company.css';
import { SearchOutlined } from '@ant-design/icons';
import JobPromote from './jobPromoteModal';
import DeletePopup from './jobDeleteCardPopup';
import './company.css';
import 'antd/dist/antd.css';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
import {
  myjobManagementData,
  reloadComponent,
} from '../../Redux/Actions/JobManagementAction';

const { Option } = Select;

class CompanyJobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPromoteModal: false,
      openJobDeletePopup: false,
      searchingValue: '',
      current: 1,
      totalResults: '',
      reload: false,
    };
  }

  componentDidMount() {
    this.setzero();
  }
  // componentDidMount() {
  //   console.log(this.state.page);
  //   APIManager.myJobs(this.state.current).then((resp) => {
  //     console.log(resp, 'gggggggggg');
  //     this.setState({
  //       totalResults: resp.data.totalData,
  //     });
  //     console.log(this.state.totalResults, 'gggggggggg');
  //   });
  // }


  handlePromoteModal = () => {
    let val = this.state.openPromoteModal;
    this.setState({ openPromoteModal: !val });
    console.log('hhhhhh');
  };
  handleDeleteModal = () => {
    let val = this.state.openJobDeletePopup;
    this.setState({ openJobDeletePopup: !val });
  };
  checkPremiumAccount = () => {
    APIManager.checkPremiumDetail().then((response) => {
      if (response.data.data.jobs) {
        this.CreateJob();
      }
      else{
        notification.warning({
          message: 'Please upgrade your plan to premium.',
          description:
            'Click here to upgrade your plan.',
          onClick: () => {
            this.props.history.push("/company/billing");
          },
        });
      }
    });
  };
  CreateJob = () => {
    this.props.history.push({
      pathname: '/AddJob',
      state: {
        editJob: false,
      },
    });
  };
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  //handle search query
  handleChange = (event) => {
    this.setState({ searchingValue: event.target.value });
  };
  setzero = () => {
    this.setState({
      reload: true,
    });

    if (this.state.reload) {
      APIManager.myJobs();
      // myjobManagementData();
      reloadComponent();
    }
    else{
      APIManager.myJobs();
    }
  };
  render() {
    console.log(this.props,"hellllfdfg");
    const jobPosted = this.props.myjobData
      ? this.props.myjobData.data.length
      : '';
    const activeJobData = this.props.myjobData ? this.props.myjobData.data : [];
    const activeJobs =
      activeJobData && activeJobData.filter((val) => val.isActive === true);
    console.log(activeJobs, 'active');
    return (
      <div>
        {this.state.openPromoteModal ? (
          <JobPromote
            isOpen={this.state.openPromoteModal}
            close={this.handlePromoteModal}
          />
        ) : null}
        {this.state.openJobDeletePopup ? (
          <div className="deleteModal">
            <DeletePopup
              isOpen={this.state.openJobDeletePopup}
              close={this.handleDeleteModal}
            />
          </div>
        ) : null}
        <Row style={{ marginTop: '6%' }}>
          <Col span={11}>
            <p
              style={{
                fontFamily: 'Gilroy Bold',
                fontSize: 28,
                fontWeight: 'bold',
                fontStyle: 'normal',
              }}
            >
              Manage Jobs
            </p>
          </Col>
          <Col span={1} />
          <Col span={12} style={{ textAlign: 'end' }}>
            <button
              type="button"
              className="btn btn-dark bold-family btn-save-font cursor"
              style={{ width: 192, height: 50 }}
              onClick={this.checkPremiumAccount}
            >
              Create Job
            </button>
          </Col>
        </Row>
        <Row className="s-search-bar-updated" justify="space-between">
            <Col span={14}>
              <Row gutter={12}>
                <Col span={14}>
                  <Input
                    style={{ height: 40, width: '100%' }}
                    className={'company-joblist-input jobListingcls-1'}
                    prefix={<SearchOutlined />}
                    type="text"
                    placeholder="Search for keywords"
                    value={this.state.searchingValue}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col span={10} lg={6} sm={10} gutter={2}>
                  <Select
                    placeholder="Sort"
                    style={{ float: 'right' }}
                    className="s-search-select"
                    onChange={this.handleSectorSort}
                  >
                    <Option value="IT">IT</Option>
                    <Option value="Sales">Sales</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row gutter={12} justify="end">
                <Col lg={12} sm={8}>
                  <div
                    style={{
                      backgroundColor: '#ee5050',
                      width: '100%',
                      height: 34,
                      borderRadius: 6,
                      color: 'white',
                      height: '100%',
                      textAlign: 'center',
                      padding: "10px 25px",
                      fontFamily: 'Gilroy Bold',
                      fontSize: 14,
                    }}
                  >
                    {`${jobPosted} JOBS POSTED`}
                  </div>
                </Col>
                <Col lg={12} sm={8}>
                  <div
                  style={{
                    backgroundColor: '#ee5050',
                    width: '100%',
                    height: 34,
                    borderRadius: 6,
                    color: 'white',
                    height: '100%',
                    textAlign: 'center',
                    padding: "10px 25px",
                    fontFamily: 'Gilroy Bold',
                    fontSize: 14,
                  }}
                >
                  {`${activeJobs.length} ACTIVE JOBS`}
                </div>
                </Col>
              </Row>
            </Col>
        </Row>
        <JobCards
          handlePromote={this.handlePromoteModal}
          handleDelete={this.handleDeleteModal}
          searchingValue={this.state.searchingValue}
          setzero={this.setzero}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myjobData: state.jobManagementReducer.myjobData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(CompanyJobList);
