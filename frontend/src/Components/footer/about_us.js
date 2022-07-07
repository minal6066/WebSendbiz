import React, { Component } from 'react';
// import '../topNav.css';
import {Row, Col, Input, Select, Button, Form} from 'antd';
import Header from '../header/header.js'
import Footer from './footer';
import {Link, Route, Switch } from 'react-router-dom';
import './Landing.css';
import './footer.css';

const Option = {Select}

const AboutUs =(props) =>{  

    return (
      <div className='responsive-div' style={{margin:0, padding:0}}>
        <Header/>
        <div className='home-outer-div' style={{backgroundColor:'#F4F6F9'}}>
            {/* <div className='head-block'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={9} className="head-solution">
                        <Row>Your One stop Solution for HR to Sales</Row>
                        <Row>
                            <Col span={20}>
                                <p className="head-para" >
                                    Sen<span style={{color:'#bf0000', fontWeight:700}}>db</span>iz connects your SME to job seekers and buyers
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div> */}
            <img className='top-img' src={process.env.PUBLIC_URL + "/aboutus-bg.png"}/>

            <Row>
                <Col span={1}></Col>
                <Col span={22} className="red-tab">
                    Jo<b>bH</b>unt has been a part of over <b>50 million</b> Companies</Col>
                <Col span={1}></Col>
            </Row>
            <Row gutter={50}>
                <Col span={1}></Col>
                <Col span={11}>
                    <div className="about-box">
                        <img className="box-icon" src={process.env.PUBLIC_URL + "/growth-icon.png"}/>
                        <div className="box-heading">Ecosystem for Growth</div>
                        <p className="box-para">
                            JobHunt is a marketplace to list your company, build your brand, and achieve the growth you deserve.
                            <br/>Make your company profile with our in-built feature of images, videos, and blog. 
                            <br/>• List your products/services, collaborators, jobs, news 
                            <br/>• Gain the reviews from your target customers Today, visibility is a major asset in the development of companies, in recruitment and sales. With JobHunt you can make your company famous all over the world
                        </p>
                    </div>
                </Col>
                <Col span={11}>
                    <div class="about-box">
                        <img className="box-icon join-icon" src={process.env.PUBLIC_URL + "/join.png"}/>
                        <div className="box-heading">How to join us now</div>
                        <p className="box-para">
                            You can join and avail all the benefits of JobHunt in 3 small steps
                            <br/>• Purchase our subscription package 
                            <br/>• Make your JobHunt profile
                            <br/>• List all the possible information Our mission is the growth of VSEs / SMEs. 
                            We have designed a platform which will take your business from local to global. Jobs at JobHunt offer many opportunities in a simpler, more pleasant and more productive manner. JobHunt's e-comm section helps to grow and promote products that are good for the planet
                        </p>
                    </div>
                </Col>
                <Col span={1}></Col>
            </Row>
            
        </div>
        <Footer/>
      </div>
    );
}

export default AboutUs;

