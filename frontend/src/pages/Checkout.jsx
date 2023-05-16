import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config";
import "../styles/booking.css";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.js";

import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

const Checkout = () => {
  const { id } = useParams();
  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);
  const { price, photo, title, slots } = tour;

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [discountInput, setDiscountInput] = useState("");
  const [useDiscount, setUseDiscount] = useState(false);
  const [discountData, setDiscountData] = useState(async () => {
    try {
      const res = await fetch(`${BASE_URL}/discounts/user/${user._id}`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error("Không lấy được mã giảm giá", ToastObjects);
        return;
      }
      setDiscountData(result.data?.reverse());
    } catch (error) {
      toast.error("Không lấy được mã giảm giá", ToastObjects);
      return;
    }
  });
  const [discountItem, setDiscountItem] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState({
    userId: user && user._id,
    fullName: "",
    phone: "",
    tourId: `${id}`,
    tourName: `${title ? title : ""}`,
    photo: `${photo ? photo : ""}`,
    people: {
      adult: 1,
      children: 1,
    },
    isPaid: false,
    bookFrom: "",
    bookTo: "",
    paymentMethod: "direct",
  });
  useEffect(() => {
    if (order.bookFrom && order.bookTo) {
      if (Date.parse(order.bookFrom) > Date.parse(order.bookTo)) {
        toast.error("Ngày không hợp lệ!", ToastObjects);
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
          setTotalPrice(0);
        if (order.people.adult > 0)
          adults = Number(price) * Number(order.people.adult) * days;
        else adults = 0;
        if (order.people.children > 0)
          children =
            Math.round(Number(price / 2)) *
            Number(order.people.children) *
            days;
        else children = 0;
        if (useDiscount) {
          if (discountInput?.trim() && discountData.length) {
            let discount = discountData.filter(
              (discount) =>
                discount.discountCode === discountInput &&
                discount.belowPrice >= price
            );
            if (discount.length) {
              setDiscountItem(discount[0]);
              if (discount[0].type === "decreasePercent") {
                let total =
                  adults +
                  children -
                  (discount[0].amount * (adults + children)) / 100;
                setTotalPrice(total > 0 ? total : 0);
                toast.success("Áp dụng mã giảm giá thành công!", ToastObjects);
              } else {
                let total = adults + children - Number(discount[0].amount);
                toast.success("Áp dụng mã giảm giá thành công!", ToastObjects);
                setTotalPrice(total > 0 ? total : 0);
              }
            } else {
              toast.error("Mã khuyến mãi không hợp lệ", ToastObjects);
              setTotalPrice(adults + children);
            }
          } else {
            if (discountInput?.trim() && !discountData.length) {
              toast.error("Mã khuyến mãi không hợp lệ", ToastObjects);
            }
            setTotalPrice(adults + children);
          }
        } else {
          setTotalPrice(adults + children);
        }
      }
    }
  }, [
    order.bookFrom,
    order.bookTo,
    order.people.adult,
    order.people.children,
    useDiscount,
    discountInput,
    discountData,
    price,
  ]);

  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    if (title && photo && totalPrice) {
      setOrder({
        ...order,
        tourName: title,
        photo: photo,
        totalPrice: totalPrice,
      });
    }
  }, [totalPrice, title, photo]);

  useEffect(() => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập!", ToastObjects);
      setTimeout(() => navigate("/login"), 2500);
      return;
    }
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (
        !order.userId ||
        !order.fullName ||
        !order.phone ||
        !order.bookFrom ||
        !order.bookTo
      ) {
        toast.error("Hãy nhập đầy đủ tất cả các trường!", ToastObjects);
        return;
      }
      if (Number(order.people.adult) + Number(order.people.children) <= 0) {
        toast.error("Số người không hợp lệ!", ToastObjects);
        return;
      }
      if (Date.parse(order.bookFrom) >= Date.parse(order.bookTo)) {
        toast.error("Ngày không hợp lệ!", ToastObjects);
        return;
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
      await res.json();
      if (!res.ok) {
        toast.error("Số lượng không hợp lệ", ToastObjects);
        return;
      }
      let remainSlot =
        slots - (Number(order.people.adult) + Number(order.people.children));
      const resUpdateTour = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          slots: remainSlot,
        }),
      });
      await resUpdateTour.json();
      if (!resUpdateTour.ok) {
        toast.error("Cập nhật số lượng không thành công!", ToastObjects);
        return;
      }
      if (useDiscount && discountItem) {
        let resDiscount = await fetch(
          `${BASE_URL}/discounts/${discountItem?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resultDeleteDiscount = await resDiscount.json();
        if (!resultDeleteDiscount.success) {
          toast.error("Xóa mã khuyến mãi không thành công!", ToastObjects);
          return;
        }
      }
      toast.success("Đặt tour thành công", ToastObjects);
      setTimeout(() => navigate("/thank-you"), 2500);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!", ToastObjects);
      return;
    }
  };

  const handleCheckDiscount = () => {
    if (discountInput?.trim()) {
      setUseDiscount(true);
    }
  };

  return (
    <>
      <Toast />
      <Container style={{ position: "relative" }}>
        {loading && <h4 className="text-center pt-5">Loading...</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="6">
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
                        <Label for="bookTo">Ngày về</Label>
                      </Col>
                    </Row>
                    <FormGroup className="d-flex align-items-center gap-3">
                      <input
                        type="date"
                        id="bookFrom"
                        onChange={handleChange}
                      />
                      <input
                        type="date"
                        id="bookTo"
                        required
                        onChange={handleChange}
                      />
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
                        min={0}
                      />
                      <input
                        type="number"
                        id="people"
                        onChange={(e) => {
                          setOrder((prev) => ({
                            ...prev,
                            people: {
                              ...prev.people,
                              children: e.target.value,
                            },
                          }));
                        }}
                        value={
                          order.people.children ? order.people.children : 1
                        }
                        min={0}
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
                            {Intl.NumberFormat("en-US").format(price)}đ/ngày cho
                            1 người lớn và{" "}
                            {Intl.NumberFormat("en-US").format(
                              Math.round(price / 2)
                            )}
                            đ/ngày cho 1 trẻ em
                          </h5>
                        </ListGroupItem>

                        <div>
                          <Row>
                            <Col lg="6">
                              <Label for="discount">Mã khuyến mãi</Label>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <div className="d-flex gap-2">
                                <input
                                  type="text"
                                  style={{ width: "75%" }}
                                  onChange={(e) =>
                                    setDiscountInput(e.target.value)
                                  }
                                />
                                <Button
                                  className="primary__btn"
                                  onClick={handleCheckDiscount}
                                >
                                  Áp dụng
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <ListGroupItem className="border-0 px-0 total">
                          <h5>Tổng cộng</h5>
                          <span>
                            {Intl.NumberFormat("en-US").format(totalPrice)}đ
                          </span>
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
            </Col>
            <Col lg="6" className="pt-5">
              <Row className="booking-info">
                <Col lg="6">
                  <div>
                    <p>
                      Tên tour: <span>{title}</span>
                    </p>
                    <p>
                      Người đặt: <span>{order.fullName}</span>
                    </p>
                    <p>
                      Điện thoại: <span>{order.phone}</span>
                    </p>
                    <p>
                      Ngày đi: <span>{order.bookFrom}</span>
                    </p>
                    <p>
                      Ngày về: <span>{order.bookTo}</span>
                    </p>
                    <p>
                      Người lớn: <span>{order.people.adult}</span>
                    </p>
                    <p>
                      Trẻ em: <span>{order.people.children}</span>
                    </p>
                    <p>
                      Phương thức thanh toán:{" "}
                      <span>
                        {order.paymentMethod === "direct"
                          ? "Thanh toán trực tiếp"
                          : "Chuyển khoản"}
                      </span>
                    </p>
                    <p>
                      Tổng tiền:{" "}
                      <span>
                        {Intl.NumberFormat("en-US").format(totalPrice)}đ
                      </span>
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <img src={photo} alt="" width="100%" className="mx-auto" />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Checkout;
