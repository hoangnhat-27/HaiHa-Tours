import React, { useState, useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ToursStatistics from "./ToursStatistics";
import ToursRatings from "./ToursRatings";
import { useSelector } from "react-redux";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const tourList = useSelector((state) => state.tourList);
  const { tours } = tourList;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (orders?.success) {
      setOrderData(orders.data);
    }
  }, [orders]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal
          orders={orders ? orders.data : []}
          tours={tours ? tours.data : []}
        />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ToursRatings />
        </div>
        <div>
          <ToursStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orderData} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
