import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../Redux/Actions/OrderActions";

const Orders = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const UpdateOrder = (order, orderStatus) => {
    dispatch(updateOrder({ _id: order._id, status: orderStatus }));
    toast.success("Tour cập nhật thành công", ToastObjects);
  };

  return (
    <>
      <Toast />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Họ và tên</th>
            <th scope="col">Email</th>
            <th scope="col">Điện thoại</th>
            <th scope="col">Tour đặt</th>
            <th scope="col">Đặt từ ngày</th>
            <th scope="col">Đặt đến ngày</th>
            <th scope="col">Người lớn</th>
            <th scope="col">Trẻ em</th>
            <th scope="col">Tổng cộng</th>
            <th scope="col">Thanh toán</th>
            <th>Trạng thái</th>
            <th scope="col" className="text-end">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order.fullName}</b>
              </td>
              <td>{order.userEmail}</td>
              <td>{order.phone}</td>
              <td>{order.tourName}</td>
              <td>{order.bookFrom}</td>
              <td>{order.bookTo}</td>
              <td>{order.people.adult}</td>
              <td>{order.people.children}</td>
              <td>{order.totalPrice}đ</td>
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
                {order.status === "accept" ? (
                  <span className="badge btn-success">Đã xác nhận</span>
                ) : (
                  <>
                    <span className="badge btn-dark">Chưa xác nhận</span>
                    <div className="d-flex gap-1 mt-1">
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateOrder(order, "accept");
                        }}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateOrder(order, "deny");
                        }}
                      >
                        Từ chối
                      </button>
                    </div>
                  </>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
