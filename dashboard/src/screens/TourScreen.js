import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainTours from "../components/tours/MainTours";

const TourScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainTours />
      </main>
    </>
  );
};

export default TourScreen;
