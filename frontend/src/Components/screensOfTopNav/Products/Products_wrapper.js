import React, { Component } from 'react';
import '../topNav.css';
import Box from '../../candidate/box';
import Footer from '../../footer/footer';
import './ProductListing.css';
import { Route, Switch } from 'react-router-dom';
import ProductsListing from './ProductListing'
import ProductDetail from './ProductDetail';
import Header from "../../header/header"
export default class ProductsWrapper extends Component {  

  render() {

    return (
      <div className='responsive-div'>
        <Header/>
        <Switch>
            <Route exact path = '/products' component={ProductsListing}/>
            <Route exact path = '/products/detail' component={ProductDetail}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
