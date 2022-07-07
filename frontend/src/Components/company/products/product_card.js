import React, { Component, useCallback, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Switch,
  Image,
  Spin,
  Card,
  Pagination,
  Popconfirm,
  message,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './servicescard.css';
import {
  DeleteFilled,
  NotificationFilled,
  EnvironmentFilled,
  DollarCircleFilled,
  EditFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import APIManager from '../../../APIManager';
import cardDefaultPic from '../../../Components/asset/card.svg';
import PromoteEntity from '../../../Components/company/promoteEntity/index';

const ProductCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState('');
  const [promoteEntity, setPromoteEntity] = useState(false);
  const [promoteProductId, setPromoteProductId] = useState('');

  React.useEffect(() => {
    loadData(props.sortValue || props.searchQuery);
  }, [props.sortValue, props.searchQuery]);
  useEffect(() => {
    if (id) {
      changeActiveStatus();
    }
  });

  const loadData = (page) => {
    const sort = props.sortValue;
    const searchQuery = props.searchQuery;

    if ((sort && sort !== 'reset') || (searchQuery && searchQuery !== '')) {
      APIManager.sortProducts(sort, searchQuery)
        .then((resp) => {
          console.log(resp, 'sss');
          setProductsData(resp.data.data);
          setLoading(false);
          setTotalProducts(resp.data.totalCount);
          setCurrentPage(resp.data.currentPage);
        })
        .catch((err) => {
          this.setState({ isloading: false });
          message.error('Something went wrong!');
        });
    } else {
      APIManager.getAllCompanyProducts(page).then((resp) => {
        console.log('all products:', resp.data);
        setProductsData(resp.data.data);
        setLoading(false);
        setTotalProducts(resp.data.totalCount);
        setCurrentPage(resp.data.currentPage);
      });
    }
  };

  const deleteProduct = (id) => {
    APIManager.deleteCompanyProduct(id).then((resp) => {
      console.log('delete Api response:', resp);
    });
    loadData(currentPage);
  };

  const changeProductStatus = (id, isActive) => {
    const data = {
      isActive: !isActive,
    };
    console.log('data for product status change', data);
    APIManager.patchCompanyProduct(id, data).then((resp) => {
      console.log('status Api response:', resp);
      setLoading(false);
    });
  };

  const handleChange = (value) => {
    window.scrollTo(0, 0);
    // setLoading(true);
    setCurrentPage(value);
    loadData(value);
  };

  const renderb = (e, data) => {
    console.log(e, data);
  };
  const changeActiveStatus = () => {
    APIManager.productActiveStatus(id.id);
  };
  const { searchQuery } = props;
  const searchedData = productsData.filter((data) =>
    data.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  console.log(props, 'lllllllll');
  console.log(productsData, 'iiiiiiiiiiiii');
  return (
    <>
      {promoteEntity && (
        <PromoteEntity
          show={promoteEntity}
          onHide={() => setPromoteEntity(false)}
          name={'product'}
          entity={promoteProductId}
        />
      )}
      {loading ? (
        <Spin style={{ padding: '100px 50%' }} />
      ) : (
        <div>
          {productsData &&
            productsData.map((data) => (
              <Card className="services-card" key={data.id}>
                <Row>
                  <Col span={3}>
                    <img
                      alt="example"
                      src={
                        data.media.length !== 0 && data.media[0].filePath !== ''
                          ? data.media[0].filePath
                          : cardDefaultPic
                      }
                      style={{ width: '100%', height: '100px' }}
                    />
                  </Col>
                  <Col
                    span={21}
                    style={{ paddingLeft: '20px' }}
                    className="service-detail-row"
                  >
                    <Row justify="space-between">
                      <Col span={17}>
                        <div
                          className="service-name"
                          onClick={(e) => props.productDetailRender(e, data)}
                        >
                          {data.name}
                        </div>
                      </Col>
                      <Col span={7} className="icon-col">
                        <EditFilled
                          className="service-hidden-icons service-icons"
                          onClick={(e) => props.editProduct(e, data)}
                        />
                        <NotificationFilled
                          className="service-hidden-icons service-icons"
                          onClick={() => {
                            setPromoteEntity(true);
                            setPromoteProductId(data._id);
                          }}
                        />
                        <Popconfirm
                          onConfirm={() => deleteProduct(data.id)}
                          title="Are you sure you want to delete this product ?"
                        >
                          <DeleteFilled className="service-hidden-icons service-icons" />
                        </Popconfirm>
                        <Switch
                          defaultChecked={data.isActive}
                          onChange={() => {
                            setId({ id: data._id }, () => changeActiveStatus());
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18}>
                        <div className="service-s-desc">
                          {data.shortDescription}
                        </div>
                      </Col>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '10px' }}>
                      <Col
                        span={9}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <ClockCircleOutlined className="service-icons" />
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.deliveryTime}
                        </div>
                      </Col>
                      <Col span={6}>
                        <DollarCircleFilled className="service-icons" />
                        <div className="service-location">
                          {data.price.amount}
                        </div>
                      </Col>
                      <Col span={7}>
                        <div
                          className="sponsered"
                          style={{ textAlign: 'right' }}
                        >
                          {data.isSponsored ? 'SPONSORED' : ''}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
          {!searchedData && <div className="no-data-div">No Data Found</div>}
          <Pagination
            // defaultCurrent={1}
            hideOnSinglePage={true}
            current={currentPage}
            defaultPageSize={10} //default size of page
            onChange={handleChange}
            total={totalProducts} //total number of card data available
            className="services-pagination"
          />
        </div>
      )}
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     data: state.appliedJobsReducer.data,
//     isloading: state.appliedJobsReducer.isloading,
//   };
// };
export default ProductCard;
