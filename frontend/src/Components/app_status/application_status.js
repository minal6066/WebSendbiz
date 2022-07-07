import React, { Component } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
const { Option } = Select;
class ApplicationStatus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const status = this.props.status
    return (
      <div className="row p-0">
      	<img
			src={process.env.PUBLIC_URL + '/'+status+'.png'}
			style={{ width: '100%' }}
		/>
		<p className="application_status_card w-100">Job status</p>
      </div>
    );
  }
}


export default ApplicationStatus;

