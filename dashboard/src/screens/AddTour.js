import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddTourMain from "./../components/tours/AddTourMain";

const AddTour = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddTourMain />
      </main>
    </>
  );
};

export default AddTour;
