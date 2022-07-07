import React, { Component } from 'react';
// import '../topNav.css';
import {Row, Col, Input, Select, Button, Badge, Form} from 'antd';
import {
  SearchOutlined,
  FileTextFilled,
  EnvironmentFilled,
  CheckCircleFilled
} from '@ant-design/icons';

import Header from '../header/header.js'
import Footer from './footer';
import {Link, Route, Switch } from 'react-router-dom';
import './Landing.css';
import './footer.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SimpleSlider from './slider';
import { Slide } from 'react-toastify';

const Option = {Select}

const Features =(props) =>{  

    return (
      <div className='responsive-div'>
        <Header/>
        <div className='home-outer-div' style={{backgroundColor:"white"}} >
        <img className='top-img' src={process.env.PUBLIC_URL + "/growth-feature.png"}/>
                    
                     
        
        <div className='slider-look' style={{alignItems:'center', backgroundColor:'#F4F6F9', width:'100%'}}>
            <div className='slider-heading' >Features</div>
            <SimpleSlider />
        </div>
        <div className='feature-desc'>
            <div className='follow-up'>
                <Row className='follow-up-heading'>Follow up on every deal</Row>
                <hr className='follow-up-line'/>
                <Row>
                    <Col span={20} className="follow-up-para">
                    Each time someone is interested in one of your products or
                     services or to respond to one of your mission/ advice requests,
                      you will receive a notification
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop:50}}>
                    <Col span={12} >
                        <div className='follow-up-blocks' style={{marginRight:'25px'}}>
                            <h3 className='inside-fblock'>Product / Services</h3>
                            <Row style={{marginTop:'30px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Insert the products / Services / Missions that you offer in unlimited number.</Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>You are notified by email as soon as a person / company is interested in one of your products / services.</Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className='follow-up-blocks' style={{marginLeft:'25px'}}>
                            <h3 className='inside-fblock'>Delivery</h3>
                            <Row style={{marginTop:'30px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Look at the mission searches offered by other companies. </Col>
                            </Row>
                            <Row style={{marginTop:'20px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Send / receive proposals from companies concerning offers of assignments /advice and con tract directly without our intermediation.</Col>
                            </Row>
                        </div>
                    </Col>
                    
                </Row>
            </div>
            <hr className='feature-hr'/>
            <div className='follow-up' style={{marginTop:50}}>
                <Row className='follow-up-heading'>Follow up on every application</Row>
                <hr className='follow-up-line'/>
                <Row>
                    <Col span={20} className="follow-up-para">Whenever your company needs to find new collaborators, you can freely post any type of job or mission offer. You can follow and examine each application, contact them directly, discuss with them via the mailbox
                    </Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={24} >
                        <div className='follow-up-blocks'>
                            <Row style={{marginTop:'25px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Post all your job offers, missions, etc.</Col>
                            </Row>
                            <Row style={{marginTop:'28px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>View applications by offer.</Col>
                            </Row>
                            <Row style={{marginTop:'28px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Manage candidate applications in a simple and efficient way; and have your own career page.</Col>
                            </Row>
                            <Row style={{marginTop:'28px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='para-fblock'>Get in touch with the applications that interest you directly</Col>
                            </Row>
                        </div>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span={9} color='red'>
                        <img className="feature-lady" src={process.env.PUBLIC_URL + "/features-women.jpg"}/>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13} className="side-para">
                        <Row className='follow-up-heading'>
                            Visibility for Customer & Candidate experience
                        </Row>
                        <p className="follow-up-para" style={{paddingTop:28}}>
                            You can enrich your company file, your job offers, 
                            your products and services with beautiful medias in order to highlight your skills, 
                            your values in order to attract customers and the best candidates.
                        </p>
                        <Row style={{marginTop:'16px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='follow-up-para'>
                                    Add, modify as many medias as you want.
                                </Col>
                        </Row>
                        <Row style={{marginTop:'16px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='follow-up-para'>
                                    Enter your data, update them and find them on a single screen.
                                </Col>
                        </Row>
                        <Row style={{marginTop:'16px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='follow-up-para'>
                                    Highlight your company profile on your sector of activity to be seen during the searches.
                                </Col>
                        </Row>
                        <Row style={{marginTop:'16px'}}>
                                <Col span={1} align='center' >
                                    <Badge color="#D46161" style={{paddingTop:'6px'}}/>
                                </Col>
                                <Col span={23} className='follow-up-para'>
                                    Share your great company profile, job offers, products and services on social networks easily to increase your sales and applications.
                                </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            
         
        </div>
        <div className="feature-button">
            <Button type="primary" size='large' className="feature-button-style">Try JobHunt Now</Button>                            
        </div> 
        </div>
        <div className='fotter-modif'>
            <Footer/>    
        </div>      
        

      </div>
    );
}

export default Features;

