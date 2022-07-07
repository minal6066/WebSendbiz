/**
 * Module dependencies.
 */
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Candidate = require('../models/candidate');
const Company = require('../models/company');
const SubUser = require('../models/sub_user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { isEmailValid } = require('../utils/validators');
const eventEmitter = require('./events');

const signToken = ({ email, _id, user_type }) =>
  jwt.sign({ email, id: _id, user_type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.create = catchAsync(async (req, res, next) => {
  const userDetail = await User.findOne({ email: req.body.email });

  if (userDetail)
    return next(new AppError('user with this email already exist', 208));

  // const { valid } = await isEmailValid(req.body.email);

  // if (!valid) return next(new AppError('Please enter a valid email', 400));

  if (req.body.password !== req.body.confirm_password) {
    // ! checks if password and confirm password matches
    return next(
      new AppError('password and confirm password does not match', 401)
    );
  }

  const { user_type, can_detail } = req.body;
  if (!user_type) {
    return next(new AppError('user_type is a required field', 401));
  }
  if (user_type === 1) {
    if (!can_detail || !can_detail.first_name || !can_detail.last_name) {
      return next(
        new AppError(
          'can_detail object must contail first_name and last_name field',
          401
        )
      );
    }
  }
  if (user_type !== 1 && user_type !== 2) {
    // ! checks the user type if 1 or 2
    return next(new AppError('User type is unauthorized', 401));
  }

  if (user_type === 1) {
    // ? create account for candidate
    const user = await User.create(req.body); // ? creates the user
    const canDetail = {
      can_id: user._id,
      can_detail: {
        email: req.body.email,
        firstName: can_detail.first_name,
        lastName: can_detail.last_name,
      },
    };
    const candidate = await Candidate.create(canDetail); // ? creates the candidate linked with user
    eventEmitter.emit(
      'sendEmail',
      process.env.REGISTRATION,
      user.email,
      user.can_detail.first_name
    );
    user.password = undefined;
    const token = signToken(user); // ? generates token
    return res.status(201).json({
      status: 'success',
      isSuccess: true,
      message: 'User of type candidate added successfully',
      token,
      data: { user, candidate },
    });
  }
  if (user_type === 2) {
    // ? create account for compnay
    if (!req.body.comp_detail || !req.body.comp_detail.company_name) {
      return next(
        new AppError('comp_detail object must contain company_name field', 401)
      );
    }
    const { email, company_id, address, city, zip_code } = req.body;
    if (!company_id) {
      return next(new AppError('company_id is a required field', 401));
    }
    if (!address) return next(new AppError('address is a required field', 401));
    if (!city) return next(new AppError('city is a required field', 401));
    if (!zip_code) {
      return next(new AppError('zip_code is a required field', 401));
    }
    const user = await User.create(req.body);
    const token = signToken(user);
    const companyDetail = {
      comp_id: user._id,
      comp_info: {
        company_id,
        comp_name: req.body.comp_detail.company_name,
      },
      contact_info: {
        email,
        address,
        city,
        zip_code,
      },
    };
    const company = await Company.create(companyDetail);
    eventEmitter.emit(
      'sendEmail',
      process.env.REGISTRATION,
      user.email,
      user.comp_detail.company_name
    );
    user.password = undefined;
    return res.status(201).json({
      status: 'success',
      isSuccess: true,
      message: 'User of type Company added successfully',
      token,
      data: { user, company },
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; // ? get email and password from the body
  if (!email || !password) {
    // ? throw error if email or password is missing
    return next(new AppError('Please provide both email and password', 401));
  }

  const user = await User.findOne({ email }).select('+password'); // ? find user
  if (!user || !(await user.verifyPassword(password, user.password))) {
    // ? check if user exist and password is correct
    return next(new AppError('Invalid email or password', 401));
  }

  const token = signToken(user); // ? sign token
  let data; // ? query user type
  switch (user.user_type) {
    case 1:
      data = await Candidate.findOne({ can_id: user._id });
      break;
    case 2:
      data = await Company.findOne({ comp_id: user._id });
      break;
    case 3:
      data = await SubUser.findOne({ user_id: user._id });
      data = await Company.findOne({ comp_id: data.comp_id });
      break;
  }
  user.password = undefined; // ? excluding password in response
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    token,
    data: { user, data },
  });
});

exports.isAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in, please login before using this route',
        401
      )
    );
  }
  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({ _id: decodedData.id, isActive: true });

  if (!user) {
    return next(
      new AppError('user belonging to this token does not found', 401)
    );
  }

  if (user.changedPasswordAfter(decodedData.iat)) {
    return next(
      new AppError(
        'user changed password after last login, please login again',
        401
      )
    );
  }

  req.decodedData = decodedData;
  next();
});

