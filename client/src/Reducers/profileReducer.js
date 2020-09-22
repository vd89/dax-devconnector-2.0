import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from '../Actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload.profiles,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload.result,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: true,
      };
    default:
      return state;
  }
};
