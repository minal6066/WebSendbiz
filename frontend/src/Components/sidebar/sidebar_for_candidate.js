import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb,Row,Col,Input } from 'antd';
class SideNavforCandidate extends Component {
  render() {
    let isProfile = false;
    let isStat = false;
    let isCandi = false;
    let isResume = false;
    let isAppliedJobs = false;
    let isFavouriteJobs = false;
    let isMailBox = false;
    if (this.props.location.pathname === '/profile') {
      isProfile = true;
    } else if (this.props.location.pathname === '/statistics') {
      isStat = true;
    } else if (this.props.location.pathname === '/candidature') {
      isCandi = true;
    } else if (this.props.location.pathname === '/resume') {
      isResume = true;
    } else if (this.props.location.pathname === '/favouritejobs') {
      isFavouriteJobs = true;
    } else if (this.props.location.pathname === '/appliedjobs') {
      isAppliedJobs = true;
    } else if (this.props.location.pathname === '/mailbox') {
      isMailBox = true;
    }
    return (
      <Row>
          <div className="nav-side-menu">
            <div className="menu-list">
              <h6 className="bold-family profile-head-font">Basic</h6>
              <ul id="menu-content" className="menu-content out">
                <NavLink to={'/profile'}>
                  <li className="sidebar-padding">
                    {isProfile ? (
                      <img src={process.env.PUBLIC_URL + '/user-circle.png'} />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + '/user-circle-white.png'}
                      />
                    )}
                    &nbsp;&nbsp;Profile
                  </li>
                </NavLink>
                <NavLink to={'/statistics'}>
                  <li className="sidebar-padding">
                    {isStat ? (
                      <img
                        src={process.env.PUBLIC_URL + '/chart-pie-red.png'}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/chart-pie.png'} />
                    )}
                    &nbsp;&nbsp;Statistics
                  </li>
                </NavLink>
              </ul>
              <h6 className="margin-top-for-side-nav-head bold-family profile-head-font">
                Recruitment
              </h6>
              <ul id="menu-content" className="menu-content out">
                <NavLink to={'/candidature'}>
                  <li className="sidebar-padding">
                    {isCandi ? (
                      <img
                        src={process.env.PUBLIC_URL + '/page_content_red.png'}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/page_content.png'} />
                    )}
                    &nbsp;&nbsp;Candidature
                  </li>
                </NavLink>
                <NavLink to={'/resume'}>
                  <li className="sidebar-padding">
                    {isResume ? (
                      <img
                        src={process.env.PUBLIC_URL + '/page-content-red.png'}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/page-content.png'} />
                    )}
                    &nbsp;&nbsp;Resume
                  </li>
                </NavLink>
                <NavLink to={'/favouritejobs'}>
                  <li className="sidebar-padding">
                    {isFavouriteJobs ? (
                      <img
                        src={process.env.PUBLIC_URL + '/briefcase-red.png'}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/briefcase.png'} />
                    )}
                    &nbsp;&nbsp;Favourite Jobs
                  </li>
                </NavLink>
                <NavLink to={'/appliedjobs'}>
                  <li className="sidebar-padding">
                    {isAppliedJobs ? (
                      <img
                        src={process.env.PUBLIC_URL + '/page-check-red.png'}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/page-check.png'} />
                    )}
                    &nbsp;&nbsp;Applied Jobs
                  </li>
                </NavLink>
              </ul>
              <h6 className="margin-top-for-side-nav-head bold-family profile-head-font">
                Contact
              </h6>
              <ul id="menu-content" className="menu-content out">
                <NavLink to={'/mailbox'}>
                  <li className="sidebar-padding">
                    {isMailBox ? (
                      <img src={process.env.PUBLIC_URL + '/mailbox_red.png'} />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/inbox.png'} />
                    )}
                    &nbsp;&nbsp;Mailbox
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
      </Row>
    );
  }
}

export default SideNavforCandidate;
