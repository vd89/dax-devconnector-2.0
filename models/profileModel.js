/** @format */

const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    company: { type: String },
    website: { type: String },
    location: { type: String },
    status: { type: String, required: true },
    skills: { type: [String], required: true },
    bio: { type: String },
    githubUserName: { type: String },
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    social: {
      youTube: { type: String },
      twitter: { type: String },
      faceBook: { type: String },
      linkedIn: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);
class Profile {}
profileSchema.loadClass(Profile);
module.exports = model('profile', profileSchema);
