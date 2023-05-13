import {
  TOUR_CREATE_FAIL,
  TOUR_CREATE_REQUEST,
  TOUR_CREATE_RESET,
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
  TOUR_UPDATE_RESET,
  TOUR_UPDATE_SUCCESS,
} from "../Constants/TourConstants";

// ALL tours
export const tourListReducer = (state = { tours: [] }, action) => {
  switch (action.type) {
    case TOUR_LIST_REQUEST:
      return { loading: true, tours: [] };
    case TOUR_LIST_SUCCESS:
      return { loading: false, tours: action.payload };
    case TOUR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE tour
export const tourDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOUR_DELETE_REQUEST:
      return { loading: true };
    case TOUR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TOUR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE tour
export const tourCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOUR_CREATE_REQUEST:
      return { loading: true };
    case TOUR_CREATE_SUCCESS:
      return { loading: false, success: true, tour: action.payload };
    case TOUR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TOUR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT tour
export const tourEditReducer = (state = { tour: {} }, action) => {
  switch (action.type) {
    case TOUR_EDIT_REQUEST:
      return { ...state, loading: true };
    case TOUR_EDIT_SUCCESS:
      return { loading: false, tour: action.payload };
    case TOUR_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE tour
export const tourUpdateReducer = (state = { tour: {} }, action) => {
  switch (action.type) {
    case TOUR_UPDATE_REQUEST:
      return { loading: true };
    case TOUR_UPDATE_SUCCESS:
      return { loading: false, success: true, tour: action.payload };
    case TOUR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TOUR_UPDATE_RESET:
      return { tour: {} };
    default:
      return state;
  }
};
