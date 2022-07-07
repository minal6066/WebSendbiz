const mongoose = require('mongoose');

const favJobSchema = new mongoose.Schema({
  job : {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: [true, 'job is required field']
  },
  jobPostedBy: {
    type: String,
    required: [true, 'jobPostedBy is a required field'],
  },
  candidate: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
  timestamps: true
});

favJobSchema.index({job: 1, candidate: 1}, {unique: true});

favJobSchema.virtual('companyDetail', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'jobPostedBy',
  justOne: true,
});

favJobSchema.pre(/^find/, function(next){
  this.find({isDeleted: {$ne: true}});
  next();
})

const FavJob = mongoose.model('FavJob', favJobSchema);

module.exports = FavJob;