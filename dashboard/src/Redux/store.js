import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  tourCreateReducer,
  tourDeleteReducer,
  tourEditReducer,
  tourListReducer,
  tourUpdateReducer,
} from "./Reducers/TourReducers";
import {
  orderUpdatedReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  tourList: tourListReducer,
  tourDelete: tourDeleteReducer,
  tourCreate: tourCreateReducer,
  tourEdit: tourEditReducer,
  tourUpdate: tourUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderUpdate: orderUpdatedReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
