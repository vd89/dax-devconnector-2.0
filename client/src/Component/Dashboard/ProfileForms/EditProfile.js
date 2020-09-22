import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../Actions/profileAction';
import { Link, withRouter } from 'react-router-dom';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  githubUserName: '',
  youTube: '',
  twitter: '',
  faceBook: '',
  linkedIn: '',
  instagram: '',
};
const EditProfile = ({ getCurrentProfile, createProfile, history, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInput, toggleDisplaySocialInput] = useState(false);
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
  } = formData;

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills)) profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Make some change in your profile that can be viewed
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <select name='status' value={status} onChange={onChangeHandler}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>Give us an idea of where you are at in your career</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Company' name='company' value={company} onChange={onChangeHandler} />
          <small className='form-text'>Could be your own company or one you work for</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Website' name='website' value={website} onChange={onChangeHandler} />
          <small className='form-text'>Could be your own or a company website</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' name='location' value={location} onChange={onChangeHandler} />
          <small className='form-text'>City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Skills' name='skills' value={skills} onChange={onChangeHandler} />
          <small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubUserName'
            value={githubUserName}
            onChange={onChangeHandler}
          />
          <small className='form-text'>If you want your latest repos and a Github link, include your username</small>
        </div>
        <div className='form-group'>
          <textarea placeholder='A short bio of yourself' name='bio' value={bio} onChange={onChangeHandler}></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button onClick={() => toggleDisplaySocialInput(!displaySocialInput)} type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInput && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input type='text' placeholder='Twitter URL' name='twitter' value={twitter} onChange={onChangeHandler} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='faceBook'
                value={faceBook}
                onChange={onChangeHandler}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input type='text' placeholder='YouTube URL' name='youTube' value={youTube} onChange={onChangeHandler} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedIn'
                value={linkedIn}
                onChange={onChangeHandler}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChangeHandler}
              />
            </div>
          </>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
