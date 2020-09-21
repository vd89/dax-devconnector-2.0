import Axios from 'axios';
import { setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await Axios.get('/api/profile/me');
    console.log(res.data);
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
