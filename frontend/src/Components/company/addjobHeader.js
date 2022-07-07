import React, { Component } from 'react';
import Box from '../candidate/box.js';
import Footer from '../footer/footer.js';
import 'antd/dist/antd.css';
import { Layout, Menu, Col, Row, Image, Spin } from 'antd';
import AllTabs from '../layout/tabsComponent.js';
import CompanyInfo from './company_info_component.js';
import CompanySocial from './company_social_component.js';
import ContactInfo from './company_contact_info_component.js';
import CompanyMedia from './company_media_component.js';
import companyCover from '../asset/edit-company.png';
import companylogo from '../asset/edit-company-logo.png';
import Axios from '../axios/axios_setup';
import './company.css';
import { connect } from 'react-redux';
import SideNav from './sidenav.js';
import APIManager from '../../APIManager';
import { fileUrl } from '../../Shared/imageUrlPath';
import cardDefaultPic from '../../Components/asset/card.svg';
import { message } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class AddJobHeader extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    form_data_1: '',
    form_data_2: '',
    form_data_3: '',
    company_tabs: [],
    is_clicked: false,
    uploadedImage: companyCover,
    companylogo: companylogo,
    logo: {},
    uploadUrl: '',
    fileName: '',
    uploadImage: '',
    companylogoUpload: '',
    img_type: '',
  };
  uploadFiles = (e) => {
    const file = e;
    // console.log(file.cover.type, 'ooooooooooooo');

    this.setState({
      testFile: file,
    });
    let img_type = '';
    if (file.cover) {
      img_type = file.cover.type;
      this.setState({
        img_type: img_type,
      });
    } else if (file.logo) {
      img_type = file.logo.type;
      this.setState({
        img_type: img_type,
      });
    }
    const uploadParams = {
      files: [
        {
          requestType: 'JobsMedia',
          contentType: img_type,
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
        this.uploadFile(file);
      }
    });
  };
  uploadFile = (file) => {
    let uploadImage = '';
    if (file.cover) {
      uploadImage = this.state.uploadImage;
    } else if (file.logo) {
      uploadImage = this.state.companylogoUpload;
    }
    fetch(this.state.uploadUrl, {
      method: 'PUT',
      mode: 'cors',
      body: uploadImage,
    })
      .then((resp) => {
        console.log(resp, 'llll');
        this.uploadCoverLogo(file);
      })
      .catch((err) => console.log(err));
  };

  uploadCoverLogo = (file) => {
    let row_data = {};
    if (file.cover) {
      this.props.getCoverLogoKeys(
        file,
        this.state.fileName,
        this.state.img_type
      );
    } else if (file.logo) {
      this.props.getCoverLogoKeys(
        file,
        this.state.fileName,
        this.state.img_type
      );
    }
  };
  toBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ uploadedImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };
  toBase641 = (file) => {
    // console.log(file)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ companylogo: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };
  onChange = (newFile) => {
    this.toBase64(newFile);
    this.setState({ uploadImage: newFile });
    let data = {};
    console.log(data);
    data['cover'] = newFile;
    this.uploadFiles(data);
  };
  logoonChange = (newFile) => {
    // console.log(newFile)
    this.setState({
      companylogoUpload: newFile,
    });
    this.toBase641(newFile);
    let data = {};
    data['logo'] = newFile;
    this.uploadFiles(data);
  };
  componentDidMount() {
    if (this.props.cover !== '' && this.props.cover !== undefined) {
      let full_path = fileUrl.fileUrlPath + this.props.cover;
      this.setState({
        uploadedImage: full_path,
      });
    }
    if (this.props.logo !== '' && this.props.logo !== undefined) {
      let full_path = fileUrl.fileUrlPath + this.props.logo;
      this.setState({
        companylogo: full_path,
      });
    }
    // console.log(this.props)
    // let companylogo = ""
    // let uploadedImage = ""
    // let loader = true
    // if(this.props.data !== null && this.props.data !== undefined){
    // 	companylogo = this.props.data.data.data.logo
    // 	if(companylogo.name !== "" && companylogo.name !== null){
    // 		this.setState({companylogo:companylogo.path})
    // 	}
    // 	uploadedImage = this.props.data.data.data.coverImage
    // 	if(uploadedImage.name !== "" && uploadedImage.name !== null){
    // 		this.setState({uploadedImage:uploadedImage.path})
    // 	}

    // }
    // else{
    // ================================================
    // loader = this.props.isloading
    // if(this.props.infodata !== null && this.props.infodata !== undefined){
    // 	companylogo = this.props.infodata.data.data.logo
    // 	if(companylogo.name !== "" && companylogo.name !== null){
    // 		this.setState({companylogo:companylogo.path})
    // 	}
    // 	uploadedImage = this.props.infodata.data.data.coverImage
    // 	if(uploadedImage.name !== "" && uploadedImage.name !== null){
    // 		this.setState({uploadedImage:uploadedImage.path})
    // 	}
    // }
  }

  render() {
    const companylogo = this.state.companylogo;
    console.log(this.props);
    console.log(companylogo, 'logo');
    const uploadedImage = this.state.uploadedImage;
    // console.log(uploadedImage,"uploadedImage")
    return (
      <>
        <div
          className="site-layout-content edit-company-profile-page-layout"
          style={{ marginTop: 15, marginBottom: 10 }}
        >
          <div className="hover-cover-page">
            <Image
              src={uploadedImage}
              style={{ width: '100%', position: 'unset' }}
            />
            <label className="add-company-upload-image edit-company-cover-page">
              <input
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                onChange={(event) => {
                  this.onChange(event.target.files[0]);
                }}
                name="image"
              />
              <span>
                <img src={process.env.PUBLIC_URL + '/company_edit.svg'} />
              </span>
            </label>
          </div>
          <div className="hover-logo">
            <img
              src={companylogo ? companylogo : cardDefaultPic}
              className="edit-company-logo"
            />
            <label className="add-user-upload-image icon-css-2 add-user-upload-image-4">
              <input
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                onChange={(event) => {
                  this.logoonChange(event.target.files[0]);
                }}
                name="image"
              />
              <span style={{ position: 'unset' }}>
                <img src={process.env.PUBLIC_URL + '/edit_logo.png'} />
              </span>
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default AddJobHeader;
