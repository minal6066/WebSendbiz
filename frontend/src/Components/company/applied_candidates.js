import React, { Component } from 'react';
import { Row, Col, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Classes from './company.css';
import Card from './applied_candidates_cards';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
const { Search } = Input;
class appliedCandidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingValue: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      searchingValue: e.target.value,
    });
  };
  componentDidMount() {
    APIManager.getAppliedCandidates();
  }

  onClickButton1 = () => {
    console.log('fghjkl;');
  };
  onClickButton2 = () => {};
  render() {
    const loading = this.props.isloading ? this.props.isloading : '';
    const candidateCount=this.props.candidateData?this.props.candidateData.data.length:"";
    return (
      <div>
        <div className={'d-flex justify-content-center'}>
          {loading && <Spin />}
        </div>
        <Row style={{ marginTop: '6%' }}>
          <Col span={24}>
            <p
              style={{
                fontFamily: 'Gilroy Bold',
                fontSize: 28,
                fontWeight: 'bold',
                fontStyle: 'normal',
              }}
            >
             {candidateCount!==0?(`${candidateCount} Candidates applied`):"No data found"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div
              style={{
                height: 40,
                width: '100%',
                borderRadius: 12,
                backgroundColor: 'white',
              }}
            >
              <Row>
                <Col className={'w-100'}>
                  <Input
                    size="large"
                    className="billing-searchbox"
                    placeholder="Search for keywords"
                    prefix={<SearchOutlined />}
                    value={this.state.searchingValue}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <button
              className={'Appliedjobbutton'}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Gilroy Bold',
                fontSize: 16,
              }}
              onClick={this.onClickButton1}
            >
              By Job Title
            </button>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <button
              className={'Appliedjobbutton'}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Gilroy Bold',
                fontSize: 16,
              }}
              onClick={this.onClickButton2}
            >
              By People
            </button>
          </Col>
          <Col span={2}></Col>
          <Col span={4}>
            <button
              className={'Appliedjobbutton'}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Gilroy Bold',
                fontSize: 16,
              }}
              onClick={this.onClickButton2}
            >
              Show in Map
            </button>
          </Col>
        </Row>
        <Card {...this.props} searchingValue={this.state.searchingValue} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    candidateData: state.jobManagementReducer.candidateData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default connect(mapStateToProps)(appliedCandidates);
