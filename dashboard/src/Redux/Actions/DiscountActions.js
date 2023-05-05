import {
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_DELETE_FAIL,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_EDIT_REQUEST,
  DISCOUNT_EDIT_SUCCESS,
  DISCOUNT_EDIT_FAIL,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_SUCCESS,
  DISCOUNT_SINGLE_FAIL,
  DISCOUNT_SINGLE_REQUEST,
  DISCOUNT_SINGLE_SUCCESS,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
} from "../Constants/DiscountConstants";
import { logout } from "./userActions";
import axios from "../../http";
import { BASE_URL } from "../../utils/config.js";

export const listDiscounts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/discounts`, config);

    dispatch({ type: DISCOUNT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DISCOUNT_LIST_FAIL,
      payload: message,
    });
  }
};

export const singleUserDiscount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_SINGLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/discounts/${id}`, config);

    dispatch({ type: DISCOUNT_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_SINGLE_FAIL,
      payload: message,
    });
  }
};

// CREATE DISCOUNT
export const createDiscount =
  (discountName, discountCode, amount, belowPrice, photo, type, userId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DISCOUNT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/discounts/`,
        {
          discountName,
          discountCode,
          amount,
          belowPrice,
          photo,
          type,
          userId,
        },
        config
      );

      dispatch({ type: DISCOUNT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DISCOUNT_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT DISCOUNT
export const editDiscount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISCOUNT_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/discounts/${id}`);
    dispatch({ type: DISCOUNT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateDiscount = (discount) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/discounts/${discount._id}`,
      discount,
      config
    );
    dispatch({ type: DISCOUNT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE DISCOUNT
export const deleteDiscount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/discounts/${id}`, config);

    dispatch({ type: DISCOUNT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_DELETE_FAIL,
      payload: message,
    });
  }
};
