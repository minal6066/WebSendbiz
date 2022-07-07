import React, { useState } from 'react';
import { message, Spin, Alert } from 'antd';
import { Modal } from 'react-bootstrap';
import closebtn from '../asset/cancel-circle.png';
import APIManager from '../../APIManager/index';
import { DownOutlined, CloseCircleFilled } from '@ant-design/icons';
import AddNewCardModal from './index';
import PromoteData from '../company/context/context';
import './style.scss';
import { Select } from 'antd';
const SelectPaymentModal = (props) => {
  const [newCard, setNewCard] = useState(false);
  const [selectedCard, showSelectedCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState([]);
  const [creditCard, selectCreditCard] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [alert, showAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const value = React.useContext(PromoteData);
  console.log(props, 'lllllllllll');

  //show selected card
  const getAllCard = () => {
    showSelectedCard(true);
    setLoading(true);
    APIManager.GETALLCard()
      .then((response) => {
        if (response.data.isSuccess) {
          setSelectedCardData(response.data.data);
          setLoading(false);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //Submission of payment
  const handlePayment = () => {
    const paymentId = creditCard.id;
    var ls = require('local-storage');
    const isMonthly = ls.get('isMonthly');
    const params = {
      paymentMethod: paymentId,
      isMonthly: isMonthly,
    };
    console.log(params);
    setLoading(true);
    if (props.data && paymentId) {
      const data = {
        budget: parseInt(props.data.budget),
        period: parseInt(props.data.timePeriod),
        name: props.data.name,
        paymentMethod: paymentId,
        entity: props.data.entity,
      };
      console.log(data, 'data');
      APIManager.promoteEntities(data)
        .then((response) => {
          if (response.data.isSuccess) {
            setLoading(false);
            showAlert(true);
            setAlertMsg('Entity is promoted.');
          }
        })
        .catch((error) => {
          setLoading(false);
          showAlert(true);
          setAlertMsg(error.response.data.message);
        });
    } else if (paymentId) {
      APIManager.submitPaymemt(params)
        .then((response) => {
          if (response.data.isSuccess) {
            setLoading(false);
            showAlert(true);
            setAlertMsg(response.data.message);
          }
          console.log(response);
        })
        .catch((error) => {
          setLoading(false);
          showAlert(true);
          setAlertMsg(error.response.data.message);
        });
    } else {
      showAlert(true);
      setLoading(false);
      setAlertMsg('Please select card or add new card.');
    }
  };

  console.log(creditCard);
  return (
    <div>
      {newCard && (
        <AddNewCardModal show={newCard} onHide={() => setNewCard(false)} />
      )}
      <Modal
        {...props}
        animation={false}
        className="password-modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="modal-header">
          <div className="modal-title h4" id="contained-modal-title-vcenter">
            Payment
          </div>
          <button type="button" onClick={props.onHide} className="close">
            <span aria-hidden="true">
              <img src={closebtn} alt="cancel" />
            </span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <Modal.Body className="show-grid">
          {alert && (
            <Alert
              message={alertMsg}
              type="warning"
              closable
              onClose={() => {
                showAlert(false);
                setAlertMsg('');
              }}
            />
          )}
          {isLoading && (
            <div className={'d-flex justify-content-center'}>
              {' '}
              <Spin />
            </div>
          )}
          <div className={'payment-container'}>
            <div style={{ opacity: '0.4' }}>Total Payment</div>
            <div className={'amount'}>
              <span className={'dollor-sign'}>$</span>
              {props.data ? props.data.budget : '15'}
            </div>
          </div>
          <div className={'select-card-container'}>
            <div className={'select-card'}>Select card</div>
            <div className={'new-card'} onClick={() => setNewCard(true)}>
              + Add new card
            </div>
          </div>
          {!creditCard && (
            <div onClick={getAllCard} className={'saved-card-container mt-2'}>
              <div className={'saved-card'}>Select Saved Card</div>
              <div>
                <DownOutlined onClick={getAllCard} />
              </div>
            </div>
          )}
          {creditCard && (
            <div onClick={getAllCard} className={'saved-card-container mt-2'}>
              <div className={'saved-card'}>
                **** **** **** {creditCard.card}
              </div>
              <div className={'d-flex'}>
                <div className={'card-type mr-1'}>
                  {creditCard.brand.toUpperCase()}
                </div>
                <DownOutlined onClick={getAllCard} />
              </div>
            </div>
          )}
          {selectedCard && (
            <div className={'card-container'}>
              <div className={'close-btn'}>
                <CloseCircleFilled onClick={() => showSelectedCard(false)} />
              </div>
              {selectedCardData && selectedCardData.length === 0
                ? 'No card found'
                : selectedCardData.map((data) => {
                    return (
                      <div
                        className={'card-detail m-2'}
                        onClick={() => {
                          selectCreditCard(data);
                          showSelectedCard(false);
                        }}
                      >
                        <div className={'card-number'}>
                          **** **** **** {data.card}
                        </div>
                        <div className={'card-type'}>
                          {data.brand.toUpperCase()}
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={handlePayment}
            className="btn btn-dark bold-family btn-save-font cursor"
          >
            Proceed
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SelectPaymentModal;
