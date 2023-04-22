import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
} from "../Constants/CategoryConstants";
import { logout } from "./userActions";
import axios from "../../http";
import { BASE_URL } from "../../utils/config.js";

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/category`);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE CATEGORY
export const createCategory =
  (categoryName, fatherCateId = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/category/`,
        {
          categoryName,
          fatherCateId,
        },
        config
      );

      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT CATEGORY
export const editCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/category/${id}`);
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/category/${category._id}`,
      category,
      config
    );
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
