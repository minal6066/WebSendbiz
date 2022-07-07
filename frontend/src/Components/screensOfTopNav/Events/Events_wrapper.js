import React, { Component } from 'react';
import '../topNav.css';
import { Route, Switch } from 'react-router-dom';
import EventListing from './EventListing';
import EventDetail from './EventDetail';
import Box from '../../candidate/box';
import Header from "../../header/header"
import Footer from '../../footer/footer';

export default class EventsWrapper extends Component {  

  render() {

    return (
      <div className='responsive-div'>
        <Header/>
        <Switch>
            <Route exact path = '/events' component={EventListing}/>
            <Route exact path = '/events/detail' component={EventDetail}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