exports.checkAuth = catchAsync(async (req, res, next) => {
  if (!('authorization' in req.headers)) {
    req.isAuth = false;
    return next();
  }
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in, please login before using this route',
        401
      )
    );
  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({ _id: decodedData.id, isActive: true });

  if (!user)
    return next(
      new AppError('user belonging to this token does not found', 401)
    );

  if (user.changedPasswordAfter(decodedData.iat))
    return next(
      new AppError(
        'user changed password after last login, please login again',
        401
      )
    );
  req.isAuth = true;
  req.decodedData = decodedData;
  next();
});

exports.allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.decodedData.user_type)) {
      return next(
        new AppError('User not authorized to access this route', 401)
      );
    }
    next();
  };
};

exports.restrictTo = (...roles) => (req, res, next) => {
  if (roles.includes(req.decodedData.user_type)) {
    return next(
      new AppError('User type is not authorized to access this route', 401)
    );
  }
  next();
};

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, confirmPassword } = req.body;
  const user = await User.findById(req.decodedData.id).select('+password');
  if (!(await user.verifyPassword(currentPassword, user.password))) {
    return next(new AppError('incorrect password', 401));
  }
  if (password !== confirmPassword) {
    return next(new AppError('passwords does not match', 401));
  }
  user.password = password;
  await user.save();
  const token = signToken(user);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'password changed successfully',
    token,
    data: user,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return next(new AppError('Unable to find your account', 401));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message:
      'reset token has been generated successfully to change your password',
    resetToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const encResetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: encResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('Invalid or expired token', 401));
  if (password !== confirmPassword)
    return next(new AppError('passwords does not match', 401));
  user.password = password;
  await user.save();
  const token = signToken(user);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'Password changed successfully',
    token,
    data: user,
  });
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const { user_type } = req.decodedData;
  const user = await User.findById(req.decodedData.id);
  let data;
  switch (user_type) {
    case 1:
      data = await Candidate.findOne({ can_id: req.decodedData.id });
      data.resumes = data.resumes.filter((val) => val.isDeleted === false);
      break;
    case 2:
      data = await Company.findOne({ comp_id: req.decodedData.id });
      data = JSON.parse(JSON.stringify(data));
      if (
        data.logo.name !== null &&
        data.logo.name.startsWith('company/logoAndCover/CompanyLogoCover')
      ) {
        data.logo.path = `${process.env.AWS_STATIC_URL}/${data.logo.name}`;
      } else {
        data.logo.path = '';
      }
      if (
        data.coverImage.name !== null &&
        data.coverImage.name.startsWith('company/logoAndCover/CompanyLogoCover')
      ) {
        data.coverImage.path = `${process.env.AWS_STATIC_URL}/${data.coverImage.name}`;
      } else {
        data.coverImage.path = '';
      }
      data.comp_media.map((file) => {
        if (
          file.fileName !== null &&
          file.fileName.startsWith('company/media/CompanyMedia')
        ) {
          file.path = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
          return;
        }
        file.filePath = '';
      });
      break;
    case 3:
      const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
      data = await Company.findOne({ comp_id: subUser.comp_id });
      data = JSON.parse(JSON.stringify(data));
      if (
        data.logo.name !== null &&
        data.logo.name.startsWith('company/logoAndCover/CompanyLogoCover')
      ) {
        data.logo.path = `${process.env.AWS_STATIC_URL}/${data.logo.name}`;
      } else {
        data.logo.path = '';
      }
      if (
        data.coverImage.name !== null &&
        data.coverImage.name.startsWith('company/logoAndCover/CompanyLogoCover')
      ) {
        data.coverImage.path = `${process.env.AWS_STATIC_URL}/${data.coverImage.name}`;
      } else {
        data.coverImage.path = '';
      }
      data.comp_media.map((file) => {
        if (
          file.fileName !== null &&
          file.fileName.startsWith('company/media/CompanyMedia')
        ) {
          file.path = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
          return;
        }
        file.filePath = '';
      });
      break;
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: { user, data },
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.decodedData.id);
  console.log('user deleted successfully');
  if (req.decodedData.user_type === 2) {
    await Company.findOneAndDelete({ comp_id: req.decodedData.id });
    console.log('company deleted successfully');
  }
  if (req.decodedData.user_type === 1) {
    await Candidate.findOneAndDelete({ can_id: req.decodedData.id });
    console.log('candidate deleted successfully');
  }
  res.status(304).json({
    status: 'success',
    isSuccess: true,
    message: 'Account deleted permanently',
  });
});
