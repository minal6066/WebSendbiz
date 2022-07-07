import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Form,
  Upload,
  Modal,
  message,
  Image,
  Progress,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter, Redirect } from 'react-router-dom';
import './addService.css';
import { LeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { CURRENCY } from '../../constants/currency';
import APIManager from '../../../APIManager';
import MediaModal from './MediaModal';
import HELPERS from '../../../APIManager/helper';

const { Option } = Select;
const { TextArea } = Input;

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }
let imageUploadCounter = 0;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class AddProduct extends Component {
  formRef = React.createRef();
  state = {
    // fileList: this.props.location.product_obj
    //   ? [...this.props.location.product_obj.media]
    //   : [],
    openModal: false,
    uploadPercentage: 0,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    uploadUrl: '',
    fileList: [],
    fileType: '',
    fileName: [],
    uploadImage: '',
    testFile: '',
    newFileName: '',
    prevFileName: '',
  };

  componentDidMount() {
    if (this.props.history.location.product_obj) {
      const data = this.props.history.location.product_obj;
      this.formRef.current.setFieldsValue({
        ...data,
      });
    }
  }
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  setCounter = () => (imageUploadCounter = 0);
  handleUploadFiles = ({ fileList }) => {
    imageUploadCounter += 1;
    if (imageUploadCounter < 2) {
      this.setState({ fileList });

      fileList.map((data) => {
        return this.setState({
          contentType: data.type,
          uploadImage: data.originFileObj,
        });
      });
      console.log(this.state.uploadImage);
      const uploadParams = {
        files: [
          {
            requestType: 'CompanyProductsMedia',
            contentType: this.state.contentType,
          },
        ],
      };
      APIManager.preSignedUrl(uploadParams).then((resp) => {
        console.log(resp, 'pppppppppppp');
        if (resp.status === 200) {
          // this.state.fileName.push(resp.data.fileName)
          resp.data.forEach((data) => {
            this.state.fileName.push(data.fileName);
            this.setState({ uploadUrl: data.url });
          });
          console.log(this.state.fileName, 'oooooooooooo');
          // this.uploadFile();
          this.uploadFile();
        }
      });
    } else {
      console.log('process will not run');
    }
  };
  uploadFile = () => {
    fetch(this.state.uploadUrl, {
      method: 'PUT',
      mode: 'cors',
      body: this.state.uploadImage,
    })
      .then((resp) => console.log(resp, 'llll'))
      .catch((err) => console.log(err));
  };
  uploadFiles = (data) => {
    console.log(data);
    let formdata = new FormData();
    if (this.props.location.state.product_obj) {
      if (data.length > 0) {
        this.setState({ openModal: !this.state.openModal });

        for (let i = 0; i < data.length; i++) {
          formdata.append('productMedia', data[i], data[i].name);
        }
        console.log('form data sent:', formdata);
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            if (percent < 100) {
              this.setState({ uploadPercentage: percent });
            }
          },
        };

        const prod_id = this.props.history.location.state.product_obj.id;

        APIManager.uploadProductMedia(prod_id, formdata, options)
          .then((response) => {
            console.log(response);
            if (response.data.status === 'success') {
              message.info('Media Uploaded successfully');
              this.setState(
                { fileList: response.data.data.media, uploadPercentage: 100 },
                () => {
                  setTimeout(() => {
                    this.setState({ uploadPercentage: 0 });
                  }, 1500);
                }
              );
            }
          })
          .catch((err) => message.error('Something went wrong.'));
      }
    } else {
      this.setState({ fileList: data, openModal: !this.state.openModal });
    }
  };

  saveProduct = (values) => {
    console.log('form data', values);
    let media = [];
    this.state.fileName.forEach((data, i) => {
      media.push({
        fileName: data,
        fileType: this.state.contentType,
      });
    });
    let data = {
      ...values,
      amount: values.price.amount,
      currency: values.price.currency,
      media,
    };
    delete data.price;
    console.log('data in save', data);

    if (this.props.history.location.state.product_obj) {
      const id = this.props.history.location.state.product_obj.id;
      const prevImageArray = this.props.location.state.product_obj
        ? this.props.location.state.product_obj.media
        : [];
      let editmedia = [];
      this.state.fileName.forEach((data, i) => {
        editmedia.push({
          fileName: data,
          fileType: this.state.contentType,
        });
      });

      const EditImageArray = [...prevImageArray, ...editmedia];
      const patchData = {
        ...values,
        media: EditImageArray,
      };
      console.log('patch data:', patchData);
      APIManager.patchCompanyProduct(id, patchData)
        .then((resp) => {
          console.log('patch API resp:', resp);
          if (resp.data.isSuccess) {
            message.success('Product Updated successfully');
            this.props.history.push('/company/products');
          } else {
            message.error(resp.error);
          }
        })
        .catch((error) => {
          message.error(error);
        });
    } else {
      // let form_data = HELPERS.converToFormData(data);
      // this.state.fileList.forEach((file) => {
      //   console.log('file:', file);
      //   form_data.append('productMedia', file, file.name);
      // });
      // console.log('data for product addition:', form_data);
      APIManager.postCompanyProduct(data)
        .then((resp) => {
          console.log('post API resp:', resp);
          if (resp.data.isSuccess) {
            message.success('Product Added successfully');
            this.props.history.push('/company/products');
          } else {
            message.error(resp.error);
          }
        })
        .catch((err) => {
          console.log('error in Api', err);
          message.error('Something went wrong');
        });
    }
  };

  ToggelModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  renderProductList = () => {
    this.props.history.push('/company/products');
  };

  render() {
    const { openModal, uploadPercentage } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    let AttachMedia = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>Attach Media</div>
        <Button
          className="add_media_button"
          onClick={this.ToggelModal}
          style={{ backgroundColor: 'transparent' }}
        >
          <img
            width={'auto'}
            src={process.env.PUBLIC_URL + '/add-circle.png'}
          />
          &nbsp;&nbsp; Add media
        </Button>
      </div>
    );
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const prevImageArray = [];

    //this.props.location.state.product_obj
    //   ? this.props.location.state.product_obj.media
    //   : [];
    return (
      <div>
        <div>
          <LeftOutlined
            className="back-icon"
            onClick={this.renderProductList}
          />
          <span className="back-btn" onClick={this.renderProductList}>
            Go back
          </span>
        </div>
        <Form
          layout="vertical"
          ref={this.formRef}
          name="product-add-edit-form"
          onFinish={this.saveProduct}
        >
          <Row className="services-header" justify="space-between">
            <Col span={12}>
              <span className="header-text">
                {/* {this.props.location.state.product_obj ? 'Edit' : 'Add'} Product */}
              </span>
            </Col>
            <Col span={12}>
              <Button className="add-service-btn" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
          <Row gutter={24} className="add-form">
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Product Name"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price">
                <Input.Group compact>
                  <Form.Item
                    name={['price', 'currency']}
                    style={{ display: 'inline-block' }}
                  >
                    <Select
                      defaultValue="US Dollar"
                      className="currency-select"
                    >
                      {CURRENCY.map((curr) => (
                        <Option value={curr.name}>{curr.symbol}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={['price', 'amount']}
                    style={{ display: 'inline-block' }}
                    rules={[{ required: true, message: 'Required field' }]}
                  >
                    <Input
                      size="large"
                      className="s-input-fields"
                      placeholder="Enter Price"
                      type="number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="availability" label="Availability">
                <Input
                  size="large"
                  className="s-input-fields"
                  placeholder="Enter Availability"
                  type="string"
                />
                {/* <Select
                  className="s-input-fields"
                  placeholder="Select Availability"
                >
                  <Option value="1m">1 month</Option>
                  <Option value="2m">2 months</Option>
                  <Option value="3m">3 months</Option>
                  <Option value="4m">4 months</Option>
                  <Option value="5m">5 months</Option>
                  <Option value="6m">6 months</Option>
                  <Option value="1y">1 year</Option>
                  <Option value="more">More than a year</Option>
                </Select> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="reference" label="Reference">
                <Input
                  placeholder="Enter Reference"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="shopUrl" label="Shop URL">
                <Input
                  placeholder="Enter url"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="Category">
                <Select
                  className="s-input-fields category-inp"
                  mode="multiple"
                  placeholder="Select Category"
                >
                  <Option value="lifestyle">Lifestyle</Option>
                  <Option value="product">Product</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="inStock" label="In Stock">
                <Select
                  className="s-input-fields category-inp"
                  placeholder="Select In stock"
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="pricingPlan" label="Pricing Plan">
                <Input
                  placeholder="Select Plan"
                  size="large"
                  className="s-input-fields"
                />
                {/* <Select
                  className="s-input-fields category-inp"
                  placeholder="Select Plan"
                >
                  <Option value="plan1">Plan 1</Option>
                  <Option value="plan2">Plan 2</Option>
                </Select> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="deliveryTime" label="Delievery Time">
                <Input
                  placeholder="Enter Time"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={24}>
              <Form.Item name="shortDescription" label="Short Description">
                <TextArea
                  className="short-desc-input s-input-fields"
                  bordered={false}
                  placeholder="Enter Description"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="fullDescription"
                label="Full Description"
                // rules={[{ required: true, message: 'Required Field!' }]}
              >
                <TextArea
                  className="short-desc-input s-input-fields"
                  bordered={false}
                  placeholder="Enter Description"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className={'d-flex'}>
                {/* {this.props.location.state.addForm ? (
                  ''
                ) : (
                  <>
                    {prevImageArray &&
                      prevImageArray.map((data) => (
                        <div style={{ display: 'inline-block' }}>
                          <Image
                            src={data.filePath}
                            width={150}
                            height={100}
                          ></Image>
                        </div>
                      ))}
                  </>
                )} */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onClick={this.setCounter}
                  onPreview={this.handlePreview}
                  onChange={this.handleUploadFiles}
                  onRemove={() => this.setState({ fileList: [], fileName: [] })}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
              </div>

              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>
        </Form>
        {openModal && (
          <MediaModal
            isOpen={openModal}
            isClose={this.ToggelModal}
            uploadFiles={this.uploadFiles}
          />
        )}
        {uploadPercentage > 0 && (
          <Progress
            strokeColor="#EE505080"
            status="active"
            style={{ width: '50%', float: 'right' }}
            percent={uploadPercentage}
          />
        )}
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     data: state.appliedJobsReducer.data,
//     isloading: state.appliedJobsReducer.isloading,
//   };
// };
// export default withRouter(connect(mapStateToProps)(AddProduct));
