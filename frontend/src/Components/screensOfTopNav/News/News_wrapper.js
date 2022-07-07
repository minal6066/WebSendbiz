import React, { Component } from 'react';
import '../topNav.css';
import { Route, Switch } from 'react-router-dom';
import NewsListing from './NewsListing';
import EventDetail from './NewsDetail';
import Box from '../../candidate/box';
import Footer from '../../footer/footer';
import Header from "../../header/header"

export default class NewsWrapper extends Component {  

  render() {

    return (
      <div className='responsive-div'>
        <Header/>
        <Switch>
            <Route exact path = '/news' component={NewsListing}/>
            <Route exact path = '/news/detail' component={EventDetail}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
