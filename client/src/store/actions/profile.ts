import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  NO_REPOS,
} from './types';
import api from '../../utils/api';
import { setAlert } from './alert';
import { useNavigate } from 'react-router-dom';

// get authenticated user profile
export const getCurrentProfile = () => async (dispatch: any) => {
  try {
    const res = await api.get('/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// get all profiles
export const getProfiles = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get('/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// get profile by ID

export const getProfileById = (userId: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// get github repoe
export const getGithubRepos = (username: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({ type: NO_REPOS });
  }
};

// create or update profile
export const createProfile =
  (formData: any, edit = false) =>
  async (dispatch: any) => {
    const navigate = useNavigate();
    try {
      const res = await api.post('/profile', formData);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// delete account & profile
export const deleteAccount = () => async (dispatch: any) => {
  try {
    await api.delete('/profile');
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });
    dispatch(setAlert('Your account has been permanently deleted'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// add experience
export const addExperience = (formData: any) => async (dispatch: any) => {
  const navigate = useNavigate();
  try {
    const res = await api.put('/profile/experience', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience added', 'success'));
    navigate('/dashboard');
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// add education
export const addEducation = (formData: any) => async (dispatch: any) => {
  const navigate = useNavigate();
  try {
    const res = await api.put('/profile/education', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education added', 'success'));
    navigate('/dashboard');
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete experience
export const deleteExperience = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.put(`/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete education
export const deleteEducation = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.put(`/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
