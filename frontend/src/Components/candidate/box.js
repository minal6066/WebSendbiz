import React, { Component } from 'react';
import './profile.css';
import {Button, Menu, Dropdown, Avatar, Image} from 'antd';
import { UserOutlined, MessageFilled, NotificationFilled, BellFilled } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


var ls = require('local-storage');
const usertype = ls.get('user_type');
const profileComp = (props) => (
  <Menu>
    <Menu.Item className='dropdown-text' onClick={() => {
        window.location.href = usertype === 2 ? '/edit/company/profile' : '/profile';
      }
    }
    >
      Profile
    </Menu.Item>
    <Link to={usertype === 2 ? '/edit/company/profile' : '/profile'}>
      <Menu.Item className='dropdown-text'
      >
        <a>Logout</a>
      </Menu.Item>
    </Link>
  </Menu>
);
const UserDropDown = (props) => {
  return (
    <Dropdown overlay={profileComp(props)} placement="bottomLeft">
      {/* <Button type="text" style={{ color: "white" }}> */}
      <div>
      <Avatar style={{ verticalAlign: 'text-top', cursor:'pointer' }} icon={<UserOutlined/>} 
      // src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      />
      </div>
      {/* </Button> */}
    </Dropdown>
  );
};

class Box extends Component {
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
  // goJob=()=>{
  //   this.props.history.push("/Sctreen14")
  // }
  render() {
    console.log(this.props)
    console.log(this.props.user ? this.props.user : '', 'login');
    var ls = require('local-storage');
    const loginStatus = ls.get('token') ? true : false;
    const usertype = ls.get('user_type');
    return (
      <>
        <nav
          className="navbar  navbar-expand-lg navbar-light bg-light p-0"
          style={{ height: 80 }}
        >
          <Link to={usertype === 2 ? '/edit/company/profile' : '/profile'}>
            <div className={'ml-3'}>
              <img
                src={process.env.PUBLIC_URL + '/db_login.png'}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'black', fontWeight: 600 }}>JOBHUNT</span>
            </div>
          </Link>
          <div className="navcomp">
            <form className="form-inline" style={{ marginRight: 45 }}>
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
                  <MessageFilled className='top-nav-icons'/>
                </li>
                <li className="nav-item">
                  <BellFilled className='top-nav-icons'/>
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
                  <UserDropDown/>
                </li>
              </ul>
            </form>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = ({ AuthReducer: { user } }) => ({ user });
export default connect(mapStateToProps)(Box);
