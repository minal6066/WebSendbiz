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
import { message } from 'antd';
import CompanyHeader from './companyHeader';
import HELPERS from '../../APIManager/helper';
import { updatePersistData } from '../../Redux/Actions/updatePersist';
import { dispatchAction } from '../../Redux/Store/index';
import { updateUser } from '../../Redux/Actions/AuthAction';
import { EditOutlined } from '@ant-design/icons';
import ChangePassWord from './changePassword/index';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class EditCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.infoElement = React.createRef();
    this.contactElement = React.createRef();
    this.socialElement = React.createRef();
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
    companyData: '',
    changePassWordModel: false,
  };

  handleSubmit = () => {
    // console.log(this.infoElement.current)
    this.infoElement.current.clickformButton();
    if (this.contactElement.current !== null) {
      this.contactElement.current.contactInfoSubmit();
    }
    if (this.socialElement.current) {
      this.socialElement.current.CreateSocial();
    }
    // if(this.infoElement.current !== null){
    // 	this.infoElement.current.clickformButton();
    // }
    setTimeout(() => {
      this.patchData();
    }, 5000);

    // this.setState({is_clicked:true})
  };
  patchData() {
    // console.log(this.props.infodata,this.props.data)
    let company_full_data = {};
    let data = {};
    if (this.props.infodata !== null) {
      company_full_data = this.props.infodata.data.data;
    } else if (this.props.data !== null) {
      company_full_data = this.props.data.data.data;
    }
    if (this.state.form_data_1 === '') {
      data['comp_info'] = company_full_data.comp_info;
    } else {
      data['comp_info'] = this.state.form_data_1;
    }
    if (this.state.form_data_2 !== '') {
      data['contact_info'] = this.state.form_data_2;
    } else {
      data['contact_info'] = this.props.infodata.data.data.contact_info;
    }
    if (this.state.form_data_3 !== '') {
      data['social_link'] = this.state.form_data_3;
    } else {
      data['social_link'] = this.props.infodata.data.data.social_link;
    }

    // console.log(data)
    APIManager.companyInfoSubmit(data)
      .then((response) => {
        if (response.data.isSuccess) {
          var ls = require('local-storage');
          let old_data = ls.get('persist:root');
          if (old_data !== undefined) {
            old_data = JSON.parse(old_data.AuthReducer);
            old_data.user.data.data = response.data.data;
            let new_data = {};
            new_data = old_data.user;
            dispatchAction(updateUser(new_data));
          }
          message.info('Profile Updated Successfully');
          // console.log(response)
        }
      })
      .catch((err) => message.error('Something went wrong.'));
  }
  uploadCoverLogo = (data) => {
    // console.log(data)
    let formdata = new FormData();
    if (data.cover) {
      console.log(data.cover, data.cover.name);
      formdata.append('companyCover', data.cover, data.cover.name);
    } else {
      formdata.append('companyLogo', data.logo, data.logo.name);
    }
    APIManager.companyCoverUpdate(formdata)
      .then((response) => {
        // console.log(response.data.isSuccess)
        if (response.data.isSuccess) {
          message.info('Updated Successfully');
          // console.log(response)
        }
      })
      .catch((err) => message.error('Something went wrong.'));
  };
  setformdata_1 = (data) => {
    // console.log(data)
    this.setState({ form_data_1: data });
  };
  setformdata_2 = (data) => {
    // console.log(data)
    this.setState({ form_data_2: data });
  };
  setformdata_3 = (data) => {
    // console.log(data)
    this.setState({ form_data_3: data });
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
    let data = this.state.logo;
    // console.log(data)
    data['cover'] = newFile;
    // data["logo"] = this.props.infodata.data.data.logo.name
    this.uploadCoverLogo(data);
  };
  logoonChange = (newFile) => {
    // console.log(newFile)
    this.toBase641(newFile);
    let data = this.state.logo;
    data['logo'] = newFile;
    // data["cover"] = this.props.infodata.data.data.coverImage.name
    this.uploadCoverLogo(data);
  };
  componentWillMount() {
    HELPERS.getLatLong();
    APIManager.companyInfo();
    // console.log(this.props.isloading)
    // this.setState({companylogo: this.props.infodata.data.data.logo.path})
  }

  render() {
    let loader = this.props.loginloading;

    let tabs = [];
    let companylogo = '';
    let coverImage = '';
    let comp_id = '';
    // if(this.props.data !== null && this.props.data !== undefined){
    // 	console.log(this.props)
    // 	const comp_data = this.props.data.data.data.comp_info
    // 	// console.log(this.props.data.data)
    // 	comp_id = this.props.data.data.data._id
    // 	const contact_data = this.props.data.data.data.contact_info
    // 	const social_data = this.props.data.data.data.social_link
    // 	const media_data = this.props.data.data.data.comp_media
    // 	// console.log(media_data)
    // 	companylogo = this.props.data.data.data.logo
    // 	coverImage = this.props.data.data.data.coverImage
    // 	tabs = [
    // 		{ tabname:"COMPANY INFO",comp:<CompanyInfo setdata={this.setformdata_1}
    // 			ref={this.infoElement}
    // 			initialdata={comp_data} /> },
    // 		{ tabname:"SOCIAL",comp:<CompanySocial setdata={this.setformdata_3}
    // 			ref={this.socialElement }
    // 			initialdata={social_data} /> },
    // 		{ tabname:"CONTACT INFO",comp:<ContactInfo setdata={this.setformdata_2}
    // 			ref={this.contactElement }
    // 			initialdata={contact_data} /> },
    // 		{ tabname:"MEDIA",comp:<CompanyMedia initialdata={media_data} /> }
    // 	]

    // // }
    // else{
    loader = this.props.isloading;
    if (this.props.infodata !== null && this.props.infodata !== undefined) {
      var comp_data = this.props.infodata.data.data.comp_info;
      comp_id = this.props.infodata.data.data._id;
      const contact_data = this.props.infodata.data.data.contact_info;
      const social_data = this.props.infodata.data.data.social_link;
      const media_data = this.props.infodata.data.data.comp_media;
      // console.log(this.props.infodata.data.data.logo)
      companylogo = this.props.infodata.data.data.logo;
      coverImage = this.props.infodata.data.data.coverImage;
      tabs = [
        {
          tabname: 'COMPANY INFO',
          comp: (
            <CompanyInfo
              setdata={this.setformdata_1}
              ref={this.infoElement}
              initialdata={comp_data}
            />
          ),
        },
        {
          tabname: 'SOCIAL',
          comp: (
            <CompanySocial
              setdata={this.setformdata_3}
              ref={this.socialElement}
              initialdata={social_data}
            />
          ),
        },
        {
          tabname: 'CONTACT INFO',
          comp: (
            <ContactInfo
              setdata={this.setformdata_2}
              ref={this.contactElement}
              initialdata={contact_data}
            />
          ),
        },
        { tabname: 'MEDIA', comp: <CompanyMedia initialdata={media_data} /> },
      ];
    } else {
      tabs = [];
    }

    // console.log(comp_id)

    // }
    console.log(coverImage);
    return (
      <Layout className="layout-backgroud">
        {loader ? (
          <Spin />
        ) : (
          <Layout className="main-margin-top-for-edit-profile">
            {this.state.changePassWordModel && (
              <ChangePassWord
                show={this.state.changePassWordModel}
                onHide={() => this.setState({ changePassWordModel: false })}
              />
            )}
            <Row className="custom_row">
              <Col span={12} className="p-0">
                <h6 className="candidate_heading">Profile</h6>
              </Col>
              <Col span={12} className="text-right p-0">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-dark bold-family btn-save-font cursor"
                >
                  Save
                </button>
                <div className={'change-password-btn-container'}>
                  <div
                    className={'change-password-btn'}
                    onClick={() => this.setState({ changePassWordModel: true })}
                  >
                    {' '}
                    <EditOutlined className={'m-1'} />
                    Change Password
                  </div>
                </div>
                <div className="custom-file view-profile">
                  <label
                    className="custom-file-label-2"
                    onClick={() =>
                      this.props.history.push({
                        pathname: `/comp-name-${comp_data.comp_name}`,
                        state: { compId: comp_id },
                      })
                    }
                  >
                    View public profile
                  </label>
                </div>
              </Col>
            </Row>
            <CompanyHeader companylogo={companylogo} coverImage={coverImage} />
            <AllTabs company_tabs={tabs} class={'company_profile_main_tabs'} />
          </Layout>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.AuthReducer.user,
  infodata: state.companyInfoReducer.data,
  isloading: state.companyInfoReducer.isloading,
  loginloading: state.AuthReducer.isloading,
});

export default connect(mapStateToProps)(EditCompanyProfile);
