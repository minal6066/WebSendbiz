const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
const { Schema } = mongoose;
const CandidateSchema = new Schema(
  {
    can_id: { type: String, unique: true }, // userId
    can_detail: {
      profile: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        lowercase: true,
        default: '',
      },
      firstName: {
        type: String,
        lowercase: true,
        default: '',
        trim: true,
      },

      lastName: {
        type: String,
        lowercase: true,
        default: '',
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
      jobCategory: [
        {
          type: String,
          trim: true,
          unique: true,
        },
      ],
      occupation: {
        type: String,
        default: '',
      },
      availability: {
        type: String,
        default: '',
      },
      currentLocation: {
        type: String,
        default: '',
      },
      contract: {
        type: String,
        trim: true,
      },
      desiredLocation: [
        {
          type: String,
          trim: true,
        },
      ],
      hobbies: [
        {
          type: String,
          trim: true,
        },
      ],
      skills: [
        {
          type: String,
          trim: true,
        },
      ],
      description: {
        type: String,
        default: '',
      },
    },
    can_salary: {
      lastSalary: {
        type: Number,
        default: null,
      },
      recieveFormat: {
        type: String,
        default: '',
      },
      minSalary: {
        type: Number,
        default: null,
      },
      maxSalary: {
        type: Number,
        default: null,
      },
    },
    can_social: [
      {
        name: {
          type: String,
          lowercase: true,
        },
        link: {
          type: String,
        },
      },
    ],
    can_qualification: [
      {
        degree: String,
        institute: String,
        university: String,
        from: Date,
        to: Date,
      },
    ],
    can_experience: [
      {
        title: String,
        employmentType: String,
        company: String,
        location: String,
        from: Date,
        to: Date,
        isCurrentlyWorking: {
          type: Boolean,
          default: false,
        },
        descripton: String,
      },
    ],
    can_contact: {
      phoneNumber: {
        type: String,
        default: '',
      },
      landlineNumber: {
        type: String,
        default: '',
      },
      addressOne: {
        type: String,
        default: '',
      },
      addressTwo: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },
      zipCode: {
        type: Number,
        default: null,
      },
      location: {
        latitude: {
          type: Number,
          default: null,
        },
        longitude: {
          type: Number,
          default: null,
        },
      },
    },
    join_date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }, // true=Active, false=Deleted/
    resumes: [
      {
        name: String,
        title: String,
        description: String,
        isDeleted: {
          type: Boolean,
          default: false,
        },
        uploadedAt: Date,
      },
    ], // name title description
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CandidateSchema.index({ can_id: 1 });

CandidateSchema.virtual('totalExp').get(function () {
  if (typeof this.can_experience === 'undefined' || this.can_experience.length === 0) return 'No Experience';
  let totalMonth = this.can_experience.map((exp) => {
    if (exp.isCurrentlyWorking) return 0;
    return (exp.to.getMonth() - exp.from.getMonth() +
      (12 * (exp.to.getFullYear() - exp.from.getFullYear())))
  });
  console.log(totalMonth)
  totalMonth = totalMonth.reduce((acc, val) => acc + val, 0);
  if (totalMonth <= 12) {
    return `${totalMonth} months`;
  }
  if (totalMonth > 12) {
    if (totalMonth % 12 === 0) return `${totalMonth / 12} years`;
    else return `${parseInt(totalMonth / 12, 10)} years ${totalMonth - parseInt(totalMonth / 12, 10) * 12} months`;
  }
});

CandidateSchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model('Candidate', CandidateSchema, 'candidate');
