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

const Booking = ({ tour }) => {
  const { price, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    fullName: "",
    phone: "",
    tourName: `${title}`,
    people: {
      adult: 0,
      children: 0,
    },
    isPaid: false,
    bookFrom: "",
    bookTo: "",
  });

  const totalAmount =
    order.people.adult > 0 && order.people.children > 0
      ? Number(price) * Number(order.people.adult) +
        Math.round(Number(price / 2)) * Number(order.people.children)
      : order.people.adult > 0
      ? Number(price) * Number(order.people.adult)
      : order.people.children > 0
      ? Math.round(Number(price / 2)) * Number(order.people.children)
      : 0;

  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setOrder((prev) => ({ ...prev, totalPrice: totalAmount }));

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      const res = await fetch(`${BASE_URL}/orders/create`, {
        method: "post",
        headers: {
          "content-type": "application/json",
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
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Họ và tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Điện thoại"
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
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="number"
              placeholder="Người lớn"
              id="people"
              onChange={(e) => {
                setOrder((prev) => ({
                  ...prev,
                  people: { adult: e.target.value },
                }));
              }}
            />
            <input
              type="number"
              placeholder="Trẻ em"
              id="people"
              onChange={(e) => {
                setOrder((prev) => ({
                  ...prev,
                  people: { children: e.target.value },
                }));
              }}
            />
          </FormGroup>
          <div className="booking__bottom">
            <ListGroup className="text-right">
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  {price}đ x 1 người lớn và {Math.round(price / 2)}đ x 1 trẻ em
                </h5>
                <span>{price}đ </span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0 total">
                <h5>Tổng cộng</h5>
                <span>{totalAmount}đ</span>
              </ListGroupItem>
            </ListGroup>

            <Button
              className="btn primary__btn w-100 mt-4"
              onSubmit={handleClick}
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
