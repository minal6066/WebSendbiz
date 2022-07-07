import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, message, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import NewsCard from './news_card';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import './serviceslist.css';

const { Option } = Select;

export default class NewsListWrapper extends Component {
  state = {
    searchQuery: '',
    addForm: true,
    sortValue: '',
  };

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
    APIManager.checkPremiumDetail().then((response) => {
      if (response.data.data.news) {
        this.renderAddNews();
      } else {
        notification.warning({
          message: 'Please upgrade your plan to premium.',
          description: 'Click here to upgrade your plan.',
          onClick: () => {
            this.props.history.push('/company/billing');
          },
        });
      }
    });
  };
  renderAddNews = (e, obj, type) => {
    console.log(obj, type);
    if (type === 'edit') {
      this.props.history.push({
        pathname: '/company/edit-news',
        state: { news_obj: obj },
      });
    } else {
      this.props.history.push({
        pathname: '/company/add-news',
        state: { addForm: this.state.addForm },
      });
    }
  };
  render() {
    const NewsCount = this.props.data ? this.props.data.data.length : '';
    return (
      <div>
        <Row className="services-header" justify="space-between">
          <Col span={12}>
            <span className="header-text">News</span>
          </Col>
          <Col span={12}>
            <Button
              className="add-service-btn"
              onClick={this.checkPremiumAccount}
            >
              Add new News
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Input
              size="large"
              className="resume-data-1 company-joblist-input service-input"
              placeholder="Search for a news"
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
              <Option value="-createdAt">Latest</Option>
              <Option value="reset">Reset</Option>
            </Select>
          </Col>
        </Row>
        <NewsCard
          searchQuery={this.state.searchQuery}
          editNews={(e, obj) => this.renderAddNews(e, obj, 'edit')}
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
