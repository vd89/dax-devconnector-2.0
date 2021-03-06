import Axios from 'axios';
import { setAlert } from './alertAction';
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

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
export const addLikes = (postId) => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/posts/like/${postId}`);
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
};

// Unlike post
export const removeLikes = (postId) => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/posts/unlike/${postId}`);
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
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await Axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Single Post 
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment on Post 
export const addComments = (postId,formData) => async (dispatch) => {
  try {
    const res = await Axios.post(`/api/posts/comment/${postId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data,
    });
    dispatch(setAlert('Comment Added','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Comments on Post 
export const removeComments = (postId, commentId) => async (dispatch) => {
  try {
    await Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { mag: err.response.statusText, status: err.response.status },
    });
  }
};