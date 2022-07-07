import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Input, Select, Button, Badge, Switch, Form } from 'antd';
import PaymentModalCard from '../paymentCard/selectPayment';
import Header from '../header/header.js';
import Footer from './footer';
import './Landing.css';
import './footer.css';
import { DownOutlined, CheckCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import APIManager from '../../APIManager';
const Option = { Select };

const PlanCards = (props) => {
  const [isPremium, setIsPremium] = useState('');
  useEffect(
    () => {
      APIManager.companyInfo().then((response) => {
        if (response.data.isSuccess) {
          setIsPremium(response.data.data.data.isPremium)
        }
      });
    }
  )

  const [PaymentModal, showPaymentModal] = useState(false);
  const isMonthly = props.user ? props.user.data.data.isMonthlyPremium : '';
  const [isMonthlyPlan, setisMonthlyPlan] = useState(isMonthly);
  console.log(props.user ? props.user.data.data.isPremium : '', 'porps');
  const switchPlan = (checked) => {
    setisMonthlyPlan(!isMonthlyPlan);
    var ls = require('local-storage');
    ls.set('setisMonthlyPlan', isMonthly);
    if (checked) {
      console.log(isMonthly);
    }
  };

  return (
    <>
      {PaymentModal ? (
        <PaymentModalCard
          show={PaymentModal}
          onHide={() => showPaymentModal(false)}
        />
      ) : (
        ''
      )}
      <Row
        style={{
          backgroundColor: '#F4F6F9',
          paddingTop: '60px',
          paddingBottom: '50px',
        }}
      >
        <Col span={4}></Col>

        <Col
          span={7}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            marginLeft: '30px',
            padding: '0px',
            //marginBottom: '100px'
          }}
        >
          {!isPremium && (
            <img
              className="current-img"
              src={process.env.PUBLIC_URL + '/current-plan.png'}
            />
          )}
          <div className="plan-heading mt-5">FREEMIUM PLAN</div>
          <div className="plan-free">FREE</div>
          <div className="plan-points">
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Creation of the free company page{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited Media{' '}
              </span>
            </div>

            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited No. of posts{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of resumes{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of responses
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited interest on products
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited interest for services
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of users
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">5 Job Offers</span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                5 Products or Services
              </span>
            </div>
          </div>
        </Col>
        <Col
          span={7}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            marginLeft: '30px',
            padding: '0px',
          }}
        >
          <div className="current-img" />
          {isPremium && (
            <img
              className="current-img"
              src={process.env.PUBLIC_URL + '/current-plan.png'}
            />
          )}
          <div className="plan-heading mt-5">ESSENTIAL PLAN</div>
          <div className="plan-free">
            <span className="plan-dollar">$</span>
            <b>15</b>
            <span className="plan-month">/MO.</span>
          </div>
          <div className="plan-points" style={{ marginTop: '30px' }}>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Creation of the free company page{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited Media{' '}
              </span>
            </div>

            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited No. of posts{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of resumes{' '}
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of responses
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited interest on products
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited interest for services
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited no. of users
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited Job Offers
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">
                Unlimited Products or Services
              </span>
            </div>
            <div className="unlimited-div">
              <CheckCircleFilled className="caters-icons plan-icons" />
              <span className="caters-subtext-2 plan-items">1 User</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              className="buy-now"
              onClick={() => showPaymentModal(true)}
              disabled={isPremium}
            >
              Buy Now
            </Button>
            <div className="plan-toggle">
              Monthly&nbsp;&nbsp;
              <Switch
                defaultChecked
                defaultValue={isMonthlyPlan}
                onChange={switchPlan}
                disabled={isPremium}
              />
              &nbsp;&nbsp;Yearly
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    isloading: state.AuthReducer.isloading,
  };
};
export default connect(mapStateToProps)(PlanCards);
