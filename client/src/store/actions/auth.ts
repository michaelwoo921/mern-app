import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import api from '../../utils/api';

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const res = await api.post('/auth', { email, password });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err: any) {
      console.log(err);
    }
  };

// Logout
export const logout = () => ({ type: LOGOUT });
