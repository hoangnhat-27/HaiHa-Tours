import {
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_EDIT_REQUEST,
  BLOG_EDIT_SUCCESS,
  BLOG_EDIT_FAIL,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
} from "../Constants/BlogConstants";
import { logout } from "./userActions";
import axios from "../../http";
import { BASE_URL } from "../../utils/config.js";

export const listBlogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/blogs`);

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE BLOG
export const createBlog =
  (title, content, photo) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/blogs/`,
        {
          title,
          content,
          photo,
        },
        config
      );

      dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: BLOG_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT BLOG
export const editBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/blogs/${id}`);
    dispatch({ type: BLOG_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/blogs/${blog._id}`,
      blog,
      config
    );
    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE BLOG
export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/blogs/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload: message,
    });
  }
};
