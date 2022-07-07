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
  TimePicker,
  Spin,
  message,
  Progress,
  Image,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './addService.css';
import { LeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import MediaModal from '../products/MediaModal';
import { CURRENCY } from '../../constants/currency';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const CompanyServicesData = [
  {
    comp_id: '1',
    name: 'Design',
    duration: '6 Months',
    location: 'California',
    price: 45.99,
    period: 'Daily',
    price_plan: 'NA',
    experience: '10 years',
    category: ['LifeStyle', 'Service'],
    delivery_time: '10 days',
    brochure: 'file',
    short_desc:
      'JobHunt is a platform that allows blah blah blah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
    full_desc: 'Enter Details',
    isActive: true, // true=Active, false=Deleted
  },
];

const currencyDropdown = (
  <Select defaultValue="$">
    <Option value="$">$</Option>
    <Option value="$">$</Option>
    <Option value="$">$</Option>
  </Select>
);
let imageUploadCounter = 0;
export default class AddService extends Component {
  formRef = React.createRef();
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    isLoading: false,
    openModal: false,
    deliveryTime: null,
    serviceMedia: null,
    serviceMediaName: null,
    upload_image_name: '',
    loading: false,
    uploadUrl: '',
    fileType: [],
    fileName: [],
    contentType: [],
    uploadImage: '',
    prevFileName: '',
    newfileName: '',
    brochureName: [],
    brochureType: '',
  };

  componentDidMount() {
    if (this.props.history.location.state.service_obj) {
      this.formRef.current.setFieldsValue({
        ...this.props.history.location.state.service_obj,
      });
    }
  }
  setCounter = () => (imageUploadCounter = 0);
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };
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
            requestType: 'CompanyServiceMedia',
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
    //this.state.fileName.length = 1;
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

  //handleChange = ({ fileList }) => this.setState({ fileList });

  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };

  renderServiceList = () => {
    this.props.history.push('/company/services');
  };
  handleChange = (changed_values, all_values) => {
    console.log('form values', changed_values, all_values);
  };
  handlepdfUpload = (info) => {
    imageUploadCounter += 1;
    if (imageUploadCounter < 2) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      }
      this.setState({
        uploadImage: info.file.originFileObj,
        brochureType: info.file.originFileObj.type,
      });
      const uploadParams = {
        files: [
          {
            requestType: 'CompanyServiceBrochures',
            contentType: this.state.brochureType,
          },
        ],
      };
      APIManager.preSignedUrl(uploadParams).then((resp) => {
        console.log(resp, 'pppppppppppp');
        if (resp.status === 200) {
          // this.state.fileName.push(resp.data.fileName)
          resp.data.forEach((data) => {
            this.state.brochureName.push(data.fileName);
            this.setState({ uploadUrl: data.url });
          });
          console.log(this.state.fileName, 'oooooooooooo');
          // this.uploadFile();
          this.uploadFile();
        }
      });
    } else {
      console.log('process wil not run.');
    }
    console.log(this.state.brochureName, 'llllllll');
  };
  handletime = (time, timeString) => {
    this.setState({
      deliveryTime: time,
    });
  };
  ToggelModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  finishForm = (val) => {
    console.log(this.state.contentType);
    let media = [];
    this.state.fileName.forEach((data, i) => {
      media.push({
        fileName: data,
        fileType: this.state.contentType,
      });
    });
    let brochureMedia = [];
    this.state.brochureName.forEach((data, i) => {
      brochureMedia.push({
        fileName: data,
        fileType: this.state.brochureType,
      });
    });
    console.log(this.state.brochureFile, ';;;;;;;;;');
    const data = {
      name: val.name,
      location: val.location,
      duration: val.duration,
      period: val.period,
      category: val.category,
      brochure: brochureMedia,
      shortDescription: val.shortDescription,
      fullDescription: val.fullDescription,
      experience: val.experience,
      pricingPlan: val.pricingPlan,
      deliveryTime: this.state.deliveryTime,
      amount: val.price.amount,
      currency: val.price.currency,
      media,
    };
    console.log(media);
    const addForm = this.props.location.state.addForm;
    if (addForm) {
      APIManager.addService(data)
        .then((resp) => {
          console.log(data, 'lllllllllllll');
          if (resp.data.isSuccess) {
            message.info(resp.data.message);
            this.props.history.push('/company/services');
          }
        })
        .catch((err) => {
          message.error('Something went wrong.');
        });
    }
    const id = this.props.location.state.service_obj._id;
    const prevImageArray = this.props.location.state.service_obj
      ? this.props.location.state.service_obj.media
      : [];
    let editmedia = [];
    this.state.fileName.forEach((data, i) => {
      editmedia.push({
        fileName: data,
        fileType: this.state.contentType,
      });
    });

    const EditImageArray = [...prevImageArray, ...editmedia];
    const editdata = {
      name: val.name,
      location: val.location,
      duration: val.duration,
      period: val.period,
      category: val.category,
      brochure: this.state.brochureFile,
      shortDescription: val.shortDescription,
      fullDescription: val.shortDescription,
      experience: val.experience,
      pricingPlan: val.pricingPlan,
      deliveryTime: this.state.deliveryTime,
      amount: val.price.amount,
      currency: val.price.currency,
      media: EditImageArray,
      // media: [
      //   {
      //     fileName: EditImageArray,
      //     fileType: this.state.fileType,
      //   },
      // ],
    };

    console.log(editdata, 'editData');
    if (id) {
      APIManager.editService(id, editdata)
        .then((resp) => {
          if (resp.data.isSuccess) {
            message.info(resp.data.message);
            this.props.history.push('/company/services');
          }
        })
        .catch((err) => message.error('Something went wrong.'));
    }
  };
  //   if (id === '' && id === undefined) {
  //     APIManager.addService(formdata)
  //       .then((resp) => {
  //         this.setState({ isLoading: false });
  //         console.log(resp);
  //         if (resp.data.isSuccess) {
  //           message.info('Service Added!');
  //         }
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           isLoading: false,
  //         });
  //         message.error('Something went wrong!');
  //       });
  //   } else {
  //     APIManager.editService(id, formdata)
  //       .then((resp) => {
  //         if (resp.data.isSuccess) {
  //           message.info(resp.data.message);
  //         }
  //       })
  //       .catch((err) => message.error('Something went wrong.'));
  //   }
  //   console.log('form values', val);
  // };
  toBase64 = (file, name) => {
    // console.log(file)
    const upload_image_name = this.state.file.name;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ uploadedImage: reader.result, upload_image_name });
      }
    };
    reader.readAsDataURL(file);
  };
  uploadFiles = (data) => {
    console.log(data, 'dataa');
    for (let i = 0; i < data.length; i++) {
      this.setState({
        serviceMedia: data[i],
        serviceMediaName: data[i].name,
        openModal: !this.state.openModal,
      });
    }
    getBase64(this.state.serviceMedia);
    console.log(this.state.serviceMedia, 'filelist');
    // this.setState({ fileList: data, openModal: !this.state.openModal });
  };

  render() {
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    // const { searchQuery } = this.props;
    console.log(this.props, 'lllllllllllllll');
    const prevImageArray = this.props.location.state.service_obj
      ? this.props.location.state.service_obj.media
      : '';
    let AttachMedia = (
      <div className={'d-flex justify-content-space-between'}>
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
    const { openModal, uploadPercentage } = this.state;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    console.log('props:', this.props);
    return (
      <div className="applied-job-paddingright ">
        <div className={'d-flex justify-content-center'}>
          {this.state.isLoading && <Spin />}
        </div>
        <div>
          <LeftOutlined
            className="back-icon"
            onClick={this.renderServiceList}
          />
          <span className="back-btn" onClick={this.renderServiceList}>
            Go back
          </span>
        </div>
        <Form
          layout="vertical"
          ref={this.formRef}
          name="service-add-edit-form"
          onValuesChange={this.handleChange}
          onFinish={this.finishForm}
        >
          <Row className="services-header" justify="space-between">
            <Col span={12}>
              <span className="header-text">
                {this.props.location.state.service_obj ? 'Edit' : 'Add'} Service
              </span>
            </Col>
            <Col span={12}>
              <Button className="add-service-btn" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
          <Row gutter={24} className="add-service-form">
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Service Name"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location of Intervation"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Location"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Select
                  defaultValue="3m"
                  className="s-input-fields"
                  // dropdownStyle={{ height: '50px' }}
                  placeholder="Select Duration"
                >
                  <Option value="1m">1 months</Option>
                  <Option value="2m">2 months</Option>
                  <Option value="3m">3 months</Option>
                  <Option value="4m">4 months</Option>
                  <Option value="5m">5 months</Option>
                  <Option value="6m">6 months</Option>
                  <Option value="1y">1 year</Option>
                  <Option value="more">More than a year</Option>
                </Select>
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
              <Form.Item
                name="period"
                label="Period"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Select
                  defaultValue="daily"
                  className="s-input-fields"
                  placeholder="Select Period"
                >
                  <Option value="daily">Daily</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="monthly">Monthly</Option>
                  <Option value="annualy">Annualy</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Select
                  defaultValue="lifestyle"
                  className="s-input-fields category-inp"
                  mode="multiple"
                  placeholder="Select Category"
                >
                  <Option value="lifestyle">Lifestyle</Option>
                  <Option value="service">Service</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pricingPlan"
                label="Pricing Plan"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                {/* <Select
                  defaultValue="plan1"
                  className="s-input-fields category-inp"
                  placeholder="Select Plan"
                >
                  <Option value="plan1">Plan 1</Option>
                  <Option value="plan2">Plan 2</Option>
                </Select> */}
                <Input
                  size="large"
                  className="s-input-fields"
                  placeholder="Select Plan"
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="experience"
                label="Experience"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Experience"
                  size="large"
                  className="s-input-fields"
                  name={'experience'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="delivery_time"
                label="Delievery Time"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                {/* <Input
                  placeholder="Enter Time"
                  size="large"
                  className="s-input-fields"
                /> */}
                <TimePicker
                  onChange={this.handletime}
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={20}>
              <Form.Item
                name="brochure"
                label="Brochure"
                // rules={[{ required: true, message: 'Required Field!' }]}
              >
                {/* <Upload className="s-input-fields">
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                  className="s-file-upload"
                  // onClick={this.handleUpload}
                  // disabled={fileList.length === 0}
                  // loading={uploading}
                  type="dashed"
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button> */}
                <Upload
                  className="s-input-fields"
                  onChange={this.handlepdfUpload}
                  accept={'.pdf'}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="shortDescription"
                label="Short Description"
                rules={[
                  {
                    required: true,
                    message: 'Required Field!',
                  },
                  {
                    min: 20,
                    message: 'Short Description must be minimum 20 characters.',
                  },
                ]}
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
              <Form.Item
                name="fullDescription"
                label="Full Description"
                rules={[
                  {
                    required: true,
                    message: 'Required Field!',
                  },
                  {
                    min: 20,
                    message: 'Full Description must be minimum 20 characters.',
                  },
                ]}
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
              <Form.Item
                name="media"
                label="Attach Media"
                // rules={[{ required: true, message: 'Required Field!' }]}
              >
                <div className={'d-flex'}>
                  {this.props.location.state.addForm ? (
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
                  )}

                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onClick={this.setCounter}
                    onPreview={this.handlePreview}
                    onChange={this.handleUploadFiles}
                    onRemove={() =>
                      this.setState({ fileList: [], fileName: [] })
                    }
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>

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
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
