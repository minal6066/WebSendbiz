import React, { Component } from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ServicesCard from './service_card';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import './serviceslist.css';

const { Option } = Select;

class ServicesListWrapper extends Component {
  state = {
    searchQuery: '',
    addForm: true,
    sortValue: '',
  };

  componentDidMount() {
    APIManager.serviceList();
  }
  handleSort = (value) => {
    console.log(value);
    this.setState({
      sortValue: value,
    });
  };
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  renderAddService = (e, obj, type) => {
    console.log(obj, type);
    if (type === 'edit') {
      this.props.history.push({
        pathname: '/company/edit-service',
        state: { service_obj: obj },
      });
    } else {
      this.props.history.push({
        pathname: '/company/add-service',
        state: { addForm: this.state.addForm },
      });
    }
  };
  render() {
    const servicesCount = this.props.data ? this.props.data.data.length : '';
    return (
      <div className="applied-job-paddingright">
        <Row className="services-header" justify="space-between">
          <Col span={12}>
            <span className="header-text">Manage Services</span>
          </Col>
          <Col span={12}>
            <Button className="add-service-btn" onClick={this.renderAddService}>
              Add new Service
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Input
              size="large"
              className="resume-data-1 company-joblist-input service-input"
              placeholder="Search for a Service"
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
              <Option value="price.amount">low to high</Option>
              <Option value="-price.amount">high to low</Option>
              <Option value="reset">reset</Option>
            </Select>
          </Col>
        </Row>
        <ServicesCard
          searchQuery={this.state.searchQuery}
          editService={(e, obj) => this.renderAddService(e, obj, 'edit')}
          sortValue={this.state.sortValue}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.ServiceReducer.data,
    isloading: state.ServiceReducer.isloading,
  };
};
export default connect(mapStateToProps)(ServicesListWrapper);
