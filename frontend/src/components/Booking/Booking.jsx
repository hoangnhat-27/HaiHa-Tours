import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour }) => {
  const { price, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: `${title}`,
    fullName: "",
    phone: "",
    guestSize: "",
    bookingAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) *
      (Number(booking.guestSize) ? Number(booking.guestSize) : 1) +
    Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
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
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookingAt"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Số người"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <div className="booking__bottom">
            <ListGroup className="text-right">
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  {price}đ <i class="ri-close-line"></i> 1 người
                </h5>
                <span>{price}đ </span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0">
                <h5>Phụ phí</h5>
                <span>{serviceFee}đ</span>
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
