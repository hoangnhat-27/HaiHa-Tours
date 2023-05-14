import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config.js";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.js";
import Modal from "react-bootstrap/Modal";
import "../styles/settings.css";
import { useState } from "react";

const ToastObjects = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
};
const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`${BASE_URL}/auth/password/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        updatedAt: new Date(Date.now()),
      }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Đổi mật khẩu thành công!", ToastObjects);
    } else {
      toast.error("Sai mật khẩu, vui lòng thử lại!", ToastObjects);
    }
  };
  const handleDeleteUser = async () => {
    let res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (result.success) {
      let resOrder = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      const resultDeleteUser = await resOrder.json();
      let resDiscount = await fetch(`${BASE_URL}/discounts/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      const resultDeleteDiscount = await resDiscount.json();
      if (resultDeleteUser.success && resultDeleteDiscount.success) {
        toast.success("Xoá người dùng thành công!", ToastObjects);
        setTimeout(() => navigate("/home", { replace: true }), 2000);
        dispatch({ type: "LOGOUT" });
      }
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn muốn xác nhận xóa tài khoản chứ ? (Tất cả thông tin của bạn sẽ
          mất)
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            className="btn-success"
            onClick={() => {
              handleDeleteUser();
              handleClose();
            }}
          >
            Xóa tài khoản
          </Button>
        </Modal.Footer>
      </Modal>
      <Row style={{ width: "100%" }}>
        <Col lg="3">
          <div>
            <aside className="navbar-aside" id="offcanvas_aside">
              <nav>
                <ul className="menu-aside">
                  <li className="menu-item active">
                    <span className="text">Đổi mật khẩu</span>
                  </li>
                  <li className="menu-item" onClick={handleShow}>
                    <span className="text">Xóa tài khoản</span>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </Col>
        <Col lg="9">
          <Container>
            <Toast />
            <form className="form" onSubmit={handleSubmit}>
              <div className="content-header d-flex justify-content-between">
                <Link to="/home" className="btn btn-danger text-white">
                  Về trang chủ
                </Link>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onSubmit={handleSubmit}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
              <div className="my-4">
                <label htmlFor="tour_title" className="form-label">
                  Mật khẩu cũ
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  className="form-control"
                  id="old_password"
                  required
                  value={oldPassword ? oldPassword : ""}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tour_title" className="form-label">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="form-control"
                  required
                  id="new_password"
                  value={newPassword ? newPassword : ""}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </form>
          </Container>
        </Col>
      </Row>
    </section>
  );
};

export default Settings;
