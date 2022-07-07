const mongoose = require('mongoose');

const applyJobSchema = new mongoose.Schema({
  image: String,
  resume: String,
  name: String,
  experience: Number,
  current_position: String,
  current_company: String,
  availability: Boolean,
  price: Number,
  profile_url: String,
  information: String,
  linkedForm: {
    type: mongoose.Schema.ObjectId,
    ref: 'ApplyJob',
    required: true,
  },
});

const ApplyJobForm = mongoose.model('ApplyJobForm', applyJobSchema);

module.exports = ApplyJobForm;
