import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import About from "./../pages/About";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import CategoryTourList from "./../pages/CategoryTourList";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import Blogs from "./../pages/Blogs";
import UserInfo from "./../pages/UserInfo";
import UserDiscounts from "./../pages/UserDiscounts";
import Settings from "./../pages/Settings";
import Checkout from "./../pages/Checkout";
import ThankYou from "../pages/ThankYou";
import OrderList from "../pages/OrderList";
import NotFound from "../pages/NotFound";
import BlogDetails from "../pages/BlogDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/category/:id" element={<CategoryTourList />} />
      <Route path="/tour/checkout/:id" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/user/info/:id" element={<UserInfo />} />
      <Route path="/discounts/:id" element={<UserDiscounts />} />
      <Route path="/settings/:id" element={<Settings />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/orders-list/:id" element={<OrderList />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
