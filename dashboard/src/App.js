import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import TourScreen from "./screens/TourScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddTour from "./screens/AddTour";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import TourEditScreen from "./screens/TourEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listTours } from "./Redux/Actions/TourActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import UserInfo from "./screens/UserInfo";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(listTours());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/tours" component={TourScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addtour" component={AddTour} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/admin/info/:id" component={UserInfo} />
          <PrivateRouter path="/tour/:id/edit" component={TourEditScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
