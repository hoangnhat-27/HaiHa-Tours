import {
  TOUR_CREATE_FAIL,
  TOUR_CREATE_REQUEST,
  TOUR_CREATE_SUCCESS,
  TOUR_DELETE_FAIL,
  TOUR_DELETE_REQUEST,
  TOUR_DELETE_SUCCESS,
  TOUR_EDIT_FAIL,
  TOUR_EDIT_REQUEST,
  TOUR_EDIT_SUCCESS,
  TOUR_LIST_FAIL,
  TOUR_LIST_REQUEST,
  TOUR_LIST_SUCCESS,
  TOUR_UPDATE_FAIL,
  TOUR_UPDATE_REQUEST,
  TOUR_UPDATE_SUCCESS,
} from "../Constants/TourConstants";
import axios from "../../http";
import { logout } from "./userActions";
import { BASE_URL } from "../../utils/config.js";

export const listTours = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOUR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/tours`, config);

    dispatch({ type: TOUR_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TOUR_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE TOUR
export const deleteTour = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOUR_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/tours/${id}`, config);

    dispatch({ type: TOUR_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TOUR_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE TOUR
export const createTour =
  (
    name,
    city,
    address,
    photo,
    description,
    price,
    slot,
    featured,
    cateId,
    investorId
    // countInStock
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: TOUR_CREATE_REQUEST });

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
          title: name,
          city,
          address: address,
          maxGroupSize: slot,
          price,
          desc: description,
          photo,
          featured: featured,
          cateId,
          investorId,
          // countInStock,
        },
        config
      );

      dispatch({ type: TOUR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TOUR_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT TOUR
export const editTour = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOUR_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/tours/${id}`);
    dispatch({ type: TOUR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TOUR_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE TOUR
export const updateTour = (tour) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOUR_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/tours/${tour._id}`,
      tour,
      config
    );

    dispatch({ type: TOUR_UPDATE_SUCCESS, payload: data });
    dispatch({ type: TOUR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TOUR_UPDATE_FAIL,
      payload: message,
    });
  }
};
