import React, { Component } from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
import AllTabs from '../../layout/tabsComponent.js';
import CompanyPeople from './companyPeople_card.js';
import Product from './product_card.js';
import Event from './event_card';
import Services from './services_card.js';
import News from './news_card.js';
import Jobs from './job_card';

import { SearchOutlined } from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';

const { Option } = Select;

export default class InterestedListWrapper extends Component {
  render() {
    let tabs = [
      // { tabname: 'PEOPLE/COMPANIES', comp: <CompanyPeople /> },
      { tabname: 'PRODUCTS', comp: <Product /> },
      // { tabname: 'NEWS', comp: <News /> },
      { tabname: 'SERVICES', comp: <Services /> },
      { tabname: 'Event', comp: <Event /> },

      // { tabname: 'JOBS', comp: <Jobs /> },
    ];
    return (
      <div>
        <span className="header-text">Interested List</span>
        {/* <Row className="services-header" justify="space-between">
          <Col span={12}>
          </Col>
        </Row> */}
        <AllTabs company_tabs={tabs} class={'company_profile_main_tabs'} />
      </div>
    );
  }
}
