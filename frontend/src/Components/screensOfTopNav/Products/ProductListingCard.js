import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Input, Select, Card, Tag, Spin, message } from 'antd';
import {
  EnvironmentFilled,
  ClockCircleOutlined,
  DollarCircleFilled,
  EyeFilled,
  LikeFilled,
} from '@ant-design/icons';
import './ProductListing.css';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { MapContainer } from '../GoogleMap';
import Pagination from 'react-js-pagination';
import cardDefaultPic from '../../asset/card.svg';

const { Search } = Input;
const { Option } = Select;

const numEachPage = 2;

const ProductListingCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setcurrentPage] = useState(0);
  const [resultsPerPage, setresultsPerPage] = useState(0);
  const [totalData, settotalData] = useState(0);

  const handleChange = (value) => {
    loadData(value);
  };

  useEffect(() => {
    loadData();
  }, [props]);

  const loadData = (
    pageNumber = 1,
    { city_name } = props,
    { searchQuery } = props,
    { company } = props,
    { price } = props,
    { category } = props
  ) => {
    // console.log('serach query in props:', searchQuery, props, company);
    let searchCat = ""
    // if(category.length > 0){
    //   category.map((val)=>{
    //     searchCat = searchCat + `&category=${val}`
    //   })
    // }
    let searchComp = ""
    if(company.length > 0){
      company.map((val)=>{
        searchComp = searchComp + `&companyId=${val}`
      })
    }
    console.log(searchComp);
    // APIManager.allProductsSortAndSearch(
    //   pageNumber,
    //   price ? `&price=${price}` : "",
    //   searchQuery ? `&search=${searchQuery}`: "",
    //   searchCat,
    //   searchComp
    // )
    //   .then((resp) => {
    //     console.log('all products data: ', resp.data);
    //     setAllProducts(resp.data.data);
    //     setLoading(false);
    //     // setTotalCount(resp.data.totalCount);
    //     console.log(resp.data.currentPage);
    //     setcurrentPage(resp.data.currentPage);
    //     setresultsPerPage(resp.data.results);
    //     settotalData(resp.data.totalCount);
    //   })
    //   .catch((err) => {
    //     message.error(err);
    //   });

    APIManager.allProductsSortAndSearch(
      pageNumber,
      searchQuery ? `&search=${searchQuery.toLowerCase()}`:"",
      price ? `&price=${price}` : "",
      // searchQuery.toLowerCase(),
      searchComp,
    ).then((resp) => {
      console.log('all products data: ', resp.data);
      console.log(allProducts, resp.data.data, "ALLLLLLLLLLLLLLLLl");
      setAllProducts(resp.data.data);

      setLoading(false);
      // setTotalCount(resp.data.totalCount);
      setcurrentPage(resp.data.currentPage);
      setresultsPerPage(resp.data.results);
      settotalData(resp.data.totalCount);
    }).catch((err) => {
      message.error(err);
    });;
  };

  const { searchQuery } = props;
  console.log('search query in render:', allProducts);
  const searchedData = allProducts.filter(
    (data) =>
      data.name.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
      data.isActive
  );
  // console.log(currentPage,totalData,resultsPerPage)
  return (
    <>
      {loading ? (
        <Spin style={{ padding: '100px 50%' }} />
      ) : (
        <div>
          <h3 className="card-div-head">
            {searchedData.length} Products Found
          </h3>
          <div className="custom-container" style={{ padding: 0 }}>
            {searchedData.map((data) => (
              <Card
                className="services-card"
                onClick={(e) => props.ProductDetailRender(e, data)}
                style={{ margin: '0 40px 15px 40px', cursor: 'pointer' }}
                key={data.id}
              >
                <Row>
                  <Col span={5}>
                    <img
                      alt="example"
                      src={
                        data.media.length !== 0
                          ? data.media.map((data) =>
                              data.filePath ? data.filePath : cardDefaultPic
                            )
                          : cardDefaultPic
                      }
                      style={{
                        width: '106%',
                        height: '92%',
                        borderRadius: '6px',
                      }}
                    />
                  </Col>
                  <Col
                    span={19}
                    style={{ paddingLeft: '20px' }}
                    className="service-detail-row"
                  >
                    <Row justify="space-between">
                      <Col span={17}>
                        <div className="product-name">{data.name}</div>
                      </Col>
                      <Col span={7}>
                        <Tag
                          color="volcano"
                          className="s-price-tag"
                          style={{ float: 'right' }}
                        >
                          {' $ ' + data.price.amount}
                        </Tag>
                        <p className="job-card-8">
                          {data.isSponsored ? 'SPONSORED' : ''}
                        </p>
                      </Col>


                    </Row>
                    <Row>
                      <Col span={24} style={{ margin: '0px 0 5px' }}>
                        <span className="p-company-name">
                          {data.companyData
                            ? data.companyData.comp_info.bus_name
                            : ''}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        lg={data.category.length > 1 ? 24 : 6}
                        xs={24}
                        md={24}
                      >
                        <span style={{ marginRight: '15px' }}>
                          {/* {data.category.map((cat) => (
                            <Tag
                              color="volcano"
                              className="s-price-tag"
                              style={{ maxWidth: '100%' }}
                            >
                              {cat}
                            </Tag>
                          ))} */}
                        </span>
                      </Col>
                      {/* <EyeFilled className='eye-icon'/><span className='like-eye-text'>1.2k</span>
                        <LikeFilled className='like-icon'/><span className='like-eye-text'>2.6k</span> */}
                    </Row>
                    <Row>
                    <Col
                        lg={data.category.length > 1 ? 24 : 10}
                        xs={24}
                        md={24}
                      >
                        <EyeFilled className="eye-icon" />
                        <span className="like-eye-text">1.2k</span>
                        <LikeFilled className="like-icon" />
                        <span className="like-eye-text">2.6k</span>
                      </Col>
                    </Row>
                    <Row
                      align="bottom"
                      style={{ marginTop: '5px' }}
                      gutter={16}
                    >
                      <Col
                        span={8}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <EnvironmentFilled className="service-icons" />
                        <div
                          className="product-location"
                          style={{ display: 'block' }}
                        >
                          {data.location}
                        </div>
                      </Col>
                      <Col span={12}>
                        <ClockCircleOutlined className="service-icons" />
                        <div className="product-location">
                          {data.deliveryTime}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
            <div className={'paginate-container'}>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={20}
              firstPageText={false}
              lastPageText={false}
              totalItemsCount={totalData}
              pageRangeDisplayed={5}
              onChange={(pageNumber) => {
                loadData(pageNumber);
              }}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
          </div>
          
        </div>
      )}
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     jobdata: state.jobManagementReducer.jobdata,
//     isloading: state.jobManagementReducer.isloading,
//   };
// };
export default ProductListingCard;
