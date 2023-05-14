import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h4 className="card-title">Đơn mới nhất</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.length ? (
                orders
                  .slice(0, 5)
                  .reverse()
                  .map((order) => (
                    <tr key={order._id}>
                      <td>
                        <b>{order.fullName}</b>
                      </td>
                      <td>{order.userId.email}</td>
                      <td>
                        {Intl.NumberFormat("en-US").format(order.totalPrice)}đ
                      </td>
                      <td>
                        {order.isPaid ? (
                          <span className="badge rounded-pill alert-success">
                            Đã thanh toán
                          </span>
                        ) : (
                          <span className="badge rounded-pill alert-danger">
                            Chưa thanh toán
                          </span>
                        )}
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString(
                          window.userLang,
                          {
                            timeZone: "GMT",
                          }
                        )}
                      </td>
                      <td className="d-flex justify-content-end align-item-center">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-success"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <div className="text-center">Không có dữ liệu</div>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
