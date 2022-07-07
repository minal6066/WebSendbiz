const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const { Schema } = mongoose;
const CompanySchema = new Schema(
  {
    comp_id: { type: String },
    logo: {
      name: { type: String, default: '' },
      path: { type: String, default: '' },
    },
    coverImage: {
      name: { type: String, default: '' },
      path: { type: String, default: '' },
    },
    comp_info: {
      company_id: { type: String, default: '', required: false }, // add by user
      comp_name: {
        type: String,
        lowercase: true,
        default: '',
        required: false,
      },
      bus_name: { type: String, default: '', required: false },
      comp_category: [
        {
          type: String,
          trim: true,
          unique: true,
          lowercase: true,
        },
      ],
      first_name: { type: String, default: '', required: false },
      last_name: { type: String, default: '', required: false },
      noOf_emp: { type: Number, default: 0, required: false },
      founding_year: { type: Number, default: 1970, required: false },
      age: { type: Number, default: 0, required: false },
      tags: [
        {
          type: String,
          trim: true,
          unique: true,
          lowercase: true,
        },
      ],
      comp_info: { type: String, default: '', required: false },
    },
    social_link: [
      {
        tag: { type: String },
        link: { type: String },
      },
    ],
    contact_info: {
      phone_no: { type: Number, default: null, required: false },
      land_no: { type: Number, default: null, required: false },
      email: { type: String, default: '', required: false },
      website: { type: String, default: '', required: false },
      address: { type: String, default: '', required: false },
      sub_address: { type: String, default: '', required: false },
      city: { type: String, default: '', required: false },
      state: { type: String, default: '', required: false },
      country: { type: String, default: '', required: false },
      zip_code: { type: Number, default: 0, required: false },
      latitude: { type: Number, default: 0, required: false },
      longitude: { type: Number, default: 0, required: false },
    },
    comp_media: [
      {
        fileType: {
          type: String,
        },
        fileName: String,
        path: String,
      },
    ],
    join_date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }, // true=Active, false=Deleted
    isSponsored: {
      type: Boolean,
      default: false,
    },
    isMonthlyPremium: {
      type: Boolean,
      default: false,
    },
    isPermanent: {
      type: Boolean,
      default: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    totalClicks: { type: Number },
    clicksPerDay: { type: Number },
    sponsorExpiresAt: { type: Date },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

CompanySchema.index({ 'comp_info.comp_name': 'text' });
CompanySchema.index({
  comp_id: 1,
  isSponsored: 1,
  sponsoredExpiresAt: 1,
  'comp_info.company_id': 1,
});

CompanySchema.virtual('services', {
  ref: 'Service',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

CompanySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

CompanySchema.virtual('news', {
  ref: 'News',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

CompanySchema.virtual('events', {
  ref: 'Event',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

CompanySchema.virtual('jobs', {
  ref: 'Job',
  foreignField: 'comp_id',
  localField: 'comp_id',
  // count: true
});

CompanySchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model('Company', CompanySchema, 'company');
