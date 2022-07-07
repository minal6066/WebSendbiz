'use strict';
const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    comp_id: { type: String, required: [true, 'comp_id is a required field'] },
    title: { type: String, default: '' },
    job_logo: { type: String, default: '' },
    job_cover: { type: String, default: '' },
    experience: { type: String, default: '' },
    contact: { type: Number, default: '' },
    job_type: { type: String, default: '' },
    location: { type: String, default: '' },
    category: [{ type: mongoose.Schema.Types.ObjectId, unique: true }],
    offer: { type: String, default: '' },
    qualification: { type: String, default: '' },
    min_salary: { type: Number, default: null },
    max_salary: { type: Number, default: null },
    miss_salary: { type: Number, default: null },
    miss_start: { type: Number, default: null },
    accodomation: { type: String, default: '' },
    specialization: { type: String, default: '' },
    sector: { type: String, default: '' },
    period: { type: String, default: '' },
    min_experience: { type: Number, default: '' },
    max_experience: { type: Number, default: '' },
    publish_from: { type: Date, default: '' },
    publish_to: { type: Date, default: '' },
    subcontract: { type: String, default: '' },
    description: { type: String, default: '' },
    req_process: { type: String, default: '' },
    desired: { type: String, default: '' },
    media: [
      {
        fileType: {
          type: String,
        },
        fileName: String,
      },
    ],
    create: { type: Date, default: Date.now },
    job_type: { type: String, default: '' },
    location: { type: String, default: '' },
    noOf_applied: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }, // true=Active, false=Deleted
    isSponsored: { type: Boolean, default: false }, // true=Active, false=Deleted
    tags: [String], // for search
    candidatesApplied: [{ type: mongoose.Schema.ObjectId }],
    companyApplied: [{ type: mongoose.Schema.ObjectId }],
    totalClicks: { type: Number },
    clicksPerDay: { type: Number },
    sponsorExpiresAt: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.index({ title: 'text', tags: 'text', comp_id: 1 });

jobSchema.virtual('daysBeforePosted').get(function () {
  const date = new Date();
  const postedDay = Date.parse(this.create);
  const currentDay = Date.parse(date);
  return Math.round((currentDay - postedDay) / (1000 * 60 * 60 * 24));
});

jobSchema.pre('save', function (next) {
  if (!this.isModified('publish_to') && !this.isModified('publish_from'))
    return next();
  if (this.publish_from < Date.now() || this.publish_to < Date.now())
    return next(
      new AppError('Submitted date should be greater from today', 400)
    );
  if (this.publish_to < this.publish_from)
    return next(
      new AppError('publish_from date should be less than publish_date', 400)
    );
  next();
});

jobSchema.virtual('companyDetail', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

jobSchema.virtual('companyAccount', {
  ref: 'user',
  foreignField: '_id',
  localField: 'comp_id',
});

jobSchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model('Job', jobSchema, 'job');
