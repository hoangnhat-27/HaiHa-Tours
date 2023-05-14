import React from "react";

const ToursStatistics = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Tour đặt nhiều nhất</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-tours_booking-dzyqn/embed/charts?id=643ae38e-1aec-4bbc-8d13-3bc3258ffc4f&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ToursStatistics;
