import Axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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

// Add like 
export const addLikes = postId => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/posts/like/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.data.result },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
}

// Unlike post 
export const removeLikes = (postId) => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {postId,likes: res.data.data.result}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};