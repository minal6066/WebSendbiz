import React, { Component, useState } from 'react';
// import '../topNav.css';
import { Row, Col, Input, Select, Button, Form, AutoComplete } from 'antd';
import {
  SearchOutlined,
  FileTextFilled,
  EnvironmentFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import Header from './header/header';
import Footer from './footer/footer';
import { Link, Route, Switch } from 'react-router-dom';
import { ImageUrl } from '../Shared/imageUrlPath';
import './Landing.css';
import HeaderLocation from './headerLocation/headerLocation';
import APIManager from '../APIManager';

const Option = { Select };
// const renderTitle = (title) => {
//   return (
//     <span>
//       {"companies"}
//       <a
//         style={{
//           float: 'right',
//         }}
//         href="https://www.google.com/search?q=antd"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         more
//       </a>
//     </span>
// );
const Landing = (props) => {
  const [current_location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [tags, setTags] = useState('');
  const [searchValue, setsearchValue] = useState('');
  const [compOptions, setcompOptions] = useState([]);
  const renderSignUp = () => {
    console.log('props:', props);
    props.history.push({
      pathname: '/signup',
    });
  };
  const takecurrentLocation = (value) => {
    console.log(value);
    setLocation(value);
  };
  const takeLatLong = (lat, long) => {
    console.log(lat, long);
    setLat(lat);
    setLong(long);
    // this.setState({
    //     lat:lat,
    //     long: long
    // })
  };
  const getlistForDropDown = () => {
    console.log('hello');
  };
  const handleAutoChange = (value) => {
    console.log(value);
    setsearchValue(value);
  };
  const handleTagsChange = (value) => {
    console.log(value);
    setTags(value);
  };
  const handleSearchButton = (values) => {
    console.log('hello', values);
    if (values.tags === '1') {
      props.history.push({
        pathname: '/CompanyList',
        state: {
          comp_name: values.search,
          location: current_location,
        },
      });
    } else if (values.tags === '2') {
      props.history.push({
        pathname: '/all_jobs',
        state: {
          job_name: values.search,
          location: current_location,
        },
      });
    } else if (values.tags === '3') {
      props.history.push({
        pathname: '/products',
        state: {
          prod_name: values.search,
          location: current_location,
        },
      });
    } else if (values.tags === '4') {
      props.history.push({
        pathname: '/services',
        state: {
          ser_name: values.search,
          location: current_location,
        },
      });
    } else if (values.tags === '5') {
      props.history.push({
        pathname: '/news',
        state: {
          news_name: values.search,
          location: current_location,
        },
      });
    } else if (values.tags === '6') {
      props.history.push({
        pathname: '/events',
        state: {
          event_name: values.search,
          location: current_location,
        },
      });
    }
  };
  const handleSearch = (value) => {
    console.log(value);
    let options = [];
    if (tags !== '' || current_location !== '') {
      if (tags === '1') {
        // console.log(1)
        APIManager.companyListSortAndSearch(1, value.toLowerCase()).then(
          (resp) => {
            resp.data.data.map((data) => {
              console.log(data);
              options.push({
                label: data.comp_info ? data.comp_info.comp_name : '',
                value: data.comp_info ? data.comp_info.comp_name : '',
                key: data._id,
              });
            });
            setcompOptions(options);
          }
        );
      } else if (tags === '2') {
        // console.log(2)
        APIManager.allJobsSearchLanding(1, value.toLowerCase()).then((resp) => {
          console.log(resp);
          resp.data.data.map((data) => {
            options.push({
              label: data ? data.title : '',
              value: data.title,
              key: data._id,
            });
          });
          setcompOptions(options);
        });
      } else if (tags === '3') {
        // console.log(3)
        APIManager.allProductsSearchLanding(1, value.toLowerCase()).then(
          (resp) => {
            console.log(resp);
            resp.data.data.map((data) => {
              options.push({
                label: data ? data.name : '',
                value: data.name,
                key: data._id,
              });
            });
            setcompOptions(options);
          }
        );
      } else if (tags === '4') {
        // console.log(4)
        APIManager.allServicesSearchLanding(1, value.toLowerCase()).then(
          (resp) => {
            console.log(resp);
            resp.data.data.map((data) => {
              options.push({
                label: data ? data.name : '',
                value: data.name,
                key: data._id,
              });
            });
            setcompOptions(options);
          }
        );
      } else if (tags === '5') {
        // console.log(5)
        APIManager.newsListSearchLanding(1, value.toLowerCase()).then(
          (resp) => {
            console.log(resp);
            // resp.data.data.map((data) => {
            //     options.push(
            //         {
            //             label: data ? data.name : "",
            //             value: data.name,
            //             key: data._id
            //         }
            //     )
            // })
            // setcompOptions(options)
          }
        );
      } else if (tags === '6') {
        // console.log(6)
        APIManager.allEventsSearchLanding(1, value.toLowerCase()).then(
          (resp) => {
            console.log(resp);
            resp.data.data.map((data) => {
              options.push({
                label: data ? data.name : '',
                value: data.name,
                key: data._id,
              });
            });
            setcompOptions(options);
          }
        );
      }
    }
  };
  const urll = process.env.PUBLIC_URL + '/About_back.png';
  const services_url = process.env.PUBLIC_URL + '/services.png';
  const products_url = process.env.PUBLIC_URL + '/products.png';
  const jobs_url = process.env.PUBLIC_URL + '/jobs.png';

  return (
    <div className="responsive-div">
      <Header />
      <div className="home-outer-div">
        <div className="welcome-div">
          <div className="welcome-title">
            Welcome to Jo<span style={{ color: '#B02318' }}>bH</span>unt
          </div>
          <div className="welcome-subtext">
            Find Companies . Jobs . Products . Events & Services
          </div>
          <Form onFinish={handleSearchButton}>
            <Row gutter={16}>
              <Col span={7} offset={4}>
                <Form.Item
                  rules={[{ required: true, message: 'Required field' }]}
                  name="search"
                >
                  <AutoComplete
                    options={compOptions}
                    onSearch={handleSearch}
                    name="search"
                    onChange={handleAutoChange}
                    className="landing-input-fields ls-1 ls-outline"
                  >
                    <Input
                      className="ls-outline"
                      prefix={<SearchOutlined className="landing-icons" />}
                      placeholder="Search Job title or Key word"
                    />
                  </AutoComplete>
                </Form.Item>
              </Col>
              <Col span={4}>
                <FileTextFilled className="landing-icons-1 landing-select-icon" />
                <Form.Item
                  rules={[{ required: true, message: 'Required field' }]}
                  name="tags"
                >
                  <Select
                    placeholder="Categories"
                    onChange={handleTagsChange}
                    name="tags"
                    className="landing-input-fields"
                    dropdownClassName="landing-dropdown"
                  >
                    <Option value="1">Companies</Option>
                    <Option value="2">Jobs</Option>
                    <Option value="3">Products</Option>
                    <Option value="4">Services</Option>
                    <Option value="5">News</Option>
                    <Option value="6">EVENTS</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                {/*<EnvironmentFilled className='landing-icons landing-select-icon'/>
                                <Select placeholder='Location' className='landing-input-fields' dropdownClassName='landing-dropdown'>
                                    <Option value='1'>Paris</Option>
                                    <Option value='2'>Tokyo</Option>
                                    <Option value='3'>US</Option>
                                </Select>*/}
                <HeaderLocation
                  envclass="landing-icons landing-select-icon"
                  className="input-field-custom-type-1-left search-outline-padding"
                  takecurrentLocation={takecurrentLocation}
                  takeLatLong={takeLatLong}
                />
              </Col>
              <Col span={3}>
                <Button
                  htmlType="submit"
                  onClick={handleSearchButton}
                  className="landing-btn"
                >
                  SEARCH
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="offerings-div">
          <div className="offerings-title">Our offerings</div>
          <Row justify={'space-around'}>
            <Col span={7}>
              <Link to="/products" className="landing-link">
                <div
                  className="offerings-card"
                  style={{ backgroundImage: `url(${products_url})` }}
                >
                  <div className="o-card-title">Products</div>
                  <div className="o-card-subtext">
                    Buy from a variety of product range from different
                    companies.
                  </div>
                </div>
              </Link>
            </Col>
            <Col span={7}>
              <Link to="/all_jobs" className="landing-link">
                <div
                  className="offerings-card"
                  style={{ backgroundImage: `url(${jobs_url})` }}
                >
                  <div className="o-card-title">Jobs</div>
                  <div className="o-card-subtext">
                    Apply to as many jobs from different companies.
                  </div>
                </div>
              </Link>
            </Col>
            <Col span={7}>
              <Link to="/services" className="landing-link">
                <div
                  className="offerings-card"
                  style={{ backgroundImage: `url(${services_url})` }}
                >
                  <div className="o-card-title">Services</div>
                  <div className="o-card-subtext">
                    Avail from a bunch of services provided by different
                    companies.
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
        <div className="caters-div">
          <div className="caters-title">JobHunt caters to</div>
          <div className="caters-cad-outer-div">
            <div className="caters-card">
              <Row>
                <Col span={24}>
                  <div className="caters-card-title">For Companies</div>
                  <div className="caters-card-subtext">
                    <span style={{ color: '#B02318' }}> Companies: </span>Get
                    started!
                  </div>
                </Col>
                <Col span={18} offset={6}>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Post Jobs</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Post Missions</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Post Services</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Select Resumes</span>
                  </div>
                </Col>
                <Col span={12} offset={6} style={{ marginTop: '30px' }}>
                  <Button className="landing-signup-btn" onClick={renderSignUp}>
                    SIGN UP
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="caters-card" style={{ marginRight: '0' }}>
              <Row>
                <Col span={24}>
                  <div className="caters-card-title">For People</div>
                  <div className="caters-card-subtext">
                    Create your{' '}
                    <span style={{ color: '#B02318' }}> profile</span> now!
                  </div>
                </Col>
                <Col span={18} offset={8}>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Post your Resume</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Apply Jobs</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Apply Missions</span>
                  </div>
                  <div className="unlimited-div">
                    <CheckCircleFilled className="caters-icons" />
                    <span className="caters-subtext-2">Buy Products</span>
                  </div>
                </Col>
                <Col span={12} offset={6} style={{ marginTop: '30px' }}>
                  <Button className="landing-signup-btn" onClick={renderSignUp}>
                    SIGN UP
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div
          className="about-us-div"
          style={{ backgroundImage: `url(${urll})` }}
        >
          <div className="about-title">About JobHunt</div>
          <div className="about-subtext">
            JobHunt is a platform that allows micro, small and medium sized
            companies to present information, jobs , products / service and
            events, they offer in an ergonomic way. Worldwide, we give great
            visibility to millions of companies who can promote themselves,
            recruit , sell their products / services.
          </div>
        </div>
        <div className="contact-div">
          <div className="contact-head">Contact us</div>
          <div className="contact-subtext">
            We are there to answer all your questions. We are dedicated to
            provide a spontaneous customer service. Our team will get back to
            you. Just leave your Email Id.
          </div>
          <Form>
            <Row>
              <Col span={10} offset={7} style={{ paddingLeft: '20px' }}>
                <Form.Item
                  name="email"
                  rules={[{ type: 'email', message: 'Enter a valid email' }]}
                  validateTrigger="onBlur"
                >
                  <Input
                    placeholder="Enter Email Id"
                    className="landing-input-fields"
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={10} style={{ paddingLeft: '30px' }}>
                <Form.Item name="contact-btn" style={{ marginBottom: '0' }}>
                  <Button className="landing-signup-btn" htmlType="submit">
                    CONTACT US
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
