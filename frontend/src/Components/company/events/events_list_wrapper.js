import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, notification, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EventCards from './event_card';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import './serviceslist.css';

const { Option } = Select;

export default class EventsListWrapper extends Component {
  state = {
    searchQuery: '',
    addForm: true,
    sortValue: '',
  };

  // componentDidMount() {
  //   APIManager.GetCompanyServices();
  // }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  handleSort = (value) => {
    console.log(value);
    this.setState({
      sortValue: value,
    });
  };
  checkPremiumAccount = () => {
    APIManager.checkPremiumDetail()
      .then((response) => {
        if (response.data.data.events) {
          this.renderAddEvent();
        } else {
          notification.warning({
            message: 'Please upgrade your plan to premium.',
            description: 'Click here to upgrade your plan.',
            onClick: () => {
              this.props.history.push('/company/billing');
            },
          });
        }
      })
      .catch((err) => message.error('Something went wrong.'));
  };
  renderAddEvent = (e, obj, type) => {
    if (type === 'edit') {
      this.props.history.push({
        pathname: '/company/edit-event',
        state: { event_obj: obj },
      });
    } else {
      this.props.history.push({
        pathname: '/company/add-event',
        state: { addForm: this.state.addForm },
      });
    }
  };
  render() {
    const eventsCount = this.props.data ? this.props.data.data.length : '';
    return (
      <div className="applied-job-paddingright">
        <Row className="services-header" justify="space-between">
          <Col span={12}>
            <span className="header-text">Events</span>
          </Col>
          <Col span={12}>
            <Button
              className="add-service-btn"
              onClick={this.checkPremiumAccount}
            >
              Add new Event
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Input
              size="large"
              className="resume-data-1 company-joblist-input service-input"
              placeholder="Search for a Event"
              prefix={<SearchOutlined />}
              onChange={this.handleChange}
              value={this.state.searchQuery}
            />
          </Col>
          <Col span={4}>
            <Select
              name="permissions"
              className="sort-select"
              style={{ float: 'right' }}
              placeholder="Sort By"
              onChange={this.handleSort}
            >
              <Option value="-likes&-comments">Popular</Option>
              <Option value="-from">Latest</Option>
              <Option value="name">A-Z</Option>
              <Option value="-name">Z-A</Option>
              <Option value="reset">Reset</Option>
            </Select>
          </Col>
        </Row>
        <EventCards
          searchQuery={this.state.searchQuery}
          editEvent={(e, obj) => this.renderAddEvent(e, obj, 'edit')}
          sortValue={this.state.sortValue}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.companyServicesReducer.data,
//     isloading: state.companyServicesReducer.isloading,
//   };
// };
// export default connect(mapStateToProps)(ServicesListWrapper);
