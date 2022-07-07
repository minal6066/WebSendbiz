import React, { Component } from 'react';
import CompanySidebar from '../sidebar/sidebar_for_company';
import CandidateSidebar from '../sidebar/sidebar_for_candidate';
import Box from '../candidate/box';
import Footer from '../footer/footer';
import Header from "../header/header"
import { Row, Col } from 'antd';
import Aux from '../../Hoc/Auz';
// import './layout.css';

class TopLayout extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Aux>
        <div className='responsive-div'>
          <Header history={this.props.history} />
          
            <main>{this.props.children}</main>

          <Footer />
        </div>
        </Aux>
      </>
    );
  }
}

export default TopLayout;
