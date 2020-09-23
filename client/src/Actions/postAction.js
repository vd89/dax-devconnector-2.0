import Axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await Axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};
