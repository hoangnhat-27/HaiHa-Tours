import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddDiscountMain from "./../components/discounts/AddDiscountMain";

const AddDiscount = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddDiscountMain />
      </main>
    </>
  );
};

export default AddDiscount;
