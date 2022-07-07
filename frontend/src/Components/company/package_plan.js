import React, { Component } from 'react';
// import '../topNav.css';
import { Row, Col, Input, Select, Button, Badge, Switch, Form } from 'antd';
import Header from '../header/header.js';
import PlanCards from '../footer/plan_cards.js';
import Footer from '../footer/footer.js';
import '../footer/Landing.css';
import '../footer/footer.css';
import { DownOutlined, CheckCircleFilled } from '@ant-design/icons';
import SavedCards from '../../Components/paymentCard/savedCard';
const Option = { Select };
function switchPlan(checked) {
  console.log(`switch to ${checked}`);
}

const PackagePlan = (props) => {
  return (
    <>
      <div className="responsive-div">
        <Header />
        <img
          className="go-back-plan"
          src={process.env.PUBLIC_URL + '/go-back-1.png'}
          onClick={() => props.history.push("/company/billing")}
        />
        <div className="subs-plan">Subscription Plans</div>
        <div className="pick-plan">Pick your Growth Plan</div>
        <PlanCards />
        <Row style={{ marginTop: '50px' }}>
          {/* <Col span={4}></Col>
          <Col span={16} className="add-on-card">
            <Row gutter={30}>
              <Col span={8}>
                <img
                  className="add-on-img"
                  src={process.env.PUBLIC_URL + '/rect-package.png'}
                />
              </Col>
              <Col span={14}>
                <div className="add-on-heading">Booster Add On</div>
                <div className="add-on-content">
                  To boost your job offers, copany, products and services,
                  Sendbiz offers to put you in the spotlight during searches.
                </div>
                <div className="add-starts">
                  Starts from&nbsp;&nbsp;
                  <span className="add-dollar">
                    $&nbsp;<div className="add-ten">10&nbsp;</div>
                    <span className="add-mo">/MO.</span>
                  </span>
                </div>
              </Col>
            </Row>
          </Col> */}
        </Row>
        <SavedCards />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default PackagePlan;
