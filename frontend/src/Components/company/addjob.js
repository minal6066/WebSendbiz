import React, { Component } from 'react';
import {
  Row,
  Col,
  Image,
  Input,
  Upload,
  Button,
  message,
  Modal,
  Form,
  Select,
} from 'antd';
import { Formik } from 'formik';
import { EditFilled, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import APIManager from '../../APIManager/index';
import axios from 'axios';
import CompanyHeader from './companyHeader';
import companyCover from '../asset/edit-company.png';
import companylogo from '../asset/edit-company-logo.png';
import { DatePicker, Space } from 'antd';
import { connect } from 'react-redux';
import { reloadComponent } from '../../Redux/Actions/JobManagementAction';
import { EditOutlined } from '@ant-design/icons';
import { ImageUrl } from '../../Shared/imageUrlPath';
import { withRouter } from 'react-router-dom';
import AddJobHeader from './addjobHeader';
import { fileUrl } from '../../Shared/imageUrlPath';
import SelectCategory from './selectCategory';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;

let formButton = null;
let imageButton = null;
let addMultiple = null;
let imageUploadCounter = 0;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
class Addjob extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      categories:[],
      logo: '',
      logoCover: '',
      logoUpload: '',
      published_from: null,
      published_to: null,
      title2: '',
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
      // ================================key for cover and logo====================
      coverImageKey: '',
      logoImageKey: '',
      logoImageType: '',
      coverImageType: '',
      // ================================end key for cover and logo====================
    };
  }
  async componentWillMount() {
    const jobId = this.props.location.state.jobId;
    await APIManager.getJobDescription(jobId).then((resp) => {
      console.log(resp, 'llllllll');
      this.setState({
        title2: resp.data.data.title,
      });

      console.log(this.state.title2, 'sss');
    });
  }
  getCoverLogoKeys = (file, key, img_type) => {
    if (file.cover) {
      this.setState({
        coverImageKey: key,
        coverImageType: img_type,
      });
    } else if (file.logo) {
      this.setState({
        logoImageKey: key,
        logoImageType: img_type,
      });
    }
  };
  handleSelectedCategories = (value) => {
    console.log(`selected ${value}`);
  };

  EditJob = (values) => {
    console.log(values);
    values['job_logo'] = this.state.logoImageKey;
    values['job_cover'] = this.state.coverImageKey;
    values['publish_from'] = this.state.published_from;
    values['publish_to'] = this.state.published_to;
    console.log(values);
    const jobData = this.props.history.location.state;
    const jobId = this.props.history.location.state._id;
    APIManager.editJob(jobId, values).then((resp) => {
      message.info('Edited!');
      this.props.history.push('/companyjoblist');
    });
    // .catch((err) => message.error('Something went wrong.'));
  };

  CreateJob = () => {
    this.formRef.current.submit();
  };
  handleSubmit = (values) => {
    console.log('hello', this.props.history.location.state);
    const jobId = this.props.history.location.state._id;
    setTimeout(() => {
      if (jobId !== undefined && jobId !== null) {
        console.log('edit');
        this.EditJob(values);
      } else {
        console.log('addd');
        this.AddJob(values);
      }

      console.log(values, 'sss');
    }, 500);
  };
  onChangeimage1 = () => {
    console.log('inside image change');
    imageButton.click();
  };
  addMultiImage = () => {
    console.log('add multiple');
    addMultiple.click();
  };
  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
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
            requestType: 'JobsMedia',
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

  handledatechange = (date, dateString) => {
    this.setState({
      published_from: dateString,
    });
  };
  componentDidMount() {
    console.log(this.props.history.location.state);
    if (
      this.props.history.location.state.publish_from !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        published_from: this.props.history.location.state.publish_from,
        published_to: this.props.history.location.state.publish_to,
        coverImageKey: this.props.history.location.state.job_cover,
        logoImageKey: this.props.history.location.state.job_logo,
      });
    }
    this.getCategories()
  }
  getCategories = (pageNumber=1,search="") =>{
    console.log(pageNumber,search,"==================")
    let options = [];
    APIManager.allJobCategories(pageNumber,search)
    .then((resp) => {
      console.log("resp:",resp.data.data)
      const opt = resp.data.data;
      opt.forEach((data) => {
        options.push({
          label: data ? data.title : '',
          value: data ? data._id : '',
          key: data._id,
        });
      });
      // this.setState({categories:options})
      const newOptions = options.filter(
          (v, i, a) => a.findIndex((t) => t.label === v.label) === i
        );
      console.log("newOptions:", newOptions)
      this.setState({
        categories: newOptions
      });
      console.log("state:",this.state.categories);
      // this.setState(previousState => ({
      //   categories: [...previousState.categories, options]
      // }));

    })
  }
  handleCategorySearch = (value) =>{
    this.getCategories(1,value)
  }
  handlepublisheddate = (date, dateString) => {
    console.log(dateString);
    this.setState({
      published_to: dateString,
    });
  };
  disabledDate = (current) => {
    // console.log("current date:", current);
    let customDate = moment(this.state.published_from);
    return current < customDate;
  };
  toBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ logoUpload: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };
  toBaseCover64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ coverUpload: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };
  
  AddJob = (data) => {
    console.log(data, 'data');
    // const jobId = this.props.history.location.state.jobId;
    let media = [];
    this.state.fileName.forEach((val, i) => {
      media.push({
        fileName: val,
        fileType: this.state.contentType,
      });
    });
    console.log(media)
    let params = {
      ...data,
      publish_from: this.state.published_from,
      publish_to: this.state.published_to,
      job_logo: this.state.logoImageKey,
      job_cover: this.state.coverImageKey,
      media,
    };
    console.log(data)
    const jobData = this.props.history.location.state;
    let url = 'https://api.sendbiz.com/add_job';
    var ls = require('local-storage');
    var tok = ls.get('token');
    axios.post(url, params, {
          headers: {
            //  'content-type': 'multipart/form-data',
            'Access-Control-Allow-Credentials': true,
            Authorization: `Bearer ${tok}`,
          },
        })
        .then((res) => {
          console.log(res, 'sss');
          message.info('Submitted!');
          this.props.history.push('/companyjoblist');
        });
  };
  render() {
    console.log(this.state.categories, 'props');
    const jobData = this.props.history.location.state;
    const title = jobData ? jobData.title : '';
    const contact = jobData ? jobData.contact : '';
    const qualification = jobData ? jobData.qualification : '';
    const minSal = jobData ? jobData.min_salary : '';
    const maxSal = jobData ? jobData.max_salary : '';
    const req_process = jobData ? jobData.req_process : '';
    const desired = jobData ? jobData.desired : '';
    const description = jobData ? jobData.description : '';
    const subcontract = jobData ? jobData.subcontract : '';
    const min_experience = jobData ? jobData.min_experience : '';
    const max_experience = jobData ? jobData.max_experience : '';
    const sector = jobData ? jobData.sector : '';
    const period = jobData ? jobData.period : '';
    const specialization = jobData ? jobData.specialization : '';
    const accodomation = jobData ? jobData.accodomation : '';
    const miss_start = jobData ? jobData.miss_start : '';
    const miss_salary = jobData ? jobData.miss_salary : '';
    const offer = jobData ? jobData.offer : '';
    const category = jobData ? jobData.category : '';
    const jobId = this.props.history.location.state.jobId;
    const experience = jobData ? jobData.experience : '';
    const editedlogo = jobData === undefined ? '' : jobData.job_logo;
    const jobCover = jobData ? jobData.job_cover : '';
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const prevImageArray = this.props.location.state.media
      ? this.props.location.state.media
      : [];
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    var ls = require('local-storage');
    ls.set('job_id', jobId);
    // console.log(children, '======');
    return (
      <div>
        <Row>
          <Col span={12}>
            <p
              style={{
                fontFamily: 'Gilroy Bold',
                fontSize: 28,
                fontWeight: 'bold',
                fontStyle: 'normal',
              }}
            >
              Add Jobs
            </p>
          </Col>
          <Col span={12} style={{ textAlign: 'end' }}>
            <button
              type="submit"
              className="btn btn-dark bold-family btn-save-font cursor"
              style={{ width: 192, height: 50 }}
              onClick={this.CreateJob}
            >
              Save
            </button>
          </Col>
        </Row>
        <AddJobHeader
          getCoverLogoKeys={this.getCoverLogoKeys}
          cover={jobCover}
          logo={editedlogo}
        />
        {/*<Formik
          initialValues={{
            title: title ? title : '',
            experience: experience ? experience : '',
            contact: contact ? contact : '',
            order_ref: offer ? offer : '',
            category: category ? category : '',
            qualification: qualification ? qualification : '',
            min_salary: minSal ? minSal : '',
            max_salary: maxSal ? maxSal : '',
            miss_salary: miss_salary ? miss_salary : '',
            miss_start: miss_start ? miss_start : '',
            accodomation: accodomation ? accodomation : '',
            specialization: specialization ? specialization : '',
            sector: sector ? sector : '',
            period: period ? period : '',
            min_experience: min_experience ? min_experience : '',
            max_experience: max_experience ? max_experience : '',
            published_from: '',
            published_to: '',
            sub_contract: subcontract ? subcontract : '',
            description: description ? description : '',
            desired: desired ? desired : '',
            req_process: req_process ? req_process : '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              this.EditJob(values);
              this.AddJob(values);
              console.log(values, 'sss');
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            // email: Yup.string().email().required('email is required.'),
            // password: Yup.string().required('password is required.'),
            title: Yup.string().required('required'),
            experience: Yup.string().required('required'),
            contact: Yup.string().required('required'),
            order_ref: Yup.string().required('required'),
            category: Yup.string().required('required'),
            qualification: Yup.string().required('required'),
            min_salary: Yup.string().required('required'),
            max_salary: Yup.string().required('required'),
            miss_salary: Yup.string().required('required'),
            miss_start: Yup.string().required('required'),
            specialization: Yup.string().required('required'),
            sector: Yup.string().required('required'),
            period: Yup.string().required('required'),
            min_experience: Yup.string().required('required'),
            max_experience: Yup.string().required('required'),
            // published_from: Yup.string().required('required'),
            // published_to: Yup.string().required('reuired'),
            sub_contract: Yup.string().required('required'),
            description: Yup.string().required('required'),
            desired: Yup.string().required('required'),
            req_process: Yup.string().required('required'),
            accodomation: Yup.string().required('required'),
          })}
        >
          {(props) => {
            const {
              values,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit,
              initialValues,
            } = props;

            return (
              <>*/}
        <Form
          // onSubmit={this.handleSubmit}
          initialValues={{
            title: title ? title : '',
            experience: experience ? experience : '',
            contact: contact ? contact : '',
            order_ref: offer ? offer : '',
            category: category ? category : [],
            qualification: qualification ? qualification : '',
            min_salary: minSal ? minSal : '',
            max_salary: maxSal ? maxSal : '',
            miss_salary: miss_salary ? miss_salary : '',
            miss_start: miss_start ? miss_start : '',
            accodomation: accodomation ? accodomation : '',
            specialization: specialization ? specialization : '',
            sector: sector ? sector : '',
            period: period ? period : '',
            min_experience: min_experience ? min_experience : '',
            max_experience: max_experience ? max_experience : '',
            published_from: '',
            published_to: '',
            sub_contract: subcontract ? subcontract : '',
            description: description ? description : '',
            desired: desired ? desired : '',
            req_process: req_process ? req_process : '',
          }}
          ref={this.formRef}
          onFinish={this.handleSubmit}
        >
          <Row style={{ marginTop: 40 }}>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Title</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="title"
              >
                <Input
                  name="title"
                  className="input-field-custom-type-1-left"
                  // value={values.title}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Experience Level</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="experience"
              >
                <Select
                  name="experience"
                  className="input-label-field-custom-select-type-4"
                  // onChange={handleChange}
                  // value={values.experience}
                >
                  <Option value="Not Applicable">Not Applicable</Option>
                  <Option value="Internship">Internship</Option>
                  <Option value="Apprenticeship">Apprenticeship</Option>
                  <Option value="Entry level">Entry level</Option>
                  <Option value="Entry level">Associate</Option>
                  <Option value="Mid-Senior level">Mid-Senior level</Option>
                  <Option value="Director">Director</Option>
                  <Option value="Executive">Executive</Option>
                  <Option value="Expert">Expert</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Contact</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="contact"
              >
                <Input
                  name="contact"
                  // onChange={handleChange}
                  className="input-field-custom-type-1-left"
                  // value={values.contact}
                  type={'number'}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Job Category</label>
              
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: false, message: 'Required field' }]}
                name="category"
              >
                <Select
                  mode="multiple"
                  allowClear
                  removeIcon={
                      <img
                        style={{ width: 14, height: 14 }}
                        src={process.env.PUBLIC_URL + '/cancel.png'}
                        alt=""
                      />
                    }
                  style={{ width: '100%' }}
                  filterOption={false}
                  placeholder="Please select"
                  className="input-label-field-custom-select-type-2"
                  onSearch={this.handleCategorySearch}
                  options={this.state.categories}
                >
                </Select>
              </Form.Item>
              
            </Col>
          </Row>
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Offered Reference</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="order_ref"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="order_ref"
                  // onChange={handleChange}
                  // value={values.order_ref}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Qualification</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="qualification"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="qualification"
                  // onChange={handleChange}
                  // value={values.qualification}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Min. Salary</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="min_salary"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="min_salary"
                  // onChange={handleChange}
                  // value={values.qualification}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Max. Salary</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="max_salary"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="max_salary"
                  // onChange={handleChange}
                  // value={values.qualification}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Mission Salary</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="miss_salary"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="miss_salary"
                  // onChange={handleChange}
                  // value={values.qualification}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Location</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="accodomation"
              >
                <Select
                  className="input-label-field-custom-select-type-4"
                  name="accodomation"
                  // onChange={handleChange}
                  // value={values.accodomation}
                >
                  <Option value="nearby">near by</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12} className="form-padding-left">
              <label className="input_label_profile">Mission Start</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="miss_start"
              >
                <Select
                  className="input-label-field-custom-select-type-4"
                  name="miss_start"
                  // onChange={handleChange}
                  //   value={values.mission_start}
                >
                  <Option value="5000">5000</Option>
                  <Option value="10000">10000</Option>
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          <Row>
            <Col span={12}>
              <label className="input_label_profile">Specialization</label>
              <Form.Item
                style={{ width: '94%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="specialization"
              >
                <Select
                  className="input-label-field-custom-select-type-4"
                  name="specialization"
                  // onChange={handleChange}
                  // value={values.specialization}
                >
                  <Option value="experinced">experinced</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Active Sector</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="sector"
              >
                <Input
                  className="input-field-custom-type-1-left"
                  name="sector"
                  // onChange={handleChange}
                  // value={values.sector}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <label className="input_label_profile">Period</label>
              <Form.Item
                style={{ width: '94%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="period"
              >
                <Select
                  className="input-label-field-custom-select-type-4"
                  name="period"
                  // onChange={handleChange}
                  // value={values.period}
                >
                  <Option value="1">1 year</Option>
                  <Option value="2">2 years</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Min. Experience</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="min_experience"
              >
                <Select
                  name="min_experience"
                  // onChange={handleChange}
                  //value={values.min_experience}
                  className="input-label-field-custom-select-type-4"
                >
                  <Option value="1">1 year</Option>
                  <Option value="2">2 years</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <label className="input_label_profile">Max. Experience</label>
              <Form.Item
                style={{ width: '94%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="max_experience"
              >
                <Select
                  name="max_experience"
                  className="input-label-field-custom-select-type-4"
                  // onChange={handleChange}
                  // value={values.max_experience}
                >
                  <Option value="1">1 year</Option>
                  <Option value="2">2 years</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="form-padding-right">
              <div>
                <label className="input_label_profile">
                  Subcontracting Accepted
                </label>
                <Form.Item
                  style={{ width: '100%', margin: 0 }}
                  rules={[{ required: true, message: 'Required field' }]}
                  name="sub_contract"
                >
                  <Select
                    name="sub_contract"
                    // onChange={handleChange}
                    // value={values.sub_contract}
                    className="input-label-field-custom-select-type-4"
                  >
                    <Option value="1">1 year</Option>
                    <Option value="2">2 years</Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="form-padding-right">
              <label className="input_label_profile">Published From</label>
              <DatePicker
                onChange={this.handledatechange}
                suffixIcon={
                  <img src={process.env.PUBLIC_URL + '/calendar-date.svg'} />
                }
                value={
                  this.state.published_from
                    ? moment(this.state.published_from)
                    : undefined
                }
                className="w-100 input-field-custom-type-1-left"
              />
            </Col>
            <Col span={12} className="form-padding-left">
              <div>
                <label className="input_label_profile">Published To</label>
                <DatePicker
                  onChange={this.handlepublisheddate}
                  value={
                    this.state.published_to
                      ? moment(this.state.published_to)
                      : undefined
                  }
                  disabledDate={this.disabledDate}
                  suffixIcon={
                    <img src={process.env.PUBLIC_URL + '/calendar-date.svg'} />
                  }
                  className="w-100 input-field-custom-type-1-left"
                />
              </div>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col span={23}>
              <label className="input_label_profile">Job Description</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="description"
              >
                <TextArea
                  className="input-font form-control profile-form-control"
                  name="description"
                  // onChange={handleChange}
                  // value={values.description}
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={23}>
              <label className="input_label_profile">Desired Candidate</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="desired"
              >
                <TextArea
                  className="input-font form-control profile-form-control"
                  name="desired"
                  // onChange={handleChange}
                  // value={values.desired}
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={23}>
              <label className="input_label_profile">Recruitment Process</label>
              <Form.Item
                style={{ width: '100%', margin: 0 }}
                rules={[{ required: true, message: 'Required field' }]}
                name="req_process"
              >
                <TextArea
                  name="req_process"
                  // onChange={handleChange}
                  // value={values.req_process}
                  className="input-font form-control profile-form-control"
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 15 }}>
            <Col span={12}>
              <label className="input_label_profile">Attached media</label>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={7}>
                  <div className={'d-flex'}>
                    {prevImageArray &&
                      prevImageArray.map((data) => (
                        <div style={{ display: 'inline-block' }}>
                          <Image
                            src={fileUrl.fileUrlPath + data.fileName}
                            width={150}
                            height={100}
                          ></Image>
                        </div>
                      ))}

                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onClick={this.setCounter}
                      onPreview={this.handlePreview}
                      onChange={this.handleUploadFiles}
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
            </Col>
          </Row>
          <button style={{ opacity: 0 }} htmlType="submit">
            hhhhhh
          </button>
        </Form>
        {/*</>
            );
          }}
        </Formik>*/}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    decriptionData: state.jobManagementReducer.decriptionData,
    isloading: state.jobManagementReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(Addjob));
