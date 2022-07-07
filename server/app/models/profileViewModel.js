const mongoose = require('mongoose');

const profileViewSchema = new mongoose.Schema(
  {
    viewCount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'userId is a required field'],
    },
    viewedAt: [
      {
        type: Date,
        default: Date.now,
      },
    ],
    viewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'viewdBy is a required field'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);
const ProfileView = mongoose.model('ProfileView', profileViewSchema);

module.exports = ProfileView;
