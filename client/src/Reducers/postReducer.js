import { ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../Actions/types';

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
    case ADD_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === payload.postId ? { ...post, likes: payload.likes } : post)),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
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
