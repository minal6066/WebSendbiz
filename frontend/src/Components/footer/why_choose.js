import React, { Component } from 'react';
// import '../topNav.css';
import {Row, Col, Input, Select, Button, Badge, Form} from 'antd';
import Header from '../header/header.js'
import Footer from './footer';
import {Link, Route, Switch } from 'react-router-dom';
import './Landing.css';
import './footer.css';
import {
    DownOutlined
} from '@ant-design/icons';
const Option = {Select}

const ChooseUs =(props) =>{  

    return (
      <div className='responsive-div'>
        <Header/>
        <div className='home-outer-div' style={{backgroundColor:"white"}} >
        <img className='top-img' src={process.env.PUBLIC_URL + "/choose-bg.png"}/>
        <div className="feature-button">
            <Button type="primary" size='large' className="feature-button-style choose-button">Try JobHunt Now</Button>                            
        </div> 
        <div className="choose-heading">
            Your One stop Solution for HR to Sales
        </div>
        <Row>
            <Col span={2}></Col>
            <Col span={17}>
                <div className="para-heading">
                    JobHunt allows you to create a company profile, list open vacancies, and grow the revenue by selling product /services.
                </div>
                <Row style={{paddingTop:'38px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose"></div>
                    </Col>
                    <Col span={23} className='choose-pink-points'>
                        Company Profile
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} className='choose-points'>
                        Create your company's profile page on JobHunt.
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose"></div>
                    </Col>
                    <Col span={23} className='choose-pink-points'>
                        Brand Awareness
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} className='choose-points'>
                        Use our rich media for brand awareness.
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose"></div>
                    </Col>
                    <Col span={23} className='choose-pink-points'>
                        Job Offers
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} className='choose-points'>
                        List all of your job offerings.
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose"></div>
                    </Col>
                    <Col span={23} className='choose-pink-points'>
                        Product/Services
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} className='choose-points'>
                        Promote your product / services and sell.
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose"></div>
                    </Col>
                    <Col span={23} className='choose-pink-points'>
                        Unlimited Users
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} className='choose-points'>
                        JobHunt Premium Plan offers unlimited users.
                    </Col>
                </Row>
            </Col>
            <Col span={5}></Col>
        </Row>
        <hr className='choose-line'/>
        <div className="choose-heading">
            Exclusively for SME and VSE
        </div>
        <Row>
            <Col span={2}></Col>
            <Col span={17}>
                <div className="para-heading">
                    With JobHunt you thrive from small business to global company   
                </div>
                <Row style={{paddingTop:'38px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose" style={{marginTop:'14px'}}></div>
                    </Col>
                    <Col span={23} className='points-exc'>
                        <span style={{color:'#EE5050', opacity:'0.8'}}>Develop</span> local business
                    </Col>
                </Row>
                <Row style={{paddingTop:'22px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose" style={{marginTop:'14px'}}></div>
                    </Col>
                    <Col span={23} className='points-exc'>
                        <span style={{color:'#EE5050', opacity:'0.8'}}>Promote</span> your product/services
                    </Col>
                </Row>
                <Row style={{paddingTop:'22px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose" style={{marginTop:'14px'}}></div>
                    </Col>
                    <Col span={23} className='points-exc'>
                        <span style={{color:'#EE5050', opacity:'0.8'}}>Increase</span> your sales
                    </Col>
                </Row>
                <Row style={{paddingTop:'22px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose" style={{marginTop:'14px'}}></div>
                    </Col>
                    <Col span={23} className='points-exc'>
                        <span style={{color:'#EE5050', opacity:'0.8'}}>Make</span> B2B connections
                    </Col>
                </Row>
                <Row style={{paddingTop:'22px'}}>
                    <Col span={1}>
                        {/* <Badge color="#D46161"/> */}
                        <div className="dot-choose" style={{marginTop:'14px'}}></div>
                    </Col>
                    <Col span={23} className='points-exc'>
                        <span style={{color:'#EE5050', opacity:'0.8'}}>Grow</span> your business network
                    </Col>
                </Row>

            </Col>
            <Col span={5}></Col>
        </Row>
        <hr className='choose-line'/>
        <div className="choose-heading">
            You can start using Senbiz for free
        </div>
        <Row style={{opacity:1}}>
            <Col span={4}></Col>
            <Col span={7} className="choose-heading regis-plan">
                Register for<br/> a free account
                <br/>
                <DownOutlined className='down-arrow' />
                <br/>
                <Button type="primary" className="now-button" >sign up Now</Button>   
            </Col>
            <Col span={1}></Col>
            <Col span={7} className="choose-heading regis-plan">
                Know the benefits of our Premium Plan
                <br/>
                <DownOutlined className='down-arrow' />
                <br/>
                <Button className="now-button grey-now"  >sign up Now</Button>
            </Col>
            <Col span={4}></Col>
        </Row>
        </div>
        <div className='fotter-modif'>
            <Footer/>    
        </div>      
        

      </div>
    );
}

export default ChooseUs;

