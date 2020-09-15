/** @format */

const Profile = require('../models/profileModel');
const User = require('../models/userModel');

module.exports = {
  getMeProfile: async (req, res, next) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'avatar']);
      if (!profile) {
        return res.status(400).json({ data: { msg: 'There is no profile for this user' } });
      }
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },
  createOrUpdateProfile: async (req, res, next) => {
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubUserName,
      youTube,
      twitter,
      faceBook,
      linkedIn,
      instagram,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUserName) profileFields.githubUserName = githubUserName;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    // Build social object
    profileFields.social = {};
    if (youTube) profileFields.social.youTube = youTube;
    if (twitter) profileFields.social.twitter = twitter;
    if (faceBook) profileFields.social.faceBook = faceBook;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;
    if (instagram) profileFields.social.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update profile
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
        return res.json({ data: { msg: 'Success', profile } });
      }
      // Profile is not present
      profile = new Profile(profileFields);
      await profile.save();
      return res.json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },

  getAllProfile: async (req, res, next) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      return res.status(200).json({ data: { msg: 'Success', profiles } });
    } catch (error) {
      next(error);
    }
  },

  getSingleProfile: async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.params.userID }).populate('user', ['name', 'avatar']);
      if (!profile) return res.status(400).json({ data: { msg: 'Profile not found' } });
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },

  deleteProfile: async (req, res, next) => {
    try {
      // Todo remove post as well

      // Remove Profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove User
      await User.findByIdAndRemove({ _id: req.user.id });
      return res.status(200).json({ data: { msg: 'Success', value: 'The user is deleted ' } });
    } catch (error) {
      next(error);
    }
  },

  addExperience: async (req, res, next) => {
    try {
      const { title, company, location, from, to, current, description } = req.body;
      const newExp = { title, company, location, from, to, current, description };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },

  addEducation: async (req, res, next) => {
    try {
      const { school, degree, fieldOfStudy, from, to, current, description } = req.body;
      const newEdu = { school, degree, fieldOfStudy, from, to, current, description };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },

  deleteExperience: async (req, res, next) => {
    try {
      const { expId } = req.params;
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience = profile.experience.filter((exp) => exp._id.toString() !== expId);
      await profile.save();
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },

  deleteEducation: async (req, res, next) => {
    try {
      const { eduId } = req.params;
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education = profile.education.filter((edu) => edu._id.toString() !== eduId);
      await profile.save();
      return res.status(200).json({ data: { msg: 'Success', profile } });
    } catch (error) {
      next(error);
    }
  },
};
