import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteDiscount,
  listDiscounts,
} from "../../Redux/Actions/DiscountActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Discount = (props) => {
  const { discounts } = props;
  const dispatch = useDispatch();
  const [discountData, setDiscountData] = useState([]);
  const [show, setShow] = useState(false);
  const [discountItem, setDiscountItem] = useState({});

  useEffect(() => {
    if (discounts.length) {
      setDiscountData(discounts);
    }
  }, [discounts]);

  const deletehandler = (discount) => {
    if (discount) {
      dispatch(deleteDiscount(discount._id));
      toast.success("Xóa discount thành công", ToastObjects);
      dispatch(listDiscounts());
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xóa discount này chứ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deletehandler(discountItem);
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
            <th scope="col">Tên khuyến mãi</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Người dùng</th>
            <th scope="col">Mã khuyến mãi</th>
            <th scope="col">Loại khuyến mãi</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col" className="text-end">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {discountData.length
            ? discountData.map((discount) => (
                <tr key={discount._id}>
                  <td>
                    <b>{discount.discountName}</b>
                  </td>
                  <td>
                    <img src={discount.photo} alt="" width="50px" />
                  </td>
                  <td>{discount.userId?.username}</td>
                  <td>{discount.discountCode}</td>
                  <td>
                    {discount.type && discount.type === "decreasePercent"
                      ? "Giảm theo %"
                      : "Giảm số tiền cố định"}
                  </td>
                  <td>{discount.amount}</td>
                  <td>
                    {new Date(discount.createdAt).toLocaleDateString(
                      window.userLang,
                      {
                        timeZone: "GMT",
                      }
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <div className="d-flex gap-2">
                      <Link to={`/discount/${discount._id}/edit`}>
                        <div
                          className="text-success"
                          style={{
                            cursor: "pointer",
                            opacity: "0.7",
                          }}
                          onMouseOver={(e) => (e.target.style.opacity = 1)}
                          onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                        >
                          <i class="fas fa-edit" aria-hidden="true"></i>
                        </div>
                      </Link>
                      <div
                        className="text-success"
                        style={{
                          cursor: "pointer",
                          opacity: "0.7",
                        }}
                        onMouseOver={(e) => (e.target.style.opacity = 1)}
                        onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                        onClick={() => {
                          handleShow();
                          setDiscountItem(discount);
                        }}
                      >
                        <i class="fa fa-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default Discount;
