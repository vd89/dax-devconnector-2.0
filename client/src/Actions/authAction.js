/** @format */

import Axios from 'axios';
import { setAlert } from './alertAction';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
export const register = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post('api/users', formData, config);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
