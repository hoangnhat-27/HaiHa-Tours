import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditDiscountMain from "../components/discounts/EditDiscountMain";

const DiscountEditScreen = ({ match }) => {
  const discountId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditDiscountMain discountId={discountId} />
      </main>
    </>
  );
};
export default DiscountEditScreen;
