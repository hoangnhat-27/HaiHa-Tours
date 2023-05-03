import React, { useEffect } from "react";
import OrderDetailTours from "./OrderDetailTours";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-danger text-white">
          Quay lại
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <b>Ngày tạo: </b>
                  <span className="text-white">
                    {new Date(order.data[0].createdAt).toLocaleDateString(
                      window.userLang,
                      {
                        timeZone: "GMT",
                      }
                    )}
                  </span>
                </span>
                <br />
                <small className="text-black">
                  Order ID:{" "}
                  <span className="text-white">{order.data[0]._id}</span>
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center gap-2">
                <dt>Tình trạng: </dt>
                <span>
                  {order.data[0].isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success mb-0">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger mb-0">
                      Chưa thanh toán
                    </span>
                  )}
                </span>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <OrderDetailTours order={order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
