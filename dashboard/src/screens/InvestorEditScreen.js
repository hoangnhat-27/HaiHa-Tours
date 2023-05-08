import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditInvestorMain from "../components/investors/EditInvestorMain";

const InvestorEditScreen = ({ match }) => {
  const investorId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditInvestorMain investorId={investorId} />
      </main>
    </>
  );
};
export default InvestorEditScreen;
