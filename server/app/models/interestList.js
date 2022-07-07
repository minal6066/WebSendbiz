const mongoose = require('mongoose');

const interestListSchema = new mongoose.Schema(
  {
    interestId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'interestedId is a required field'],
    },
    interestType: {
      type: String,
      required: [true, 'interestType is a required field'],
      enum: ['COMPANY', 'SERVICE', 'PRODUCT', 'CANDIDATE', 'NEWS', 'JOB', 'EVENT'],
      uppercase: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'user is a required field'],
    },
    userType: {
      type: Number,
      required: [true, 'userType is a required field'],
    },
    companyId: mongoose.Schema.ObjectId,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

interestListSchema.index({ companyId: 1 });
interestListSchema.index({ userId: 1, interestId: 1 }, { unique: true });

const IntList = mongoose.model('IntList', interestListSchema);

module.exports = IntList;
