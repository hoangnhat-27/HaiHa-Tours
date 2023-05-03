import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_EDIT_FAIL,
  BLOG_EDIT_REQUEST,
  BLOG_EDIT_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_RESET,
  BLOG_UPDATE_SUCCESS,
} from "../Constants/BlogConstants";

// ALL blogs
export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE blog
export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE blog
export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT blog
export const blogEditReducer = (state = { blog: { reviews: [] } }, action) => {
  switch (action.type) {
    case BLOG_EDIT_REQUEST:
      return { ...state, loading: true };
    case BLOG_EDIT_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE blog
export const blogUpdateReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_RESET:
      return { blog: {} };
    default:
      return state;
  }
};
