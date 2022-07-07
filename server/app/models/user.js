const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    id: { type: Schema.ObjectId },
    can_detail: { type: Object },
    comp_detail: { type: Object },
    email: {
      type: String,
      required: [true, 'email is a required field'],
      unique: true,
      validate: [validator.isEmail, 'please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'password is a required field'],
      minlength: 6,
      select: false,
    },
    user_type: { type: Number }, //1=Candidate 2=Company 3=Sub user
    join_date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.index({ email: 1 });

userSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: '_id',
  justOne: true,
});

userSchema.virtual('candidateData', {
  ref: 'Candidate',
  foreignField: 'can_id',
  localField: '_id',
  justOne: true,
});

userSchema.virtual('subUserData', {
  ref: 'SubUser',
  foreignField: 'user_id',
  localField: '_id',
  justOne: true,
});

// userSchema.pre(/^find/, function (next) {
//   this.populate(['companyData', 'candidateData', 'subUserData']);
//   next();
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.method({
  async verifyPassword(passwordToCompare, password) {
    return await bcrypt.compare(passwordToCompare, password);
  },
  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 1000 * 60 * 30;
    return resetToken;
  },
  changedPasswordAfter(JWTTimeStamp) {
    if (!this.passwordChangedAt) return false;
    const passwordTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < passwordTimeStamp;
  },
});

module.exports = mongoose.model('user', userSchema, 'user');
