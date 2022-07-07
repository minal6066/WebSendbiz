import { Row, Col } from 'antd';
import React, { Component } from 'react';
import Modal from 'react-modal';
import cancelImage from '../asset/cancel-circle.png';

const customStyles = {
  content: {
    right: '0px',
    bottom: 'auto',
    width: '50%',
    top: 0,
    marginLeft: '50%',
    padding: 0,
  },
};
Modal.setAppElement('#modalApp');

class SocialPopup extends Component {
  closeModal = () => {
    this.props.close();
  };

  render() {
    return (
      <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div style={{ minHeight: 500 }} className="row custom_row">
            <div style={{ width: '100%' }}>
              <div style={{ backgroundColor: 'white' }}>
                <img
                  onClick={this.props.close}
                  style={{ marginLeft: '88%' }}
                  src={cancelImage}
                />
                <p
                  style={{
                    paddingTop: 19,
                    marginLeft: 15,
                    font: 'normal normal bold 28px/40px Gilroy Bold',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                >
                  Promote Job
                </p>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  marginTop: '-13px',
                  minHeight: 400,
                  borderTopStyle: 'solid',
                  borderTopWidth: 2,
                  borderTopColor: '#F4F6F9',
                }}
              >
                <p className={'Text-Job-Modal'}>Geographical Locations</p>
                <select
                  name="Experience_level"
                  className={'select-field-custom-type-1-left'}
                ></select>
                <p className={'Text-Job-Modal'}>Activities</p>
                <select
                  name="Experience_level"
                  className={'select-field-custom-type-1-left'}
                ></select>
                <p className={'Text-Job-Modal'}>Time Period</p>
                <select
                  name="Experience_level"
                  className={'select-field-custom-type-1-left'}
                ></select>
                <Row
                  style={{
                    height: 80,
                    borderRadius: 6,
                    marginLeft: 25,
                    marginTop: '25%',
                    backgroundColor: '#f4f6f9',
                    width: '85%',
                  }}
                >
                  <Col span={12} style={{ paddingTop: 33, paddingLeft: 20 }}>
                    <p
                      style={{
                        color: '#a0a3a6',
                        font: 'normal normal bold 21px/20px Gilroy semiBold',
                      }}
                    >
                      Total Cost
                    </p>
                  </Col>
                  <Col
                    span={12}
                    style={{
                      textAlign: 'end',
                      paddingTop: 33,
                      paddingRight: 25,
                    }}
                  >
                    <p
                      style={{
                        color: '#ee5050',
                        font: 'normal normal bold 38px/20px Gilroy Bold',
                      }}
                    >
                      $ 23813
                    </p>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  marginTop: 6,
                  height: 100,
                  borderTopStyle: 'solid',
                  borderTopWidth: 2,
                  borderTopColor: '#F4F6F9',
                }}
              >
                <button
                  onClick={this.closeModal}
                  style={{
                    backgroundColor: 'black',
                    marginTop: 25,
                    height: 45,
                    width: 240,
                    borderRadius: 5,
                    marginLeft: 15,
                    color: 'white',
                    font: 'normal normal bold 19px/20px Gilroy Bold',
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SocialPopup;
