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
