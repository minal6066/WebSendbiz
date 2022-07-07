import React, { Component } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Card from './applied_job_cards';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
const { Option } = Select;
class AppliedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }
  componentDidMount() {
    APIManager.appliedJobs();
  }
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  render() {
    const jobCount = this.props.data ? this.props.data.data.length : '';
    return (
      <div className="">
        <Row>
          <p className="resume-1">
            {jobCount === 0 ? 'No data found' : `Jobs Found ${jobCount}`}{' '}
          </p>
          <Col span={12} className="billing_overview_input_and_sort">
            <Input
              size="large"
              className="billing-searchbox"
              placeholder="Search for keywords"
              prefix={<SearchOutlined />}
              onChange={this.handleChange}
              value={this.state.searchQuery}
            />
            <Select
              name="permissions"
              defaultValue=""
              className="billing-sort"
            >
              <Option value="" disabled>
                Sort by
              </Option>
              <Option value="Supper User">Supper User</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Col>
        </Row>
        <Card searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.appliedJobsReducer.data,
    isloading: state.appliedJobsReducer.isloading,
  };
};
export default connect(mapStateToProps)(AppliedJobs);
