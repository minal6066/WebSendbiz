import React, { Component } from 'react';
import Box from '../candidate/box.js';
import Footer from '../footer/footer.js';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class SideNav extends Component {
  gotoEditCompanyProfile() {
    this.props.history.push('/edit/company/profile');
  }
  gotoEditCompanyMailbox() {
    console.log('');
  }
  gotoEditCompanyBilling() {
    console.log('');
  }
  gotoEditCompanyStatistics() {
    console.log('');
  }
  gotoEditCompanyJobs() {
    console.log('');
  }
  gotoEditCompanyAppliedCandidates() {
    console.log('');
  }
  gotoEditCompanyResume() {
    console.log('');
  }
  gotoEditCompanyAppliedJob() {
    console.log('');
  }
  gotoEditCompanyService() {
    console.log('');
  }
  gotoEditCompanyProduct() {
    console.log('');
  }
  gotoEditCompanyNews() {
    console.log('');
  }
  gotoEditCompanyInterested() {
    console.log('');
  }
  gotoEditCompanyEvents() {
    console.log('');
  }
  gotoEditCompanyMailbox() {
    console.log('');
  }
  render() {
    return (
      <Sider
        style={{ background: 'none', width: 'auto' }}
        className="site-layout-background main-margin-left-for-edit-profile"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <h6
            className="margin-top-for-side-nav-head bold-family profile-head-font"
            style={{ paddingLeft: 32 }}
          >
            Basic
          </h6>
          <Menu.Item
            className="sider-nav sider-nav-active m-0"
            onClick={this.gotoEditCompanyProfile.bind(this)}
            key="1"
          >
            <img src={process.env.PUBLIC_URL + '/user-circle.png'} />
            &nbsp;&nbsp;Profile
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyBilling.bind(this)}
            key="2"
          >
            <img src={process.env.PUBLIC_URL + '/billing.svg'} />
            &nbsp;&nbsp;Billing Overview
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyStatistics.bind(this)}
            key="3"
          >
            <img src={process.env.PUBLIC_URL + '/chart-pie.png'} />
            &nbsp;&nbsp;Statistics
          </Menu.Item>

          <h6
            className="margin-top-for-side-nav-head bold-family profile-head-font"
            style={{ paddingLeft: 32 }}
          >
            Recruitment
          </h6>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyJobs.bind(this)}
            key="4"
          >
            <img src={process.env.PUBLIC_URL + '/briefcase.png'} />
            &nbsp;&nbsp;Jobs
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyAppliedCandidates.bind(this)}
            key="5"
          >
            <img src={process.env.PUBLIC_URL + '/users.svg'} />
            &nbsp;&nbsp;Applied Candidates
          </Menu.Item>
          <h6
            className="margin-top-for-side-nav-head bold-family profile-head-font"
            style={{ paddingLeft: 32 }}
          >
            Consulting
          </h6>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyResume.bind(this)}
            key="6"
          >
            <img src={process.env.PUBLIC_URL + '/page-content.png'} />
            &nbsp;&nbsp;Resume
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyAppliedJob.bind(this)}
            key="7"
          >
            <img src={process.env.PUBLIC_URL + '/page-check.png'} />
            &nbsp;&nbsp;Applied Job
          </Menu.Item>
          <h6
            className="margin-top-for-side-nav-head bold-family profile-head-font"
            style={{ paddingLeft: 32 }}
          >
            Business
          </h6>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyService.bind(this)}
            key="8"
          >
            <img src={process.env.PUBLIC_URL + '/search.svg'} />
            &nbsp;&nbsp;Service
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyProduct.bind(this)}
            key="9"
          >
            <img src={process.env.PUBLIC_URL + '/laptop.svg'} />
            &nbsp;&nbsp;Product
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyNews.bind(this)}
            key="10"
          >
            <img src={process.env.PUBLIC_URL + '/newspaper.svg'} />
            &nbsp;&nbsp;News
          </Menu.Item>
          <Menu.Item
            className="sider-nav m-0"
            onClick={this.gotoEditCompanyInterested.bind(this)}
            key="11"
          >
            <img src={process.env.PUBLIC_URL + '/bookmark.svg'} />
            &nbsp;&nbsp;Interested
          </Menu.Item>
          <Menu.Item
            className="sider-nav"
            onClick={this.gotoEditCompanyEvents.bind(this)}
            key="12"
          >
            <img src={process.env.PUBLIC_URL + '/events.svg'} />
            &nbsp;&nbsp;Events
          </Menu.Item>
          <h6
            className="margin-top-for-side-nav-head bold-family profile-head-font"
            style={{ paddingLeft: 32 }}
          >
            Contact
          </h6>
          <Menu.Item
            className="sider-nav "
            onClick={this.gotoEditCompanyMailbox.bind(this)}
            key="13"
            style={{ marginBottom: 35 }}
          >
            <img src={process.env.PUBLIC_URL + '/inbox.png'} />
            &nbsp;&nbsp;Mailbox
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideNav;
