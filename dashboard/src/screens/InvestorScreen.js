import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainInvestors from "../components/investors/MainInvestors";

const InvestorScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainInvestors />
      </main>
    </>
  );
};

export default InvestorScreen;
