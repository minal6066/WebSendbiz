import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from '../history.js';
import axios from 'axios';
import CandidateRoute from '../Components/privateRoute/privateRoute.js';
import CompanyRoute from '../Components/privateRoute/companyPrivateRoute.js';
// import logo from './logo.svg';
// import './App.css';
import Login from '../Components/login/login.js';
import Signup from '../Components/createprofile/signup.js';
// import Box from '../Components/candidate/box.js';
import Profile from '../Components/candidate/profile.js';
import VisitCandidate from '../Components/candidate/visit_profile/visit_candidate';
import Candidature from '../Components/candidate/candidature.js';
import Resume from '../Components/candidate/resume.js';
import FavouriteJobs from '../Components/candidate/favouritejobs.js';
import AppliedJobs from '../Components/candidate/appliedjobs.js';
import MailBox from '../Components/candidate/mailbox.js';
import Inbox from '../Components/candidate/inbox.js';
import Statistics from '../Components/candidate/statistics.js';
import CompanyProfile from '../Components/company/company_profile.js';
import CompanyJobs from '../Components/company/company_jobs.js';
import CompanyProducts from '../Components/company/company_products.js';
import ServicesListWrapper from '../Components/company/services/servies_list_wrapper.js';
import CompanyNews from '../Components/company/company_news.js';
import CompanyEvents from '../Components/company/company_events.js';
import EditCompanyProfile from '../Components/company/edit_company_profile.js';
import Layout from '../Components/layout/layout';
import Layout2 from '../Components/layout/layout_2';
import CompanyJobList from '../Components/company/company_job_list';
import companyBillingOverview from '../Components/company/companyBillingOverview.js';
import ApplyJob from '../Components/job/apply_job.js';
import AppliedCandidates from '../Components/company/applied_candidates';
import Company_Resume from '../Components/company/resume';
import Addjob from '../Components/company/addjob';
import Screen14 from '../Components/screensOfTopNav/screen14';
import CompanyList from '../Components/screensOfTopNav/companyList';
import AppliedCandidateInfo from '../Components/company/applied_candidate_info/applied_Candidate_info';
import ApliedJobs from '../Components/company/applied_job/appliedJob';
import AllAppliedResume from '../Components/company/all_applied_resume';
import AppliedCompanyInfo from '../Components/company/applied_job/companies_applied_job';
import AppliedJobDetail from '../Components/company/applied-job-detail';
import ManageUsers from '../Components/company/manage_users';
import AddService from '../Components/company/services/add_service.js';
import AddNews from '../Components/company/news/add_news.js';
import ProductsListWrapper from '../Components/company/products/products_list_wrapper';
import AddProduct from '../Components/company/products/add_product';
import ServiceListing from '../Components/screensOfTopNav/Services/ServiceListing.js';
import ServiceDetail from '../Components/screensOfTopNav/Services/ServiceDetail.js';
import ServiceWrapper from '../Components/screensOfTopNav/Services/Service_wrapper.js';
import NewsWrapper from '../Components/screensOfTopNav/News/News_wrapper.js';
import ProductsWrapper from '../Components/screensOfTopNav/Products/Products_wrapper.js';
import EventsListWrapper from '../Components/company/events/events_list_wrapper';
import AddEvent from '../Components/company/events/add_event';
import NewsListWrapper from '../Components/company/news/news_list_wrapper.js';
import TopLayout from '../Components/screensOfTopNav/layout';
import EventsWrapper from '../Components/screensOfTopNav/Events/Events_wrapper.js';
import InterestedListWrapper from '../Components/company/interested/interested_list_wrapper';
import Landing from '../Components/Landing.js';
import AboutUs from '../Components/footer/about_us';
import Features from '../Components/footer/features.js';
import ChooseUs from '../Components/footer/why_choose.js';
import Price from '../Components/footer/price.js';
import PackagePlan from '../Components/company/package_plan.js';
import TermsnCond from '../Components/footer/termsconditions.js';
import PrivacyPolicy from '../Components/footer/privacy_policy.js';
import GDPRPolicy from '../Components/footer/gdpr_policy.js';
import companyStatistics from '../Components/company/Statistics/index';
import CompanyMailBox from '../Components/company/mailBox/index';

