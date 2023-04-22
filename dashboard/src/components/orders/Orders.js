import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../Redux/Actions/OrderActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Orders = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const UpdateOrder = (
    order,
    orderStatus = order.status,
    isPaid = order.isPaid
  ) => {
    dispatch(updateOrder({ _id: order._id, status: orderStatus, isPaid }));
    toast.success("Tour cập nhật thành công", ToastObjects);
  };
  const [show, setShow] = useState(false);
  const [orderItem, setOrderItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xác nhận đơn hàng đã thanh toán ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              UpdateOrder(orderItem, "", true);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Họ và tên</th>
            <th scope="col">Tên tour</th>
            <th scope="col">Số ngày đặt</th>
            <th scope="col">Tổng cộng</th>
            <th scope="col">Thanh toán</th>
            <th>Trạng thái</th>
            <th scope="col" className="text-end">
              Hành động
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
              <td>
                {Math.round(
                  Math.abs(
                    (new Date(order.bookFrom) - new Date(order.bookTo)) /
                      (24 * 60 * 60 * 1000)
                  )
                )}
              </td>
              <td>{Intl.NumberFormat("en-US").format(order.totalPrice)}đ</td>
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
                ) : order.status === "deny" ? (
                  <span className="badge btn-danger">Đã từ chối</span>
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
                <div className="d-flex gap-2">
                  {!order.isPaid ? (
                    <div
                      className="text-success"
                      onClick={() => {
                        setOrderItem(order);
                        handleShow();
                      }}
                      style={{
                        cursor: "pointer",
                        opacity: "0.7",
                      }}
                      onMouseOver={(e) => (e.target.style.opacity = 1)}
                      onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                    >
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                  ) : (
                    ""
                  )}
                  <Link
                    to={`/order/${order._id}`}
                    className="text-success"
                    style={{
                      cursor: "pointer",
                      opacity: "0.7",
                    }}
                    onMouseOver={(e) => (e.target.style.opacity = 1)}
                    onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                  >
                    <i className="fas fa-eye"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
