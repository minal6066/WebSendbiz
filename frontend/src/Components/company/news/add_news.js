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
  Spin,
  Image,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './addService.css';
import { LeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import APIManager from '../../../APIManager/index';

const { Option } = Select;
const { TextArea } = Input;

let imageUploadCounter = 0;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class AddNews extends Component {
  formRef = React.createRef();
  state = {
    isLoading: false,
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
  };

  componentDidMount() {
    if (this.props.history.location.state.news_obj) {
      this.formRef.current.setFieldsValue({
        ...this.props.history.location.state.news_obj,
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
            requestType: 'CompanyNewsImage',
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
  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };
  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };

  renderNewsList = () => {
    this.props.history.push('/company/news');
  };
  handleChange = (changed_values, all_values) => {
    console.log('form values', changed_values, all_values);
  };
  finishForm = (val) => {
    console.log(this.state.fileName);
    const data = {
      title: val.title,
      description: val.description,
      image: this.state.fileName,
    };
    // data.image = this.state.fileName.map(val => val !== null)
    console.log(data.image);
    this.setState({
      isLoading: true,
    });
    const addForm = this.props.location.state.addForm;
    if (addForm) {
      APIManager.addNews(data)
        .then((resp) => {
          if (resp.data.isSuccess) {
            this.setState({
              isLoading: false,
            });
            this.props.history.push('/company/news');
            message.info(resp.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const id = this.props.location.state.news_obj._id;
    const prevImageArray = this.props.location.state.news_obj
      ? this.props.location.state.news_obj.image
      : [];

    this.state.fileName.map((data) =>
      this.setState({
        newFileName: data,
      })
    );
    const EditImageArray = [...prevImageArray, this.state.newFileName];
    const editData = {
      title: val.title,
      description: val.description,
      image: EditImageArray,
    };
    if (id) {
      APIManager.editNews(id, editData)
        .then((resp) => {
          if (resp.data.isSuccess) {
            this.setState({ isLoading: false });
            message.info(resp.data.message);
            this.props.history.push('/company/news');
          }
        })
        .catch((err) => {
          this.setState({
            isLoading: false,
          });
          message.error('Something went wrong.');
        });
    }
  };
  render() {
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    // const { searchQuery } = this.props;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const prevImageArray = this.props.location.state.news_obj
      ? this.props.location.state.news_obj.imagePath
      : '';
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8, width: 200 }}>Upload</div>
      </div>
    );
    console.log('props:', this.props);
    return (
      <div className="applied-job-paddingright ">
        <div className={'d-flex justify-content-center'}>
          {this.state.isLoading && <Spin />}
        </div>
        <div>
          <LeftOutlined className="back-icon" onClick={this.renderNewsList} />
          <span className="back-btn" onClick={this.renderNewsList}>
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
                {this.props.location.news_obj ? 'Edit' : 'Add'} News
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
              <Form.Item name="image" label="Image">
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
                    {this.state.previewVisible ? (
                      <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    ) : (
                      ''
                    )}
                  </Modal>
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="title"
                label="News Title"
                rules={[{ required: true, message: 'Required Field!' }]}
              >
                <Input
                  placeholder="Enter News Title"
                  size="large"
                  className="s-input-fields"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                // rules={[{ required: true, message: 'Required Field!' }]}
              >
                <TextArea
                  className="short-desc-input s-input-fields"
                  bordered={false}
                  placeholder="Enter Description Of Your News Here"
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
