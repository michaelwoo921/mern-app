import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_LIKES,
  POST_ERROR,
  DELETE_POST,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post: any) => post.id !== action.payload),
      };
    case POST_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post: any) =>
          post._id === action.payload.id
            ? {
                ...post,
                likes: action.payload.likes,
              }
            : post
        ),
      };

    case ADD_COMMENT:
      if (state.post != null) {
        return {
          ...state,
          loading: false,
          post: { ...(state.post as object), comments: action.payload },
        };
      }
      return { ...state };
    case REMOVE_COMMENT:
      if (state.post !== null) {
        return {
          ...state,
          post: {
            ...(state.post as object),
            comments: (state.post as any).comments.filter(
              (comment: any) => comment._id !== action.payload
            ),
          },
          loading: false,
        };
      }
      return { ...state };

    default:
      return state;
  }
};

export default postReducer;
