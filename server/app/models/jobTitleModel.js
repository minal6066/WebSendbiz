const mongoose = require('mongoose');

const jobTitleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'JOB',
      uppercase: true,
    },
    title: {
      type: String,
      lowercase: true,
      required: [true, 'title is a required field'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

jobTitleSchema.index({ title: 'text' });

const JobTitle = mongoose.model('JobTitle', jobTitleSchema);

module.exports = JobTitle;
