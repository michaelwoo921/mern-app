import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  NO_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    case GET_PROFILES:
      return { ...state, loading: false, profiles: action.payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload, profile: null };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };
    case NO_REPOS:
      return { ...state, repos: [], loading: false };
    default:
      return state;
  }
}

export default profileReducer;
