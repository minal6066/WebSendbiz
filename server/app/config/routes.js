const mongoose = require('mongoose');
const fs = require('fs');
const join = require('path').join;
const users = require('../models/user');
const user = require('../controller/user');
const Job = require('../controller/job');
const Company = require('../controller/company');
const Candidate = require('../controller/candidate');
const serviceController = require('../controller/serviceController');
const jwt = require('./middlewares/jwtauth');
// const ApplyJob = require('../models/apply_job');
const authorization = require('./middlewares/authorization');
const formDataHandler = require('./middlewares/formDataHandler');
const favJobRouter = require('../routes/favJobRoutes');
const serviceRouter = require('../routes/serviceRoutes');
const productRouter = require('../routes/productRoutes');
const eventRouter = require('../routes/eventRoutes');
const newsRouter = require('../routes/newsRoutes');
const presignedUrl = require('../controller/presignerUrl');
const interestedListRouter = require('../routes/interestedListRoutes');
const entityCategoryRouter = require('../routes/entityCategoryRoutes');
const jobTitleRouter = require('../routes/jobTitleRoutes');
const paymentRouter = require('../routes/paymentRoutes');
const { sendEmailsApi } = require('../controller/emailController');
const viewController = require('../controller/viewController');
const mailboxRouter = require('../routes/mailboxRoutes');
const orderRouter = require('../routes/orderRoutes');

