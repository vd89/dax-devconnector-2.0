import Axios from 'axios';
import { setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

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
