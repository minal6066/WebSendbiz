import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Card from './resumeFileCard';
import AllResumeCards from './All_applied_resume_Card';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(id) {
    const resumeId = this.props.location.state.resumeId;
    APIManager.resumeGetOneAppliedJob(resumeId);
  }

  render() {
    console.log(this.props.location.state.resumeId, 'sssss');
    const currentPosition = this.props.appliedJobData
      ? this.props.appliedJobData.data.candidate.current_position
      : '';
    return (
      <div className="applied-job-paddingright">
        <div className="row">
          <p className="resume-1">{`Resume : ${
            currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)
          }`}</p>
        </div>
        {/* 
                <Row>
                    <Col span={24}><p style={{marginTop:30,font: "normal normal 400 24px/43px Gilroy Bold"}}>3 Candidates</p></Col>
                </Row> */}
        <AllResumeCards />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appliedJobData: state.jobManagementReducer.appliedJobData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(Resume);
