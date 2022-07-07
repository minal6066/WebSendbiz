'use strict';
const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;
const testCompanySchema = new Schema(
  {
    comp_id: { type: String, default: '' },
    logo: {
      name: { type: String, default: '' },
      path: { type: String, default: '' },
    },
    coverImage: {
      name: { type: String, default: '' },
      path: { type: String, default: '' },
    },
    comp_info: {
      company_id: { type: String, default: '', required: false }, //add by user
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
          lowercase: true,
        },
      ],
      first_name: { type: String, default: '', required: false },
      last_name: { type: String, default: '', required: false },
      noOf_emp: { type: Number, default: 0, required: false },
      founding_year: { type: Number, default: null, required: false },
      age: { type: Number, default: null, required: false },
      tags: [
        {
          type: String,
          trim: true,
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
      address: { type: String, default: '', lowercase: true, required: false },
      sub_address: {
        type: String,
        default: '',
        lowercase: true,
        required: false,
      },
      city: { type: String, default: '', lowercase: true, required: false },
      state: { type: String, default: '', required: false },
      country: { type: String, default: '', required: false },
      zip_code: { type: Number, default: null, required: false },
      latitude: { type: Number, default: null, required: false },
      longitude: { type: Number, default: null, required: false },
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
    isPermanent: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

testCompanySchema.virtual('services', {
  ref: 'Service',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

testCompanySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

testCompanySchema.virtual('news', {
  ref: 'News',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

testCompanySchema.virtual('events', {
  ref: 'Event',
  foreignField: 'comp_id',
  localField: 'comp_id',
});

testCompanySchema.virtual('jobs', {
  ref: 'Job',
  foreignField: 'comp_id',
  localField: 'comp_id',
  // count: true
});

testCompanySchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model(
  'TestCompany',
  testCompanySchema,
  'testcompany'
);
