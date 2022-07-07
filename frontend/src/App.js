import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from './history';
import axios from 'axios';
import PrivateRoute from './Components/privateRoute/privateRoute.js';
import CompanyPrivateRoute from './Components/privateRoute/companyPrivateRoute.js';
// import logo from './logo.svg';
// import './App.css';
import Login from './Components/login/login.js';
import Signup from './Components/createprofile/signup.js';
// import Box from './Components/candidate/box.js';
import Profile from './Components/candidate/profile.js';
import Candidature from './Components/candidate/candidature.js';
import Resume from './Components/candidate/resume.js';
import FavouriteJobs from './Components/candidate/favouritejobs.js';
import AppliedJobs from './Components/candidate/appliedjobs.js';
import MailBox from './Components/candidate/mailbox.js';
import Inbox from './Components/candidate/inbox.js';
import Statistics from './Components/candidate/statistics.js';
import CompanyProfile from './Components/company/company_profile.js';
import CompanyJobs from './Components/company/company_jobs.js';
import CompanyProducts from './Components/company/company_products.js';
import CompanyServices from './Components/company/company_services.js';
import CompanyNews from './Components/company/company_news.js';
import CompanyEvents from './Components/company/company_events.js';
import EditCompanyProfile from './Components/company/edit_company_profile.js';
import Layout from './Components/layout/layout';
import Layout2 from './Components/layout/layout_2';
import CompanyJobList from './Components/company/company_job_list';
import companyBillingOverview from './Components/company/companyBillingOverview.js';
import ApplyJob from './Components/job/apply_job.js';
import AppliedCandidates from './Components/company/applied_candidates';
import Company_Resume from './Components/company/resume';
import Addjob from './Components/company/addjob';
import Screen14 from './Components/screensOfTopNav/screen14';
import CompanyList from './Components/screensOfTopNav/companyList';
import AppliedCandidateInfo from './Components/company/applied_candidate_info/applied_Candidate_info';
import ApliedJobs from './Components/company/applied_job/appliedJob';
import AllAppliedResume from './Components/company/all_applied_resume';
import AppliedCompanyInfo from './Components/company/applied_job/companies_applied_job';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" to="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/apply-for-job/" component={ApplyJob} />
          <Route path="/CompanyList" component={CompanyList} />
          <Route path="/Sctreen14" component={Screen14} />
          <Route
            path={'/Applied-candidate-info'}
            component={AppliedCandidateInfo}
          />
          <Layout history={history}>
            {/*<Route path="/footer" component={Footer} />*/}
            <PrivateRoute path="/profile" component={Profile} />
            {/*<Route path="/profile" component={Profile} />*/}
            <PrivateRoute path="/resume" component={Resume} />
            <PrivateRoute path="/favouritejobs" component={FavouriteJobs} />
            <PrivateRoute path="/appliedjobs" component={AppliedJobs} />
            <PrivateRoute path="/mailbox" component={Inbox} />
            {/*<PrivateRoute path="/inbox" component={Inbox} />*/}
            <PrivateRoute path="/statistics" component={Statistics} />
            <PrivateRoute path="/candidature" component={Candidature} />
            {/*<Route exact path="/company_name/presentation" component={CompanyProfile} />*/}
            <Route
              exact
              path="/company/presentation"
              component={CompanyProfile}
            />
            <Route path="/company/jobs/" component={CompanyJobs} />
            <Route path="/company/products/" component={CompanyProducts} />
            <Route path="/company/products/" component={CompanyProducts} />
            <Route path="/company/news/" component={CompanyNews} />
            <Route path="/company/events/" component={CompanyEvents} />
            <Route path="/company/billing" component={companyBillingOverview} />
            <Route
              path="/edit/company/profile"
              component={EditCompanyProfile}
            />
            <Route path="/copanyjoblist" component={CompanyJobList} />
            <Route path="/AppliedCandidates" component={AppliedCandidates} />
            <Route path="/AddJob" component={Addjob} />
            <Route path="/Company_Resume" component={Company_Resume} />
            <Route path="/Company_Applied_Job" component={ApliedJobs} />
            <Route path="/All_applied_resume" component={AllAppliedResume} />
            <Route
              path="/Applied-company_info"
              component={AppliedCompanyInfo}
            />
          </Layout>
        </Switch>
      </Router>
    );
  }
}
export default App;
