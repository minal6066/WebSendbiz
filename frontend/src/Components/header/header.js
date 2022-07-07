import React, { Component } from 'react';
// import '../candidate/profile.css';
import './header.css';
import { Button, Menu, Dropdown, Avatar, Image } from 'antd';
import {
  UserOutlined,
  MessageFilled,
  NotificationFilled,
  BellFilled,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HELPERS from '../../APIManager/helper';
import logo from '../../Components/asset/Group 314.svg';
import userDefaultPic from '../../Components/asset/user.svg';
import { withRouter } from 'react-router-dom';
import APIManager from '../../APIManager/index';

var ls = require('local-storage');
const usertype = ls.get('user_type');
let user_type = JSON.parse(localStorage.getItem('user_type') || false);
const user_type2 = JSON.parse(localStorage.getItem('user_type2') || false);
let type_of_user = HELPERS.isNumber(user_type);
let type_of_user2 = HELPERS.isNumber(user_type2);
console.log(type_of_user, type_of_user2);
if (type_of_user === 'number' && type_of_user2 === 'number') {
  user_type = user_type / (user_type2 * 99);
} else {
  localStorage.clear();
  user_type = 10;
}
const profileComp = (props) => (
  <Menu>
    <Menu.Item
      className="dropdown-text"
      onClick={() => {
        window.location.href =
          user_type === 2 || user_type === 3
            ? '/edit/company/profile'
            : '/profile';
      }}
    >
      Profile
    </Menu.Item>
    <Menu.Item
      className="dropdown-text"
      onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}
    >
      <a>Logout</a>
    </Menu.Item>
  </Menu>
);
const UserDropDown = (props) => {
  console.log(user_type);
  const displayPicture = props.displayPicture;
  const logo = props.logo;
  var ls = require('local-storage');
  var picture = ls.get('displayPicture');
  return (
    <>
      {props.loginStatus ? (
        <Dropdown overlay={profileComp(props)} placement="bottomLeft">
          <div>
            <Avatar
              style={{ verticalAlign: 'text-top', cursor: 'pointer' }}
              icon={<UserOutlined />}
              src={userDefaultPic}
            />
          </div>
        </Dropdown>
      ) : (
        <Link to="/login">
          <button
            className="btn btn-dark login-home-btn"
            // onClick={() => {
            //     // window.location.href = '/login';
            //     // this.props.history.push('/login');

            //   }
            // }
          >
            Login
          </button>
        </Link>
      )}
    </>
  );
};

class Header extends Component {
  componentDidMount() {
    APIManager.companyInfo();
  }
  handleLogout() {
    if (this.props.login === true) {
      localStorage.clear();
      window.location.reload(false);
    } else {
      var ls = require('local-storage');
      ls.clear();
      this.props.history.push('/');
    }
  }
  render() {
    var ls = require('local-storage');
    const loginStatus = ls.get('token') ? true : false;
    const usertype = ls.get('user_type');

    // const displayPicture = this.props.data
    //   ? this.props.data.data.data.logo.path
    //   : '';
    // ls.set('displayPicture', displayPicture);
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div>
            <img
              src={logo}
              onClick={() => {
                this.props.history.push('/');
              }}
              width="120"
              height="150"
              className="d-inline-block"
              alt=""
              style={{ verticalAlign: 'middle', marginTop: '-10px' }}
            />
          </div>
          <div className="navcomp">
            <form className="form-inline">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink to={'/CompanyList'} className="nav-link" href="#">
                    Companies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/all_jobs'} className={'nav-link'}>
                    Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/products'} className="nav-link">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/services'} className="nav-link">
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/news'} className="nav-link">
                    News
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/events'} className="nav-link">
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <MessageFilled className="top-nav-icons" />
                </li>
                <li className="nav-item">
                  <BellFilled className="top-nav-icons" />
                </li>
                <li className="nav-item" style={{ paddingRight: 0 }}>
                  {/* <a className="nav-link" href="#">
                    {loginStatus ? (
                      <button
                        className="btn btn-dark login-home-btn"
                        onClick={this.handleLogout.bind(this)}
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        className="btn btn-dark login-home-btn"
                        onClick={this.handleLogout.bind(this)}
                      >
                        Login
                      </button>
                    )}
                  </a> */}
                  <UserDropDown
                    loginStatus={loginStatus}
                    // displayPicture={displayPicture}
                    logo={logo}
                  />
                </li>
              </ul>
            </form>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    data: state.companyInfoReducer.data,
  };
};
export default withRouter(connect(mapStateToProps)(Header));
