const mongoose = require('mongoose');

const applyJobSchema = new mongoose.Schema(
  {
    applied_for_job: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job',
    },
    applied_for_company_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    applied_by_type: Number,
    applied_by_company_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
    },
    applied_by_candidate_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Candidate',
    },
    applied_at: {
      type: Date,
      default: Date.now,
    },
    candidate: {
      image: { type: String, default: '' },
      resume: String,
      name: String,
      email: { type: String, default: '' },
      age: { type: Number, default: null },
      experience: Number,
      current_position: String,
      current_company: String,
      availability: String, // 0 for no, 1 for yes
      price: Number,
      profile_url: String,
      information: String,
    },
    status: {
      type: String,
      enum: [
        'received',
        'review',
        'pending',
        'scheduled',
        'waiting',
        'rejected',
        'hired',
      ],
      default: 'received',
    },
    is_rejected: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

applyJobSchema.index({
  applied_for_job: 1,
  applied_by_company_id: 1,
  applied_by_candidate_id: 1,
});

applyJobSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'applied_for_company_id',
  justOne: true,
});

applyJobSchema.virtual('candidateData', {
  ref: 'Candidate',
  foreignField: 'can_id',
  localField: 'applied_by_candidate_id',
  justOne: true,
});

applyJobSchema.virtual('appliedByCompany', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'applied_by_company_id',
  justOne: true,
});

const ApplyJob = mongoose.model('ApplyJob', applyJobSchema);

module.exports = ApplyJob;
