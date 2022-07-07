import React, { Component } from 'react';
import CompanySidebar from '../sidebar/sidebar_for_company';
import CandidateSidebar from '../sidebar/sidebar_for_candidate';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import Header from "../header/header"
import { Row, Col } from 'antd';
import Aux from '../../Hoc/Auz';
import './layout.css';
class Layout extends Component {
  render() {
    const user_type = JSON.parse(localStorage.getItem('user_type') || false);
    return (
      <>
        <Aux>
        <div className='responsive-div'>
          <Header history={this.props.history} />
          <Row>
            {user_type == 2 ? (
              <Col span={6} offset={2} className="layout-padding-margin-1">
                <CompanySidebar
                  location={this.props.location}
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
        </div>
        </Aux>
      </>
    );
  }
}
export default Layout;