import React, { Component } from 'react';
import CompanySidebar from '../sidebar/sidebar_for_company';
import CandidateSidebar from '../sidebar/sidebar_for_candidate';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import Header from "../header/header"
import { Row, Col,Affix, Button,Progress,Tooltip } from 'antd';
import Aux from '../../Hoc/Auz';
import HELPERS from '../../APIManager/helper'
import './layout.css';
import { connect } from 'react-redux'
class Layout extends Component {
  render() {
    let user_type = JSON.parse(localStorage.getItem('user_type') || false);
    const user_type2 = JSON.parse(localStorage.getItem('user_type2') || false);
    let type_of_user = HELPERS.isNumber(user_type)
    let type_of_user2 = HELPERS.isNumber(user_type2)
    user_type = user_type/(user_type2*99)
    console.log(this.props.back_status)
    return (
      <>
        <Aux>
        <div className='responsive-div'>
          <Header history={this.props.history} />
          <Row>
            {user_type == 2 || user_type == 3 ? (
              <Col span={6} offset={2} className="layout-padding-margin-1">
                <CompanySidebar
                  location={this.props.location}
                  user_type={user_type}
                  history={this.props.history}
                />
              </Col>
            ) : user_type == 1 ? (
              <Col span={6} offset={2} className="layout-padding-margin-1">
                <CandidateSidebar
                  location={this.props.location}
                  history={this.props.history}
                />
              </Col>
            ) : null}
            <Col span={16} className="layout-padding-margin-2">
              <main>{this.props.children}</main>
              
            </Col>
            
          </Row>
          <Footer />
          {/*<Affix style={{ position: 'fixed', bottom: 20, right: 30 }} >*/}
          {this.props.back_status !== null ? (
            <Tooltip title="3 done">
                <Progress
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                  }}
                  percent={99.9}
                  status="active"
                  style={{position:'fixed', bottom: 20, right: 30 ,width:'20%'}}
                />
            </Tooltip>
          ):null}
          
            {/*</Affix>*/}
        </div>
        </Aux>
      </>
    );
  }
}
const mapStateToProps = (state) => ({                    
    data: state.uploadMediaReducer.data,
    back_status: state.uploadMediaReducer.back_status,
    status: state.uploadMediaReducer.first_status,
})
export default connect(mapStateToProps)(Layout);