import api from '../../utils/api';
import { setAlert } from './alert';
import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  UPDATE_LIKES,
  POST_ERROR,
} from './types';

// get posts
export const getPosts = () => async (dispatch: any) => {
  try {
    const res = await api.get('/posts');

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add like
export const addLike = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.put(`/posts/${id}/like`);

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove like
export const removeLike = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.put(`/posts/${id}/unlike`);

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const deletePost = (id: string) => async (dispatch: any) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add post
export const addPost = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get post by id
export const getPost = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add comment
export const addComment =
  (postId: string, formData: any) => async (dispatch: any) => {
    try {
      const res = await api.post(`/posts/${postId}/comment`);

      dispatch({ type: ADD_COMMENT, payload: res.data });
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err: any) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// delete comment
export const deleteComment =
  (postId: string, commentId: string) => async (dispatch: any) => {
    try {
      await api.post(`/posts/${postId}/comment/${commentId}`);

      dispatch({ type: REMOVE_COMMENT, payload: commentId });
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err: any) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
