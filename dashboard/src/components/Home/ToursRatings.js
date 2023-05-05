import React from "react";

const ToursRatings = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Tour đánh giá cao nhất</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-tours_booking-dzyqn/embed/charts?id=64553e0c-a0a9-4554-813c-9c6708e5860b&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ToursRatings;
