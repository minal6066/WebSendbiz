import React, { Component } from 'react';
import {Row, Col, Input, Select, Button, Badge, Switch, Form} from 'antd';
import Header from '../header/header.js'
import PlanCards from './plan_cards.js'
import Footer from './footer';
import './Landing.css';
import './footer.css';
import {
    DownOutlined,
    CheckCircleFilled
} from '@ant-design/icons';
const Option = {Select}
function switchPlan(checked) {
    console.log(`switch to ${checked}`);
    
}
  
const Price =(props) =>{  

    return (
      <div className='responsive-div'>
        <Header/>
        <div className='home-outer-div' style={{backgroundColor:"white"}} >
            <article className="slogan-price">
                <div className="max-width">
                    <h1 className="title title-slogan-price"><b>Choose your <span style={{color:'#C01718'}}>growth plan</span></b></h1>
                    <p>Choose the package that best suits your business</p>
                </div>
            </article>
            
        </div>
            <div style={{marginTop:'70px'}} >
                <PlanCards/>
            </div>
            <Footer/>    
      </div>
    );
}

export default Price;

