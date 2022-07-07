import React from 'react';
import { Modal, Button, Row, Col } from 'antd';

const App = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(props.isOpen);
  };
  React.useEffect(() => {
    console.log('hhhh');
    showModal();
  }, [props.isOpen]);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <img src={process.env.PUBLIC_URL + '/cancel-circle.png'}></img>
        }
      >
        <div>
          <Row>
            <Col span={2}>
              <img
                src={process.env.PUBLIC_URL + '/Group-red.png'}
                style={{
                  width: 30,
                  position: 'relative',
                  height: 28,
                  borderRadius: 10,
                }}
              />
            </Col>
            <Col span={18} style={{ paddingLeft: 5 }}>
              <p
                style={{ font: 'normal normal 400 24px/30px Gilroy semiBold' }}
              >
                Are you sure you want to delete the News ?
              </p>
            </Col>
          </Row>
          <Row
            style={{
              height: 50,
              borderTop: 'solid 3px',
              borderColor: '#f7f8f8',
            }}
          >
            <Col span={7} style={{ paddingTop: 12 }}>
              <button
                className={'Appliedjobbutton'}
                style={{
                  width: '100%',
                  height: '85%',
                  fontFamily: 'Gilroy Bold',
                  fontSize: 16,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                onClick={handleCancel}
              >
                No
              </button>
            </Col>
            <Col span={1} style={{ paddingTop: 12 }}></Col>
            <Col span={7} style={{ paddingTop: 12 }}>
              <button
                className={'Appliedjobbutton'}
                style={{
                  width: '100%',
                  height: '85%',
                  fontFamily: 'Gilroy Bold',
                  fontSize: 16,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                onClick={handleOk}
              >
                Yes
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default App;
