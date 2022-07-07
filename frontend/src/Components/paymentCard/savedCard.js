import React, { useEffect, useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import './style.scss';
import APIManager from '../../APIManager/index';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../footer/footer.js';
import { Popconfirm, message, Select } from 'antd';
import NewCardModal from './index';
const Option = Select.Option;
const SavedCards = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentId, setPaymentId] = useState('');
  const [newCardModal, showNewCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  // useEffect(() => {
  //   APIManager.GETALLCard().then((response) => {
  //     if (response.data.isSuccess) {
  //       setPaymentMethods(response.data.data);
  //     }
  //     console.log(response);
  //   });
  // }, []);

  const handleSelectCards = (value) => {
    console.log(value);
    setSelectedCard(value);
  };

  //getallcards
  const getMyCards = () => {
    APIManager.GETALLCard().then((response) => {
      if (response.data.isSuccess) {
        setPaymentMethods(response.data.data);
      }
      console.log(paymentMethods);
    });
  };

  //to delete credit carc
  const DeleteCard = (id) => {
    APIManager.DeleteOneCard(id)
      .then((resp) => {
        if (resp.isSuccess) {
          message.info('Card is deleted.');
        }
      })
  };
  return (
    <>
      {newCardModal && (
        <NewCardModal show={newCardModal} onHide={() => showNewCard(false)} />
      )}
      <div className={'w-100 mt-5'}>
        <div>
          <div
            style={{
              color: '#000000',
              fontSize: '26px',
              fontWeight: 'bolder',
              fontFamily: 'Gilroy-SemiBold',
              marginLeft: '400px',
            }}
            className={'d-flex justify-content-start'}
          >
            <h3>Saved Cards</h3>
          </div>
          <div className={'d-flex justify-content-end w-75'}>
            <button
              onClick={() => showNewCard(true)}
              className={'new-card-btn'}
            >
              Add New Card
            </button>
          </div>
          <div>
            <Select
              defaultValue="Saved cards"
              style={{ width: 400, marginLeft: '450px' }}
              onClick={getMyCards}
              size={'large'}
              onChange={handleSelectCards}
            >
              {paymentMethods &&
                paymentMethods.map((data) => {
                  return (
                    <>
                      <Option value={data.id}>
                        <div className={'d-flex'}>
                          <div>{`****/****/****/${data.card}`}</div>
                          <div
                            className={'ml-5'}
                          >{`${data.expMonth}/${data.expYear}`}</div>
                        </div>
                      </Option>
                      {/* <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option> */}
                    </>
                  );
                })}
            </Select>
          </div>
        </div>
        <Container>
          <Row>
            {paymentMethods &&
              paymentMethods.filter((data) => data.id === selectedCard).map((data) => {
                return (
                  <Col xs={'5'} className={'m-4'}>
                    <div className={'credit-card-container'}>
                      <div className={'card-brand-container'}>
                        {data.brand.toUpperCase()}
                      </div>
                      <div className={'m-4'}>
                        <div className={'dlt-container'}>
                          <div>
                            <div className={'card-num-label'}>CARD NUMBER</div>
                            <div
                              className={'card-num'}
                            >{`************${data.card}`}</div>
                          </div>
                          <div
                            onClick={() => setPaymentId(data.id)}
                            className={'delete-btn-container ml-5'}
                          >
                            <Popconfirm
                              title="Are you sure to delete this card?"
                              onConfirm={() => DeleteCard(data.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <DeleteFilled />
                            </Popconfirm>
                          </div>
                        </div>

                        <div className={'d-flex flex-direction-row'}>
                          <div>
                            <div className={'card-num-label mr-5 mt-5'}>
                              Valid through
                            </div>
                            <div
                              className={'card-num'}
                            >{`${data.expMonth}/${data.expYear}`}</div>
                          </div>
                          {/* <div>
                            <div className={'card-num-label mt-5'}>CVV</div>
                            <div className={'card-num'}>***</div>
                          </div> */}
                        </div>
                        {/* <div className={'mt-5'}>
                          <div>Name</div>
                          <div>Priyansi Tater</div>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default SavedCards;
