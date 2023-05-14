import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [userSorted, setUserSorted] = useState([]);
  const [show, setShow] = useState(false);
  const [userItem, setUserItem] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (users?.success) {
      setUserData(users.data);
    }
  }, [users]);

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    let result = userData;
    if (sortOption === 0) {
      result = result.slice().reverse();
    } else if (sortOption === 1) {
    } else if (sortOption === 2) {
      result = result
        .slice()
        .sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortOption === 3) {
      result = result
        .slice()
        .sort((a, b) => a.username.localeCompare(b.username))
        .reverse();
    }
    if (searchInput?.trim()) {
      result = result.filter((user) =>
        user.email
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(searchInput)
      );
    }
    setUserSorted(result);
  }, [userData, sortOption, searchInput]);

  const [itemOffset, setItemOffset] = useState(0);
  const [userFilter, setTourFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 8;
  useEffect(() => {
    setTourFilter(userSorted.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userSorted.length / 8));
  }, [userSorted, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 8) % userSorted.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [userSorted]
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };
  const deletehandler = async (user) => {
    if (user) {
      let res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        let resOrder = await fetch(`${BASE_URL}/orders/${user._id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const resultDeleteUser = await resOrder.json();
        let resDiscount = await fetch(
          `${BASE_URL}/discounts/user/${user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const resultDeleteDiscount = await resDiscount.json();
        if (resultDeleteUser.success && resultDeleteDiscount.success) {
          toast.success("Xoá người dùng thành công!", ToastObjects);
          dispatch(listUser());
        }
      }
    }
  };

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn muốn xóa người dùng này chứ ? (Tất cả dữ liệu liên quan của người
          dùng này cũng sẽ bị xóa)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deletehandler(userItem);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Người dùng</h2>
          <div>
            <Link to="#" className="btn btn-primary">
              <i className="material-icons md-plus"></i> Tạo khách hàng
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Tìm kiếm người dùng..."
                  className="form-control p-2"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div
                className="col-lg-3 col-6 col-md-3"
                style={{ margin: "auto 0" }}
              >
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <span>Sắp xếp theo: </span>
                  <select onChange={handleSort}>
                    <option>Mới nhất</option>
                    <option>Cũ nhất</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </header>

          <div className="card-body">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
                <h6>
                  Có {userFilter.filter((user) => user.role !== "admin").length}{" "}
                  kết quả
                </h6>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                  {userFilter.map((user) =>
                    user.role === "user" ? (
                      <div className="col" key={user._id}>
                        <div className="card card-user shadow-sm">
                          <div className="card-header">
                            <img
                              className="img-md img-avatar"
                              src={user.photo}
                              alt="User pic"
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title mt-5">{user.username}</h5>
                            <div className="card-text text-muted">
                              {user.role === "admin" ? null : (
                                <p className="m-0">Khách hàng</p>
                              )}

                              <p>
                                <a
                                  href={`mailto:${user.email}`}
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {user.email}
                                </a>
                              </p>
                            </div>
                            <Button
                              onClick={() => {
                                handleShow();
                                setUserItem(user);
                              }}
                            >
                              Xoá người dùng
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserComponent;
