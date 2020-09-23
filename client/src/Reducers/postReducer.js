import { GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../Actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload.posts,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
        loading: false
        
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    
    default:
      return state;
  }
};
