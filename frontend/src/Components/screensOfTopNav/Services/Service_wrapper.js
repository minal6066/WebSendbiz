import React, { Component } from 'react';
import '../topNav.css';
import Box from '../../candidate/box';
import Footer from '../../footer/footer';
import './ServiceListing.css';
import ServiceListing from './ServiceListing';
import serviceDetail from './ServiceDetail';
import { Route, Switch } from 'react-router-dom';
import Header from "../../header/header"

export default class ServiceWrapper extends Component {  

  render() {

    return (
      <div className='responsive-div'>
        <Header/>
        <Switch>
            <Route exact path = '/services' component={ServiceListing}/>
            <Route exact path = '/services/detail' component={serviceDetail}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
