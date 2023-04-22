import {
  INVESTOR_CREATE_FAIL,
  INVESTOR_CREATE_REQUEST,
  INVESTOR_CREATE_RESET,
  INVESTOR_CREATE_SUCCESS,
  INVESTOR_DELETE_FAIL,
  INVESTOR_DELETE_REQUEST,
  INVESTOR_DELETE_SUCCESS,
  INVESTOR_EDIT_FAIL,
  INVESTOR_EDIT_REQUEST,
  INVESTOR_EDIT_SUCCESS,
  INVESTOR_LIST_FAIL,
  INVESTOR_LIST_REQUEST,
  INVESTOR_LIST_SUCCESS,
  INVESTOR_UPDATE_FAIL,
  INVESTOR_UPDATE_REQUEST,
  INVESTOR_UPDATE_RESET,
  INVESTOR_UPDATE_SUCCESS,
} from "../Constants/InvestorConstants";

// ALL investors
export const investorListReducer = (state = { investors: [] }, action) => {
  switch (action.type) {
    case INVESTOR_LIST_REQUEST:
      return { loading: true, investors: [] };
    case INVESTOR_LIST_SUCCESS:
      return { loading: false, investors: action.payload };
    case INVESTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE investor
export const investorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_DELETE_REQUEST:
      return { loading: true };
    case INVESTOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INVESTOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE investor
export const investorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVESTOR_CREATE_REQUEST:
      return { loading: true };
    case INVESTOR_CREATE_SUCCESS:
      return { loading: false, success: true, investor: action.payload };
    case INVESTOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INVESTOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT investor
export const investorEditReducer = (
  state = { investor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case INVESTOR_EDIT_REQUEST:
      return { ...state, loading: true };
    case INVESTOR_EDIT_SUCCESS:
      return { loading: false, investor: action.payload };
    case INVESTOR_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE investor
export const investorUpdateReducer = (state = { investor: {} }, action) => {
  switch (action.type) {
    case INVESTOR_UPDATE_REQUEST:
      return { loading: true };
    case INVESTOR_UPDATE_SUCCESS:
      return { loading: false, success: true, investor: action.payload };
    case INVESTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INVESTOR_UPDATE_RESET:
      return { investor: {} };
    default:
      return state;
  }
};
