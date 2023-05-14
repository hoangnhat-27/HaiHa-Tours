import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { Container, Row, Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.js";
import "../styles/order-list.css";
import ReactPaginate from "react-paginate";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OrderList() {
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [orderItem, setOrderItem] = useState({});
  const [tourRating, setTourRating] = useState(5);
  const [reviewMsg, setReviewMsg] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập!", ToastObjects);
      setTimeout(() => navigate("/login"), 2500);
      return;
    }
  }, [user]);

  const [orderData, setOrderData] = useState(async () => {
    try {
      if (user) {
        const res = await fetch(`${BASE_URL}/orders/user/${user._id}`, {
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          toast.error("Có lỗi trong quá trình lấy dữ liệu!", ToastObjects);
          return;
        }
        setOrderData(result.data?.reverse());
      }
    } catch (error) {
      toast.error("Mạng không ổn định, vui lòng thử lại", ToastObjects);
    }
  });
  const [orderFilter, setOrderFilter] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  let itemsPerPage = 5;
  useEffect(() => {
    if (orderData.length) {
      const endOffset = itemOffset + itemsPerPage;
      setOrderFilter(orderData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(orderData?.length / itemsPerPage));
    }
  }, [orderData, itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orderData?.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseReviews = () => setShowReviews(false);
  const handleShowReviews = () => setShowReviews(true);

  const UpdateOrder = async (order) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${order._id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "cancel",
          updatedAt: new Date(Date.now()),
        }),
      });
      await res.json();
      if (!res.ok) {
        toast.error("Có lỗi đã xảy ra, hãy thử lại!", ToastObjects);
        return;
      }
      let remainSlot =
        order.tourId.slots +
        (Number(order.people.adult) + Number(order.people.children));
      const resUpdateTour = await fetch(
        `${BASE_URL}/tours/${order.tourId._id}`,
        {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            slots: remainSlot,
          }),
        }
      );
      await resUpdateTour.json();
      if (!resUpdateTour.ok) {
        toast.error("Cập nhật số lượng không thành công!", ToastObjects);
        return;
      }
      toast.success("Huỷ đơn thành công", ToastObjects);
      try {
        const res = await fetch(`${BASE_URL}/orders/${user._id}`, {
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          return alert(result.message);
        }
        setOrderData(result.data?.reverse());
      } catch (error) {
        toast.error("Có lỗi khi lấy ra danh sách!", ToastObjects);
        return;
      }
    } catch (error) {
      toast.error("Hủy đơn không thành công!", ToastObjects);
      return;
    }
  };

  const submitHandler = async (order) => {
    try {
      const reviewObj = {
        tourId: order.tourId._id,
        userId: user?._id,
        reviewText: reviewMsg,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${order._id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);
      try {
        const res = await fetch(`${BASE_URL}/orders/${order._id}`, {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isReviewed: true,
            updatedAt: new Date(Date.now()),
          }),
        });
        await res.json();
        if (!res.ok) {
          toast.error("Cập nhật đơn hàng không thành công!", ToastObjects);
          return;
        }
        try {
          const res = await fetch(`${BASE_URL}/orders/${user._id}`, {
            method: "get",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });
          const result = await res.json();
          if (!res.ok) {
            toast.error("Lấy danh sách không thành công!", ToastObjects);
            return;
          }
          setOrderData(result.data?.reverse());
        } catch (error) {
          toast.error("Lấy danh sách không thành công!", ToastObjects);
          return;
        }
      } catch (error) {
        toast.error("Cập nhật đơn hàng không thành công!", ToastObjects);
        return;
      }
      toast.success("Đánh giá đơn hàng thành công", ToastObjects);
    } catch (error) {
      toast.error("Đánh giá đơn hàng không thành công!", ToastObjects);
      return;
    }
  };

  return (
    <>
      <Toast />
      <Container>
        {/* cancel modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Huỷ đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn muốn xác nhận hủy đơn hàng chứ ?</Modal.Body>
          <Modal.Footer>
            <Button className="btn-danger" onClick={handleClose}>
              Đóng
            </Button>
            <Button
              className="btn-success"
              onClick={() => {
                UpdateOrder(orderItem);
                handleClose();
              }}
            >
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
        {/* review modal */}
        <Modal show={showReviews} onHide={handleCloseReviews}>
          <Modal.Header closeButton>
            <Modal.Title>Đánh giá</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  Đánh giá sao:{" "}
                  {tourRating ? (
                    <span>
                      {tourRating}
                      <i class="ri-star-s-fill"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </Form.Label>
                <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                  <span onClick={() => setTourRating(1)}>
                    1 <i class="ri-star-s-fill"></i>
                  </span>
                  <span onClick={() => setTourRating(2)}>
                    2 <i class="ri-star-s-fill"></i>
                  </span>
                  <span onClick={() => setTourRating(3)}>
                    3 <i class="ri-star-s-fill"></i>
                  </span>
                  <span onClick={() => setTourRating(4)}>
                    4 <i class="ri-star-s-fill"></i>
                  </span>
                  <span onClick={() => setTourRating(5)}>
                    5 <i class="ri-star-s-fill"></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Đánh giá đơn hàng</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Nhập đánh giá của bạn"
                  onChange={(e) => setReviewMsg(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-danger" onClick={handleCloseReviews}>
              Hủy bỏ
            </Button>
            <Button
              className="btn-success"
              onClick={() => {
                submitHandler(orderItem);
                handleCloseReviews();
              }}
            >
              Đánh giá
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="mt-3">
          <h5>Danh sách đơn hàng</h5>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Đơn thành công" {...a11yProps(1)} />
              <Tab label="Chờ xác nhận" {...a11yProps(2)} />
              <Tab label="Bị hủy" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {orderFilter?.length ? (
              <>
                <div className="productSlider mb-2 mt-2">
                  <Row>
                    <div className="col-12 cartShow">
                      <Table
                        bordered
                        hover
                        responsive="sm"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Người lớn</th>
                            <th>Trẻ em</th>
                            <th>Số ngày</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderFilter.map((order) => (
                            <tr key={order._id}>
                              <td>
                                <a href={`/tour/${order.tourId._id}`}>
                                  {order.tourName}
                                </a>
                              </td>
                              <td>
                                <img src={order.photo} alt="" width="50px" />
                              </td>
                              <td>{order.people.adult}</td>
                              <td>{order.people.children}</td>
                              <td>
                                {Math.round(
                                  Math.abs(
                                    (new Date(order.bookFrom) -
                                      new Date(order.bookTo)) /
                                      (24 * 60 * 60 * 1000)
                                  )
                                )}
                              </td>
                              <td>
                                {Intl.NumberFormat("en-US").format(
                                  order.totalPrice
                                )}
                                đ
                              </td>
                              <td>
                                {order.status === "accept" ? (
                                  <span>Đã xác nhận</span>
                                ) : order.status === "cancel" ? (
                                  <span>Đã hủy</span>
                                ) : (
                                  <span>Chờ xác nhận</span>
                                )}
                              </td>
                              <td>
                                {order.isReviewed ? (
                                  ""
                                ) : order.status === "accept" ? (
                                  <Button
                                    className="btn btn-success"
                                    onClick={() => {
                                      setOrderItem(order);
                                      handleShowReviews();
                                    }}
                                  >
                                    Đánh giá
                                  </Button>
                                ) : order.status === "cancel" ? (
                                  ""
                                ) : (
                                  <Button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setOrderItem(order);
                                      handleShow();
                                    }}
                                  >
                                    Hủy đơn
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <span>Chưa có đơn hàng nào được đặt, </span>
                <Button className="btn-warning">
                  <Link to="/tours">tiếp tục mua sắm nào</Link>
                </Button>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {orderFilter?.length &&
            orderFilter.filter((order) => order.status === "accept")?.length ? (
              <>
                <div className="productSlider mb-2 mt-2">
                  <Row>
                    <div className="col-12 cartShow">
                      <Table
                        bordered
                        hover
                        responsive="sm"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Người lớn</th>
                            <th>Trẻ em</th>
                            <th>Số ngày</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderFilter
                            ?.filter((order) => order.status === "accept")
                            ?.map((order) => (
                              <tr key={order._id}>
                                <td>
                                  <a href={`/tour/${order.tourId._id}`}>
                                    {order.tourId.title}
                                  </a>
                                </td>
                                <td>
                                  <img
                                    src={order.tourId.photo}
                                    alt=""
                                    width="50px"
                                  />
                                </td>
                                <td>{order.people.adult}</td>
                                <td>{order.people.children}</td>
                                <td>
                                  {Math.round(
                                    Math.abs(
                                      (new Date(order.bookFrom) -
                                        new Date(order.bookTo)) /
                                        (24 * 60 * 60 * 1000)
                                    )
                                  )}
                                </td>
                                <td>
                                  {Intl.NumberFormat("en-US").format(
                                    order.totalPrice
                                  )}
                                  đ
                                </td>
                                <td>
                                  <span>Đã xác nhận</span>
                                </td>
                                <td>
                                  {order.isReviewed ? (
                                    ""
                                  ) : (
                                    <Button
                                      className="btn btn-success"
                                      onClick={() => {
                                        setOrderItem(order);
                                        handleShowReviews();
                                      }}
                                    >
                                      Đánh giá
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <span>Chưa có đơn hàng nào được đặt thành công, </span>
                <Button className="btn-warning">
                  <Link to="/tours">tiếp tục mua sắm nào</Link>
                </Button>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {orderFilter?.length &&
            orderFilter.filter(
              (order) => order.status !== "accept" && order.status !== "cancel"
            )?.length ? (
              <>
                <div className="productSlider mb-2 mt-2">
                  <Row>
                    <div className="col-12 cartShow">
                      <Table
                        bordered
                        hover
                        responsive="sm"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Người lớn</th>
                            <th>Trẻ em</th>
                            <th>Số ngày</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderFilter
                            ?.filter(
                              (order) =>
                                order.status !== "accept" &&
                                order.status !== "cancel"
                            )
                            ?.map((order) => (
                              <tr key={order._id}>
                                <td>{order.tourId.title}</td>
                                <td>
                                  <img
                                    src={order.tourId.photo}
                                    alt=""
                                    width="50px"
                                  />
                                </td>
                                <td>{order.people.adult}</td>
                                <td>{order.people.children}</td>
                                <td>
                                  {Math.round(
                                    Math.abs(
                                      (new Date(order.bookFrom) -
                                        new Date(order.bookTo)) /
                                        (24 * 60 * 60 * 1000)
                                    )
                                  )}
                                </td>
                                <td>
                                  {Intl.NumberFormat("en-US").format(
                                    order.totalPrice
                                  )}
                                  đ
                                </td>
                                <td>
                                  <span>Chờ xác nhận</span>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setOrderItem(order);
                                      handleShow();
                                    }}
                                  >
                                    Hủy đơn
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <span>Chưa có đơn hàng nào cần chờ xác nhận, </span>
                <Button className="btn-warning">
                  <Link to="/tours">tiếp tục mua sắm nào</Link>
                </Button>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {orderFilter?.length &&
            orderFilter.filter((order) => order.status === "cancel")?.length ? (
              <>
                <div className="productSlider mb-2 mt-2">
                  <Row>
                    <div className="col-12 cartShow">
                      <Table
                        bordered
                        hover
                        responsive="sm"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Người lớn</th>
                            <th>Trẻ em</th>
                            <th>Số ngày</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderFilter
                            ?.filter((order) => order.status === "cancel")
                            ?.map((order) => (
                              <tr key={order._id}>
                                <td>{order.tourId.title}</td>
                                <td>
                                  <img
                                    src={order.tourId.photo}
                                    alt=""
                                    width="50px"
                                  />
                                </td>
                                <td>{order.people.adult}</td>
                                <td>{order.people.children}</td>
                                <td>
                                  {Math.round(
                                    Math.abs(
                                      (new Date(order.bookFrom) -
                                        new Date(order.bookTo)) /
                                        (24 * 60 * 60 * 1000)
                                    )
                                  )}
                                </td>
                                <td>
                                  {Intl.NumberFormat("en-US").format(
                                    order.totalPrice
                                  )}
                                  đ
                                </td>
                                <td>
                                  <span>Đã hủy</span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <span>Chưa có đơn hàng nào bị hủy, </span>
                <Button className="btn-warning">
                  <Link to="/tours">tiếp tục mua sắm nào</Link>
                </Button>
              </div>
            )}
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
