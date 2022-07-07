import React, { Component, useState } from 'react';
import { Row, Col, Input, Select, Button, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from './product_card';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import './serviceslist.css';

const { Option } = Select;

const ProductsListWrapper = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('');
  // componentDidMount() {
  //   APIManager.GetCompanyProducts();
  // }
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const checkPremiumAccount = () => {
    APIManager.checkPremiumDetail().then((response) => {
      console.log(response, 'llllllllll');
      if (response.data.data.products) {
        renderAddProduct();
      } else {
        notification.warning({
          message: 'Please upgrade your plan to premium.',
          description: 'Click here to upgrade your plan.',
          onClick: () => {
            props.history.push('/company/billing');
          },
        });
      }
    });
  };
  const renderAddProduct = (e, obj, type) => {
    console.log(obj, type);
    if (type === 'edit') {
      props.history.push({
        pathname: '/company/edit-product',
        product_obj: obj,
      });
    } else {
      props.history.push({
        pathname: '/company/add-product',
     //   addForm: this.state.addForm ,
      });
    }
  };

  const productDetailRender = (e, data) => {
    console.log('function running....', props);
    props.history.push({
      pathname: '/products/detail',
      product_obj: data,
    });
  };

  const productsCount = props.data ? props.data.data.length : '';
  return (
    <div>
      <Row className="services-header" justify="space-between">
        <Col span={12}>
          <span className="header-text">Manage Products</span>
        </Col>
        <Col span={12}>
          <Button className="add-service-btn" onClick={checkPremiumAccount}>
            Add new Product
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Input
            size="large"
            className="resume-data-1 company-joblist-input service-input"
            placeholder="Search for a Product"
            prefix={<SearchOutlined />}
            onChange={handleChange}
            value={searchQuery}
          />
        </Col>
        <Col span={4}>
          <Select
            name="permissions"
            className="sort-select"
            style={{ float: 'right' }}
            placeholder="Sort By"
            onChange={(e) => setSortValue(e)}
          >
            <Option value="price.amount">low to high</Option>
            <Option value="-price.amount">high to low</Option>
            <Option value="reset">reset</Option>
          </Select>
        </Col>
      </Row>
      <ProductCard
        searchQuery={searchQuery}
        editProduct={(e, obj) => renderAddProduct(e, obj, 'edit')}
        productDetailRender={(e, data) => productDetailRender(e, data)}
        sortValue={sortValue}
      />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     data: state.companyProductsReducer.data,
//     isloading: state.companyProductsReducer.isloading,
//   };
// };
export default ProductsListWrapper;
