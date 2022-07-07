import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import closebtn from '../../asset/cancel-circle.png';
import NumberFormat from 'react-number-format';
import './style.scss';
import PromoteData from '../../company/context/context';
import PaymentModel from '../../../Components/paymentCard/selectPayment';

const options = [
  {
    label: 'Select time period',
    value: '',
  },
  {
    label: '1 day',
    value: '1',
  },
  {
    label: '2 days',
    value: '2',
  },
  {
    label: '3 days',
    value: '3',
  },
  {
    label: '4 days',
    value: '4',
  },
  {
    label: '5 days',
    value: '5',
  },
  {
    label: '6 days',
    value: '6',
  },
];
const PromoteEntity = (props) => {
  const [state, setState] = React.useState({
    timePeriod: '',
    budget: '',
    name: props.name,
    entity: props.entity,
    promoteEntity: true,
  });
  const [paymentModal, showPaymentModal] = useState(false);
  //changed input value
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  return (
    <PromoteData.Provider value={state}>
      <div className={'promote-job-container'}>
        {paymentModal ? (
          <PaymentModel
            data={state}
            show={paymentModal}
            onHide={() => showPaymentModal(false)}
          />
        ) : (
          ''
        )}
        <Modal
          {...props}
          animation={false}
          className="password-modal"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <div className="modal-header">
            <div className="modal-title h4" id="contained-modal-title-vcenter">
              Promote Entity
            </div>
            <button type="button" onClick={props.onHide} className="close">
              <span aria-hidden="true">
                <img src={closebtn} alt="cancel" />
              </span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <Modal.Body>
            <div>
              <label className="input_label_profile" htmlFor="inputPassword">
                Time Period
              </label>
              <select
                className="input-font form-control border profile-form-control"
                class="form-control"
                placeholder="Select time period"
                name={'timePeriod'}
                onChange={handleChange}
                value={state.timePeriod}
              >
                {options.map((data) => (
                  <option value={data.value}>{data.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input_label_profile" htmlFor="inputPassword">
                Total Cost
              </label>
              <NumberFormat
                type="text"
                className="input-font form-control border profile-form-control"
                //onChange={handleChange}
                placeholder="Enter your budget."
                name={'budget'}
                onChange={handleChange}
                maxLength={'7'}
              />
            </div>
            <div className={'budget-container'}>
              <div className={'payment-container'}>
                <div style={{ opacity: '0.4' }}>Total Cost</div>
                <div className={'amount'}>
                  <span className={'dollor-sign'}></span>
                  {state.budget}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              // type="submit"
              //   onClick={handlePayment}
              onClick={() => showPaymentModal(true)}
              className="btn btn-dark bold-family btn-save-font cursor"
              disabled={!(state.budget && state.timePeriod)}
            >
              Proceed
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </PromoteData.Provider>
  );
};
export default PromoteEntity;
