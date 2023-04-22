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
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryEditReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducers";
import {
  orderUpdatedReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducers";
import {
  investorCreateReducer,
  investorDeleteReducer,
  investorUpdateReducer,
  investorListReducer,
  investorEditReducer,
} from "./Reducers/InvestorReducers";

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
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryEdit: categoryUpdateReducer,
  investorList: investorListReducer,
  investorDelete: investorDeleteReducer,
  investorCreate: investorCreateReducer,
  investorEdit: investorEditReducer,
  investorUpdate: investorUpdateReducer,
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
