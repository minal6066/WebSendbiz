import React, { Component } from "react";
import {Row, Col, Input, Select, Button, Form} from 'antd';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import './footer.css';


class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div >
        <Slider {...settings} style={{alignSelf:"center", padding:'40px'}}>
          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/search2.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Promising prospects</h2>
                </Row>
                <Row>
                    <p className='card-para'>Increase your visibility, promote your work environment, your values, your products, your teams, ... it allows you to find you, to join you and to know your know-how.</p>
                </Row>
            </Col>
          </Row>
          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/money-bag.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Increase your visibility</h2>
                </Row>
                <Row>
                    <p className='card-para'>Acquire more promising prospects, which are transferred to you directly by email and also via the chatbot and a link to your online shop (amazon, your website, ... ).</p>
                </Row>
            </Col>
          </Row>
                      
          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/feature_hired.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Freely recruit</h2>
                </Row>
                <Row>
                    <p className='card-para'>Recruiting is difficult and expensive, with JobHunt we propose that you can post ail job off ers Jobs, missions, internships, ...), manage applications easily and in a way accessible to ail companies.</p>
                </Row>
            </Col>
          </Row>

          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/share2.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Share your news</h2>
                </Row>
                <Row>
                    <p className='card-para'>Make known ail the information concerning your company (new product, presence at an exhibition, job dating,) in order to further improve your visibility and attractivity.</p>
                </Row>
            </Col>
          </Row>
          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/stats.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Statistics</h2>
                </Row>
                <Row>
                    <p className='card-para'>You have access to some statistics about your job offers, your products or services and applications concerning your job offers and missions.</p>
                </Row>
            </Col>
          </Row>
          <Row className="feature-cards" style={{alignSelf:"center"}}>
            <Col span={3}>
                <img src={process.env.PUBLIC_URL + "/project.png"}/>    
            </Col>            
            <Col span={1}></Col>
            <Col span={19}>
                <Row>
                    <h2 className="card-head">Projects & Advices</h2>
                </Row>
                <Row>
                    <p className='card-para'>You have access to some statistics about your job offers, your products or services and applications concerning your job offers and missions.</p>
                </Row>
            </Col>
          </Row>
          
        </Slider>
      </div>
    );
  }
}
export default SimpleSlider;