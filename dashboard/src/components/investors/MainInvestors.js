import React from "react";
import CreateInvestor from "./CreateInvestor";
import InvestorsTable from "./InvestorsTable";

const MainInvestors = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Nhà đầu tư</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create investor */}
            <CreateInvestor />
            {/* Investors table */}
            <InvestorsTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainInvestors;
