import Axios from 'axios';
import { setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR } from './types';


const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await Axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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