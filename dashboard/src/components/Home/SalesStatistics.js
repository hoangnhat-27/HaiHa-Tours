import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Biểu đồ thu nhập</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-tours_booking-dzyqn/embed/charts?id=643adcd0-66b9-4755-890a-d21f8809e216&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
