import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userListReducer,
  userLoginReducer,
  userReducer,
} from "./Reducers/userReducers";
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
  blogCreateReducer,
  blogDeleteReducer,
  blogListReducer,
  blogEditReducer,
  blogUpdateReducer,
} from "./Reducers/BlogReducers";
import {
  discountCreateReducer,
  discountDeleteReducer,
  discountListReducer,
  discountEditReducer,
  discountUpdateReducer,
  discountReducer,
} from "./Reducers/DiscountReducers";
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
  userSingle: userReducer,
  tourList: tourListReducer,
  tourDelete: tourDeleteReducer,
  tourCreate: tourCreateReducer,
  tourEdit: tourEditReducer,
  tourUpdate: tourUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderUpdate: orderUpdatedReducer,
  blogList: blogListReducer,
  blogDelete: blogDeleteReducer,
  blogCreate: blogCreateReducer,
  blogEdit: blogEditReducer,
  blogUpdate: blogUpdateReducer,
  discountList: discountListReducer,
  discountDelete: discountDeleteReducer,
  discountCreate: discountCreateReducer,
  discountEdit: discountEditReducer,
  discountUpdate: discountUpdateReducer,
  discountSingleUser: discountReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryEdit: categoryEditReducer,
  categoryUpdate: categoryUpdateReducer,
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