module.exports = function (app, passport) {
  app.get('/', (req, res, next) => {
    // const html = fs.readFileSync(
    //   join(__dirname, '../view/checkout.html'),
    //   'utf-8'
    // );
    res.set('Content-Type', 'text/html');
    res.render('checkout');
  });

  app.get('/auth/hello', (req, res) => {
    res.send('hello world');
  });

  // user
  app.post('/register', user.create);
  app.post('/login', user.login);
  app.patch('/change_password', user.isAuth, user.changePassword);
  app.patch('/forgot_password', user.forgotPassword);
  app.get('/myprofile', user.isAuth, user.getMyProfile);

  //Company
  app.get('/check_company_id', Company.checkCompanyId);
  app.get('/company_detail', user.checkAuth, Company.companyDetail);
  app.patch('/edit_company', user.isAuth, Company.companyEdit);
  app.patch(
    '/upload_company_media',
    user.isAuth,
    user.restrictTo(1),
    Company.uploadCompanyMedia
  );
  app.post('/edit_avtar', jwt.jwtcheck, Company.editAvtar);
  app.get('/company_list', Company.getCompaniesWithSponsored);
  app.get('/sug-company-list', Company.getAllCompanies);
  app.patch(
    '/upload_company_identity',
    user.isAuth,
    user.restrictTo(1),
    Company.uploadLogoAndCover
  );

  // Comapny News CURD
  app.post('/add_news', jwt.jwtcheck, Company.addNews);
  app.get('/get_news', Company.getNews);

  // Company Product CURD
  app.post('/add_product', jwt.jwtcheck, Company.addProdcut);
  app.get('/get_product', Company.getProduct);

  // Company Service CURD
  app.post('/add_service', user.isAuth, serviceController.createService);
  app.get('/get_service', serviceController.getAllServices);
  // app.get('/service-with-sponsored', serviceController.getServiceWithSponsored);
  app.get('/get_service/:serviceId', serviceController.getOneService);
  app.patch('update_service/:serviceId', serviceController.updateService);

  // Company Job API
  app.get('/myjobs', user.isAuth, Job.postedJobs);

  // Candidate Apis
  app.patch(
    '/update_candidate_profile',
    user.isAuth,
    Candidate.updateCandidateProfile
  );
  app.patch(
    '/update_candidate_candidature',
    user.isAuth,
    Candidate.updateCandidateCandidature
  );
  app.get('/candidate_detail', Candidate.getCandidate_detail);
  app.patch(
    '/candidate_upload_resume',
    user.isAuth,
    Job.uploadResume,
    Candidate.uploadResume
  );
  app.patch(
    '/candidate_delete_resume/:resumeId',
    user.isAuth,
    Candidate.deleteResume
  );
  app.patch(
    '/candidate_update_resume/:resumeId',
    user.isAuth,
    Candidate.updateResume
  );

  // Company sub user CURD
  app.post(
    '/add_sub_user',
    user.isAuth,
    formDataHandler.readImagesAndVideos,
    formDataHandler.uploadImagesAndVideos,
    Company.addSubuser
  );
  app.get('/get_sub_user', user.isAuth, Company.getSubuser);
  app.patch('/edit_sub_user/:subUserId', user.isAuth, Company.editSubUser);

  // Schedule secound working

  // Job CURD, Apply
  app.post(
    '/add_job',
    user.isAuth,
    user.restrictTo(1),
    Job.premiumJobValidator,
    formDataHandler.readImagesAndVideos,
    formDataHandler.uploadImagesAndVideos,
    Job.createJob
  );
  app.get('/job_list', jwt.jwtcheck, Job.job_list);
  app.get('/job_detail', Job.job_detail);
  app.patch(
    '/edit_job/:jobId',
    user.isAuth,
    user.allowedTo(2),
    formDataHandler.readImagesAndVideos,
    formDataHandler.uploadImagesAndVideos,
    Job.updateJob
  );
  app.get('/jobs', Job.jobList_search);
  // app.post('/jobs/create-sponsored',Job.createSponsored);
  app.get('/jobs/with-sponsored', user.checkAuth, Job.jobList_withSponsored);
  // app.delete('/jobs/delete-sponsored', user.isAuth,Job.deleteSponsored);
  app.get('/jobs/:jobId', user.checkAuth, Job.getOneJob);
  app.delete('/jobs/:jobId', user.isAuth, user.allowedTo(2), Job.deleteJob);
  app.patch('/job_active_status/:jobId', user.isAuth, Job.jobInActive);

  // Event CURD
  app.post('/add_event', jwt.jwtcheck, Company.addEvent);
  app.get('/event_list', jwt.jwtcheck, Company.eventList);

  // Apply Job Crud
  app.post('/apply_job', Job.uploadResume, Job.evalResumeFile, Job.applyJob); ///////////////////////////11 done

  app.get('/apply_job/:jobId', user.isAuth, Job.getApplyJobByJobId); /////////////////////22 done
  app.get('/get_all_applied_jobs', user.isAuth, Job.getAllAppliedJobs); ////////////////////33  done
  app.get('/applied_on_my_job', user.isAuth, Job.appliedOnMyjobs);
  app.get('/applied_on_my_job/:jobId', user.isAuth, Job.getApplyJobByMyJobId);
  app.get('/get_one_applied_job/:appliedJobId', Job.getOneAppliedJob);
  app.patch('/update_apply_job_status/:appliedJobId', Job.updateApplyJobStatus);

  // app.get('/get-presigned-url', presignedUrl.getPresignedUrl);
  app.post('/get-presigned-url', user.isAuth, presignedUrl.putPresignedUrl);

  // app.get('/email-templates', getAllTemplates);

  // app.get('/get-all-contacts', getSendinblueContacts);
  // app.get('/get-one-contact/:email', getOneSendinblueContact);
  app.post('/send-email', sendEmailsApi);

  app.get('/premium-detail', user.isAuth, Company.getPremiumDetail);

  app.get('/get-view-stats/:year', user.isAuth, viewController.getViewStats);
  // FavJobs Routes
  app.use('/favjobs', favJobRouter);
  app.use('/services', serviceRouter);
  app.use('/products', productRouter);
  app.use('/events', eventRouter);
  app.use('/news', newsRouter);
  app.use('/mailbox', mailboxRouter);
  app.use('/payments', paymentRouter);
  app.use('/orders', orderRouter);

  // do not use this route
  app.delete('/delete-all-views', viewController.deleteAllViews);
  app.get('/get-all-views', viewController.getAllViews);

  app.get('/get-all-users', async (req, res, next) => {
    const users = await User.find({ email: 'testcompany50@gmail.com' });

    res.status(200).json({
      status: 'success',
      isSuccess: true,
      data: users,
    });
  });
  app.use('/interested', interestedListRouter);
  app.use('/entity-category', entityCategoryRouter);
  app.use('/job-title-list', jobTitleRouter);
  app.delete('/permanent-delete', user.isAuth, user.deleteAccount);
};
