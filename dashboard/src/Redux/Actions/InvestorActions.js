import {
  INVESTOR_CREATE_REQUEST,
  INVESTOR_CREATE_SUCCESS,
  INVESTOR_CREATE_FAIL,
  INVESTOR_EDIT_REQUEST,
  INVESTOR_EDIT_SUCCESS,
  INVESTOR_EDIT_FAIL,
  INVESTOR_LIST_FAIL,
  INVESTOR_LIST_REQUEST,
  INVESTOR_LIST_SUCCESS,
  INVESTOR_UPDATE_REQUEST,
  INVESTOR_UPDATE_SUCCESS,
  INVESTOR_UPDATE_FAIL,
} from "../Constants/InvestorConstants";
import { logout } from "./userActions";
import axios from "../../http";
import { BASE_URL } from "../../utils/config.js";

export const listInvestors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/investor`, config);

    dispatch({ type: INVESTOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: INVESTOR_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE INVESTOR
export const createInvestor =
  (name, address = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: INVESTOR_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/tours/`,
        {
          name,
          address,
        },
        config
      );

      dispatch({ type: INVESTOR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVESTOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT INVESTOR
export const editInvestor = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVESTOR_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/investor/${id}`);
    dispatch({ type: INVESTOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVESTOR_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateInvestor = (investor) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVESTOR_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/investor/${investor._id}`,
      investor,
      config
    );
    dispatch({ type: INVESTOR_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVESTOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
