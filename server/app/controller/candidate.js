/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const formidable = require('formidable');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const everyauth = require('everyauth');
const connect = require('connect');
const aws = require('../config/middlewares/aws');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user');
const Candidate = require('../models/candidate');

const getTokenFromHeaders = (authorization) => {
  //  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

exports.updateCandidateProfile = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findOne({
    can_id: req.decodedData.id,
  });
  const can_detail = [
    'profile',
    'title',
    'firstName',
    'lastName',
    'email',
    'jobCategory',
    'occupation',
    'availability',
    'currentLocation',
    'contract',
    'desiredLocation',
    'hobbies',
    'skills',
    'description',
  ];

  Object.keys(req.body).map((key) => {
    if (!can_detail.includes(key)) {
      return next(new AppError(`unexpected request parameter ${key}.`, 403));
    }
  });
  can_detail.forEach((key) => {
    req.body[key] = key in req.body ? req.body[key] : candidate.can_detail[key];
  });
  candidate.can_detail = req.body;
  await candidate.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: candidate,
  });
});

exports.updateCandidateCandidature = catchAsync(async (req, res, next) => {
  if (
    !req.body.can_qualification ||
    !req.body.can_salary ||
    !req.body.can_social ||
    !req.body.can_experience ||
    !req.body.can_contact
  ) {
    return next(
      new AppError(
        'can_qualification, can_salary, can_social, can_experience, can_salary, can_contact are all required fields',
        403
      )
    );
  }
  const updatedCandidate = await Candidate.findOneAndUpdate(
    { can_id: req.decodedData.id },
    {
      can_salary: req.body.can_salary,
      can_social: req.body.can_social,
      can_experience: req.body.can_experience,
      can_qualification: req.body.can_qualification,
      can_contact: req.body.can_contact,
    },
    {
      new: true,
    }
  );
  if (!updatedCandidate) {
    return next(new AppError('Error updating candidature', 401));
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: updatedCandidate,
  });
});

// Candidate Detail Update Function
exports.updaetCandidate_detail = async (req, res) => {
  try {
    const token = await getTokenFromHeaders(req.headers.token);
    const decoded = jwt.verify(token, 'secret');
    const can_id = decoded.id;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      console.log(req.body);

      if (fields.update_type == 1) {
        console.log(files.logo);
        if (files.logo !== undefined) {
          const oldpath = files.logo.path;
          const file_name = `can_logo${Date.now()}.jpg`;
          const newpath = `${__dirname}/images/${file_name}`;
          fs.rename(oldpath, newpath, async (err) => {
            if (err) throw err;
            console.log(fields);
            fields.user_logo = file_name;
            await Candidate.findOneAndUpdate(
              { can_id },
              { can_detail: fields }
            ).exec();
            res.send({
              status: 'Success',
              message: 'Data updated successfully',
            });
          });
        } else {
          await Candidate.findOneAndUpdate(
            { can_id },
            { can_detail: fields }
          ).exec();
          res.send({ status: 'Success', message: 'Data updated successfully' });
        }
      }
    });
    if (req.body.update_type == 2) {
      console.log('hello');
      console.log(req.body.can_salary);
      const { can_salary } = req.body;
      const { can_social } = req.body;
      const { can_contact } = req.body;
      const { can_qualification } = req.body;
      const { can_expericance } = req.body;
      Candidate.findOneAndUpdate(
        { can_id },
        {
          can_salary,
          can_social,
          can_contact,
          can_expericance,
          can_qualification,
        }
      ).exec();
      res.send({ status: 'Success', message: 'Data updated successfully' });
    }
    //             else if(fields.update_type == 3){
    // //Social update
    //                 Candidate.findOneAndUpdate({can_id:can_id},{can_social:fields}).exec();
    //                 res.send({status:"Success", message: "Data updated successfully"});
    //             }
    //             else if(fields.update_type == 4){
    // //Qualification update
    //                 Candidate.findOneAndUpdate({can_id:can_id},{$push:{can_qualification:fields}}).exec();
    //                 res.send({status:"Success", message: "Data updated successfully"});
    //             }
    //             else if(fields.update_type == 5){
    // //Experience update
    //                 Candidate.findOneAndUpdate({can_id:can_id},{$push:{can_expericance:fields}}).exec();
    //                 res.send({status:"Success", message: "Data updated successfully"});
    //             }
    //             else if(fields.update_type == 6){
    // //contact update
    //                 Candidate.findOneAndUpdate({can_id:can_id},{can_contact:fields}).exec();
    //                 res.send({status:"Success", message: "Data updated successfully"});
    //             }
  } catch (e) {
    console.log(e);
  }
};

// Candidate Detail Function
exports.getCandidate_detail = catchAsync(async (req, res, next) => {
  // const linkedin = require('node-linkedin')('78mcb08jtl2zll', 'Zl67eu9fE6cjyhTv', 'callback');
  //  linkedin.people.url('www.linkedin.com/in/abhijeet-purohit-3b318811a',function(err, $in) {
  //     // Returns dob, education
  // });
  const canDetail = await Candidate.findById(req.query.can_id);
  if (!canDetail) {
    return next(new AppError('candidate with this id not found', 404));
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: canDetail,
  });
});

exports.uploadResume = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findOne({ can_id: req.decodedData.id });
  /*   console.log(candidate);
    console.log(req.file); */
  req.body.filename = `resume-${candidate.can_id}-${Date.now()}.${
    req.files.candidateResume[0].mimetype.split('/')[1]
  }`;
  // console.log(process.env);
  const uploadedFile = await aws.s3
    .upload({
      Bucket: process.env.AWS_BUCKET,
      Key: req.body.filename,
      Body: req.files.candidateResume[0].buffer,
      ACL: 'public-read',
    })
    .promise();
  // console.log(uploadedFile);
  const resumeObj = {
    name: uploadedFile.key,
    title: req.body.title,
    description: req.body.description,
    uploadedAt: Date.now(),
  };
  candidate.resumes.unshift(resumeObj);
  await candidate.save();
  candidate.resumes = candidate.resumes.filter(
    (val) => val.isDeleted === false
  );
  // console.log(candidate);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'resume uploaded successfully',
    data: candidate,
  });
});

exports.deleteResume = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({ can_id: req.decodedData.id });
    candidate.resumes.forEach((val) => {
      if (val._id == req.params.resumeId) {
        val.isDeleted = true;
      }
    });
    await candidate.save();
    candidate.resumes = candidate.resumes.filter(
      (val) => val.isDeleted === false
    );
    res.status(200).json({
      status: 'success',
      isSucess: true,
      message: 'resume deleted successfully',
      data: candidate,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'fail',
      isSuccess: false,
      message: 'OOPS, something bad happened, please try again',
      error: err,
    });
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({ can_id: req.decodedData.id });
    candidate.resumes.forEach((val) => {
      if (val._id == req.params.resumeId) {
        if (!val.isDeleted) {
          val.title = req.body.title || val.title;
          val.description = req.body.description || val.description;
        }
      }
    });
    await candidate.save();
    candidate.resumes = candidate.resumes.filter(
      (val) => val.isDeleted === false
    );
    res.status(200).json({
      status: 'success',
      isSuccess: true,
      message: 'resume updated successfully',
      data: candidate,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      isSuccess: false,
      message: 'OOPS, something bad happened, please try again',
      error: err,
    });
  }
};
