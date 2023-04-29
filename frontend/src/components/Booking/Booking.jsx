import React, { useState, useContext } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { useEffect } from "react";

const Booking = ({ tour }) => {
  const { price, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    fullName: "",
    phone: "",
    tourName: `${title}`,
    people: {
      adult: 1,
      children: 1,
    },
    isPaid: false,
    bookFrom: "",
    bookTo: "",
    paymentMethod: "direct",
  });
  let totalAmount = 0;
  if (order.bookFrom && order.bookTo) {
    if (Date.parse(order.bookFrom) > Date.parse(order.bookTo)) {
      alert("Ngày không hợp lệ");
    } else {
      let days = Math.round(
        Math.abs(
          (new Date(order.bookFrom) - new Date(order.bookTo)) /
            (24 * 60 * 60 * 1000)
        )
      );
      let adults = 0;
      let children = 0;
      if (!order.people.adult > 0 && !order.people.children > 0)
        totalAmount = 1000;
      if (order.people.adult > 0)
        adults = Number(price) * Number(order.people.adult) * days;
      else adults = 0;
      if (order.people.children > 0)
        children =
          Math.round(Number(price / 2)) * Number(order.people.children) * days;
      else children = 0;
      totalAmount = adults + children;
    }
  }

  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    if (totalAmount) {
      setOrder({ ...order, totalPrice: totalAmount });
    }
  }, [totalAmount]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      const res = await fetch(`${BASE_URL}/orders/create`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(order),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="booking">
      <div className="booking__form">
        <h5>Thông tin đơn đặt</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <Row>
              <Col lg="6">
                <Label for="fullName">Họ và tên</Label>
              </Col>
            </Row>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg="6">
                <Label for="phone">Điện thoại</Label>
              </Col>
            </Row>
            <input
              type="number"
              placeholder="Nhập số điện thoại"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Row>
            <Col lg="6">
              <Label for="bookFrom">Ngày đi</Label>
            </Col>
            <Col lg="6">
              <Label for="bookTo">Ngày đến</Label>
            </Col>
          </Row>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookFrom" onChange={handleChange} />
            <input type="date" id="bookTo" required onChange={handleChange} />
          </FormGroup>
          <Row>
            <Col lg="6">
              <Label for="people">Người lớn</Label>
            </Col>
            <Col lg="6">
              <Label for="people">Trẻ em</Label>
            </Col>
          </Row>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="number"
              id="people"
              onChange={(e) => {
                setOrder((prev) => ({
                  ...prev,
                  people: { ...prev.people, adult: e.target.value },
                }));
              }}
              value={order.people.adult ? order.people.adult : 1}
            />
            <input
              type="number"
              id="people"
              onChange={(e) => {
                setOrder((prev) => ({
                  ...prev,
                  people: { ...prev.people, children: e.target.value },
                }));
              }}
              value={order.people.children ? order.people.children : 1}
            />
          </FormGroup>
          <Row>
            <Col lg="6">
              <Label for="people">Phương thức thanh toán</Label>
            </Col>
          </Row>
          <FormGroup className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <div>
                <input
                  style={{ width: "unset" }}
                  type="radio"
                  id="direct"
                  name="paymentMethod"
                  value="direct"
                  checked={order.paymentMethod === "direct"}
                  onChange={(e) => {
                    setOrder((prev) => ({
                      ...prev,
                      paymentMethod: "direct",
                    }));
                  }}
                />{" "}
                Thanh toán trực tiếp
              </div>
              <div>
                <input
                  style={{ width: "unset" }}
                  type="radio"
                  id="banking"
                  name="paymentMethod"
                  value="banking"
                  checked={order.paymentMethod === "banking"}
                  onChange={(e) => {
                    setOrder((prev) => ({
                      ...prev,
                      paymentMethod: "banking",
                    }));
                  }}
                />{" "}
                Chuyển khoản
              </div>
            </div>
          </FormGroup>

          <div className="booking__bottom">
            <ListGroup className="text-right">
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  {Intl.NumberFormat("en-US").format(price)}đ/ngày cho 1 người
                  lớn và{" "}
                  {Intl.NumberFormat("en-US").format(Math.round(price / 2))}
                  đ/ngày cho 1 trẻ em
                </h5>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0 total">
                <h5>Tổng cộng</h5>
                <span>{Intl.NumberFormat("en-US").format(totalAmount)}đ</span>
              </ListGroupItem>
            </ListGroup>

            <Button
              className="btn primary__btn w-100 mt-4"
              onSubmit={handleClick}
              style={{
                backgroundColor: "orange",
                color: "#000",
                border: "none",
              }}
            >
              Đặt ngay
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Booking;
