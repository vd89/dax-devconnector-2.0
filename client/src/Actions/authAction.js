/** @format */

import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertAction';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Register User

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await Axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post('api/users', formData, config);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
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

// login user
export const login = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post('api/auth', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout  && clear Profile
export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT
  })
}