class AppRoutes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" to="/home" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/why_choose" component={ChooseUs} />
          <Route exact path="/price" component={Price} />
          <Route exact path="/package-plan" component={PackagePlan} />
          <Route exact path="/terms-and-conditions" component={TermsnCond} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/gdpr-policy" component={GDPRPolicy} />

          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/why_choose" component={ChooseUs} />
          <Route exact path="/price" component={Price} />
          <Route exact path="/package-plan" component={PackagePlan} />
          <Route exact path="/terms-and-conditions" component={TermsnCond} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/gdpr-policy" component={GDPRPolicy} />

          {/* <TopLayout history={history}> */}
          <Route path="/apply-for-job/" component={ApplyJob} />
          <Route path="/CompanyList" component={CompanyList} />
          <Route path="/all_jobs" component={Screen14} />

          <Route path="/services" exact component={ServiceWrapper} />
          <Route path="/services/detail" component={ServiceWrapper} />

          <Route path="/products" exact component={ProductsWrapper} />
          <Route path="/products/detail" component={ProductsWrapper} />

          <Route path="/news" exact component={NewsWrapper} />
          <Route path="/news/detail" component={NewsWrapper} />

          <Route path="/events" exact component={EventsWrapper} />
          <Route path="/events/detail" component={EventsWrapper} />
          <Route
            path={'/Applied-candidate-info'}
            component={AppliedCandidateInfo}
          />
          <Route path="/comp-id:id" component={CompanyProfile} />
          <Route path="/company/jobs/" component={CompanyJobs} />
          <Route path="/visit-profile" component={VisitCandidate} />
          {/* </ TopLayout> */}
          <Layout history={history}>
            {/*========================candidate routes===========================*/}
            <CandidateRoute path="/profile" component={Profile} />
            <CandidateRoute path="/resume" component={Resume} />
            <CandidateRoute path="/favouritejobs" component={FavouriteJobs} />
            <CandidateRoute path="/appliedjobs" component={AppliedJobs} />
            <CandidateRoute path="/mailbox" component={Inbox} />
            <CandidateRoute path="/statistics" component={Statistics} />
            <CandidateRoute path="/candidature" component={Candidature} />
            {/*========================end candidate routes===========================*/}
            {/* <Route exact path="/comp-name:name" component={CompanyProfile} /> */}
            <Route path="/company/jobs/" component={CompanyJobs} />
            <Route path="/company/billing" component={companyBillingOverview} />
            {/* ========================company routes=========================== */}
            <CompanyRoute
              path="/edit/company/profile"
              component={EditCompanyProfile}
            />
            <CompanyRoute path="/companyjoblist" component={CompanyJobList} />
            <CompanyRoute
              path="/AppliedCandidates"
              component={AppliedCandidates}
            />
            <CompanyRoute path="/AddJob" component={Addjob} />
            <CompanyRoute
              path="/company-statistics"
              component={companyStatistics}
            />
            <CompanyRoute path="/Company_Resume" component={Company_Resume} />
            <CompanyRoute path="/Company_Applied_Job" component={ApliedJobs} />
            <CompanyRoute path="/company-mailbox" component={CompanyMailBox} />
            <CompanyRoute
              path="/All_applied_resume"
              component={AllAppliedResume}
            />
            {/* ========================end company routes=========================== */}
            <Route path="/company/services" component={ServicesListWrapper} />
            <Route path="/company/edit-service" exact component={AddService} />
            <Route path="/company/add-service" exact component={AddService} />

            <Route path="/company/products" component={ProductsListWrapper} />
            <Route path="/company/edit-product" component={AddProduct} />
            <Route path="/company/add-product" component={AddProduct} />

            <Route path="/company/events" component={EventsListWrapper} />
            <Route path="/company/edit-event" component={AddEvent} />
            <Route path="/company/add-event" component={AddEvent} />

            <Route
              path="/Applied-company_info"
              component={AppliedCompanyInfo}
            />
            <Route path="/applied-job-detail" component={AppliedJobDetail} />

            <Route
              path="/Applied-company_info"
              component={AppliedCompanyInfo}
            />
            <Route path="/manage-user" component={ManageUsers} />

            <Route path="/company/news" exact component={NewsListWrapper} />
            <Route path="/company/edit-news" exact component={AddNews} />
            <Route path="/company/add-news" exact component={AddNews} />

            <Route
              path="/company/interested"
              exact
              component={InterestedListWrapper}
            />
          </Layout>
        </Switch>
      </Router>
    );
  }
}
export default AppRoutes;
