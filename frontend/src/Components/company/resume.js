import React, { Component } from 'react';
import { Row, Col, Input, Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Card from './resumeFileCard';
import './resume.css';
import { connect } from 'react-redux';
import APIManager from '../../APIManager/index';

const { Option } = Select;
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingValue: '',
    };
  }
  componentDidMount() {
    APIManager.resumeJobsAppliedbyCompany();
  }

  //handle searching value
  handleChange = (e) => {
    this.setState({ searchingValue: e.target.value });
  };
  render() {
    // const data = this.props.appliedCandidateData
    //   ? this.props.data.data
    //   : [];
    const loading = this.props.isloading ? this.props.isloading : '';
    console.log(this.props.data);
    const count = this.props.appliedCandidateData
      ? this.props.appliedCandidateData.result
      : '';
    console.log(this.props.appliedCandidateData, 'sss');

    return (
      <>
        {loading ? (
          <div className={'d-flex justify-content-center'}>
            <Spin />
          </div>
        ) : (
          <>
            <Row>
              <p className="resume-1">{`${count} Resume`}</p>
              <div className="col-sm-6 pl-0 pb-3">
                <Input
                  size="large"
                  className="billing-searchbox"
                  placeholder="Search for keywords"
                  prefix={<SearchOutlined />}
                  value={this.state.searchingValue}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-sm-3 pb-3">
                <Select
                  name="permissions"
                  defaultValue=""
                  className="input-field-custom-type-1-2 input-border p-0"
                >
                  <Option value="" disabled>
                    Sort by
                  </Option>
                  <Option value="Supper User">Supper User</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>
            </Row>
            <Row>
              <Card
                {...this.props}
                searchingValue={this.state.searchingValue}
              />
            </Row>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appliedCandidateData: state.jobManagementReducer.appliedCandidateData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(Resume);
