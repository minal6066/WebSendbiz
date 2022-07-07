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
  DatePicker,
  message,
  Image,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './addService.css';
import { LeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import APIManager from '../../../APIManager/index';
import axios from 'axios';
import { findByRole } from '@testing-library/react';

const { Option } = Select;
const { TextArea } = Input;
let imageUploadCounter = 0;
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
export const getBlob = async (fileUri) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};
const currencyDropdown = (
  <Select defaultValue="$">
    <Option value="$">$</Option>
    <Option value="$">$</Option>
    <Option value="$">$</Option>
  </Select>
);
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class AddEvent extends Component {
  formRef = React.createRef();
  state = {
    previewVisible: false,
    previewImage: '',
    uploadUrl: '',
    previewTitle: '',
    fileList: [],
    fileType: '',
    fileName: [],
    uploadImage: '',
    binaryObject: '',
    testFile: '',
    newFileName: '',
  };

  componentDidMount() {
    if (this.props.history.location.state.event_obj) {
      this.formRef.current.setFieldsValue({
        ...this.props.history.location.state.event_obj,
        from_date: moment(),
        to_date: moment(),
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });
  setCounter = () => (imageUploadCounter = 0);
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
  uploadFiles = (e) => {
    const file = e.target.files[0];
    console.log(file, 'ooooooooooooo');
    this.setState({
      testFile: file,
    });
    const uploadParams = {
      files: [
        {
          requestType: 'CompanyEventImage',
          contentType: 'image/png',
        },
      ],
    };
    APIManager.preSignedUrl(uploadParams).then((resp) => {
      console.log(resp, 'pppppppppppp');
      if (resp.status === 200) {
        resp.data.map((data) => {
          return this.setState({
            uploadUrl: data.url,
            fileName: data.fileName,
          });
        });
        console.log(this.state.fileName, 'ooooooooooooooooo');
        // this.uploadFile();
        this.uploadFile();
      }
    });
    console.log(this.state.testFile);
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
            requestType: 'CompanyEventImage',
            contentType: this.state.contentType,
          },
        ],
      };
      APIManager.preSignedUrl(uploadParams).then((resp) => {
        console.log(resp, 'pppppppppppp');
        if (resp.status === 200) {
          resp.data.map((data) => {
            this.state.fileName.push(data.fileName);
            return this.setState({ uploadUrl: data.url });
          });
          console.log(this.state.fileName, 'ooooooooooooooooo');
          // this.uploadFile();
          this.uploadFile();
        }
      });
    } else {
      console.log('process will not run...');
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
  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };

  editEvent = () => {
    const id = this.props.location.event_obj._id;
    APIManager.editEvent(id);
  };
  renderEventList = () => {
    this.props.history.push('/company/events');
  };
  handleChange = (changed_values, all_values) => {
    console.log('form values', changed_values);
  };
  finishForm = (val) => {
    const data = {
      name: val.name,
      location: val.location,
      description: val.desc,
      from: val.from_date,
      to: val.to_date,
      image: this.state.fileName,
    };
    // let formdata = new FormData();
    // formdata.append('name', val.name);
    // formdata.append('location', val.location);
    // formdata.append('description', val.desc);
    // formdata.append('from', val.from_date);
    // formdata.append('to', val.to_date);
    // formdata.append('image', this.state.fileName);
    const addForm = this.props.location.state.addForm;
    if (addForm) {
      APIManager.addEvent(data)
        .then((resp) => {
          if (resp.data.isSuccess) {
            message.info(resp.data.message);
            this.props.history.push('/company/events');
          }
        })
        .catch((err) => {
          message.error('Something went wrong.');
        });
    }
    const id = this.props.location.state.event_obj._id;
    const prevImageArray = this.props.location.state.event_obj
      ? this.props.location.state.event_obj.image
      : [];

    this.state.fileName.map((data) =>
      this.setState({
        newFileName: data,
      })
    );
    const EditImageArray = [...prevImageArray, this.state.newFileName];
    const editedData = {
      name: val.name,
      location: val.location,
      description: val.desc,
      from: val.from_date,
      to: val.to_date,
      image: EditImageArray,
    };
    if (id) {
      APIManager.editEvent(id, editedData)
        .then((resp) => {
          if (resp.data.isSuccess) {
            message.info(resp.data.message);
            this.props.history.push('/company/events');
          }
        })
        .catch((err) => message.error('Something went wrong.'));
    }
  };

  render() {
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    // const { searchQuery } = this.props;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const prevImageArray = this.props.location.state.event_obj
      ? this.props.location.state.event_obj.imagePath
      : '';
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    console.log('props:', this.props);
    return (
      <div>
        <div>
          <LeftOutlined
            className="back-icon"
            onClick={this.renderServiceList}
          />
          <span className="back-btn" onClick={this.renderEventList}>
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
                {this.props.location.event_obj ? 'Edit' : 'Add'} Event
              </span>
            </Col>
            <Col span={12}>
              <Button className="add-service-btn" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
          <Row gutter={24} className="add-service-form">
            <Col>
              <Form.Item
                // name='media'
                label="Image"
                // rules={[{ required: true, message: 'Required Field!' }]}
              >
                <div className={'d-flex'}>
                  {this.props.location.addForm ? (
                    ''
                  ) : (
                    <>
                      {prevImageArray &&
                        prevImageArray.map((data) => (
                          <div style={{ display: 'inline-block' }}>
                            <Image src={data} width={150} height={100}></Image>
                          </div>
                        ))}
                    </>
                  )}
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleUploadFiles}
                    onClick={this.setCounter}
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
            <Col span={23}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Event Name"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter Location"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="from_date"
                label="From Date"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <DatePicker className="s-input-fields" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="to_date"
                label="To Date"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <DatePicker className="s-input-fields" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="desc"
                label="Event Description"
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
          </Row>
        </Form>
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
// export default withRouter(connect(mapStateToProps)(AddService));
