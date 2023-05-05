import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainDiscounts from "./../components/discounts/MainDiscounts";

const DiscountScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDiscounts />
      </main>
    </>
  );
};

export default DiscountScreen;
