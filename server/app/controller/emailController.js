// const SendInBlue = require('sib-api-v3-sdk');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const SendSmtpEmail = require('sib-api-v3-sdk/src/model/SendSmtpEmail');

// const client = SendInBlue.ApiClient.instance;

// const apiKey = client.authentications['api-key'];
// apiKey.apiKey = process.env.SIB_API_KEY;

// // const sendEmail = new SendInBlue.SendEmail();
// const transactionalEmail = new SendInBlue.TransactionalEmailsApi();
// const sendSmptEmail = new SendInBlue.SendSmtpEmail();
// const contactInstance = new SendInBlue.ContactsApi();
// let createContact = new SendInBlue.CreateContact();
// let createDoiContact = new SendInBlue.CreateDoiContact();

// exports.getAllTemplates = catchAsync(async (req, res, next) => {
//   const { count, templates } = await transactionalEmail.getSmtpTemplates();
//   res.status(200).json({
//     status: 'success',
//     isSuccess: true,
//     results: count,
//     templates,
//   });
// });

// exports.getSendinblueContacts = catchAsync(async (req, res, next) => {
//   const { contacts } = await contactInstance.getContacts();
//   res.status(200).json({
//     status: 'success',
//     isSuccess: true,
//     data: contacts,
//   });
// });

// exports.getOneSendinblueContact = catchAsync(async (req, res, next) => {
//   let isError = false;
//   const contact = await contactInstance
//     .getContactInfo(req.params.email)
//     .catch((err) => (isError = true));

//   if (isError)
//     return next(new AppError('Email does not found in contact list', 404));
//   res.status(200).json({
//     status: 'success',
//     isSuccess: true,
//     data: contact,
//   });
// });

exports.sendEmailsApi = catchAsync(async (req, res, next) => {
  let isError = false;
  console.log(req.body);
  const contact = await contactInstance
    .getContactInfo(req.body.email)
    .then((_) => console.log('exists'))
    .catch(async (err) => {
      isError = true;
      createContact.email = req.body.email;
      const newContact = await contactInstance.createContact(createContact);
      console.log(newContact);
    });
  if (isError) return next(new AppError('email is not in the list', 404));
  sendSmptEmail.to = [{ email: req.body.email }];
  sendSmptEmail.templateId = 1;
  const data = await transactionalEmail.sendTransacEmail(sendSmptEmail);
  console.log('email sent successfully');
  console.log(data);
  res.status(200).json({
    message: 'email sent',
    data,
  });
});

// exports.sendEmail = async (templateId, email, params) => {
//   console.log("Inside mail");
//   // console.log(req.decodedData);
//   let shouldSend = true;
//   contactInstance
//     .getContactInfo(email)
//     .then((_) => console.log('exists'))
//     .catch(async (_) => {
//       console.log('Inside email added');
//       createContact.email = email;
//       const newContact = await contactInstance
//         .createContact(createContact)
//         .catch((_) => (shouldSend = false));
//       console.log('email added');
//       console.log(newContact);
//     });
//   console.log("Inside mail 2");

//   if (!shouldSend) {
//     return shouldSend;
//   }
//   sendSmptEmail.to = [{ email }];
//   sendSmptEmail.templateId = templateId;
//   SendSmtpEmail.replyTo = {email: 'contact@sendbiz.com'}
//   sendSmptEmail.params = params ? params : undefined;
//   const data = await transactionalEmail
//     .sendTransacEmail(sendSmptEmail)
//     .catch((_) => (shouldSend = false));
//   console.log('email sent successfully', data);
//   console.log("shouldSend "+shouldSend);
//   return shouldSend;
// };

// const SendInBlue =require('sib-api-v3-sdk');
// let defaultClient = SendInBlue.ApiClient.instance;

// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = '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';
// const contactApi = new SendInBlue.ContactsApi();
// const transactionalEmail = new SendInBlue.TransactionalEmailsApi();
// const sendTestEmail = new SendInBlue.SendTestEmail();
// const createContact = new SendInBlue.CreateContact();

// exports.sendEmail = async (templateId , email , params) => {
//   let sent=0;
//   await contactApi.getContactInfo(email).then(function (data){
//     console.log("Data FOund");
//   },function (error) {
//     console.log("Contact not found...creating new!");
//     createContact.email = email;
//     contactApi.createContact(createContact).then(function(data){
//       console.log("New contact created successfully!");
//     },function(error){
//       console.log("Error creating contact");
//       return sent;
//     })
//   });

//   sendTestEmail.emailTo = [email];
//   await transactionalEmail.sendTestTemplate(templateId,sendTestEmail).then(function(data){
//     console.log("Mail sent successfully");
//     sent=1;
//     // console.log(data);
//   },function(error){
//     console.log("Error sending mail");
//     console.log(error);
//     return sent;
//   });
//   return sent;
// }

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendTestEmail = new SibApiV3Sdk.SendTestEmail();

const contactInstance = new SibApiV3Sdk.ContactsApi();
let createContact = new SibApiV3Sdk.CreateContact();

exports.sendEmail = async (templateId, email) => {
  // await contactInstance.getContactInfo(email).catch(async() => {})
  try {
    const contact = await contactInstance.getContactInfo(email);
    console.log(contact);
  } catch (err) {
    createContact.email = email;
    try {
      const newContact = await contactInstance.createContact(createContact);
      console.log(newContact);
    } catch (err) {
      console.log('error creating contact');
    }
  }
  sendTestEmail.emailTo = [email];

  apiInstance.sendTestTemplate(templateId, sendTestEmail).then(
    (data) => {
      console.log('API called successfully.');
    },
    (error) => {
      console.log(error);
    }
  );
};

// sendEmail(1, 'swaggysumit@gmail.com');
