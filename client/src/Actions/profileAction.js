import Axios from 'axios';
import { setAlert } from './alertAction';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get user Profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await Axios.get('/api/profile/me', config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    await dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Profiles 
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await Axios.get('/api/profile', config);
    dispatch({
      type: GET_PROFILES,
      payload: res.data.data,
    });
  } catch (err) {
    await dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Get profile by id
export const getProfileById = userId => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/profile/user/${userId}`, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    await dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github Repos 
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/profile/github/${username}`, config);
    dispatch({
      type: GET_REPOS,
      payload: res.data.data,
    });
  } catch (err) {
    await dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const res = await Axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    } else {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Profile
// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await Axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert('Experience Added ', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await Axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert('Education Added ', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('Experience Deleted', 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('Education Deleted', 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
       await Axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your Account has been deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

