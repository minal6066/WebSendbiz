import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Input, Pagination, Select, Card, Tag, Button,message } from 'antd';
import {
  FacebookFilled,
  LeftOutlined,
  LinkedinFilled,
  TwitterCircleFilled,
  LinkOutlined,
  MoneyCollectFilled,
  ClockCircleFilled,
} from '@ant-design/icons';
import '../topNav.css';
import './ProductDetail.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import NewsComp from './news_comp';
import interstedIcon from '../../asset/intersted-outlined.svg';

const { Search } = Input;
const { Option } = Select;

const ProductDetail = (props) => {
  const [loading, setLoading] = useState(true);
  const [productData, setproductData] = useState([]);
  const [interstedProduct,AddedtoIntersted]=useState('');
  useEffect(() => {
    console.log(props.location.state.data);
    const productId = props.location.state._id;
    APIManager.getOneProduct(productId)
      .then((response) => {
        if (response.data.isSuccess) {
          setproductData(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  const saveAsIntersted = () => {
    const category = 'product';
    const param = {
      interestId: props.location.state._id,
    };
    setLoading(true);
    APIManager.createInterested(category, param)
      .then((response) => {
        if (response.data.isSuccess) {
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const ProductListingRender = () => {
    props.history.push({
      pathname: '/products',
    });
  };
  const getAvailability = (text) => {
    if (text === 'more') return '1 year +';
    else {
      return text.slice(0, 1) === '1'
        ? text.slice(0, 1) + ' month'
        : text.slice(0, 1) + ' months';
    }
  };

  console.log('props:', props);
  const data = productData;
  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div className="detail-outer-div">
          <div style={{ paddingBottom: '16px' }}>
            <LeftOutlined
              className="back-icon"
              onClick={ProductListingRender}
            />
            <span className="back-btn" onClick={ProductListingRender}>
              Go back
            </span>
          </div>
          <Row gutter={32}>
            <Col span={8}>
              <Card bordered={false} className="s-detail-left-card">
                <h4 className="s-detail-name" style={{ marginTop: '0' }}>
                  {data.name}
                </h4>
                {/* <p className='s-detail-comp-name'>{data.companyDetail.comp_info.comp_name}</p> */}
                <p className="s-detail-short-desc">{data.shortDescription}</p>
                {data &&
                  data.category.map((cat) => (
                    <Tag
                      color="volcano"
                      style={{ maxWidth: '100%' }}
                      className="s-price-tag"
                    >
                      {cat}
                    </Tag>
                  ))}
                <p
                  className="s-detail-val"
                  style={{ fontSize: '24px', margin: '10px 0 5px' }}
                >
                  $ {data.price.amount}
                </p>
                <p className="s-detail-attr" style={{ margin: '0 0 15px' }}>
                  Price
                </p>
                <a
                  href={'https://' + data.shopUrl}
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <LinkOutlined className="shop-link" />
                  <span className="shop-link">Visit shop page</span>
                </a>
                <div>
                  <Row gutter={16} style={{ margin: '40px 0 28px' }}>
                    <Col
                      span={8}
                      style={{ borderRight: 'solid 1px #6c7a8f20' }}
                    >
                      <p className="s-detail-val">
                        {getAvailability(data.availability)}
                      </p>
                      <p className="s-detail-attr">Availability</p>
                    </Col>
                    <Col
                      span={8}
                      style={{
                        borderRight: 'solid 1px #6c7a8f20',
                        textAlign: 'center',
                      }}
                    >
                      <p className="s-detail-val">{data.reference}</p>
                      <p className="s-detail-attr">Reference</p>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <p className="s-detail-val">
                        {data.inStock ? 'YES' : 'NO'}
                      </p>
                      <p className="s-detail-attr">In stock</p>
                    </Col>
                  </Row>
                </div>

                <img
                  src={process.env.PUBLIC_URL + '/facebook.png'}
                  style={{
                    fontSize: '30px',
                    marginRight: '17px',
                    cursor: 'pointer',
                  }}
                />
                <img
                  src={process.env.PUBLIC_URL + '/linkedin.png'}
                  style={{
                    fontSize: '30px',
                    marginRight: '17px',
                    cursor: 'pointer',
                  }}
                />
                <img
                  src={process.env.PUBLIC_URL + '/twitter.png'}
                  style={{
                    fontSize: '30px',
                    marginRight: '17px',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ marginTop: '27px' }} className={'d-flex'}>
                  <Button className="shop-btn">Shop this Product</Button>
                  <div className={'intersted-icon'} onClick={saveAsIntersted}>
                    <img src={interstedIcon} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="s-detail-r-card " bordered={false}>
                <h4 className="r-card-head">About the product</h4>
                <p className="r-card-text">{data.fullDescription}</p>
                <h4 className="r-card-head" style={{ padding: '20px 0 0' }}>
                  Product Information
                </h4>
                <Row gutter={16}>
                  <Col span={10}>
                    <p className="s-detail-attr">Delivery Time</p>
                    <ClockCircleFilled className="p-detail-icons" />
                    <span className="s-detail-val">{data.deliveryTime}</span>
                  </Col>
                  <Col span={8}>
                    <p className="s-detail-attr">Pricing Plan</p>
                    <MoneyCollectFilled className="p-detail-icons" />
                    <span className="s-detail-val">{data.pricingPlan}</span>
                  </Col>
                </Row>
                <div style={{ marginTop: '27px' }}>
                  <Button className="shop-btn">Shop this Product</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      <NewsComp />
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     jobdata: state.jobManagementReducer.jobdata,
//     isloading: state.jobManagementReducer.isloading,
//   };
// };
export default ProductDetail;
