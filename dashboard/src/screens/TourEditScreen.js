import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditTourMain from "../components/tours/EditTourMain";

const TourEditScreen = ({ match }) => {
  const tourId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditTourMain tourId={tourId} />
      </main>
    </>
  );
};
export default TourEditScreen;
